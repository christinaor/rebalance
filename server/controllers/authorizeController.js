const crypto = require('crypto');
require('dotenv').config();
const db = require('../models/model');
const authorizeController = {};

authorizeController.checkUser = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const params = [ email, pass ];

    const getQuery = `SELECT * FROM ${process.env.SCHEMA}.users WHERE email=$1 AND pass=$2;`;
    const userInfo = await db.query(getQuery, params);

    const userExists = userInfo.rows.length > 0;
    let checkSaltedPass = null;
    let hashOnly = null;
    let checkHashedPass = null;
    
    if (userExists) {
      checkSaltedPass = pass + userInfo.rows[0].salt;
      hashOnly = crypto.createHash('sha512');
      checkHashedPass = hashOnly.update(checkSaltedPass).digest('hex');
    }

    res.locals.loginResults = {
      loginSuccess: userExists && (checkHashedPass === userInfo.rows[0].hash),
      user: userExists && (checkHashedPass === userInfo.rows[0].hash) ? userInfo.rows[0].username : null,
    };
    console.log(res.locals.loginResults)
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
    
    const generateSalt = () => {
      return crypto.randomBytes(32).toString('hex');
    }

    const saltOnly = generateSalt();
    
    const hashOnly = crypto.createHash('sha512');
    const saltedPass = pass + saltOnly;
    const hashedPass = hashOnly.update(saltedPass).digest('hex');

    const params = [ username, email, pass, hashedPass, saltOnly ];
    
    // Check if email already exists
    // TODO - if pass forgotten, then reset pass
    const checkEmailQuery = `SELECT EXISTS(SELECT * FROM ${process.env.SCHEMA}.users WHERE username=$1 AND email=$2 AND pass=$3 AND hash=$4 AND salt=$5);
    `
    const emailExists = await db.query(checkEmailQuery, params);
    if (emailExists.rows[0].exists) {
      console.log('true in exists', emailExists.rows[0].exists)
      res.locals.signupSuccess = false;
    } else {
      console.log('false does not exist', emailExists.rows[0].exists)
      res.locals.signupSuccess = true;
      const postQuery = `
        INSERT INTO ${process.env.SCHEMA}.users (username, email, pass, hash, salt)
        VALUES ($1, $2, $3, $4, $5);
      `
      const executePost = await db.query(postQuery, params);
      console.log(params)
      console.log(executePost)
    }
    console.log(res.locals.signupSuccess)
    next();
  } catch(err) {
    return next({
      log: `authorizeController.addUser contains an error: ${err}`,
      message: {err: 'Error in authorizeController.addUser. Check server logs for more details!'}
    })
  }
}


module.exports = authorizeController;