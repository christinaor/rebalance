/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { TotalBalanceContainer } from "../TotalBalanceContainer/TotalBalanceContainer.jsx";
import RecordsContainer from "../RecordsContainer/RecordsContainer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import SettingsPage from "../../components/SettingsPage/SettingsPage.jsx";

import styles from './styles.module.scss';

const MainContainer = props => {
  const { 
    cookies, 
    removeCookie, 
    setCookie, 
    isLoggedIn, 
    setIsLoggedIn,
    cookieTimeout,
    setCookieTimeout
  } = props;
  const [counterpartiesList, setCounterpartiesList] = useState([]);
  const [currentCounterparty, setCurrentCounterparty] = useState('All Counterparties')
  const [userBalance, setUserBalance] = useState(null);
  const [counterpartyBalance, setCounterpartyBalance] = useState(null);
  const [populatedCounterparties, setPopulatedCounterparties] = useState(false);
  const [numUnpaidBalances, setNumUnpaidBalances] = useState(0);

  // Fetch all counterparties first
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/counterparties', {
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        // console.log('cp data here: ', data);
        setCounterpartiesList(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
      .finally(setPopulatedCounterparties(false))

    // return () => {
    //   second
    // }
  }, [])

  return (
    <div className={styles.mainContainer}>
      <NavBar
        cookies={cookies}
        removeCookie={removeCookie}
        setCookie={setCookie}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cookieTimeout={cookieTimeout}
        setCookieTimeout={setCookieTimeout}
        counterpartiesList={counterpartiesList}
        setCounterpartiesList={setCounterpartiesList}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty} />
      <Routes>
        <Route path='/flow/settings' element={<SettingsPage />} />
      </Routes>
        {/* <CounterpartyFilter
            counterpartiesList={counterpartiesList}
            setCounterpartiesList={setCounterpartiesList}
            populatedCounterparties={populatedCounterparties}
            setPopulatedCounterparties={setPopulatedCounterparties}
            currentCounterparty={currentCounterparty}
            setCurrentCounterparty={setCurrentCounterparty}
          /> */}
      <div className={styles.mainContent}>
        <TotalBalanceContainer
          counterpartiesList={counterpartiesList}
          setCounterpartiesList={setCounterpartiesList}
          populatedCounterparties={populatedCounterparties}
          setPopulatedCounterparties={setPopulatedCounterparties}

          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
          userBalance={userBalance}
          setUserBalance={setUserBalance}
          counterpartyBalance={counterpartyBalance}
          setCounterpartyBalance={setCounterpartyBalance} 
          numUnpaidBalances={numUnpaidBalances} 
          setNumUnpaidBalances={setNumUnpaidBalances} 
          
          />
        <RecordsContainer
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
          userBalance={userBalance}
          setUserBalance={setUserBalance}
          counterpartyBalance={counterpartyBalance}
          setCounterpartyBalance={setCounterpartyBalance} 
          numUnpaidBalances={numUnpaidBalances} 
          setNumUnpaidBalances={setNumUnpaidBalances}
          counterpartiesList={counterpartiesList}
          setCounterpartiesList={setCounterpartiesList}
          populatedCounterparties={populatedCounterparties}
          setPopulatedCounterparties={setPopulatedCounterparties} />
      </div>
    </div>
  );
};

export default MainContainer;