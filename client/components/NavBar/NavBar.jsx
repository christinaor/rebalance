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

import AddCounterpartyIcon from '/assets/add-counterparty.svg'
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
  const [addingCounterparty, setAddingCounterparty] = useState(false);
  const [addedCounterparty, setAddedCounterparty] = useState({
    name: '',
    email: ''
  });

  const handleDropdownMenuClick = () => {
    setIsOpen(!isOpen)
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }

  const handleToggleAddCounterparty = () => {
    setAddingCounterparty(true);
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
      <div className={styles.navMain}>
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
      </div>

      <div className={styles.navCounterparty}>
        <div className={styles.counterpartyFilterContainer}>
          <span className={styles.counterpartyFilterText}>Filtered by:</span>
          <button ref={buttonRef} className={`${styles.counterpartyFilterDropdown} ${isOpen ? styles.openMenu : ''}`} onClick={handleDropdownMenuClick}> 
            {currentCounterparty} <DropdownMenuArrow className={styles.dropdownMenuArrow}/>

            {isOpen && <ul className={styles.dropdownMenuList}>
              <li key={`counterparty-All Counterparties`} className={styles.dropdownMenuItem} onClick={() => setCurrentCounterparty('All Counterparties')}>All Counterparties</li>
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
          <button className={styles.addCounterparty} onClick={handleToggleAddCounterparty}>
            <AddCounterpartyIcon className={styles.addCounterpartyIcon} />
            <span className={styles.addCounterpartyText}>Add Counterparty</span>
          </button>
        </div>

        {addingCounterparty && <form className={styles.addCounterpartyForm} action="/api/counterparty/add" method="POST">
          <div className={styles.formField}>
            <label className={styles.addCounterpartyFormLabel} htmlFor="add-name">Counterparty Name:</label>
            <input className={addCounterpartyFormInput} name="add-name" type="text" onChange={(e) => setAddedCounterparty({...addedCounterparty, name: e.target.value})} required />
          </div>
          <div className={styles.formField}>
            <label className={styles.addCounterpartyFormLabel} htmlFor="add-email">Counterparty Email:</label>
            <input className={addCounterpartyFormInput} name="add-email" type="text" onChange={(e) => setAddedCounterparty({...addedCounterparty, email: e.target.value})} required />
          </div>
          <div className={styles.addCancelButtons}>
            <button className={styles.submitNewCounterpartyButton} onClick={addCounterparty}>Add Record</button>
            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
        </form>}
      </div>
    </nav>
  )
};

export default NavBar;