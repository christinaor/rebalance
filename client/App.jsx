import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './components/LoginPage.jsx';
import GenericError from './components/ErrorPage.jsx';

function App() {
  return (
    <main>
      <Switch>
        {/* <Route path='/home' component={MainContainer}/>        
        <Route path='/' component={LoginPage} exact /> */}
        <Route path='/' component={MainContainer} exact/>        
        <Route path='/login' component={LoginPage} />
        <Route component={GenericError} />
      </Switch>
      {/* <MainContainer/> */}
    </main>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }
  
//   render() {
//     console.log('hello from app.jsx!')
//     return(
//       <div>
//         <MainContainer/>
//       </div>
//     );
//   }
// }

export default App;