const express = require("express");
const path = require("path");
const createError = require("http-errors");

//create the app instance where all the routers
//will mount to.
const app = express();

//routers
var homeRouter = require("./routes/home");
var dogRouter = require("./routes/dogAPI");

//use middleware
app.use(express.json()); //body parser
app.use(express.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set default path
app.use(express.static(path.join(__dirname, 'public')));

//create the port where the server will mount to
const PORT = process.env.PORT || 3000;

//use routers
app.use("/", homeRouter);
app.use('/about', dogRouter);

/* // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});  */ 

app.get("/test", (req,res) => {
    //res.send("Welcome to the test page");
    console.log("test page reached")
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log("App up at port " + PORT);
});