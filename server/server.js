const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./models/model.js')
const apiRouter = require('./routes/api');
const signinRouter = require('./routes/signin');
const PORT = 8888;

// creating server
const app = express();
// handles 'Access-Control-Allow-Origin' header for cross-site request forgery issue
app.use(cors());
// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for production build
// app.get('/*', (req, res) => {
//   res.status(222).sendFile(path.resolve(__dirname, 'build', '../index.html'));
// });

app.use('/api', apiRouter);

app.use('/authorize', signinRouter);

// catchall
app.use('*', (req, res) => res.status(404).send('This page does not exist! ):'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
}); //listens on port 8888 -> http://localhost:8888/

module.export = app;