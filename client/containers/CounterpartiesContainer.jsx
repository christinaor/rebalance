/**
 * ************************************
 *
 * @module  CounterpartiesContainer
 * @author
 * @date
 * @description stateless container that renders Counterparty components
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import { Paper } from '@mui/material'

const CounterpartiesContainer = props => {
  const {
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/counterparties', {
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        console.log('cp data here: ', data);
        setCounterpartiesList(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
      .finally(setPopulatedCounterparties(false))

    // return () => {
    //   second
    // }
  }, [populatedCounterparties])

  const counterpartySideElements = counterpartiesList.map(counterpartyInfo => (
    <div 
      key={`cp${counterpartyInfo.id}`}
      className="cp-hover"
      onClick={() => setCurrentCounterparty(counterpartyInfo.counterparty_name)}
    >
      {counterpartyInfo.counterparty_name}
    </div>

  ))
  
  return (
    <Paper elevation={3} className="left-counterparties">
      <h2>Counterparty</h2>
      <div 
        key={`cp0}`}
        className="cp-hover"
        onClick={() => setCurrentCounterparty('All Parties')}>All Parties</div>
      {counterpartySideElements}
    </Paper>
  )
}

export default CounterpartiesContainer;
 