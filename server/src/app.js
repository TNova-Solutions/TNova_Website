const cors = require('cors');
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');

const { validateContact } = require('./lib/validation');

const SECTIONS = ['hero', 'capabilities', 'work', 'process', 'team', 'band', 'contact', 'footer'];

function buildCorsOptions(env) {
    const raw = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (raw.length === 0) {
        if (env.NODE_ENV === 'production') {
            console.warn('ALLOWED_ORIGINS is not set: CORS is open to every origin. Set it to your site URL(s).');
        }
        return { origin: true };
    }
    return {
        origin(origin, callback) {
            // Same-origin / server-to-server requests have no Origin header.
            if (!origin || raw.includes(origin)) return callback(null, true);
            return callback(null, false);
        },
    };
}

/**
 * @param {{db: object, mailer: object, env?: object}} deps  injected so tests can fake them
 */
function createApp({ db, mailer, env = process.env }) {
    const app = express();

    app.disable('x-powered-by');
    app.set('trust proxy', 1); // behind Vercel / a reverse proxy: needed for per-client rate limits
    app.use(helmet());
    app.use(cors(buildCorsOptions(env)));
    app.use(express.json({ limit: '20kb' }));

    // ---- Public content (one endpoint per homepage section) -------------------
    SECTIONS.forEach((section) => {
        app.get(`/api/${section}`, async (req, res) => {
            const data = await db.getSectionData(section);
            res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
            res.json(data || {});
        });
    });

    // ---- Health ---------------------------------------------------------------
    app.get('/api/health', (req, res) => {
        const database = db.getDatabaseStatus();
        res.json({
            status: 'ok',
            database: { configured: database.configured, ready: database.ready },
            mail: { configured: mailer.isConfigured() },
        });
    });

    // ---- Contact form ---------------------------------------------------------
    const contactLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: Number(env.CONTACT_RATE_LIMIT) || 5,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: { error: 'Too many messages from this connection. Please try again in a few minutes.' },
    });

    app.post('/api/user', contactLimiter, async (req, res) => {
        // Honeypot: real users never see or fill this field. Pretend success to bots.
        if (req.body && typeof req.body.website === 'string' && req.body.website.trim() !== '') {
            return res.status(200).json(await successBody(db));
        }

        const { error, value } = validateContact(req.body);
        if (error) return res.status(400).json({ error });

        const submission = { ...value, receivedAt: new Date().toISOString() };

        let stored = null;
        try {
            stored = await db.saveContactSubmission(submission);
        } catch (err) {
            console.error('Saving contact submission failed:', err.message);
        }

        const mail = await mailer.sendContactEmails(submission);

        if (stored && stored.id && typeof db.updateMailStatus === 'function') {
            const status = mail.notified ? (mail.acknowledged ? 'sent' : 'notified_only') : 'failed';
            try {
                // Awaited: serverless platforms may freeze the function once the response is sent.
                await db.updateMailStatus(stored.id, status);
            } catch (err) {
                console.error('Updating mail status failed:', err.message);
            }
        }

        // Never tell a visitor "received" if we kept it nowhere.
        if (!stored && !mail.notified) {
            console.error('Contact submission was neither stored nor emailed:', submission.email);
            return res.status(503).json({
                error: 'We could not deliver your message right now. Please email us directly or try again shortly.',
            });
        }

        return res.status(200).json(await successBody(db));
    });

    // ---- 404 + error handling (JSON only, no stack traces) --------------------
    app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON.' });
        if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request is too large.' });
        console.error('Unhandled error:', err.message);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });

    return app;
}

async function successBody(db) {
    const { User } = db;
    return {
        message: 'Thanks for your message..!!',
        submitMsg:
            (User && User.submitMsg) ||
            'Your message has been noted. We will get back to you within 48 hours at the email you provide.',
    };
}

module.exports = { createApp };
