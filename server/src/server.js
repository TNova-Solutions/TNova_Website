// server.js
const express = require('express');
const cors = require('cors');

// 1. Import both objects from your data.js file
const { Hero, capabilities } = require('./data.js'); 

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
    res.json(capabilities); 
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});