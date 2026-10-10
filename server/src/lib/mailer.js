// SMTP mailer (Zoho Mail by default). Configured entirely through env vars.
const nodemailer = require('nodemailer');

const { escapeHtml, headerSafe } = require('./validation');

function getMailConfig(env = process.env) {
    const user = env.SMTP_USER;
    const pass = env.SMTP_PASS;
    if (!user || !pass) return null;

    const port = Number(env.SMTP_PORT) || 465;
    return {
        host: env.SMTP_HOST || 'smtp.zoho.in',
        port,
        secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
        auth: { user, pass },
        from: env.MAIL_FROM || `"TNova Solutions" <${user}>`,
        // Where new enquiries are delivered. Defaults to the sending mailbox.
        to: env.MAIL_TO || user,
        // Test hook: allow self-signed certs for a local SMTP sink only.
        rejectUnauthorized: env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    };
}

function createMailer(env = process.env) {
    const config = getMailConfig(env);
    let transporter = null;

    function getTransporter() {
        if (!config) return null;
        if (!transporter) {
            transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: config.secure,
                auth: config.auth,
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 15000,
                tls: { rejectUnauthorized: config.rejectUnauthorized },
            });
        }
        return transporter;
    }

    return {
        isConfigured: () => Boolean(config),

        // Confirms host, port, TLS and login all work. Used by `npm run verify:mail`.
        async verify() {
            const t = getTransporter();
            if (!t) throw new Error('SMTP_USER / SMTP_PASS are not set.');
            await t.verify();
            return true;
        },

        /**
         * Sends (1) a notification to the TNova team and (2) an acknowledgement
         * to the visitor. Never throws: returns what actually succeeded so the
         * caller can decide how to respond.
         */
        async sendContactEmails({ name, email, message }) {
            const t = getTransporter();
            if (!t) return { configured: false, notified: false, acknowledged: false, error: 'Mail not configured.' };

            const result = { configured: true, notified: false, acknowledged: false, error: null };
            const safeName = headerSafe(name);

            try {
                await t.sendMail({
                    from: config.from,
                    to: config.to,
                    replyTo: `"${safeName.replace(/"/g, '')}" <${email}>`,
                    subject: `New website enquiry from ${safeName}`,
                    text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
                    html:
                        `<h2 style="margin:0 0 12px">New website enquiry</h2>` +
                        `<p><strong>Name:</strong> ${escapeHtml(name)}<br>` +
                        `<strong>Email:</strong> ${escapeHtml(email)}</p>` +
                        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
                });
                result.notified = true;
            } catch (error) {
                result.error = error.message;
                console.error('Contact notification email failed:', error.message);
            }

            // Acknowledgement is best-effort; a failure here must not fail the request.
            if (result.notified) {
                try {
                    await t.sendMail({
                        from: config.from,
                        to: `"${safeName.replace(/"/g, '')}" <${email}>`,
                        subject: 'We received your message — TNova Solutions',
                        text:
                            `Hi ${safeName},\n\nThanks for reaching out to TNova Solutions. ` +
                            `We have received your message and will reply within 48 hours.\n\n` +
                            `Your message:\n${message}\n\n— TNova Solutions\nInnovate · Integrate · Elevate\n`,
                        html:
                            `<p>Hi ${escapeHtml(safeName)},</p>` +
                            `<p>Thanks for reaching out to <strong>TNova Solutions</strong>. We have received your ` +
                            `message and will reply within 48 hours.</p>` +
                            `<blockquote style="border-left:3px solid #562BF2;margin:12px 0;padding:4px 12px;white-space:pre-wrap">` +
                            `${escapeHtml(message)}</blockquote>` +
                            `<p>— TNova Solutions<br><em>Innovate · Integrate · Elevate</em></p>`,
                    });
                    result.acknowledged = true;
                } catch (error) {
                    console.error('Contact acknowledgement email failed:', error.message);
                }
            }

            return result;
        },
    };
}

module.exports = { createMailer, getMailConfig };
