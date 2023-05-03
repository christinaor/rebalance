/**
 * ************************************
 *
 * @module  TotalBalanceContainer
 * @author
 * @date
 * @description presentational component that renders balance between user and current counterparty
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import { Paper } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import styles from './styles.module.scss';

export const TotalBalanceContainer = (props) => {
  const {
    currentCounterparty,
    setCurrentCounterparty,
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance,
    numUnpaidBalances,
    setNumUnpaidBalances,

    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties
  } = props;

  // set last day as tentative due date
  const dateToday = new Date();
  const dateMonth = dateToday.getMonth() + 1;
  const dateYear = dateToday.getFullYear();
  const lastDayWithTime = new Date(dateYear, dateMonth, 0);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
  const month = monthNames[dateToday.getMonth()];  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[lastDayWithTime.getDay()];
  const lastDayWithoutTime = `${day}, ${month} ${lastDayWithTime.getDate()}, ${dateYear}`  

  return (
    <div className={styles.totalBalanceSection}>
      <div className="titleBar">
        <ArrowRightIcon />
        <h2>Summary with <span className={styles.currentPartyInTitle}>{currentCounterparty}</span></h2>
      {/* <CounterpartyFilter
        counterpartiesList={counterpartiesList}
        setCounterpartiesList={setCounterpartiesList}
        populatedCounterparties={populatedCounterparties}
        setPopulatedCounterparties={setPopulatedCounterparties}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
      />         */}
      </div>
      <div className={styles.summaryCardsWrapper}>
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Current Balances</h3>
            <div className={styles.cardDetails}>
              <div>Your balance: ${userBalance}</div>
              <div>Balance from {currentCounterparty} {currentCounterparty !== 'All Parties' ? 's' : null}: ${counterpartyBalance}</div>
              <div>Unpaid Balances: {numUnpaidBalances}</div>
            </div>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Upcoming Due Date</h3>
            <div className={styles.cardDetails}>
              <div>{lastDayWithoutTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}