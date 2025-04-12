const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all origins during development
app.use(express.json());

const journalEntries = {};

// Return boolean if key (date string) exists (GET - with query parameter)
app.get('/api/journal/exists', (req, res) => {
    const { date } = req.query;
    console.log('Received request to /api/journal/exists with date:', date);
    if (journalEntries[date]) {
        console.log('Entry found for date:', date);
        res.json({ exists: true });
    } else {
        console.log('No entry found for date:', date);
        res.json({ exists: false });
    }
});

// Get a specific journal entry by date (GET - with path parameter)
app.get('/api/journal/:date', (req, res) => {
    const { date } = req.params;
    console.log('Received request to /api/journal/:date with date:', date);
    if (journalEntries[date]) {
        console.log('Entry found for date:', date);
        res.json({ exists: true, entry: journalEntries[date] });
    } else {
        console.log('No entry found for date:', date);
        res.json({ exists: false });
    }
});

// Make a new journal entry (POST)
app.post('/api/journal', (req, res) => {
    const { date, description } = req.body;
    console.log('Received POST request to /api/journal with data:', { date, description });

    if (!date || !description) {
        return res.status(400).json({ error: 'Date and description are required.' });
    }

    if (journalEntries[date]) {
        return res.status(409).json({ error: `A journal entry already exists for ${date}.` });
    } else {
        journalEntries[date] = { date, description };
        console.log('Journal entry created:', journalEntries[date]);
        res.status(201).json({ message: 'Journal entry created successfully.', entry: journalEntries[date] });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});