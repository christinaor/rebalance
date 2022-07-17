/**
 * ************************************
 *
 * @module  PeopleContainer
 * @author
 * @date
 * @description stateless component that renders people components
 *
 * ************************************
 */

 import React, { Component } from 'react';
//  import { connect } from 'react-redux';
 // import actions from action creators file
//  import * as actions from '../actions/actions';
//  import MarketCreator from '../components/MarketCreator.jsx';
//  import MarketsDisplay from '../components/MarketsDisplay.jsx'
 
const PeopleContainer = props => {
  const { people } = props;

  return (
    <div>
      {people}
    </div>
  )

}

export default PeopleContainer;


//  const mapStateToProps = store => ({
//    // provide pertinent state here
//    newLocation: store.markets.newLocation,
//    marketList: store.markets.marketList,
//    totalCards: store.markets.totalCards,
//  });
 
//  const mapDispatchToProps = dispatch => ({
//    // create functions that will dispatch action creators
//    addMarket: () => {
//      dispatch(actions.addMarketActionCreator());
//    },
//    updateNewLocation: newValue => {
//      dispatch(actions.setNewLocationActionCreator(newValue));
//    },
//    addCard: marketId => {
//      dispatch(actions.addCardActionCreator(marketId));
//    },
//    deleteCard: marketId => {
//      dispatch(actions.deleteCardActionCreator(marketId));
//    }
//  });

//  class MarketsContainer extends Component {
//    render() {
//      const {
//        updateNewLocation,
//        newLocation,
//        marketList,
//        deleteCard,
//        totalCards,
//        addMarket,
//        addCard,
//      } = this.props;
 
//      return (
//        <div className="innerbox">
//          {/* add components here... */}
//          <MarketCreator 
//            updateNewLocation={updateNewLocation}
//            newLocation={newLocation}
//            addMarket={addMarket} 
//          />
//          <hr />
//          <MarketsDisplay
//            marketList={marketList}
//            deleteCard={deleteCard}
//            totalCards={totalCards}
//            addCard={addCard}
//          />
//        </div>
//      )
//    }
//  }
 
//  // mapDispatchToProps maps to the dispatcher
//  export default connect(mapStateToProps, mapDispatchToProps)(MarketsContainer);
 