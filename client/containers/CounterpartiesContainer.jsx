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
import Counterparty from "../components/Counterparty.jsx";
 
const CounterpartiesContainer = props => {
  const {
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  // Color change from hovering over a counterparty
  const [onHoverColor, setOnHoverColor] = useState('#fafafa')
  const cpButtonStyle = {
    background: `${onHoverColor}`
  };

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
    <Counterparty 
      counterpartyInfo={counterpartyInfo}
      currentCounterparty={currentCounterparty}
      setCurrentCounterparty={setCurrentCounterparty}
    />
  ))
  
  return (
    <div className="left-counterparties">
      <h2>Counterparty:</h2>
      <div 
        key={`cp0}`} 
        style={cpButtonStyle} 
        onMouseEnter={() => setOnHoverColor('#c83f49')}
        onMouseLeave={() => setOnHoverColor('#fafafa')}
        onClick={() => setCurrentCounterparty(null)}>All Parties</div>
      {counterpartySideElements}
    </div>
  )
}

export default CounterpartiesContainer;
 