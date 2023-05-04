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

  const reconciliationAmount = Math.round(100 * (userBalance - counterpartyBalance) / 100).toFixed(2);

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
    <section className={styles.totalBalanceSection}>
      <div className={`${styles.titleBar} titleBar`}>
        <ArrowRightIcon />
        <h2>Summary with <span className={styles.currentPartyInTitle}>{currentCounterparty}</span></h2>
      </div>
      {/* <CounterpartyFilter
        counterpartiesList={counterpartiesList}
        setCounterpartiesList={setCounterpartiesList}
        populatedCounterparties={populatedCounterparties}
        setPopulatedCounterparties={setPopulatedCounterparties}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
      />         */}
      

      <div className={styles.content}>
        <div className={styles.balances}>
          <div className={styles.userBalanceAndDueDate}>
            <div className={styles.userBalance}>
              <h3 className={styles.userBalanceTitle}>You paid:</h3>
              <h3 className={styles.userBalanceAmount}>${userBalance}</h3>
            </div>
            <h3 className={styles.dueDateText}>
              {userBalance > 0 
                ? <span>Due by <span className={styles.date}>{lastDayWithoutTime}</span></span>
                : <span>Nothing to reconcile!</span>
              }
            </h3>
          </div>

          <div className={styles.userBalanceAndDueDate}>
            <div className={styles.userBalance}>
              <h3 className={styles.userBalanceTitle}>{currentCounterparty} to pay:</h3>
              <h3 className={styles.userBalanceAmount}>${counterpartyBalance}</h3>
            </div>
            <h3 className={styles.dueDateText}>
              {counterpartyBalance > 0 
                ? <span>Due by <span className={styles.date}>{lastDayWithoutTime}</span></span>
                : <span>Nothing to reconcile!</span>
              }
              
            </h3>
          </div>
        </div>
            {/* <div className={styles.card}>
              <h3 className={styles.cardTitle}>Current Balances</h3>
              <div className={styles.cardDetails}>
                <div>Your balance: ${userBalance}</div>
                <div>Balance from {currentCounterparty} {currentCounterparty !== 'All Parties' ? 's' : null}: ${counterpartyBalance}</div>
                <div>Unpaid Balances: {numUnpaidBalances}</div>
              </div>
            </div> */}

            {/* <div className={styles.card}>
              <h3 className={styles.cardTitle}>Upcoming Due Date</h3>
              <div className={styles.cardDetails}>
                <div>{lastDayWithoutTime}</div>
              </div>
            </div> */}

        <div className={styles.reconciliationsSummary}>
          <div className={styles.numberOfBalances}>
            <h3 className={styles.numberOfBalancesTitle}>Transactions to Reconcile:</h3>
            <h3 className={styles.numberOfBalancesAmount}>{numUnpaidBalances}</h3>
          </div>
          
          <div className={styles.separator} />

          <div className={styles.totalOfBalances}>
          <h3 className={styles.totalOfBalancesTitle}>Total to Reconcile:</h3>
            <h3 className={styles.totalOfBalancesAmount}>${reconciliationAmount}</h3>
          </div>
        </div>

      </div>
    </section>
  )
}