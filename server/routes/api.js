const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

router.get('/records', recordsController.getAllRecords, (req, res) => {
  res.status(200).json(res.locals.allRecords);
});

router.post('/records', recordsController.postRecord, (req, res) => {
  res.status(200).end();
});

router.delete('/records', recordsController.deleteRecord, (req, res) => {
  res.status(200).end();
})

module.exports = router;