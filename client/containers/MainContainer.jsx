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
import PeopleContainer from './PeopleContainer.jsx';
import BalanceContainer from './BalanceContainer.jsx';
import ListOfRecords from "../components/ListOfRecords.jsx";

// class MainContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { 
  //     str: 'hello world',
  //     dbData: [],
  //     added: [],
  //     searched: [],
  //     budget: 0,
  //     total: 0,
  //     people: ['Frank', 'Boo'],
  //   };
  // }
  // render() {
  const MainContainer = props => {
    useEffect(() => {
      // console.log('in useEffect')
    }, [])

    return (
      <div className="container">
        <div>Reconciliation App</div>
        <nav>Nav Bar</nav>
        <h1 id="header">Balance with others here...</h1>
        <ListOfRecords />

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
        <div className="innerContainer">
          {/* <PeopleContainer people={people} /> */}
          <BalanceContainer />
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