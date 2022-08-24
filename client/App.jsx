import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import MainContainer from './containers/MainContainer.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import NotFound from './components/NotFound.jsx';

function App(props) {
  const [pressedSignup, setPressedSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [cookieTimeout, setCookieTimeout] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user) {
      (pressedSignup) ? navigate('/flow/signup') 
        : navigate('/flow/login', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
    setAppIsReady(true);
  }, [cookies, pressedSignup])

  if (appIsReady) {
    return (
      <main>
        <Routes>
          <Route path='/' 
            element={<MainContainer 
              cookies={cookies}
              removeCookie={removeCookie}
              setCookie={setCookie}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              cookieTimeout={cookieTimeout}
              setCookieTimeout={setCookieTimeout} />} exact />
          <Route path='/flow/login' 
            element={<LoginPage 
              navigate={navigate}
              cookies={cookies}
              removeCookie={removeCookie}
              setCookie={setCookie}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              pressedSignup={pressedSignup}
              setPressedSignup={setPressedSignup}
              cookieTimeout={cookieTimeout}
              setCookieTimeout={setCookieTimeout} />} />
          <Route path='/flow/signup' 
            element={<SignupPage 
              pressedSignup={pressedSignup}
              setPressedSignup={setPressedSignup} />} 
            />
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