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
import CounterpartyFilter from '../../components/CounterpartyFilter.jsx';
import { TotalBalanceContainer } from "../TotalBalanceContainer.jsx";
import RecordsContainer from "../RecordsContainer/RecordsContainer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import SettingsPage from "../../components/SettingsPage.jsx";

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
  const [currentCounterparty, setCurrentCounterparty] = useState('All Parties')
  const [userBalance, setUserBalance] = useState(null);
  const [counterpartyBalance, setCounterpartyBalance] = useState(null);
  const [populatedCounterparties, setPopulatedCounterparties] = useState(false);
  const [numUnpaidBalances, setNumUnpaidBalances] = useState(0);

  return (
    <div className={styles.mainContainer}>
      <NavBar
        cookies={cookies}
        removeCookie={removeCookie}
        setCookie={setCookie}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cookieTimeout={cookieTimeout}
        setCookieTimeout={setCookieTimeout} />
      <Routes>
        <Route path='/flow/settings' element={<SettingsPage />} />
      </Routes>
      <div className="below-nav-wrapper">
        {/* <CounterpartyFilter
            counterpartiesList={counterpartiesList}
            setCounterpartiesList={setCounterpartiesList}
            populatedCounterparties={populatedCounterparties}
            setPopulatedCounterparties={setPopulatedCounterparties}
            currentCounterparty={currentCounterparty}
            setCurrentCounterparty={setCurrentCounterparty}
          /> */}
        <div className={styles.summaryAndRecords}>
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
    </div>
  );
};

export default MainContainer;