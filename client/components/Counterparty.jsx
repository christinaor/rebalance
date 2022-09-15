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

  return (
    <div
      key={`cp${counterpartyInfo.id}`}
      className="cp-hover"
      onClick={() => setCurrentCounterparty(counterpartyInfo.counterparty_name)}>
        {counterpartyInfo.counterparty_name}
    </div>
  )
};

export default Counterparty;
