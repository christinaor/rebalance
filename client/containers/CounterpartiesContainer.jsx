/**
 * ************************************
 *
 * @module  Counterparties
 * @author
 * @date
 * @description stateless component that renders people components
 *
 * ************************************
 */

 import React, { useEffect, useState } from "react";

 
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
  
  const counterpartySideElements = counterpartiesList.map(counterpartyInfo => (<button onClick={setCurrentCounterparty(counterpartyInfo.counterparty_name)}>{counterpartyInfo.counterparty_name}</button>))

  return (
    <div className="left-counterparties">
      <h2>Check your counterparties:</h2>
      {counterpartySideElements}
    </div>
  )
  
}

export default CounterpartiesContainer;
 