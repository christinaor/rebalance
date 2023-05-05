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

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import DownArrow from '../../../assets/down-arrow.svg';

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

  let reconciliationAmount = null;
  if (userBalance > counterpartyBalance) {
    reconciliationAmount = (parseFloat(userBalance) - parseFloat(counterpartyBalance)).toFixed(2);
  } else {
    reconciliationAmount = (parseFloat(counterpartyBalance) - parseFloat(userBalance)).toFixed(2);
  }
  

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
              <h3 className={styles.userBalanceTitle}>Your portion:</h3>
              <h3 className={styles.userBalanceAmount}>${userBalance}</h3>
            </div>
            
            <h3 className={styles.dueDateText}>
              {reconciliationAmount && userBalance > counterpartyBalance 
              ? <div>
                <div>You owe {currentCounterparty} ${reconciliationAmount}.</div>
                <div>Due by <span className={styles.date}>{lastDayWithoutTime}</span></div>
              </div>
              : <span>Less than {currentCounterparty}. You're clear!</span>}
            </h3>
          </div>

          {userBalance > counterpartyBalance
          ? <DownArrow className={styles.downArrowToCounterParty} />
          : <DownArrow className={styles.downArrowToUser} />}
          
          <div className={styles.userBalanceAndDueDate}>
            <div className={styles.userBalance}>
              <h3 className={styles.userBalanceTitle}>{currentCounterparty}'s portion:</h3>
              <h3 className={styles.userBalanceAmount}>${counterpartyBalance}</h3>
            </div>
            <h3 className={styles.dueDateText}>
              {reconciliationAmount && counterpartyBalance > userBalance 
              ? <div>
                <div>{currentCounterparty} must pay ${reconciliationAmount}.</div>
                <div>Due by <span className={styles.date}>{lastDayWithoutTime}</span></div>
              </div>
              : <span>Nothing to reconcile!</span>
              }
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}