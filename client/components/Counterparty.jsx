/**
 * ************************************
 *
 * @module  Counterparty
 * @author
 * @date
 * @description stateless component that renders a component for each counterparty
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";

const Counterparty = props => {
  const {
    currentCounterparty,
    setCurrentCounterparty,
    counterpartyInfo
  } = props;

  // Color change from hovering over a counterparty
  const [onHoverColor, setOnHoverColor] = useState('#fafafa')
  const cpButtonStyle = {
    background: `${onHoverColor}`
  };

  return (
    <div
      key={`cp${counterpartyInfo.id}`}
      style={cpButtonStyle} 
      onMouseEnter={() => setOnHoverColor('#c83f49')}
      onMouseLeave={() => setOnHoverColor('#fafafa')}
      onClick={() => setCurrentCounterparty(counterpartyInfo.counterparty_name)}>
        {counterpartyInfo.counterparty_name}
    </div>
  )
};

export default Counterparty;
