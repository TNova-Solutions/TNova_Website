import { createRequire } from 'node:module';

import request from 'supertest';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

describe('admin endpoint without ADMIN_TOKEN', () => {
  it('is disabled (404) so it cannot be probed', async () => {
    delete process.env.ADMIN_TOKEN;
    const app = require('../src/server');
    const res = await request(app).get('/api/admin/submissions').set('Authorization', 'Bearer anything');
    expect(res.status).toBe(404);
  });
});
