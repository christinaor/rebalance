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
    <div className="login-container">
      <img className="center" src={piggybank} alt="minimalist piggy bank image" />
      <br />
        <form className="login-wrapper" id="signin" action="/signin" method="POST">
            <input id="user" name="user" placeholder="user" type="text"></input>
            {/* <br /> */}
            <input id="pass" name="pass" placeholder="pass" type="text"></input>
            {/* <br /> */}
          <button id="login-submit" type="submit">Sign In!</button>
        </form>
    </div>
  )
}

export default LoginPage;