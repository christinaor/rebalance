import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { StyledEngineProvider } from '@mui/material/styles';
import MainContainer from './containers/MainContainer/MainContainer.jsx';
import Copyright from './components/Copyright.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import NotFound from './components/NotFound.jsx';

function App(props) {
  const [pressedSignup, setPressedSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [cookieTimeout, setCookieTimeout] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user && pressedSignup) {
      navigate('/flow/signup')
    } else if (!cookies.user && !pressedSignup) {
      navigate('/flow/login', { replace: true })
    } else {
      navigate('/', { replace: true })
    };
    setAppIsReady(true);
  }, [cookies, pressedSignup])

  if (appIsReady) {
    return (
      <StyledEngineProvider injectFirst>
      <div className="main-content-wrapper">
        <Routes>
          <Route path='/*' 
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
              setPressedSignup={setPressedSignup} />} />
          <Route path='/flow/settings'
            element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
      <Copyright />
      </StyledEngineProvider>
    )
  } else {
    return (
      <div>RE:Balance is loading...</div>
    )
  }
};

export default App;