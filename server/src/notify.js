const nodemailer = require('nodemailer');

const SEND_TIMEOUT_MS = 5000;
let transporter = null;

function isConfigured() {
    return Boolean(process.env.SMTP_URL && process.env.NOTIFY_EMAIL_TO);
}

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport(process.env.SMTP_URL);
    }
    return transporter;
}

/**
 * Best-effort email alert for the TNova team. Never throws and never blocks a visitor for long:
 * the submission is already stored before this runs. Plain-text only (no HTML injection surface).
 * Returns true when an email was handed to the SMTP server.
 */
async function notify({ subject, lines, replyTo }) {
    if (!isConfigured()) {
        return false;
    }

    try {
        let timer;
        const timeout = new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('SMTP timeout')), SEND_TIMEOUT_MS);
        });

        await Promise.race([
            getTransporter().sendMail({
                from: process.env.NOTIFY_EMAIL_FROM || process.env.NOTIFY_EMAIL_TO,
                to: process.env.NOTIFY_EMAIL_TO,
                replyTo,
                subject,
                text: lines.join('\n'),
            }),
            timeout,
        ]).finally(() => clearTimeout(timer));

        return true;
    } catch (error) {
        console.error('Notification email failed:', error.message);
        return false;
    }
}

module.exports = { notify, isConfigured };
