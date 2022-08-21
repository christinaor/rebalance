const db = require('../models/model');
const authorizeController = {};

authorizeController.checkUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const params = [ email, pass ];
    const getQuery = `SELECT * FROM rebalance.login WHERE email=$1 AND pass=$2;`;
    const userInfo = await db.query(getQuery, params);
    res.locals.loginResults = {
      loginSuccess: userInfo.rows.length > 0,
      user: (userInfo.rows.length > 0) ? userInfo.rows[0].username : null
    };
    next();
  } catch(err) {
    return next({
      log: `authorizeController.checkUser contains an error: ${err}`,
      message: {err: 'Error in authorizeController.checkUser. Check server logs for more details!'}
    })
  }
};

authorizeController.addUser = async (req, res, next) => {
  try {
    const { username, email, pass } = req.body;
    const params = [ username, email, pass ];
    const params1 = [username]
    console.log('creds: ', username, email, pass)

    // const getQuery = `SELECT * FROM rebalance.login WHERE username=$1`;
    // const userInfo = await db.query(getQuery, params1);

    // res.locals.signupSuccess = true;

    // check if email already has an account

    const checkEmailQuery = `SELECT EXISTS(SELECT * FROM rebalance.login WHERE username=$1 AND email=$2 AND pass=$3);
    `
  // //   SELECT CASE WHEN EXISTS(SELECT true FROM rebalance.login WHERE email=$2)
  // //   THEN 'true'
  // //   else 'false'
  // // end
  //   // SELECT EXISTS(SELECT true FROM rebalance.login WHERE email=$2);
  //     // SELECT * FROM rebalance.login WHERE id=$2;
    console.log('checking if email exists')
    const emailExists = await db.query(checkEmailQuery, params);
    console.log('emailExists should be boolean: ', emailExists)
    if (emailExists) {
      console.log('email already exists')
      res.locals.signupSuccess = false;
    } else {
      console.log('email does not exist yet')
      res.locals.signupSuccess = true;
      const postQuery = `
        INSERT INTO rebalance.login (username, email, pass)
        VALUES ($1, $2, $3);
      `
      const executePost = await db.query(postQuery, params);
    }
    next();
  } catch(err) {
    return next({
      log: `authorizeController.addUser contains an error: ${err}`,
      message: {err: 'Error in authorizeController.addUser. Check server logs for more details!'}
    })
  }
}


module.exports = authorizeController;