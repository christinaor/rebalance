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
  const {
    navigate,
    cookies,
    setCookie,
    isLoggedIn,
    setIsLoggedIn
  } = props;

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/authorize/signin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        pass: pass
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.loginSuccess) {
          setCookie('user', data.user, { path: '/' });
          setIsLoggedIn(true);
          setTimeout(() => {
            cookies.remove('user');
            navigate('/login', { replace: true });
            setIsLoggedIn(false);
          }, 60000)
        }
      })
      .catch(err => `Error checking credentials of user login: ${err}`)
  }

  // setCookie('user', 'CO', { path: '/' });

  return (
    <div className="login-page-wrapper">
      <img className="login-left-img" src={piggybank} alt="minimalist piggy bank image" />

      <article className="login-right">
        <h1>RE:balance</h1>
        <form className="login-form" id="signin" action="/authorize/signin" method="GET">
          <input id="email" name="email" placeholder="Email" type="text"></input>
          <input id="pass" name="pass" placeholder="Password" type="text"></input>
          <button id="login-submit" type="submit">Log In!</button>
        </form>
        <br />
        <div className="login-signup-wrapper">
          <div className="login-signup-text">New to rebalance?</div>
          <button id="signup-submit" type="submit" onClick={handleLogin}>Sign Up Here!</button>
        </div>
      </article>

    </div>
  )
}

export default LoginPage;