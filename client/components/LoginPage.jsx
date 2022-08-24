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
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import piggybank from './../../assets/piggybank.png'

const LoginPage = (props) => {
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    pass: ''
  })
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
          }, 50000));
        } else setFailedLogin(true);
      })
      .catch(err => `Error checking credentials of user login: ${err}`)
      .finally(
        setLoginCreds({
          email: '',
          pass: ''
        })
      )
  }

  return ((!cookies.user) ?
    <div className="login-page-wrapper">
      {/* TESTING COOKIES.USER: should have no cookies: 
      {cookies.user} */}
      
      <img className="login-left-img" src={piggybank} alt="minimalist piggy bank image" />

      <div className="login-right">
        <h1>RE:balance<br /> Manage Your Reconciliations</h1>
        <form className="login-form" action="/authorize/signin" method="GET">
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
            type="text" 
            value={loginCreds.pass} 
            onChange={(e) => setLoginCreds({...loginCreds, pass: e.target.value})} 
          />
          <button 
            className="login-submit" 
            type="submit" 
            onClick={handleLogin}
          >Log In!</button>
        </form>
        { failedLogin &&
          <div>Forget your password or a new user?</div>
        }
        <br />

        <div className="login-signup-wrapper">
          <h4>First time at RE:balance? Let's sign you up!</h4>
          <button 
            className="signup-login-button"
            onClick={() => setPressedSignup(true)}>Sign Up Here!</button>
        </div>
      </div>
    </div>
  :
  (<div>cookies.user should be filled
    {/* {cookies.user} */}
    Redirecting to your RE:Balance Homepage...
    {console.log('in the redirect from logout')}
    {navigate('/', { replace: true })}
  </div>)
  )
}

export default LoginPage;