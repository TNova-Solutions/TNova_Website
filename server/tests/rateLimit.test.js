import { createRequire } from 'node:module';

import request from 'supertest';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

describe('contact form abuse protection', () => {
  it('blocks a client after the allowed number of submissions', async () => {
    process.env.CONTACT_RATE_LIMIT = '2';
    delete process.env.DATABASE_URL;
    delete process.env.POSTGRES_URL;
    const app = require('../src/server');

    const body = { name: 'A', email: 'a@example.com', message: 'hi' };
    const statuses = [];
    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      statuses.push((await request(app).post('/api/user').send(body)).status);
    }

    expect(statuses.slice(0, 2)).not.toContain(429);
    expect(statuses.slice(2)).toEqual([429, 429]);
  });
});
