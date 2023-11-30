// apiRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("./db");

router.get("/tables", (req, res) => {
  pool.query("SHOW tables", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database");
    } else {
      res.json(results);
    }
  });
});

router.get("/tableAttributes/:table", (req, res) => {
  const table = req.params.table;
  const query = `SHOW COLUMNS FROM ${pool.escapeId(table)}`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database");
    } else {
      res.json(results);
    }
  });
});

router.get("/country", (req, res) => {
  pool.query("SELECT CountryName FROM Country", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database");
    } else {
      res.json(results);
    }
  });
});

router.get("/coach/:country", (req, res) => {
  const country = req.params.country;

  pool.query(
    "SELECT CoachID, FirstName, LastName FROM Coach WHERE CountryName = ?",
    [country],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data from the database");
      } else {
        res.json(results);
      }
    }
  );
});

//group medalists by country and medal
router.get("/medalCount/:MedalType", (req, res) => {
  const medalType = req.params.MedalType;

  if (!medalType) {
    return res.status(400).send("MedalType header is missing");
  }

  const query = `
    SELECT CountryName, count(a.PlayerId)
    FROM Athlete a, Medalist m
    WHERE MedalType = ? AND m.PlayerID = a.PlayerID
    GROUP BY CountryName
    ORDER BY count(a.PlayerID) DESC
  `;

  pool.query(query, [medalType], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database");
    } else {
      res.json(results);
    }
  });
});

//nested age agg
router.get("/ageQuery", (req, res) => {
  const query = `
    SELECT CountryName, min(a1.Age)
    FROM Athlete a1
    GROUP BY CountryName
    HAVING AVG(a1.Age) < (SELECT AVG(a2.Age)
                    FROM Athlete a2)
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database");
    } else {
      res.json(results);
    }
  });
});

router.get("/medalists", (req, res) => {
  pool.query(
    "SELECT *  FROM Medalist m, Athlete a WHERE a.PlayerID = m.PlayerID;",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data from the database");
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/athletes", (req, res) => {
  pool.query(
    "SELECT PlayerID, FirstName, LastName FROM Athlete",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data from the database");
      } else {
        res.json(results);
      }
    }
  );
});

// insert athlete
router.post("/insertAthlete", (req, res) => {
  const { FirstName, LastName, Age, Gender, CountryName, CoachID } = req.body;

  // Generate a random number between 50 and 100 for PlayerID (to avoid duplication hopefully)
  const PlayerID = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  const query = `
      INSERT INTO Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  pool.query(
    query,
    [PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error inserting data into the database" });
      } else {
        res.json({ message: "Athlete inserted successfully", data: results });
      }
    }
  );
});

// update athlete
router.post("/updateAthlete", (req, res) => {
  const { Age, CoachID, CountryName, PlayerID } = req.body;

  const query = `UPDATE Athlete SET Age = ?, CoachID = ?, CountryName = ? WHERE PlayerID = ?;`;

  pool.query(query, [Age, CoachID, CountryName, PlayerID], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating data in the database" });
    } else {
      res.json({ message: "Athlete updated successfully", data: results });
    }
  });
});

// update athlete
router.post("/deleteAthlete", (req, res) => {
  const { PlayerID } = req.body;

  const query = `DELETE FROM Athlete WHERE PlayerID = ?`;

  pool.query(query, [PlayerID], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting Athlete in the database" });
    } else {
      res.json({ message: "Athlete deleted successfully", data: results });
    }
  });
});

//join
router.post('/joinMedalists', (req, res) => {
  const { medalType, selectedAttributes } = req.body;
  console.log(selectedAttributes)

  if (!selectedAttributes || !Array.isArray(selectedAttributes)) {
    return res.status(400).json({ error: 'Invalid or missing parameters in the request body' });
  }

  const selectClause = selectedAttributes.join(', ');

  const query = `
    SELECT ${selectClause}
    FROM Medalist m, Athlete a
    WHERE a.PlayerID = m.PlayerID AND MedalType = ?`;

  pool.query(query, [medalType], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else {
      res.json(results);
    }
  });
});



router.post('/fetchData', (req, res) => {
  const { selectedRelation, selectedAttributes } = req.body;
  console.log(selectedAttributes)

  if (!selectedRelation || !selectedAttributes || !Array.isArray(selectedAttributes)) {
    return res.status(400).json({ error: 'Invalid or missing parameters in the request body' });
  }

  // Create the SELECT clause based on the selected attributes
  const selectClause = selectedAttributes.join(', ');

  // Construct the query
  const query = `
    SELECT ${selectClause}
    FROM ${selectedRelation}
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else {
      res.json(results);
    }
  });
});

router.post('/fetchByFilter', (req, res) => {
  const { selectedRelation, selectedAttributes, selectedFilter } = req.body;

  if (!selectedFilter || !selectedRelation || !selectedAttributes || !Array.isArray(selectedAttributes)) {
    return res.status(400).json({ error: 'Invalid or missing parameters in the request body' });
  }

  // Create the SELECT clause based on the selected attributes
  const selectClause = selectedAttributes.join(', ');

  // Create the WHERE clause with multiple OR conditions
  const whereClause = selectedFilter.map(() => 'CountryName = ?').join(' OR ');

  // Construct the query dynamically
  const query = `
    SELECT ${selectClause}
    FROM ${selectedRelation}
    WHERE ${whereClause}
  `;

  pool.query(query, selectedFilter, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;