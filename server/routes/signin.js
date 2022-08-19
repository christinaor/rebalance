const express = require('express');
const router = express.Router();
const authorizeController = require('../controllers/authorizeController')

router.post('/signin', authorizeController.checkUser, (req, res) => {
  res.status(201).json(res.locals.loginResults)
})

module.exports = router;