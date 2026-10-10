// Usage: npm run verify:mail   (reads server/.env)
// Optional: npm run verify:mail -- --send you@example.com   (sends a real test email)
require('dotenv').config();
const { createMailer } = require('../src/lib/mailer');

(async () => {
    const mailer = createMailer();
    if (!mailer.isConfigured()) {
        console.error('✗ SMTP_USER / SMTP_PASS are not set in server/.env');
        process.exit(1);
    }
    try {
        await mailer.verify();
        console.log('✓ SMTP connection and login OK');
    } catch (error) {
        console.error('✗ SMTP check failed:', error.message);
        process.exit(1);
    }
    const i = process.argv.indexOf('--send');
    if (i !== -1 && process.argv[i + 1]) {
        const r = await mailer.sendContactEmails({
            name: 'Mail self-test',
            email: process.argv[i + 1],
            message: 'This is a test message from the TNova website mail check.',
        });
        console.log(r.notified ? '✓ Team notification sent' : '✗ Team notification failed', r.error || '');
        console.log(r.acknowledged ? '✓ Acknowledgement sent' : '✗ Acknowledgement not sent');
        process.exit(r.notified ? 0 : 1);
    }
})();
