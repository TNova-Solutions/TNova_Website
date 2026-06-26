// server.js
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

// Import the simple database helpers from the database module
const { User, initializeDatabase, saveContactSubmission, getDatabaseStatus, getSectionData } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// API ENDPOINT 1: The Hero Data
// ==========================================
app.get('/api/hero', async (req, res) => {
    const hero = await getSectionData('hero');
    res.json(hero || {});
});

// ==========================================
// API ENDPOINT 2: The Capabilities Data
// ==========================================
app.get('/api/capabilities', async (req, res) => {
    const capabilities = await getSectionData('capabilities');
    res.json(capabilities || {});
});

// ==========================================
// API ENDPOINT 3: The Work Data
// ==========================================
app.get('/api/work', async (req, res) => {
    const work = await getSectionData('work');
    res.json(work || {});
});

// ==========================================
// API ENDPOINT 4: The Process Data
// ==========================================
app.get('/api/process', async (req, res) => {
    const process = await getSectionData('process');
    res.json(process || {});
});

// ==========================================
// API ENDPOINT 5: The Team Data
// ==========================================
app.get('/api/team', async (req, res) => {
    const team = await getSectionData('team');
    res.json(team || {});
});

// ==========================================
// API ENDPOINT 6: The Band Data
// ==========================================
app.get('/api/band', async (req, res) => {
    const band = await getSectionData('band');
    res.json(band || {});
});

// ==========================================
// API ENDPOINT 6: The Contact Data
// ==========================================
app.get('/api/contact', async (req, res) => {
    const contact = await getSectionData('contact');
    res.json(contact || {});
});

// ==========================================
// API ENDPOINT 6: The Footer Data
// ==========================================
app.get('/api/footer', async (req, res) => {
    const footer = await getSectionData('footer');
    res.json(footer || {});
});

//================================================================================================================
// POST API CALL FOR CONTACT FORM   
//================================================================================================================
app.post('/api/user', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    const submission = {
        name,
        email,
        message,
        receivedAt: new Date().toISOString(),
    };

    User.submissions.push(submission);

    const storedSubmission = await saveContactSubmission(submission);

    res.status(200).json({
        message: 'Thanks for your message..!!',
        success: 'Your submission has been received successfully.',
        submitMsg: User.submitMsg,
        data: submission,
        storedInDatabase: Boolean(storedSubmission),
        database: getDatabaseStatus(),
    });
});

initializeDatabase()
    .then((ready) => {
        if (!ready) {
            console.log('PostgreSQL is not connected. Set DATABASE_URL or POSTGRES_URL to enable persistence.');
        }
    })
    .catch(() => {});

// Only listen locally. In production, Vercel handles this.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

// CRITICAL: Export the app
module.exports = app;