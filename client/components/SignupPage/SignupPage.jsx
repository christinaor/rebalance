import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const SignupPage = (props) => {
  const {
    setPressedSignup,
  } = props;
  
  const [signedUp, setSignedUp] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [signupCredentials, setSignupCredentials] = useState({
    username: '',
    email: '',
    pass: ''
  });
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const postSignupCredentials = (e) => {
    e.preventDefault();
    fetch('/authorize/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signupCredentials.username,
        email: signupCredentials.email,
        pass: signupCredentials.pass
      })
    })
      .then(response => response.json())
      .then(signupSuccess => {
        if (signupSuccess) {
          setAccountExists(false);
          setSignedUp(true);
          setTimeout(() => {
            navigate('/flow/login', { replace: true })
            setPressedSignup(false);
          }, 5000);
        } else {
          setSignedUp(false);
          setAccountExists(true);
        }
      })
      .catch(err => `Error adding user: ${err}`)
      .finally(
        setSignupCredentials({
          username: '',
          email: '',
          pass: ''
      }))
  }

  const handleReturnToLogin = () => {
    setPressedSignup(false);
  }

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupPageMainContent}>
        <div className={styles.loginLogoAndSubtext}>
          <h1 className={styles.loginTitleText}><span className={styles.title1}>RE:</span><span>Balance</span></h1>
          <h2 className={styles.loginSubtext}>Sign Up Here (all fields required):</h2>
        </div>

        {!signedUp && <form className={styles.signupForm} action="/authorize/register" method="POST">
          <div className={styles.formField}>
            <label className={styles.formFieldLabel} htmlFor="username">Username:</label>
            <input 
              className={styles.formFieldInput} 
              name="username" 
              type="text" 
              value={signupCredentials.username} 
              id="signup-post-username" 
              onChange={(e) => setSignupCredentials({...signupCredentials, username: e.target.value})}
              required 
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel} htmlFor="email">Email:</label>
            <input 
              className={styles.formFieldInput} 
              name="email" 
              type="email" 
              value={signupCredentials.email} 
              id="signup-post-email" 
              onChange={(e) => setSignupCredentials({...signupCredentials, email: e.target.value})} 
              required
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel} htmlFor="pass">Password:</label>
            <input 
              className={styles.formFieldInput} 
              name="pass" 
              type={ showPass ? "text" : "password"} 
              value={signupCredentials.pass} 
              id="signup-post-pass" onChange={(e) => setSignupCredentials({...signupCredentials, pass: e.target.value})} 
              required
            />
          </div>
          <button className={styles.createAccountButton} type="submit" onClick={postSignupCredentials}>CREATE ACCOUNT</button>
          <button className={styles.loginButton} type="submit" onClick={handleReturnToLogin}>BACK TO LOGIN</button>
        </form>}

        {signedUp && <>Success signing up! Now go login {':)'}</>}

        {accountExists && <>An account already exists - forget your password?</>}
      </div>
    </div>
  )
};

export default SignupPage;