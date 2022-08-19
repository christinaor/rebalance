const db = require('../models/model');
const authorizeController = {};

authorizeController.checkUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    console.log('email: ', email)
    console.log('pass', pass)
    const params = [ email, pass ];
    const getQuery = `SELECT * FROM rebalance.login WHERE email=$1 AND pass=$2;`;
    const userInfo = await db.query(getQuery, params);
    res.locals.loginResults = {
      testProp: "testing this prop",
      loginSuccess: userInfo.rows.length > 0,
      user: (userInfo.rows.length > 0) ? userInfo.rows[0].username : null
    };
    console.log(userInfo)
    console.log('before user reassignment')
    // cannot assign this way for null - error comes up
    // res.locals.loginResults[0].user = (userInfo.rows.length > 0) ? userInfo.rows[0].username : null;
    // if (userInfo.rows.length > 0) res.locals.loginResults[0].user = userInfo.rows[0].username;
    console.log(res.locals.loginResults)
    next();
  } catch(err) {
    return next({
      log: `authorizeController.checkUser contains an error: ${err}`,
      message: {err: 'Error in authorizeController.checkUser. Check server logs for more details!'}
    })
  }
};

module.exports = authorizeController;