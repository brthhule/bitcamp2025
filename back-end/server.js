const express = require('express');
const cors = require('cors');
const app = express();
const qs = require('querystring');
const axios = require('axios')

const port = 3000;

app.use(cors()); // Enable CORS for all origins during development
app.use(express.json());

const journalEntries = {};

// Return boolean if key (date string) exists (GET - with query parameter)
app.post('/api/exists', (req, res) => {
    console.log("Req:---------------------------------")
    console.log(req.params)
    const  date = req.body.date;
    console.log('Received request to /api/journal/exists with date:', date);
    if (journalEntries[date]) {
        console.log('Entry found for date:', date);
        res.json({ exists: true });
    } else {
        console.log('No entry found for date:', date);
        console.log(journalEntries)
        res.json({ exists: false });
    }
});

// Get a specific journal entry by date (GET - with path parameter)
app.post('/api/getEntry', (req, res) => {
    const  date = req.body.date;
    console.log('Received request to /api/journal/:date with date:', date);
    if (journalEntries[date]) {
        console.log('Entry found for date:', date);
        res.json({entry: journalEntries[date] });
    } else {
        console.error("Entry does not exist")
    }
});

// Make a new journal entry (POST)
app.post('/api/journal', (req, res) => {
    const date = req.body.date;
    const description = req.body.description;

    console.log("Date:")
    console.log(date);
    console.log("Description: ")
    console.log(description)

    console.log('Received POST request to /api/journal with data:', { date, description });

    if (!date || !description) {
        return res.status(400).json({ error: 'Date and description are required.' });
    }

    if (journalEntries[date]) {
        return res.status(409).json({ error: `A journal entry already exists for ${date}.` });
    } else {
        journalEntries[date] = { description };
        console.log('Journal entry created:', journalEntries[date]);
        res.status(201).json({ message: 'Journal entry created successfully.', entry: journalEntries[date] });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});




app.post('/analyze', async (req, res) => {
    const { text, date } = req.body;
    console.log("In /analyze")
    console.log("Text:")
    console.log(text)
  
    try {
      const response = await axios.post(
        'http://localhost:8000',
        qs.stringify({ text, date }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          responseType: 'arraybuffer', // for binary image
        }
      );
  
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from(response.data, 'binary'));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error processing sentiment/image');
    }
  });
  