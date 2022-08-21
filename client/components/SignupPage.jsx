import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

const SignupPage = (props) => {
  const { pressedSignup, setPressedSignup } = props;
  
  const [signedUp, setSignedUp] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [signupCreds, setSignupCreds] = useState({
    username: '',
    email: '',
    pass: ''
  });

  const navigate = useNavigate();

  const postSignupCreds = (e) => {
    e.preventDefault();
    fetch('/authorize/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signupCreds.username,
        email: signupCreds.email,
        pass: signupCreds.pass
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
        setSignupCreds({
          username: '',
          email: '',
          pass: ''
      }))
  }

  return (
    <div className="signup-page-wrapper">
      <h2>Sign Up Here:</h2>
      <br />
      {!signedUp &&
      <form className="signup-form" action="/authorize/signup" method="POST">
        <div className="signup-page-format">
          <label for="username">Username</label>
          <input name="username" type="text" value={signupCreds.username} id="signup-post-username" onChange={(e) => setSignupCreds({...signupCreds, username: e.target.value})} />
        </div>
        <div className="signup-page-format">
          <label for="email">Email</label>
          <input name="email" type="text" value={signupCreds.email} id="signup-post-email" onChange={(e) => setSignupCreds({...signupCreds, email: e.target.value})} />
        </div>
        <div className="signup-page-format">
          <label for="pass">Password</label>
          <input name="pass" type="text" value={signupCreds.pass} id="signup-post-pass" onChange={(e) => setSignupCreds({...signupCreds, pass: e.target.value})} />
        </div>
        <div>
          <button type="submit" onClick={postSignupCreds}>Create Account</button>
        </div>
      </form>
      }
      {signedUp && 
          <div>Success signing up! Now go login {':)'}</div>
      }
      {accountExists &&
        <div>An account already exists - forget your password?</div>
      }
    </div>
  )
};

export default SignupPage;