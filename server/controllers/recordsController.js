// const fs = require('fs/promises');
// const path = require('path')
const db = require('../models/model');
const recordsController = {};

recordsController.getAllRecords = async (req, res, next) => {
  try {
    const getQuery = `SELECT * FROM test_table;`;
    const allRecords = await db.query(getQuery);
    // console.log('getting all records: ', allRecords)
    res.locals.allRecords = allRecords.rows;
    next();
  } catch(err) {
    return next({
      log: `recordsController.getAllRecords contains an error: ${err}`,
      message: {err: 'Error in recordsController.getAllRecords. Check server logs for more details!'}
    })
  }
};

recordsController.postRecord = async (req, res, next) => {
  try {
    const { username, item_name, item_cost } = req.body;
    const params = [ username, item_name, item_cost ];
    const postQuery = `
      INSERT INTO test_table (username, item_name, item_cost)
      VALUES ($1, $2, $3);
      `;
    const executePost = await db.query(postQuery, params);
    next();
  } catch(err) {
    return next({
      log: `recordsController.postRecord contains an error: ${err}`,
      message: {err: 'Error in recordsController.postRecord. Check server logs for more details!'}
    })
  }
};

module.exports = recordsController; 