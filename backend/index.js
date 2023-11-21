const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001; // You can choose any available port

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'olympicsdb.coyjom3wwb7a.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Vancouver2010',
  database: 'olympics',
  port: 3306
});

// Check if the MySQL connection is successful
pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database!');
      connection.release();
    }
  });

// Example API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM Coach', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

// Insert new queries here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});