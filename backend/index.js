// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./apiRoutes');
const pool = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});