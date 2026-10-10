import { createRequire } from 'node:module';

import request from 'supertest';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

const valid = {
  role: 'software-developer-trainee',
  name: 'Ravi Kumar',
  email: 'Ravi@Example.com',
  phone: '+91 98765 43210',
  profileUrl: 'https://github.com/ravi',
  message: 'I build full-stack projects and want to learn on live work.',
};

let app;

beforeAll(() => {
  process.env.CONTACT_RATE_LIMIT = '1000';
  process.env.ADMIN_TOKEN = 'test-admin-token-123';
  delete process.env.DATABASE_URL;
  delete process.env.POSTGRES_URL;
  require('../src/db');
  app = require('../src/server');
});

afterEach(() => vi.restoreAllMocks());

describe('careers content', () => {
  it('serves careers and faq sections', async () => {
    const content = (await request(app).get('/api/content')).body;
    expect(content.careers.openings.length).toBeGreaterThan(0);
    expect(content.faq.items.length).toBeGreaterThan(0);
  });
});

describe('POST /api/careers/apply', () => {
  it.each([
    [{ ...valid, name: '' }, 'Name is required.'],
    [{ ...valid, email: 'nope' }, 'Please enter a valid email address.'],
    [{ ...valid, message: '' }, 'Please tell us a little about yourself.'],
    [{ ...valid, role: 'ceo-of-everything' }, 'Please choose a valid role.'],
    [{ ...valid, phone: 'call me maybe' }, 'Please enter a valid phone number.'],
    [{ ...valid, profileUrl: 'javascript:alert(1)' }, 'Profile link must be a valid http(s) URL.'],
    [{ ...valid, profileUrl: 'github.com/ravi' }, 'Profile link must be a full URL such as https://github.com/you.'],
  ])('rejects invalid application %#', async (body, error) => {
    const res = await request(app).post('/api/careers/apply').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(error);
  });

  it('returns 503, never a fake success, when the application cannot be stored', async () => {
    const res = await request(app).post('/api/careers/apply').send({ ...valid, role: 'general' });
    // No database in tests -> honest 503, never a fake success.
    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/info@tnovasolutions\.com/);
  });

  it('drops honeypot submissions without storing', async () => {
    const res = await request(app).post('/api/careers/apply').send({ ...valid, website: 'spam' });
    expect(res.status).toBe(200);
  });
});

describe('GET /api/admin/submissions', () => {
  it('rejects missing and wrong tokens', async () => {
    expect((await request(app).get('/api/admin/submissions')).status).toBe(401);
    const wrong = await request(app).get('/api/admin/submissions').set('Authorization', 'Bearer nope');
    expect(wrong.status).toBe(401);
  });

  it('accepts the right token (503 here only because the test has no database)', async () => {
    const res = await request(app)
      .get('/api/admin/submissions?type=applications')
      .set('Authorization', 'Bearer test-admin-token-123');
    expect(res.status).toBe(503);
  });
});
