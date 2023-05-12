require('dotenv').config()
const db = require('../models/model');
const counterpartiesController = {};

counterpartiesController.getAllCounterparties = async (req, res, next) => {
  try {
    const getQuery = `SELECT * FROM ${process.env.SCHEMA}.counterparties;`;
    const allCounterparties = await db.query(getQuery);
    res.locals.allCounterparties = allCounterparties.rows;
    next();
  } catch(err) {
    return next({
      log: `counterpartiesController.getAllCounterparties contains an error: ${err}`,
      message: {err: 'Error in counterpartiesController.getAllCounterparties. Check server logs for more details!'}
    })
  }
};

module.exports = counterpartiesController;