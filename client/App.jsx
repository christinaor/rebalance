import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('hello from app.jsx!')
    return(
      <div>
        <MainContainer/>
      </div>
    );
  }
}

export default App;