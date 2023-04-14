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
import CounterpartyFilter from "../../components/CounterpartyFilter/CounterpartyFilter.jsx";
import ArrowRight from "@mui/icons-material/ArrowRight";

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
    <div className="total-balance-container">
      <Paper elevation={0} square className="summary-title">
          <ArrowRightIcon />
          <div>Summary of Balance with {currentCounterparty}</div>
        {/* <CounterpartyFilter
          counterpartiesList={counterpartiesList}
          setCounterpartiesList={setCounterpartiesList}
          populatedCounterparties={populatedCounterparties}
          setPopulatedCounterparties={setPopulatedCounterparties}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
        />         */}
      </Paper>
      <div className="summary-cards">
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
   
    </div>
  )
}