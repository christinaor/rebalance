const { Pool } = require('pg');

// URL to Balance database
// const PG_URI = 'postgres://npzbapmh:LTvxCql4fXPYr6XzFm0oRzlimnj7Cl-O@queenie.db.elephantsql.com/npzbapmh'

const pool = new Pool({
  user: 'postgres',
  password: 'soloproject',
  host: 'localhost',
  port: 5432,
  database: 'balance',
  max: 12
  // connectionString: PG_URI,

});

// Exports query property
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback) //access point to db
  }
}