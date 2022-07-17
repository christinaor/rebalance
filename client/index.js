import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';
// import styles from './teststyle.css'

render(
  <App />,
  document.getElementById('root')
);
