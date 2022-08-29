const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const counterpartiesController = require('../controllers/counterpartiesController')

/* Records routes */
// router.get('/records/:id', recordsController.getOneRecord, (req, res) => {
//   res.status(200).json(res.locals.oneRecord);
// });

router.get('/records', recordsController.getAllRecords, (req, res) => {
  res.status(200).json(res.locals.allRecords);
});

router.post('/records/counterparty', recordsController.getCounterpartyRecords, (req, res) => {
  res.status(201).json(res.locals.counterpartyRecords)
})

router.post('/records', recordsController.postRecord, (req, res) => {
  res.status(200).end();
});

router.put('/records', recordsController.updateRecord, (req, res) => {
  res.status(200).end();
})

router.delete('/records', recordsController.deleteRecord, (req, res) => {
  res.status(200).end();
})

/* Counterparties routes */
router.get('/counterparties', counterpartiesController.getAllCounterparties, (req, res) => {
  res.status(200).json(res.locals.allCounterparties);
});

module.exports = router;