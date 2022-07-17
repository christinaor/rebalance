const { json } = require('express');
const db = require('./model.js')


const controller = {};

// find all records (READ)
controller.searchAllEntries = (req, res, next) => {
  const text = `SELECT * FROM purchases`;
  db.query(text)
    .then(data => {
      res.locals.allEntries = data.rows;
      console.log(data.rows)
      // res.locals.entries = 'test';
      return next();
    })
    .catch(err => {
      return next({
        log: `controller.searchAllEntries: ERROR: ${err}`,
        message: {err: 'Error occurred in controller.searchAllEntries. Check server logs for more details.'}
      })
    })
};

// add a record to db (CREATE)
controller.addEntry = async (req, res, next) => {
  try {
    const { name, purchase_date, item_name, cost } = req.body;
    const params = [ name, purchase_date, item_name, cost ];    
    const text = `
      INSERT INTO purchases (name, purchase_date, item_name, cost)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;
    const result = await db.query(text, params);
    res.locals.added = result.rows[0];
    next();
  } catch(err) {
    return next({
      log: `controller.addEntry: ERROR: ${err}`,
      message: {err: 'Error occurred in controller.addEntry. Check server logs for more details.'}
    })
  }
};

// find a specific record (READ)
controller.searchEntry = (req, res, next) => {
  const { id } = req.params;
  const params = [ id ];
  // console.log(req.params)
  
  // search if id exists
  const text = `SELECT * FROM purchases where id = $1`;
  db.query(text, params)
    .then(data => {
      if (data.rows.length > 0) {
        res.locals.foundEntry = data.rows;
        return next(); // fix error handling here ***********
      } else {
        return next({
          log: `ID does not exist - no records found.`,
          message: {err: 'Error occurred in controller.searchEntry where ID does not exist.'}
      })}
    })
    // .then(data => {
    //   res.locals.foundEntry = data.rows;
    //   next();
    // })
    .catch(err => {
      return next({
        log: `controller.searchEntry: ERROR: ${err}`,
        message: {err: 'Error occurred in controller.searchEntry. Check server logs for more details.'}        
      })
    })
};

// update a specific record (UPDATE)
controller.updateData = (req, res, next) => {
  // const { id, name, input_date, purchase_date, item_name, cost, category, notes } = req.body;
  // const params = [ id, name, input_date, purchase_date, item_name, cost, category, notes ];
  const { id } = req.params;
  const params = [ id ];
  const text = `
    UPDATE purchases
    SET name = 'CO'
    WHERE ID = $1
  `;
  db.query(text, params)
    .then(() => {
      res.locals.updateStatus = true;
      next();
    })
    .catch(err => {
      return next({
        log: `controller.updateEntry: ERROR: ${err}`,
        message: {err: 'Error occurred in controller.updateData. Check server logs for more details.'}
      })
    })
};

// delete a specific record (DELETE)
controller.deleteEntry = (req, res, next) => {
  const { id } = req.params;
  const params = [ id ];

  // check if id exists
  const checkText = `SELECT * FROM purchases WHERE id = $1`
  db.query(checkText, params)
    .then(data => {
      if (!data.rows[0]) return next({
        log: `controller.deleteEntry: ERROR: no id found`,
        message: {err: 'controller.deleteEntry stopped running due to no id found. Check server logs for more details.'}
      })
    })
    .catch(err => {
      return ({
        log: `controller.deleteEntry: ERROR when checking id: ${err}`,
        message: {err: 'Error occurred in controller.deleteEntry while checking id. Check server logs for more details.'}  
      })
    });
  
  // delete if id exists
  const deleteText = `
    DELETE FROM purchases WHERE id = $1
  `
  db.query(deleteText, params)
    .then(() => {
      res.locals.deleteStatus = true;
      next();
    })
    .catch(err => {
      return next({
        log: `controller.deleteEntry: ERROR: ${err}`,
        message: {err: 'Error occurred in controller.deleteEntry. Check server logs for more details.'}        
      })
    })
};

module.exports = controller;