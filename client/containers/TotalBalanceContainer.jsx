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

  let counterparty;
  if (currentCounterparty !== null) { counterparty = currentCounterparty }
  else { counterparty = 'All Parties' }

  return (
    <div className="total-balance-container">Current Balances:
      <div>Amount you owe: {userBalance}</div>
      <div>Amount owed from {counterparty}: {counterpartyBalance}</div>
    </div>

  )
 }