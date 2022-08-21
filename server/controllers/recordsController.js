// const fs = require('fs/promises');
// const path = require('path')
const db = require('../models/model');
const recordsController = {};

recordsController.getAllRecords = async (req, res, next) => {
  try {
    const getQuery = `SELECT * FROM test_table;`;
    const allRecords = await db.query(getQuery);
    res.locals.allRecords = allRecords.rows;
    next();
  } catch(err) {
    return next({
      log: `recordsController.getAllRecords contains an error: ${err}`,
      message: {err: 'Error in recordsController.getAllRecords. Check server logs for more details!'}
    })
  }
};

recordsController.getOneRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = [ id ];
    const getOneQuery = `SELECT * FROM test_table WHERE id=$1;`;
    const oneRecord = await db.query(getOneQuery, params);
    res.locals.oneRecord = oneRecord.rows;
    next();
  } catch(err) {
    return next({
      log: `recordsController.getOneRecord contains an error: ${err}`,
      message: {err: 'Error in recordsController.getOneRecord. Check server logs for more details!'}
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

recordsController.updateRecord = async (req, res, next) => {
  try {
    const { id, item_name, item_cost } = req.body;
    const params = [ id, item_name, item_cost ];
    let updateQuery = `
      UPDATE test_table
      SET item_name=$2, item_cost=$3
      WHERE ID=$1
    `;
  const executeUpdate = await db.query(updateQuery, params);
  next();
  } catch(err) {
    return next({
      log: `recordsController.updateRecord contains an error: ${err}`,
      message: {err: 'Error in recordsController.updateRecord. Check server logs for more details!'}
    })
  }
};

recordsController.deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.body;
    const params = [ id ];
    const deleteQuery = `
      DELETE FROM test_table WHERE id=$1;
  `;
  const executeDelete = await db.query(deleteQuery, params);
  next();
  } catch(err) {
    return next({
      log: `recordsController.deleteRecord contains an error: ${err}`,
      message: {err: 'Error in recordsController.deleteRecord. Check server logs for more details!'}
    })
  }
};

module.exports = recordsController; 