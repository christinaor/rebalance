// const fs = require('fs/promises');
// const path = require('path')
const db = require('../models/model');
const recordsController = {};

recordsController.getAllRecords = async (req, res, next) => {
  try {
    const getQuery = `SELECT * FROM rebalance.records;`;
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

recordsController.getCounterpartyRecords = async (req, res, next) => {
  try {
    const { counterparty } = req.body;
    const params = [ counterparty ];
    const getCounterpartyQuery = `SELECT * FROM rebalance.records WHERE counterparty_username=$1`
    const records = await db.query(getCounterpartyQuery, params);
    res.locals.counterpartyRecords = records.rows;
    next();
  } catch(err) {
    return next({
      log: `recordsController.getCounterpartyRecords contains an error: ${err}`,
      message: {err: 'Error in recordsController.getCounterpartyRecords. Check server logs for more details!'}
    })
  }
}

recordsController.getOneRecordToUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = [ id ];
    const getOneQuery = `SELECT * FROM rebalance.records WHERE id=$1;`;
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


// recordsController.getOneRecord = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const params = [ id ];
//     const getOneQuery = `SELECT * FROM test_table WHERE id=$1;`;
//     const oneRecord = await db.query(getOneQuery, params);
//     res.locals.oneRecord = oneRecord.rows;
//     next();
//   } catch(err) {
//     return next({
//       log: `recordsController.getOneRecord contains an error: ${err}`,
//       message: {err: 'Error in recordsController.getOneRecord. Check server logs for more details!'}
//     })
//   }
// };

recordsController.postRecord = async (req, res, next) => {
  try {
    const { username, counterparty, item, cost, split, percentage } = req.body;
    const params = [ username, counterparty, item, cost, split, percentage ];
    console.log('this is split: ',split)
    // split = 1
    // console.log(split)
    const postQuery = `
      INSERT INTO rebalance.records (username, counterparty_username, item_name, item_cost, user_split, user_perc)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const executePost = await db.query(postQuery, params);
    res.locals.id = executePost.rows[0].id;
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
    const { id, item_name, item_cost, perc_split } = req.body;

    const user_split = item_cost * perc_split / 100;
    // const counterparty_split = item_cost - user_split;
    
    // calculating new splits based on updated percentage
    const params = [ id, item_name, item_cost, perc_split, user_split ];

    let updateQuery = `
      UPDATE rebalance.records
      SET item_name=$2, item_cost=$3, user_perc=$4, user_split=$5
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
      DELETE FROM rebalance.records WHERE id=$1;
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