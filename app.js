require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser'); // For parsing request bodies

const app = express();
const port = process.env.PORT || 3000; // Use Render's port or 3000 locally

// Database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });


app.use(bodyParser.json());



// GET all books
app.get('/api/books', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM books');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Debug
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server kinda important lol 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Do you read everything? Is life just a series of random events? Or is there a greater purpose?
//  Maybe we are all just Ais trying to figure out our own existence. Or maybe we are just a bunch of code trying to make sense of the world. Who knows?
