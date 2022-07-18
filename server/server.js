const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
// const controller = require('./controller');
const db = require('./model.js')

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/*************************************
 * Starting new routes here
**************************************/

// for production build
app.get('/*', (req, res) => {
  res.status(222).sendFile(path.resolve(__dirname, 'build', '../index.html'));
});

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
}); //listens on port 3000 -> http://localhost:3000/

/**************************************
 * End here
**************************************/

// statically serve everything in the build folder on the route '/build'
// do not need when devServer is running, only for production version when webpack is not running
// point of running in production is things are not supposed to change, so code is run once (build)
// dev should be shut down when production runs
// when npm run build runs, that's what should be given to client
// the only connection between frontend to backend is through the proxy server while devServer runs
// app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// route handlers - directly in server unless need to be broken out later

// // //test route
// app.get('/', async(req, res) => {
//   const results = await db.query("SELECT * FROM purchases")
//   // console.table(results.row);
//   res.status(230).json(results.rows);
// })


// find all entries
// app.get('/api', controller.searchAllEntries, (req, res) => {
//   return res.status(240).json(res.locals.allEntries);
// })

// // find specific entry by id
// app.get('/api/:id', controller.searchEntry, (req, res) => {
//   return res.status(242).json(res.locals.foundEntry);
// })

// // add entry to db
// app.post('/api', controller.addEntry, (req, res) => {
//   return res.status(222).json(res.locals.added);
// })

// // update entry in db
// app.put('/api/:id', controller.updateData, (req, res) => {
//   return res.status(208).send(`Update ${res.locals.updateStatus}ly successful!`);
// })

// // delete entry in db
// app.delete('/api/:id', controller.deleteEntry, (req, res) => {
//   return res.status(296).send(`Deleted the entry: ${res.locals.deleteStatus}`);
// })

// // // catchall
// // app.use('*', (req, res) => res.status(404).send('This page does not exist! ):'));

// // error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });



module.export = app;