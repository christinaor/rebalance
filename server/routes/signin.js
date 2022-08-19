const express = require('express');
const router = express.Router();

router.get('/signin', authorizeController.checkUser, (req, res) => {
  res.status(200).json(res.locals)
})

module.exports = router;