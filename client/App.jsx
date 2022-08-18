import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFound from './components/NotFound.jsx';

function App(props) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  // const [appIsReady, setAppIsReady] = useState(false);

  // let navigate = useNavigate();

  useEffect(() => {
    // // const token = getCookie('user')
    // console.log('in app.jsx useEffect')
    // const token = false;
    // if (!token) {
    //   console.log('no token, go to login')
    //   navigate('/login', { replace: true });
    // } else {
    //   setIsLoggedIn(true);
    //   setAppIsReady(true);
    //   navigate('/', { replace: true });
    // }

  })

  // if (appIsReady) {
    return (
      <main>
        <Routes>
          {/* <Route path='/home' component={MainContainer}/>        
          <Route path='/' component={LoginPage} exact /> */}
          <Route path='/' 
            element={<MainContainer />} exact />
          <Route path='/login' element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <MainContainer/> */}
      </main>
    )
  // } else {
  //   return (
  //     <div>Rebalance is loading...</div>
  //   )
  // }
};

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