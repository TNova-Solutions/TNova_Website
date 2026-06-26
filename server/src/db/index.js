const { Pool } = require('pg');

const { Hero, Capabilities, Work, Process, Team, Band, Contact, User, Footer } = require('./data');

let pool = null;
let databaseReady = false;
let databaseError = null;

function getPostgresConfig() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
        return null;
    }

    return {
        connectionString,
        ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
    };
}

function getPool() {
    if (!pool) {
        const config = getPostgresConfig();
        if (!config) {
            return null;
        }
        pool = new Pool(config);
    }

    return pool;
}

function getDatabaseStatus() {
    const config = getPostgresConfig();

    if (!config) {
        return {
            configured: false,
            ready: false,
            message: 'No DATABASE_URL or POSTGRES_URL configured.',
        };
    }

    return {
        configured: true,
        ready: databaseReady,
        error: databaseError,
        message: databaseReady ? 'PostgreSQL connected.' : 'PostgreSQL not ready.',
    };
}

async function initializeDatabase() {
    const dbPool = getPool();

    if (!dbPool) {
        databaseReady = false;
        databaseError = 'No DATABASE_URL or POSTGRES_URL configured.';
        return false;
    }

    try {
        await dbPool.query('SELECT NOW()');
        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS content_sections (
                section TEXT PRIMARY KEY,
                data JSONB NOT NULL
            )
        `);

        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                received_at TIMESTAMPTZ DEFAULT NOW()
            )
        `);

        await dbPool.query(`
            INSERT INTO content_sections (section, data)
            VALUES
                ('hero', $1),
                ('capabilities', $2),
                ('work', $3),
                ('process', $4),
                ('team', $5),
                ('band', $6),
                ('contact', $7),
                ('footer', $8)
            ON CONFLICT (section) DO NOTHING
        `, [
            JSON.stringify(Hero),
            JSON.stringify(Capabilities),
            JSON.stringify(Work),
            JSON.stringify(Process),
            JSON.stringify(Team),
            JSON.stringify(Band),
            JSON.stringify(Contact),
            JSON.stringify(Footer),
        ]);

        databaseReady = true;
        databaseError = null;
        return true;
    } catch (error) {
        databaseReady = false;
        databaseError = error.message;
        console.error('PostgreSQL initialization failed:', error.message);
        return false;
    }
}

async function getSectionData(section) {
    const fallbackData = {
        hero: Hero,
        capabilities: Capabilities,
        work: Work,
        process: Process,
        team: Team,
        band: Band,
        contact: Contact,
        footer: Footer,
    };

    const dbPool = getPool();

    if (!dbPool) {
        return fallbackData[section] || null;
    }

    if (!databaseReady) {
        await initializeDatabase();
    }

    if (!databaseReady) {
        return fallbackData[section] || null;
    }

    try {
        const result = await dbPool.query(
            'SELECT data FROM content_sections WHERE section = $1',
            [section]
        );

        if (result.rows.length === 0) {
            return fallbackData[section] || null;
        }

        return result.rows[0].data;
    } catch (error) {
        databaseReady = false;
        databaseError = error.message;
        console.error('PostgreSQL section fetch failed:', error.message);
        return fallbackData[section] || null;
    }
}

async function saveContactSubmission(submission) {
    const dbPool = getPool();

    if (!dbPool) {
        return null;
    }

    if (!databaseReady) {
        await initializeDatabase();
    }

    if (!databaseReady) {
        return null;
    }

    const result = await dbPool.query(
        `
            INSERT INTO contact_submissions (name, email, message, received_at)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, message, received_at AS "receivedAt"
        `,
        [submission.name, submission.email, submission.message, submission.receivedAt]
    );

    return result.rows[0];
}

module.exports = {
    Hero,
    Capabilities,
    Work,
    Process,
    Team,
    Band,
    Contact,
    User,
    Footer,
    getPostgresConfig,
    getPool,
    getDatabaseStatus,
    initializeDatabase,
    getSectionData,
    saveContactSubmission,
};
