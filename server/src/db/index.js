const { Pool } = require('pg');

const data = require('./data');

const { Hero, Capabilities, Work, Process, Team, Band, Contact, User, Footer, Training, Products, Careers, Faq } = data;

// API section name -> default content (also the offline fallback when no database is configured).
const SECTIONS = {
    hero: Hero,
    capabilities: Capabilities,
    work: Work,
    process: Process,
    team: Team,
    training: Training,
    products: Products,
    careers: Careers,
    faq: Faq,
    band: Band,
    contact: Contact,
    footer: Footer,
};

const RETRY_COOLDOWN_MS = 30 * 1000;

let pool = null;
let databaseReady = false;
let initPromise = null;
let lastFailureAt = 0;

function getPostgresConfig() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
        return null;
    }

    const isLocal = /@(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(connectionString);
    const sslDisabled = process.env.PGSSLMODE === 'disable' || isLocal;

    return {
        connectionString,
        // Set PGSSL_STRICT=true once your provider's certificate chain is trusted to enforce full verification.
        ssl: sslDisabled ? false : { rejectUnauthorized: process.env.PGSSL_STRICT === 'true' },
        max: Number(process.env.PG_POOL_MAX) || 5,
        connectionTimeoutMillis: 8000,
        idleTimeoutMillis: 30000,
    };
}

function getPool() {
    if (!pool) {
        const config = getPostgresConfig();
        if (!config) {
            return null;
        }
        pool = new Pool(config);
        // An idle client erroring must not crash the process.
        pool.on('error', (error) => {
            databaseReady = false;
            console.error('PostgreSQL pool error:', error.message);
        });
    }

    return pool;
}

function getDatabaseStatus() {
    const config = getPostgresConfig();

    if (!config) {
        return { configured: false, ready: false, message: 'No DATABASE_URL or POSTGRES_URL configured.' };
    }

    return {
        configured: true,
        ready: databaseReady,
        message: databaseReady ? 'PostgreSQL connected.' : 'PostgreSQL not ready.',
    };
}

async function runInitialization(dbPool) {
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
            interest TEXT,
            received_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);
    await dbPool.query(`
        CREATE TABLE IF NOT EXISTS job_applications (
            id SERIAL PRIMARY KEY,
            role TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            profile_url TEXT,
            message TEXT NOT NULL,
            received_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);
    // Existing deployments created the table before "interest" existed.
    await dbPool.query('ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS interest TEXT');

    // Code is the source of truth for site copy by default, so edits to data.js actually reach production.
    // Set CONTENT_SYNC=false to treat the database as the editable source and only insert missing sections.
    const conflictAction = process.env.CONTENT_SYNC === 'false'
        ? 'DO NOTHING'
        : 'DO UPDATE SET data = EXCLUDED.data';

    const names = Object.keys(SECTIONS);
    const values = names.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2}::jsonb)`).join(', ');
    const params = names.flatMap((name) => [name, JSON.stringify(SECTIONS[name])]);

    await dbPool.query(
        `INSERT INTO content_sections (section, data) VALUES ${values} ON CONFLICT (section) ${conflictAction}`,
        params
    );
}

async function initializeDatabase() {
    const dbPool = getPool();

    if (!dbPool) {
        databaseReady = false;
        return false;
    }

    if (databaseReady) {
        return true;
    }

    // After a failure, don't hammer the database on every request.
    if (lastFailureAt && Date.now() - lastFailureAt < RETRY_COOLDOWN_MS) {
        return false;
    }

    // Concurrent requests share one initialization attempt.
    if (!initPromise) {
        initPromise = runInitialization(dbPool)
            .then(() => {
                databaseReady = true;
                lastFailureAt = 0;
                return true;
            })
            .catch((error) => {
                databaseReady = false;
                lastFailureAt = Date.now();
                console.error('PostgreSQL initialization failed:', error.message);
                return false;
            })
            .finally(() => {
                initPromise = null;
            });
    }

    return initPromise;
}

async function getSectionData(section) {
    const fallback = SECTIONS[section] || null;
    const dbPool = getPool();

    if (!dbPool || !(await initializeDatabase())) {
        return fallback;
    }

    try {
        const result = await dbPool.query('SELECT data FROM content_sections WHERE section = $1', [section]);
        return result.rows.length ? result.rows[0].data : fallback;
    } catch (error) {
        databaseReady = false;
        lastFailureAt = Date.now();
        console.error('PostgreSQL section fetch failed:', error.message);
        return fallback;
    }
}

// Every section in one round trip (the site used to make 8 separate requests on load).
async function getAllContent() {
    const dbPool = getPool();
    const content = { ...SECTIONS };

    if (!dbPool || !(await initializeDatabase())) {
        return content;
    }

    try {
        const result = await dbPool.query('SELECT section, data FROM content_sections');
        result.rows.forEach((row) => {
            if (row.section in SECTIONS) {
                content[row.section] = row.data;
            }
        });
    } catch (error) {
        databaseReady = false;
        lastFailureAt = Date.now();
        console.error('PostgreSQL content fetch failed:', error.message);
    }

    return content;
}

/**
 * Persists a contact submission.
 * Returns the stored row, or null when no database is configured / reachable.
 * Throws if the INSERT itself fails, so callers never report success for a lost lead.
 */
async function saveContactSubmission(submission) {
    const dbPool = getPool();

    if (!dbPool || !(await initializeDatabase())) {
        return null;
    }

    const result = await dbPool.query(
        `
            INSERT INTO contact_submissions (name, email, message, interest, received_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, received_at AS "receivedAt"
        `,
        [submission.name, submission.email, submission.message, submission.interest || null, submission.receivedAt]
    );

    return result.rows[0];
}

async function saveJobApplication(application) {
    const dbPool = getPool();

    if (!dbPool || !(await initializeDatabase())) {
        return null;
    }

    const result = await dbPool.query(
        `
            INSERT INTO job_applications (role, name, email, phone, profile_url, message, received_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, received_at AS "receivedAt"
        `,
        [
            application.role, application.name, application.email,
            application.phone || null, application.profileUrl || null, application.message, application.receivedAt,
        ]
    );

    return result.rows[0];
}

// Latest rows for the protected admin endpoint. Returns null when the database is unavailable.
async function listSubmissions(kind, limit = 200) {
    const dbPool = getPool();

    if (!dbPool || !(await initializeDatabase())) {
        return null;
    }

    const query = kind === 'applications'
        ? 'SELECT id, role, name, email, phone, profile_url AS "profileUrl", message, received_at AS "receivedAt" FROM job_applications ORDER BY id DESC LIMIT $1'
        : 'SELECT id, name, email, interest, message, received_at AS "receivedAt" FROM contact_submissions ORDER BY id DESC LIMIT $1';

    return (await dbPool.query(query, [limit])).rows;
}

module.exports = {
    ...data,
    SECTIONS,
    User,
    getPostgresConfig,
    getPool,
    getDatabaseStatus,
    initializeDatabase,
    getSectionData,
    getAllContent,
    saveContactSubmission,
    saveJobApplication,
    listSubmissions,
};
