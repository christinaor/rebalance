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
        <div className="login-left">
          <img className="center" src={piggybank} alt="minimalist piggy bank image" />
        </div>

        <div className="login-right">
          <div className="login-title">rebalance</div>
          <form className="login-form" id="signin" action="/signin" method="POST">
            <input id="user" name="user" placeholder="Email" type="text"></input>
            <input id="pass" name="pass" placeholder="Password" type="text"></input>
            <button id="login-submit" type="submit">Log In!</button>
          </form>
          <br />
          <div className="login-signup-text">New to rebalance?</div>
          <button id="signup-submit" type="submit">Sign Up Here!</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;