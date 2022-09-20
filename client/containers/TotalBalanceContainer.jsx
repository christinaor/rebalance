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
import { AddBoxOutlined } from "@mui/icons-material";

export const TotalBalanceContainer = (props) => {
  const {
    currentCounterparty,
    setCurrentCounterparty,
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance,
    numUnpaidBalances,
    setNumUnpaidBalances
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
    <div className="total-balance-container">
        <Paper className="balance-info card-style"
          elevation={3}
        >
          <h3>Current Balances</h3>
          <div>Amount you owe: ${userBalance}</div>
          <div>Amount {currentCounterparty} owe{currentCounterparty !== 'All Parties' ? 's' : null}: ${counterpartyBalance}</div>
          <div>No. Unpaid: {numUnpaidBalances}</div>
        </Paper>
      <Paper className="due-date card-style"
        elevation={3}
        >
        <h3>Next Reconciliation Due Date</h3>
        <div>{lastDayWithoutTime}</div>
      </Paper>      
    </div>
  )
}