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
  // const [signedUp, setSignedUp] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user) {
      (pressedSignup) ? navigate('/flow/signup') 
        : navigate('/flow/login', { replace: true })
    // if (!cookies.user) {
    //   // console.log(pressedSignup)
    //   navigate('./flow/login', { replace: true })
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
            element={<MainContainer />} exact />
          <Route path='/flow/login' element={<LoginPage 
            navigate={navigate}
            cookies={cookies}
            removeCookie={removeCookie}
            setCookie={setCookie}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            pressedSignup={pressedSignup}
            setPressedSignup={setPressedSignup} />} />
          <Route path='/flow/signup' element={<SignupPage 
            // signedUp={signedUp} 
            // setSignedUp={setSignedUp} 
            />} 
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