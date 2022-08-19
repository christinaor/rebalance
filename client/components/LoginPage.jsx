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
import { useCookies } from 'react-cookie';
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
    setIsLoggedIn
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

          setTimeout(() => {
            removeCookie('user', { path: '/' });
            setIsLoggedIn(false);            
            navigate('/login', { replace: true });
          }, 10000)
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
  console.log('set cookie blanked out')
  // setCookie('user', 'CO', { path: '/' });

  return (
    <div className="login-page-wrapper">
      <img className="login-left-img" src={piggybank} alt="minimalist piggy bank image" />

      <article className="login-right">
        <h1>RE:balance</h1>
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
            id="login-submit" 
            type="submit" 
            onClick={handleLogin}
          >Log In!</button>
        </form>
        { failedLogin &&
          <div>Forget your password?</div>
        }
        <br />

        <div className="login-signup-wrapper">
          <div className="login-signup-text">New to rebalance?</div>
          <button id="signup-submit" type="submit">Sign Up Here!</button>
        </div>
      </article>

    </div>
  )
}

export default LoginPage;