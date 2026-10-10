import { describe, it, expect, beforeEach, vi } from 'vitest';

const request = require('supertest');

const { createApp } = require('../app');

const good = { name: 'Asha', email: 'Asha@Example.com', message: 'We need a mobile app built.' };

function makeDeps(overrides = {}) {
    const db = {
        User: { submitMsg: 'noted' },
        getSectionData: vi.fn(async (s) => ({ section: s })),
        getDatabaseStatus: () => ({ configured: true, ready: true }),
        saveContactSubmission: vi.fn(async (s) => ({ id: 7, ...s })),
        updateMailStatus: vi.fn(async () => true),
        ...overrides.db,
    };
    const mailer = {
        isConfigured: () => true,
        sendContactEmails: vi.fn(async () => ({ configured: true, notified: true, acknowledged: true, error: null })),
        ...overrides.mailer,
    };
    return { db, mailer, env: { CONTACT_RATE_LIMIT: '1000', ...overrides.env } };
}

describe('POST /api/user', () => {
    let deps;
    beforeEach(() => { deps = makeDeps(); });

    it('stores, emails and returns the contract the client relies on', async () => {
        const res = await request(createApp(deps)).post('/api/user').send(good);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Thanks for your message..!!', submitMsg: 'noted' });
        expect(deps.db.saveContactSubmission).toHaveBeenCalledWith(expect.objectContaining({ email: 'asha@example.com' }));
        expect(deps.mailer.sendContactEmails).toHaveBeenCalledTimes(1);
        expect(deps.db.updateMailStatus).toHaveBeenCalledWith(7, 'sent');
    });

    it.each([
        [{ ...good, name: '' }, /Name is required/],
        [{ ...good, email: 'not-an-email' }, /valid email/],
        [{ ...good, email: 'a@b' }, /valid email/],
        [{ ...good, message: '' }, /Message is required/],
        [{ ...good, message: 'hi' }, /few more details/],
        [{ ...good, name: 'x'.repeat(101) }, /100 characters/],
        [{ ...good, message: 'x'.repeat(5001) }, /5000 characters/],
        [{ ...good, name: 'a\r\nBcc: evil@x.com' }, /(invalid characters|required)/],
        [{ name: ['x'], email: {}, message: 1 }, /required/],
    ])('rejects bad input %#', async (body, pattern) => {
        const res = await request(createApp(deps)).post('/api/user').send(body);
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(pattern);
        expect(deps.mailer.sendContactEmails).not.toHaveBeenCalled();
    });

    it('returns JSON 400 (not a 500 stack trace) for an empty or malformed body', async () => {
        const app = createApp(deps);
        const empty = await request(app).post('/api/user');
        expect(empty.status).toBe(400);
        const bad = await request(app).post('/api/user').set('Content-Type', 'application/json').send('{bad');
        expect(bad.status).toBe(400);
        expect(bad.body).toEqual({ error: 'Invalid JSON.' });
        expect(JSON.stringify(bad.body)).not.toMatch(/node_modules|at /);
    });

    it('silently drops honeypot submissions', async () => {
        const res = await request(createApp(deps)).post('/api/user').send({ ...good, website: 'http://spam' });
        expect(res.status).toBe(200);
        expect(deps.db.saveContactSubmission).not.toHaveBeenCalled();
        expect(deps.mailer.sendContactEmails).not.toHaveBeenCalled();
    });

    it('still succeeds if only the email path works (DB down)', async () => {
        deps = makeDeps({ db: { saveContactSubmission: vi.fn(async () => { throw new Error('db down'); }) } });
        const res = await request(createApp(deps)).post('/api/user').send(good);
        expect(res.status).toBe(200);
    });

    it('still succeeds if only the DB path works (SMTP down)', async () => {
        deps = makeDeps({ mailer: { sendContactEmails: vi.fn(async () => ({ configured: true, notified: false, acknowledged: false, error: 'smtp down' })) } });
        const res = await request(createApp(deps)).post('/api/user').send(good);
        expect(res.status).toBe(200);
        expect(deps.db.updateMailStatus).toHaveBeenCalledWith(7, 'failed');
    });

    it('returns 503 instead of a fake success when the message was kept nowhere', async () => {
        deps = makeDeps({
            db: { saveContactSubmission: vi.fn(async () => null) },
            mailer: { sendContactEmails: vi.fn(async () => ({ configured: false, notified: false, acknowledged: false, error: 'x' })) },
        });
        const res = await request(createApp(deps)).post('/api/user').send(good);
        expect(res.status).toBe(503);
        expect(res.body.error).toMatch(/could not deliver/i);
    });

    it('rate limits repeated submissions', async () => {
        const app = createApp(makeDeps({ env: { CONTACT_RATE_LIMIT: '3' } }));
        const codes = [];
        for (let i = 0; i < 5; i += 1) codes.push((await request(app).post('/api/user').send(good)).status);
        expect(codes).toEqual([200, 200, 200, 429, 429]);
    });
});

describe('platform behaviour', () => {
    it('serves section data with security headers and no x-powered-by', async () => {
        const res = await request(createApp(makeDeps())).get('/api/hero');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ section: 'hero' });
        expect(res.headers['x-powered-by']).toBeUndefined();
        expect(res.headers['x-content-type-options']).toBe('nosniff');
    });

    it('exposes a health check without secrets', async () => {
        const res = await request(createApp(makeDeps())).get('/api/health');
        expect(res.body).toEqual({ status: 'ok', database: { configured: true, ready: true }, mail: { configured: true } });
    });

    it('returns JSON 404 for unknown API routes', async () => {
        const res = await request(createApp(makeDeps())).get('/api/nope');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Not found.' });
    });

    it('enforces ALLOWED_ORIGINS when set', async () => {
        const app = createApp(makeDeps({ env: { ALLOWED_ORIGINS: 'https://www.tnovasolutions.com' } }));
        const ok = await request(app).get('/api/hero').set('Origin', 'https://www.tnovasolutions.com');
        const bad = await request(app).get('/api/hero').set('Origin', 'https://evil.example');
        expect(ok.headers['access-control-allow-origin']).toBe('https://www.tnovasolutions.com');
        expect(bad.headers['access-control-allow-origin']).toBeUndefined();
    });
});
