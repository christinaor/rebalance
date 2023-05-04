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
import { Paper } from '@mui/material';
import Logout from "../Logout/Logout.jsx";

import styles from './styles.module.scss';

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
    <nav className={styles.navigation}>
      <h1 className={styles.navLogo}>
        <a href="/">
          <span className={styles.logoPart1}>RE:</span>
          <span>Balance</span>
        </a>
      </h1>
      <ul className={styles.navLinkList}>
        <li className={styles.navLink}>
          <Link to="/flow/about">
            <span>About</span>
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link to="/flow/settings">
            <span>Settings</span>
          </Link>
        </li>
        <li className={styles.navLink}>
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
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;