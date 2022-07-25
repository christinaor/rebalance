const { Pool } = require('pg');

// URL to Balance database
const PG_URI = 'postgres://cwqopsrt:95HQ1epQZnfCYKz462Y0kox0XuqSIJ0L@isilo.db.elephantsql.com/cwqopsrt'

// uses environment variables or URI
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  // user: 'postgres',
  // password: 'soloproject',
  // host: 'localhost',
  // port: 5432,
  // database: 'balance',
  // max: 12
  connectionString: PG_URI
});

// Exports query property
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback) //access point to db
  }
}