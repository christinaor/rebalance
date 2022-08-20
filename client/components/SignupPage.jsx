import React, { useEffect, useState } from 'react'

const SignupPage = (props) => {
  const {
    signedUp,
    setSignedUp
  } = props;

  const [signupCreds, setSignupCreds] = useState({
    username: '',
    email: '',
    pass: ''
  });

  const postSignupCreds = (e) => {
    console.log(e)
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
      .then(() => {
        setSignedUp(true);
        setTimeout(() => {})
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
          {signedUp && 
            <div>Success signing up! {':)'}</div>
          }
        </form>
      </div>
  )
};

export default SignupPage;