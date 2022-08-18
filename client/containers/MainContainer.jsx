/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import LoginPage from "../components/LoginPage.jsx";
import CounterpartiesContainer from './CounterpartiesContainer.jsx';
import RecordsContainer from "./RecordsContainer.jsx";

  const MainContainer = props => {
    const [counterpartiesList, setCounterpartiesList] = useState([]);
    const [populatedCounterparties, setPopulatedCounterparties] = useState(false);

    return (
      <div className="container">
        <header>Reconciliation App</header>
        <nav>Nav Bar</nav>
        <h1 id="header">Balance with others here...</h1>
        <div className="main-inner-container">
          <CounterpartiesContainer 
            counterpartiesList={counterpartiesList}
            setCounterpartiesList={setCounterpartiesList}
            populatedCounterparties={populatedCounterparties}
            setPopulatedCounterparties={setPopulatedCounterparties}
          />
          <RecordsContainer />
      {/*  / - root, always the very top
      ./asdf and asdf are the same - sibling
      */}
        {/* <a href="asdf">To asdf</a>
        <br />
        <a href="./asdf">To ./asdf</a>
        <br />
        <a href="../asdf">To /asdf</a> */}
        {/* <br />
        <a href="http://localhost:8081/asdf">To href</a> */}
        </div>
      </div>
    );
  // };
};

export default MainContainer;


/*

location: mysite.com/blog/1/data

a href ./data -> mysite.com/blog/1/data
a href ./asdf -> mysite.com/blog/1/asdf
a href ../asdf -> mysite.com/blog/asdf


*/