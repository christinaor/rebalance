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

export const TotalBalanceContainer = (props) => {
  const {
    currentCounterparty,
    setCurrentCounterparty,
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance
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

  let counterparty;
  if (currentCounterparty !== null) { counterparty = currentCounterparty }
  else { counterparty = 'All Parties' }

  return (
    <div className="total-balance-container">
        <div className="balances">
          <h3>Current Balances</h3>
          <div>Amount you owe: {userBalance}</div>
          <div>Amount owed from {counterparty}: {counterpartyBalance}</div>       
        </div>
      <div className="due-date">
        <h3>Next Reconciliation Due Date</h3>
        <div>{lastDayWithoutTime}</div>
      </div>      
    </div>
  )
}