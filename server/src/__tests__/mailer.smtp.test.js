// Sends through the REAL nodemailer -> SMTP protocol path into a local SMTP server.
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const { simpleParser } = require('mailparser');
const { SMTPServer } = require('smtp-server');

const { createMailer } = require('../lib/mailer');

let server;
let port;
const inbox = [];

beforeAll(async () => {
    server = new SMTPServer({
        authOptional: false,
        disabledCommands: ['STARTTLS'],
        allowInsecureAuth: true,
        onAuth(auth, session, cb) {
            if (auth.username === 'info@tnovasolutions.com' && auth.password === 'app-pass') return cb(null, { user: 1 });
            return cb(new Error('Invalid login'));
        },
        onData(stream, session, cb) {
            simpleParser(stream).then((m) => { inbox.push(m); cb(); }).catch(cb);
        },
    });
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    port = server.server.address().port;
});
afterAll(() => new Promise((r) => server.close(r)));

const env = (over = {}) => ({
    SMTP_HOST: '127.0.0.1', SMTP_PORT: String(port), SMTP_SECURE: 'false',
    SMTP_USER: 'info@tnovasolutions.com', SMTP_PASS: 'app-pass', ...over,
});

describe('SMTP mailer', () => {
    it('is unconfigured without credentials', async () => {
        const m = createMailer({});
        expect(m.isConfigured()).toBe(false);
        expect((await m.sendContactEmails({ name: 'a', email: 'a@b.co', message: 'hello there' })).notified).toBe(false);
    });

    it('delivers a team notification and a visitor acknowledgement, escaping HTML', async () => {
        inbox.length = 0;
        const m = createMailer({ ...env(), SMTP_PORT: String(port) });
        const res = await m.sendContactEmails({
            name: 'Evil <b>Name</b>', email: 'visitor@example.com', message: '<script>alert(1)</script> need an app',
        });
        expect(res).toMatchObject({ notified: true, acknowledged: true });
        expect(inbox).toHaveLength(2);

        const [team, ack] = inbox;
        expect(team.to.text).toBe('info@tnovasolutions.com');
        expect(team.replyTo.value[0].address).toBe('visitor@example.com');
        expect(team.subject).toMatch(/New website enquiry/);
        expect(team.html).not.toContain('<script>');
        expect(team.html).toContain('&lt;script&gt;');
        expect(ack.to.value[0].address).toBe('visitor@example.com');
        expect(ack.subject).toMatch(/We received your message/);
    });

    it('reports failure (does not throw) on bad credentials', async () => {
        const m = createMailer(env({ SMTP_PASS: 'wrong' }));
        const res = await m.sendContactEmails({ name: 'a', email: 'a@b.co', message: 'hello there' });
        expect(res.notified).toBe(false);
        expect(res.error).toMatch(/invalid login|auth/i);
    });

    it('verify() succeeds with good credentials and rejects bad ones', async () => {
        await expect(createMailer(env()).verify()).resolves.toBe(true);
        await expect(createMailer(env({ SMTP_PASS: 'nope' })).verify()).rejects.toThrow();
    });
});
