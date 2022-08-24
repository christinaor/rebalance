/**
 * ************************************
 *
 * @module  Logout
 * @author
 * @date
 * @description Logout is the functionality that logs out a user and erases the cookie.
 *
 * ************************************
 */

 import React, {useEffect, useState} from "react";
 
 const Logout = (props) => {
  const { 
    cookies, 
    removeCookie, 
    setCookie, 
    isLoggedIn, 
    setIsLoggedIn,
    cookieTimeout,
    setCookieTimeout
  } = props;

  const logoutNow = (e) => {
    setCookieTimeout(clearTimeout(cookieTimeout))
    removeCookie('user', { path: '/' });
    setIsLoggedIn(false);
  }
  return (
    <button className="nav-logout-button" onClick={logoutNow}>
      Logout
    </button>
  )
};
 
 export default Logout;