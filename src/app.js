const express = require("express"),
env = process.env.NODE_ENV || 'development';
var http = require('http');
const path = require("path");
const createError = require("http-errors");

//create the app instance where all the routers
//will mount to.
const app = express();

//routers
var homeRouter = require(path.join(__dirname, '../routes/home'));
var dogRouter = require(path.join(__dirname, "../routes/dogAPI"));

//make middleware
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
  }

  //use middleware
  app.use(express.json()); //body parser
  app.use(express.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded
  
  //set up view engine
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  
  //set default path
  app.use(express.static(path.join(__dirname, '../public')));
  
  /**
   * Get port from environment and store in Express.
   */
  
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  //force ssl     
  if (env === 'production') {
    app.use(requireHTTPS);
  }
//   /* Redirect http to https */
// app.get("*", function (req, res, next) {

//   if ("https" !== req.headers["x-forwarded-proto"] && "production" === process.env.NODE_ENV) {
//       res.redirect("https://" + req.hostname + req.url);
//   } else {
//       // Continue to other routes if we're not redirecting
//       next();
//   }

// });

  /**
   * Create HTTP server.
   */
  var server = http.createServer(app);
  
  //use routers
  app.use("/", homeRouter);
  app.use('/projects/dogapi', dogRouter);
  
  /* // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });  */ 
  
  //to add the header code to every pages
  
app.get("/test", (req,res) => {
  //res.send("Welcome to the test page");
  console.log("test page reached")
  res.redirect('/');
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  }