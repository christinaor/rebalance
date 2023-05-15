/**
 * ************************************
 *
 * @module  LoginPage
 * @author
 * @date
 * @description 
 *
 * ************************************
 */

import React, { useState } from "react";

import styles from './styles.module.scss';

const LoginPage = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    pass: ''
  })
  // TODO - show password
  // const [showPass, setShowPass] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const {
    navigate,
    cookies,
    setCookie,
    removeCookie,
    isLoggedIn,
    setIsLoggedIn,
    pressedSignup,
    setPressedSignup,
    cookieTimeout,
    setCookieTimeout
  } = props;

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/authorize/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginCredentials.email,
        pass: loginCredentials.pass
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.loginSuccess) {
          setIsLoggedIn(true);
          setCookie('user', data.user, { path: '/' });
          setFailedLogin(false);
          // expiration of 1min for 'user' cookie
          setCookieTimeout(setTimeout(() => {
            removeCookie('user', { path: '/' });
            setIsLoggedIn(false);            
            navigate('/flow/login', { replace: true });
          }, 1000*60*60));
        } else setFailedLogin(true);
      })
      .catch(err => `Error checking credentials of user login: ${err}`)
      .finally(
        setLoginCredentials({
          email: '',
          pass: ''
        })
      )
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageMainContent}>
        <div className={styles.loginLogoAndSubtext}>
          <h1 className={styles.loginTitleText}><span className={styles.title1}>RE:</span><span>Balance</span></h1>
          <h2 className={styles.loginSubtext}>Manage reconciliations with your circles easily.</h2>
        </div>

        <form className={styles.loginForm} action="/authorize/signin" method="POST">
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}  htmlFor="login-email">Email:</label>
            <input className={styles.formFieldInput} name="login-email" type="email" value={loginCredentials.email} onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})} required />
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}  htmlFor="login-pass">Password:</label>
            <input className={styles.formFieldInput} name="login-pass" type="password" value={loginCredentials.pass} onChange={(e) => setLoginCredentials({...loginCredentials, pass: e.target.value})} required />
          </div>
          <button className={styles.loginButton} onClick={handleLogin}>LOG IN</button>
        </form>

        <>
          { failedLogin &&
            <p>Forgot password?</p>
          }
        </>

        <div className={styles.newMemberSignup}>
          <span>New member?</span>
          <button className={styles.loginPageSignupButton} onClick={() => setPressedSignup(true)}>SIGN UP</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;