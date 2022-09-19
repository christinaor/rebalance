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
import CounterpartiesContainer from './CounterpartiesContainer.jsx';
import { TotalBalanceContainer } from "./TotalBalanceContainer.jsx";
import RecordsContainer from "./RecordsContainer.jsx";
import NavBar from "../components/NavBar.jsx"
import SettingsPage from "../components/SettingsPage.jsx"

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
    <div className="container">
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
      <TotalBalanceContainer
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
        userBalance={userBalance}
        setUserBalance={setUserBalance}
        counterpartyBalance={counterpartyBalance}
        setCounterpartyBalance={setCounterpartyBalance} 
        numUnpaidBalances={numUnpaidBalances} 
        setNumUnpaidBalances={setNumUnpaidBalances} />
      <div className="main-inner-container">
        <CounterpartiesContainer
          counterpartiesList={counterpartiesList}
          setCounterpartiesList={setCounterpartiesList}
          populatedCounterparties={populatedCounterparties}
          setPopulatedCounterparties={setPopulatedCounterparties}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
        />
        <RecordsContainer
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
          userBalance={userBalance}
          setUserBalance={setUserBalance}
          counterpartyBalance={counterpartyBalance}
          setCounterpartyBalance={setCounterpartyBalance} 
          numUnpaidBalances={numUnpaidBalances} 
          setNumUnpaidBalances={setNumUnpaidBalances} />
      </div>
    </div>
  );
};

export default MainContainer;