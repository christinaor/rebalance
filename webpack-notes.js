// Webpack bundles and compiles
// Anytime webpack.config.js is modified, development server MUST be restarted or app must be rebuilt to see changes

// Installations: npm i --save-dev webpack webpack-cli webpack-dev-server
// https://blog.bitsrc.io/create-react-app-without-create-react-app-b0a5806a92
// webpack - bundles all our code into a final build
// webpack-cli — CLI tool for providing a flexible set of commands for developers to increase speed when setting up a custom webpack project. If you’re using webpack v4 or later and want to call webpack from the command line, you need this
// webpack-dev-server — Webpack dev server is a mini Node.js Express server.It uses a library called SockJS to emulate a web socket. Will enable us to create a localhost dev environment

// main index.js with <script> tag
// <script defer src="build/bundle.js"></script>
// 'defer' waits for html to finish parsing before executing js file
// source of script tag must match output in webpack.config.js, representing the path where bundle.js will be put into


// json notes
// "npm run build" starts at index's js file, pack all modules together, compile it, then output into build folder
// creates a build folder and file at specified build path
// everytime there's a small change, "npm run build" is run again and the bundle.js file is recreated

// minification - removes white space and doesn't affect how functionality works
// uglification - changes variables and function names into combinations of letters and numbers interpretable by browser
// resulting build file is a smaller file the browser uses to load more quickly

// cross-env gives cross-platform compatibility - makes script tag work no matter which computer you're on
// concurrently gives cross-platform compatibility - allows you to run multiple commands in strings when using 'npm run <custom-command>'
// nodemon helps relaunch server everytime any change is made in BACKEND code, same as webpack DEVELOPMENT mode


// INTRO WEB DEV SERVER
// allows us to store bundle file into memory instead of saving to computer each time
// any changes are automatically applied and overwrites the bundle file in memory to new bundle file

// PRODUCTION MODE
// when server is started, PORT is specified inside server.js file

// DEV MODE
// automatically opens a dev server by default on 8080, will need to specify manually if you want to open a different port
// needs to be manually restarted after changes

// PROXY NOTES
// proxy is a feature of devServer in webpack, nothing else
// before proxy, webpack continues BAU until it reaches the devServer config
// so far, everything served to the client has come from the bundle created before devServer, and devServer stores it in memory
// when a request comes from the 'origin' (8080 in this case), the request stops at devServer and is either denied or approved - when approved, devServer looks for an endpoint match in proxy property, and then acts as a messenger by sending the request to 3000 instead of 8080
// NOTE: each port can only handle one requeset at a time
// once the request is redirected to 3000, server continues to fulfill/refuse request and sends back a response through 3000
// response stops at devServer again and devServer relays the response back to 8080


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack has different behaviors depending on the mode it's in
  mode: process.env.NODE_ENV, // 'development' OR 'production'
  entry: { // specifies where webpack looks to start building out this bundle - pointing to index.js file
    // webpack will start at the index.js file and import all modules, then look inside each module and import modules inside modules, etc. (interconnected modules create the bundle)
    src: './client/index.js' // want to start at this root
  },
  // output specific to PRODUCTION MODE
  output: { // output specifies where webpack will write the bundled file to
    filename: 'bundle.js', // output file called bundle.js
    path: path.resolve(__dirname, 'build') // put into path
    // index.html references the ./build/bundle.js file
  },
  // module tells webpack how to do the compiling
  // define file types and what to do with those files
  module: {
    rules: [
      {
        // for react files and es6 syntax, compile into js code that browser can use
        test: /\.jsx?/,
        // exclude bc already compiled into js code (nothing left to compile, faster to exclude)
        exclude: /node_modules/,

        // Note: MUST IMPORT LOADERS OR PRESETS WITH npm i to add to json file and to add as node modules
        loader: 'babel-loader', // used to compile react into machine-readable js
        options: {
          // tells webpack which types of files will be expected for compiling into js code (env for es6, react for react)
          // configuration for babel loader itself
          presets: ['@babel/env', '@babel/react'] 
        }
      },
      {
        // testing for css/sass files
        test: /\.s?css/,
        use: [
          // must be ordered from right to left
          // 1 sass-loader converts scss to css
          // 2 css-loader resolves css imports in js file
          // 3 style-loader inserts css into page so styling applied to all different html elements
          'style-loader', 'css-loader', 'sass-loader'
        ]
      }
    ]
  },

  // FOR DEV MODE
  // plugin related to the HTML CONTENT
  plugins: [
    // tells webpack which html file to serve up to port default 8080
    // 'HtmlWebpackPlugin' searches for specific file name to use as template
    new HtmlWebpackPlugin({
      title: 'Development',
      // references the path of index.html file and serves the html to the client
      template: 'index.html'
    })
  ],
  // devServer related to the BUNDLE JS - where to place bundle js file in memory
  // how to configure our devServer - "virtual folder in memory"
  // DEVELOPMENT MODE uses a virtual build folder created in memory instead of the 'output' local paths
  // when code is altered, bundle is altered and is then served up at port8080
  devServer: {
    static:{
      // 'publicPath' tells webpack at which path to serve up static content/bundle created
      // creates a virtual representation of the build folder in memory and place bundle in endpoint with 'build'
      // MUST be related to index.html <script> tag
      publicPath: '/build' // for JS
      // 'directory' relevant for serving other static content (e.g., images), can be left out here since there's nothing else
      // directory: path.resolve(__dirname, 'build')
    },
    // 'proxy' is saying, if we make any frontend requests, send them to port3000 instead of port8080 since our server runs on 3000
    // handles any nested routes requests within api
    // only need the script tag in index.html if you want to use it as a template
    proxy: {
      '/api': 'http://localhost:3000'
      // '/api/** ': 'http://localhost:3000' ** can handle all nested apis
      // can use '/' instead to handle all requests at 3000
      // basically a router to a different server with specific port
    }
  }
}

