const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS (for frontend access)
app.use(cors());

// Sample match data (you can connect to a real DB later)
const matches = [
  { id: 1, home: 'India', away: 'Australia', date: '2025-06-01T15:30:00Z' },
  { id: 2, home: 'Pakistan', away: 'England', date: '2025-06-03T12:00:00Z' },
  { id: 3, home: 'New Zealand', away: 'South Africa', date: '2025-06-05T18:00:00Z' },
];

// Define a GET endpoint for matches
app.get('/api/matches', (req, res) => {
  res.json(matches);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
