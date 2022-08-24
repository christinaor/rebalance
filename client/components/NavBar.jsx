/**
 * ************************************
 *
 * @module  NavBar
 * @author
 * @date
 * @description NavBar is a component with different routes leading the user to different pages.
 *
 * ************************************
 */

import React, {useEffect, useState} from "react";
import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import Logout from "./Logout.jsx";

const NavBar = (props) => {
  const { 
    cookies, 
    removeCookie, 
    setCookie, 
    isLoggedIn, 
    setIsLoggedIn,
    cookieTimeout,
    setCookieTimeout
  } = props;
  
  return (
    <nav className="navigation">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/flow/settings">
        <button>Settings</button>
      </Link>
      <Link to="/flow/login">
        <Logout 
          cookies={cookies}
          removeCookie={removeCookie}
          setCookie={setCookie}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          cookieTimeout={cookieTimeout}
          setCookieTimeout={setCookieTimeout} />
      </Link>
    </nav>

  )
};

export default NavBar;