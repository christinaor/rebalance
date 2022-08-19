import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFound from './components/NotFound.jsx';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  // const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const navigate = useNavigate();
  // setCookie('user', 'CO', { path: '/' });

  useEffect(() => {
    // // const token = getCookie('user')
    console.log('in app.jsx useEffect')
    // const token = false;
    // if (!token) {
    //   console.log('no token, go to login')
    //   navigate('/login', { replace: true });
    // } else {
    //   setIsLoggedIn(true);
    //   setAppIsReady(true);
    //   navigate('/', { replace: true });
    // }
    if (!cookies.user) {
      navigate('/login', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
    setAppIsReady(true);

  }, [cookies])

  if (appIsReady) {
    return (
      <main>
        <Routes>
          <Route path='/' 
            element={<MainContainer />} exact />
          <Route path='/login' element={<LoginPage 
            navigate={navigate}
            cookies={cookies}
            removeCookie={removeCookie}
            setCookie={setCookie}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    )
  } else {
    return (
      <div>Rebalance is loading...</div>
    )
  }
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