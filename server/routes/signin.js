const express = require('express');
const router = express.Router();
const authorizeController = require('../controllers/authorizeController')

router.post('/signin', authorizeController.checkUser, (req, res) => {
  res.status(201).json(res.locals.loginResults)
})

router.post('/register', authorizeController.addUser, (req, res) => {
  res.status(201).json(res.locals.signupSuccess)
})

module.exports = router;