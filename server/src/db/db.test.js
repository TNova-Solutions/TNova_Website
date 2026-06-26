const assert = require('node:assert/strict');
const test = require('node:test');

const { getPostgresConfig, getSectionData } = require('./index');

test('returns null when no PostgreSQL connection string is configured', () => {
  delete process.env.DATABASE_URL;
  delete process.env.POSTGRES_URL;

  assert.equal(getPostgresConfig(), null);
});

test('returns the local content when no database connection exists', async () => {
  delete process.env.DATABASE_URL;
  delete process.env.POSTGRES_URL;

  const hero = await getSectionData('hero');

  assert.ok(hero);
  assert.equal(hero.content[0].head.title, 'We build software that');
});
