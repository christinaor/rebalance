const db = require('../models/model');
const authorizeController = {};

authorizeController.checkUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const params = [ email, pass ];
    const getQuery = `SELECT * FROM rebalance.login WHERE email=$1 AND pass=$2;`;
    const userInfo = await db.query(getQuery);
    res.locals.loginSuccess = (userInfo.rows.length > 0);
    next();
  } catch(err) {
    return next({
      log: `authorizeController.checkUser contains an error: ${err}`,
      message: {err: 'Error in authorizeController.checkUser. Check server logs for more details!'}
    })
  }
}

module.exports = authorizeController;