const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'olympicsdb.coyjom3wwb7a.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Vancouver2010',
  database: 'olympics',
  port: 3306
});

module.exports = pool;