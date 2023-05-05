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

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import Logout from "../Logout/Logout.jsx";

import DropdownMenuArrow from '/assets/dropdown-menu-arrow.svg';

import styles from './styles.module.scss';

const NavBar = (props) => {
  const { 
    cookies, 
    removeCookie, 
    setCookie, 
    isLoggedIn, 
    setIsLoggedIn,
    cookieTimeout,
    setCookieTimeout,
    counterpartiesList,
    currentCounterparty,
    setCurrentCounterparty,
  } = props;
  
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownMenuClick = () => {
    setIsOpen(!isOpen)
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        console.log('CLICKED OUTSIDE BUTTON')
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  console.log(counterpartiesList)
  return (
    <nav className={styles.navigation}>
      <h1 className={styles.navLogo}>
        <a href="/">
          <span className={styles.logoPart1}>RE:</span>
          <span>Balance</span>
        </a>
      </h1>

      <div className={styles.linksAndFilter}>
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
        
        <div className={styles.counterpartyFilterContainer}>
          <span>Transactions with</span>
          <button ref={buttonRef} className={`${styles.counterpartyFilterDropdown} ${isOpen ? styles.openMenu : ''}`} onClick={handleDropdownMenuClick}> 
            {currentCounterparty} <DropdownMenuArrow className={styles.dropdownMenuArrow}/>

            {isOpen && <ul className={styles.dropdownMenuList}>
              <li key={`counterparty-All Parties`} className={styles.dropdownMenuItem} onClick={() => setCurrentCounterparty('All Parties')}>All Parties</li>
              {counterpartiesList && counterpartiesList.map(counterparty => (
                <li 
                  key={`counterparty-${counterparty.counterparty_name}`} 
                  className={styles.dropdownMenuItem}
                  onClick={() => setCurrentCounterparty(counterparty.counterparty_name)}
                >
                  {counterparty.counterparty_name}
                </li>
              ))}
            </ul>}
          </button>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;