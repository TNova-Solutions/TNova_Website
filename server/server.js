const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from other ports (like your React app)

app.use(cors()); 
app.use(express.json());


// Create a simple API route
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the Node.js Backend!" });
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});