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


//  import { connect } from 'react-redux';
//  import TotalsDisplay from '../components/TotalsDisplay.jsx';
//  import MarketsContainer from './MarketsContainer.jsx';
  // import from child components...

 // store passed into mapStateToProps is the store index.js in reducers file created as reducers
// mapping totalCards to this.props
//  const mapStateToProps = store => ({
//   // add pertinent state here
//   totalCards: store.markets.totalCards,
//   totalMarkets: store.markets.totalMarkets
// });

import React, { useEffect, useState } from "react";
import LoginPage from "../components/LoginPage.jsx";
import PeopleContainer from './PeopleContainer.jsx';
import BalanceContainer from './BalanceContainer.jsx';

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
    const [people, setPeople] = useState(
        ['Frank', 'Boo']
      );
    
    useEffect(() => {
      let newPerson = 'Tia'
      setPeople([...people, newPerson])
      console.log('in useEffect')
    }, [])

    return (
      <div className="container">
        <div>Reconciliation App</div>
        <nav>Nav Bar</nav>

        {/* <LoginPage /> */}

        <h1 id="header">Balance with others here...</h1>
        <a href="asdf">To asdf</a>
        <br />
        <a href="./asdf">To ./asdf</a>
        <br />
        <a href="/asdf">To /asdf</a>
        <br />
        <a href="http://localhost:8081/asdf">To href</a>
        <div className="innerContainer">
          <PeopleContainer people={people} />
          <BalanceContainer />
        </div>
      </div>
    );
  // };
};

export default MainContainer;