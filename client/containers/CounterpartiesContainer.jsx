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
    counterparties,
    setCounterparties,
    populatedCounterparties,
    setPopulatedCounterparties
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
        setCounterparties(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
      .finally(setPopulatedCounterparties(false))
  
    return () => {
      second
    }
  }, [populatedCounterparties])
  

  return (
    <div>
      COUNTERPARTIES SIDEBAR HERE
    </div>
  )

}

export default CounterpartiesContainer;
 