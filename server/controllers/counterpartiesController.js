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

counterpartiesController.addCounterparty = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const params = [name, email];
    
    const postQuery = `
      INSERT INTO ${process.env.SCHEMA}.counterparties (counterparty_name, email)
      VALUES ($1, $2)
      RETURNING id
    `;
    const executePost = await db.query(postQuery, params);
    res.locals.isAdded = executePost.rows[0].id;
    next();
  } catch(err) {
    return next({
      log: `counterpartiesController.addCounterparty contains an error: ${err}`,
      message: {err: 'Error in counterpartiesController.addCounterparty. Check server logs for more details!'}
    })
  }
};

module.exports = counterpartiesController;