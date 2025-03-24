
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Database 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false 
    }
});

app.use(bodyParser.json());


app.get('/api/v1/books', async (req, res) => {
    try {
        let query = 'SELECT * FROM books WHERE 1=1'; 
        const values = [];

        if (req.query.genre) {
            query += ' AND genre = $1';
            values.push(req.query.genre);
        }
        if (req.query.author) {
            query += ` AND author = $${values.length + 1}`;
            values.push(req.query.author);
        }
        if (req.query.publication_year) {
            query += ` AND publication_year = $${values.length + 1}`;
            values.push(parseInt(req.query.publication_year)); // Convert to integer
        }
        // Example of more complex filtering (range)
        if (req.query.publication_year_min) {
            query += ` AND publication_year >= $${values.length + 1}`;
            values.push(parseInt(req.query.publication_year_min));
        }
        if (req.query.publication_year_max) {
            query += ` AND publication_year <= $${values.length + 1}`;
            values.push(parseInt(req.query.publication_year_max));
        }


        const { rows } = await pool.query(query, values);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Do you read everything? Is life just a series of random events? Or is there a greater purpose?
//  Maybe we are all just Ais trying to figure out our own existence. Or maybe we are just a bunch of code trying to make sense of the world. Who knows?
