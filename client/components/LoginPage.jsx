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

import React from "react";
import piggybank from './../../assets/piggybank.png'

const LoginPage = (props) => {
  return (
    <div className="login-page-wrapper">
      <div className="login-container">
          <img className="login-left" src={piggybank} alt="minimalist piggy bank image" />

        <div className="login-right">
          <div className="login-only-wrapper">
            <div className="login-title">rebalance</div>
            <form className="login-form" id="signin" action="/signin" method="POST">
              <input id="user" name="user" placeholder="Email" type="text"></input>
              <input id="pass" name="pass" placeholder="Password" type="text"></input>
              <button id="login-submit" type="submit">Log In!</button>
            </form>
          </div>
          <br />
          <div className="login-signup-wrapper">
            <div className="login-signup-text">New to rebalance?</div>
            <button id="signup-submit" type="submit">Sign Up Here!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;