// server.js
const express = require('express');
const cors = require('cors');

// 1. Import both objects from your data.js file
const { Hero, Capabilities, Work, Process } = require('./data.js');

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


// Only listen locally. In production, Vercel handles this.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

// CRITICAL: Export the app
module.exports = app;