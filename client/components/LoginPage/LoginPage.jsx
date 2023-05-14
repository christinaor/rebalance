/**
 * ************************************
 *
 * @module  LoginPage
 * @author
 * @date
 * @description 
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import { Paper, Button, Box, TextField, Typography } from '@mui/material';

import styles from './styles.module.scss';

const LoginPage = (props) => {
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    pass: ''
  })
  const [showPass, setShowPass] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const {
    navigate,
    cookies,
    setCookie,
    removeCookie,
    isLoggedIn,
    setIsLoggedIn,
    pressedSignup,
    setPressedSignup,
    cookieTimeout,
    setCookieTimeout
  } = props;

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/authorize/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginCreds.email,
        pass: loginCreds.pass
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.loginSuccess) {
          setIsLoggedIn(true);
          setCookie('user', data.user, { path: '/' });
          setFailedLogin(false);
          // expiration of 1min for 'user' cookie
          setCookieTimeout(setTimeout(() => {
            removeCookie('user', { path: '/' });
            setIsLoggedIn(false);            
            navigate('/flow/login', { replace: true });
          }, 1000*60*60));
        } else setFailedLogin(true);
      })
      .catch(err => `Error checking credentials of user login: ${err}`)
      .finally(
        setLoginCreds({
          email: '',
          pass: ''
        })
      )
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageMainContent}>
        <div className={styles.loginLogoAndSubtext}>
          <h1 className={styles.loginTitleText}><span className={styles.title1}>RE:</span><span>Balance</span></h1>
          <h2 className={styles.loginSubtext}>Manage reconciliations with your circles.</h2>
        </div>

        <div className={styles.loginRight}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className="login-only-wrapper"
          >
            <TextField
              id="login-email"
              label="Email"
              variant="outlined"
              value={loginCreds.email}
              onInput={(e) => setLoginCreds({...loginCreds, email: e.target.value})}
            />
            <TextField
              id="login-pass"
              label="Password"
              variant="outlined"
              onInput={(e) => setLoginCreds({...loginCreds, pass: e.target.value})}
            />
            <Button className={styles.loginButton} type="submit" variant="contained" size="medium" onClick={handleLogin}>Log in</Button>
          </Box>

          {/* <form className="login-form" action="/authorize/signin" method="GET">
            <input 
              id="email" 
              name="email" 
              placeholder="Email" 
              type="text" 
              value={loginCreds.email} 
              onChange={(e) => setLoginCreds({...loginCreds, email: e.target.value})} 
            />
            <input 
              id="pass" 
              name="pass" 
              placeholder="Password" 
              type={ showPass ? "text" : "password" }
              value={loginCreds.pass} 
              onChange={(e) => setLoginCreds({...loginCreds, pass: e.target.value})} 
            />
            <button 
              className="login-submit" 
              type="submit" 
              onClick={handleLogin}
            >Log In!</button>
          </form> */}
          <div>
          { failedLogin &&
            <p>Forgot password?</p>
          }
          </div>

          <hr></hr>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className={styles.loginSignupWrapper}
          >
            <Button className={styles.signupLinkButton} type="submit" variant="contained" size="medium" onClick={() => setPressedSignup(true)}>Create new account</Button>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;