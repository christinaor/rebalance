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
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance
  } = props;

  return ` You owe ${userBalance} while your counterparty owes ${counterpartyBalance}`
 }