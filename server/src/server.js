const crypto = require('crypto');

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config();

const {
    User,
    SECTIONS,
    initializeDatabase,
    saveContactSubmission,
    getDatabaseStatus,
    getSectionData,
    getAllContent,
    saveJobApplication,
    listSubmissions,
} = require('./db');
const { notify } = require('./notify');
const { validateContact, validateApplication } = require('./validation');

const APPLY_MESSAGE = 'We have received your application and will get back to you if there is a fit.';
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// Behind Vercel / a reverse proxy the real client IP comes from X-Forwarded-For (needed for rate limiting).
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet());

// CORS: comma-separated allow-list in CORS_ORIGINS. Unset = allow all (development convenience only).
const allowedOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

if (isProduction && allowedOrigins.length === 0) {
    console.warn('CORS_ORIGINS is not set: any website can call this API. Set it to your site origin(s).');
}

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.CONTACT_RATE_LIMIT) || 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many submissions. Please try again in a few minutes.' },
});

const readLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many requests. Please slow down.' },
});

app.get('/api/health', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ status: 'ok', database: getDatabaseStatus() });
});

// Content is public and changes rarely: let browsers and the CDN cache it briefly.
const cacheContent = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
    next();
};

// All sections in one request. The client uses this on load.
app.get('/api/content', readLimiter, cacheContent, async (req, res, next) => {
    try {
        res.json(await getAllContent());
    } catch (error) {
        next(error);
    }
});

// Per-section endpoints, kept for backward compatibility.
app.get('/api/:section', readLimiter, cacheContent, async (req, res, next) => {
    try {
        const { section } = req.params;

        if (!Object.prototype.hasOwnProperty.call(SECTIONS, section)) {
            return next();
        }

        return res.json((await getSectionData(section)) || {});
    } catch (error) {
        return next(error);
    }
});

app.post('/api/user', contactLimiter, async (req, res, next) => {
    try {
        const result = validateContact(req.body);

        if (result.spam) {
            // Pretend success so bots learn nothing, but store nothing.
            return res.status(200).json({ message: 'Thanks for your message..!!', submitMsg: User.submitMsg });
        }

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const stored = await saveContactSubmission({ ...result.value, receivedAt: new Date().toISOString() });

        if (!stored) {
            // Never tell a visitor "received" when the lead was not saved.
            console.error('Contact submission could not be stored: database unavailable.');
            return res.status(503).json({
                error: 'We could not save your message right now. Please email info@tnovasolutions.com instead.',
            });
        }

        await notify({
            subject: `New enquiry (${result.value.interest}) from ${result.value.name}`,
            replyTo: result.value.email,
            lines: [
                `Name: ${result.value.name}`,
                `Email: ${result.value.email}`,
                `Enquiry type: ${result.value.interest}`,
                '',
                result.value.message,
            ],
        });

        return res.status(200).json({
            message: 'Thanks for your message..!!',
            submitMsg: User.submitMsg,
        });
    } catch (error) {
        return next(error);
    }
});

app.post('/api/careers/apply', contactLimiter, async (req, res, next) => {
    try {
        const roleIds = (SECTIONS.careers.openings || []).map((opening) => opening.id);
        const result = validateApplication(req.body, roleIds);

        if (result.spam) {
            return res.status(200).json({ message: 'Thanks for applying!', submitMsg: APPLY_MESSAGE });
        }

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const stored = await saveJobApplication({ ...result.value, receivedAt: new Date().toISOString() });

        if (!stored) {
            console.error('Job application could not be stored: database unavailable.');
            return res.status(503).json({
                error: 'We could not save your application right now. Please email info@tnovasolutions.com instead.',
            });
        }

        await notify({
            subject: `New job application (${result.value.role}) from ${result.value.name}`,
            replyTo: result.value.email,
            lines: [
                `Role: ${result.value.role}`,
                `Name: ${result.value.name}`,
                `Email: ${result.value.email}`,
                `Phone: ${result.value.phone || '-'}`,
                `Profile: ${result.value.profileUrl || '-'}`,
                '',
                result.value.message,
            ],
        });

        return res.status(200).json({ message: 'Thanks for applying!', submitMsg: APPLY_MESSAGE });
    } catch (error) {
        return next(error);
    }
});

// Read-only access to stored leads/applications. Disabled (404) unless ADMIN_TOKEN is set.
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false });

function tokenMatches(provided) {
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || !provided) return false;
    const a = crypto.createHash('sha256').update(String(provided)).digest();
    const b = crypto.createHash('sha256').update(expected).digest();
    return crypto.timingSafeEqual(a, b);
}

app.get('/api/admin/submissions', adminLimiter, async (req, res, next) => {
    try {
        if (!process.env.ADMIN_TOKEN) {
            return res.status(404).json({ error: 'Not found.' });
        }

        const header = req.get('authorization') || '';
        const provided = header.startsWith('Bearer ') ? header.slice(7) : '';

        if (!tokenMatches(provided)) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        const kind = req.query.type === 'applications' ? 'applications' : 'contact';
        const rows = await listSubmissions(kind);

        if (!rows) {
            return res.status(503).json({ error: 'Database unavailable.' });
        }

        res.set('Cache-Control', 'no-store');
        return res.json({ type: kind, count: rows.length, rows });
    } catch (error) {
        return next(error);
    }
});

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found.' });
});

// Malformed JSON, oversized bodies and unexpected failures. Never leak stack traces.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON.' });
    }
    if (error.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Request too large.' });
    }
    console.error('Unhandled error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// Warm the database connection; the site still serves bundled content if it is unavailable.
initializeDatabase()
    .then((ready) => {
        if (!ready) {
            console.log('PostgreSQL is not connected. Set DATABASE_URL or POSTGRES_URL to enable persistence.');
        }
    })
    .catch(() => {});

// Listen only when run directly (`node src/server.js`). Vercel and the tests import the app instead.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

module.exports = app;
