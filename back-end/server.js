

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/date', (req, res) => {
  res.send("April 8th");
})