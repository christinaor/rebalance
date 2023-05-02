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
    <Paper className={styles.navBar} elevation={3} square>
      <nav className={styles.navigation}>
        <a className={styles.navLogo} href="/">RE:Balance</a>
        <ul className={styles.rightNav}>
          <li className={styles.rightNavLink}>
            <Link to="/flow/about">
              <span>About</span>
            </Link>
          </li>
          <li className={styles.rightNavLink}>
            <Link to="/flow/settings">
              <span>Settings</span>
            </Link>
          </li>
          <li className={styles.rightNavLink}>
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
    </Paper>
  )
};

export default NavBar;