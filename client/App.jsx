import React, { Component } from 'react';
// import { Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Route path='/home' component={MainContainer} />
        <Route component={Error} />
      </Switch>
      // <MainContainer/>
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