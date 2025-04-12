const express = require('express');
const app = express();
const port = 5173; // Typically, frontend runs on a different port (e.g., 3000 for backend)

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// In-memory data storage (for now)
const journalEntries = {};

// Return an entry if it exists (GET)
app.get('/api/journal/:date', (req, res) => {
    const date = req.params.date;
    if (journalEntries[date]) {
        res.json({ exists: true, entry: journalEntries[date] });
    } else {
        res.json({ exists: false });
    }
});

// Make a new journal entry (POST)
app.post('/api/journal', (req, res) => {
    const { date, title, description } = req.body; // Assuming this is what the frontend sends

    if (!date || !title || !description) {
        return res.status(400).json({ error: 'Date, title, and description are required.' });
    }

    if (journalEntries[date]) {
        return res.status(409).json({ error: `A journal entry already exists for ${date}.` }); // Conflict
    } else {
        journalEntries[date] = { title, description, date };
        res.status(201).json({ message: 'Journal entry created successfully.', entry: journalEntries[date] }); // Created
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});