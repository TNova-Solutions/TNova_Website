// server.js
const cors = require('cors');
const express = require('express');

// 1. Import both objects from your data.js file
const { Hero, Capabilities, Work, Process, Team, Band, Contact, Footer } = require('./data.js');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// API ENDPOINT 1: The Hero Data
// ==========================================
app.get('/api/hero', (req, res) => {
    // Sends only the Hero object
    res.json(Hero);
});

// ==========================================
// API ENDPOINT 2: The Capabilities Data
// ==========================================
app.get('/api/capabilities', (req, res) => {
    // Sends only the capabilities object
    res.json(Capabilities);
});

// ==========================================
// API ENDPOINT 3: The Work Data
// ==========================================
app.get('/api/work', (req, res) => {
    // Sends only the work object
    res.json(Work);
});

// ==========================================
// API ENDPOINT 4: The Process Data
// ==========================================
app.get('/api/process', (req, res) => {
    // Sends only the process object
    res.json(Process);
});

// ==========================================
// API ENDPOINT 5: The Team Data
// ==========================================
app.get('/api/team', (req, res) => {
    // Sends only the team object
    res.json(Team);
});

// ==========================================
// API ENDPOINT 6: The Band Data
// ==========================================
app.get('/api/band', (req, res) => {
    // Sends only the band object
    res.json(Band);
});

// ==========================================
// API ENDPOINT 6: The Contact Data
// ==========================================
app.get('/api/contact', (req, res) => {
    // Sends only the contact object
    res.json(Contact);
});

// ==========================================
// API ENDPOINT 6: The Footer Data
// ==========================================
app.get('/api/footer', (req, res) => {
    // Sends only the footer object
    res.json(Footer);
});

// Only listen locally. In production, Vercel handles this.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

// CRITICAL: Export the app
module.exports = app;