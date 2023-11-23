// apiRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/data', (req, res) => {
  pool.query('SELECT * FROM Coach', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

router.get('/country', (req, res) => {
  pool.query('SELECT CountryName FROM Country', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

router.get('/coach/:country', (req, res) => {
  const country = req.params.country;

  pool.query('SELECT CoachID, FirstName, LastName FROM Coach WHERE CountryName = ?', [country], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

router.post('/insertAthlete', (req, res) => {
    console.log(req.body)
    const { FirstName, LastName, Age, Gender, CountryName, CoachID } = req.body;
    console.log(req.body)
  
    // Generate a random number between 50 and 100 for PlayerID (to avoid duplication hopefully)
    const PlayerID = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  
    const query = `
      INSERT INTO Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    pool.query(query, [PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error inserting data into the database' });
      } else {
        res.json({ message: 'Athlete inserted successfully', data: results });
      }
    });
  });

module.exports = router;