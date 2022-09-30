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
import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Paper, Button, Box, TextField, Typography } from '@mui/material'
import piggybank from './../../assets/piggybank.png'
// import balanceImg from './../../assets/reshot-icon-balance-VST9DRGPJF.svg';

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
    <div className="login-page-wrapper">
      {/* <div className="login-top">
        <span className="nav-logo">RE:Balance</span>
      </div> */}

      <div className="login-left">
        <div className="login-text-wrapper">
          <Typography variant="h1" className="login-title-text">RE:Balance</Typography>
          <Typography variant="h2" className="login-subtitle-text">Manage reconciliations with your circles.</Typography>
        </div>
        {/* <img className="login-left-img" src={piggybank} alt="minimalist piggy bank image" /> */}
      </div>

      <Paper elevation={3} className="login-right">
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
          <Button className="login-button" type="submit" variant="contained" size="medium" onClick={handleLogin}>Log in</Button>
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
          className="login-signup-wrapper"
        >
          <Button className="signup-link-button" type="submit" variant="contained" size="medium" onClick={() => setPressedSignup(true)}>Create new account</Button>
        </Box>
          {/* <span>First time at RE:balance?</span>
          <Link className="signup-link" to="/flow/signup" onClick={() => setPressedSignup(true)}>Create a new account</Link> */}

      </Paper>
    </div>
  )
}

export default LoginPage;