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
          // expiration of 1min for 'user' cookie
          setTimeout(() => {
            removeCookie('user', { path: '/' });
            setIsLoggedIn(false);            
            navigate('/flow/login', { replace: true });
          }, 1800000)
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

  return (
    <div className="login-page-wrapper">
      <img className="login-left-img" src={piggybank} alt="minimalist piggy bank image" />

      <article className="login-right">
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
          <button className="signup-login-page" type="submit">Sign Up Here!</button>
        </div>
      </article>

    </div>
  )
}

export default LoginPage;