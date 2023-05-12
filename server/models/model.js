const { Pool } = require('pg');

require('dotenv').config()

const PG_URI = process.env.PG_DB_URI;

const pool = new Pool({
  connectionString: PG_URI
});

// Exports query property
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback) //access point to db
  }
}