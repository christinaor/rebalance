const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

router.get('/records', recordsController.getAllRecords, (req, res) => {
  res.status(200).json(res.locals.allRecords);
});

module.exports = router;