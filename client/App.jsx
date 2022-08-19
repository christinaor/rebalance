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
    if (!cookies.user) {
      navigate('/flow/login', { replace: true })
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
          <Route path='/flow/login' element={<LoginPage 
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

export default App;