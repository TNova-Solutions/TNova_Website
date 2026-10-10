import { createRequire } from 'node:module';

import request from 'supertest';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

const validBody = {
  name: 'Jane Doe',
  email: 'Jane@Example.com',
  message: 'We need a mobile app.',
  interest: 'project',
};

let app;
let db;

beforeAll(() => {
  process.env.CONTACT_RATE_LIMIT = '1000';
  delete process.env.DATABASE_URL;
  delete process.env.POSTGRES_URL;
  db = require('../src/db');
  app = require('../src/server');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('content endpoints', () => {
  it('serves every section from one /api/content call', async () => {
    const res = await request(app).get('/api/content');
    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['hero', 'capabilities', 'work', 'process', 'team', 'training', 'products', 'band', 'contact', 'footer'])
    );
  });

  it('keeps the per-section endpoints working', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('404s unknown sections instead of returning an empty object', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
  });

  it('footer contact has a phoneHref (was undefined before)', async () => {
    const res = await request(app).get('/api/footer');
    expect(res.body.footerContact.phoneHref).toBe('+919944880268');
  });

  it('exposes a health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.status).toBe('ok');
  });

  it('sets security headers and hides the framework', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });
});

describe('POST /api/user', () => {
  it.each([
    [{ ...validBody, name: '' }, 'Name is required.'],
    [{ ...validBody, email: '' }, 'Email is required.'],
    [{ ...validBody, email: 'not-an-email' }, 'Please enter a valid email address.'],
    [{ ...validBody, message: '' }, 'Message is required.'],
    [{ ...validBody, message: 'x'.repeat(4001) }, 'Message must be 4000 characters or fewer.'],
    [{ ...validBody, interest: 'hack' }, 'Please choose a valid enquiry type.'],
  ])('rejects invalid input %#', async (body, error) => {
    const res = await request(app).post('/api/user').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(error);
  });

  it('rejects malformed JSON with 400, not a stack trace', async () => {
    const res = await request(app).post('/api/user').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).not.toMatch(/at .*\.js/);
  });

  it('returns 503 (not a fake success) when the lead cannot be stored', async () => {
    vi.spyOn(db, 'saveContactSubmission').mockResolvedValue(null);
    const res = await request(app).post('/api/user').send(validBody);
    // Without a database in the test environment the real function also returns null.
    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/info@tnovasolutions\.com/);
  });

  it('silently drops honeypot submissions', async () => {
    const res = await request(app).post('/api/user').send({ ...validBody, website: 'http://spam.example' });
    expect(res.status).toBe(200);
  });

  it('does not echo submitted personal data back', async () => {
    const res = await request(app).post('/api/user').send({ ...validBody, website: 'x' });
    expect(JSON.stringify(res.body)).not.toContain('Jane');
  });
});
