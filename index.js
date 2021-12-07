const express = require('express'); // import express
var cookieParser = require("cookie-parser"); // import cookieParser
var bodyParser = require("body-parser"); 
const apiRoutes = require('./routes/api.route');
const userRoutes = require('./routes/user.route');
var path = require('path');
const db = require('./config/db');  // import database

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static(__dirname + '/public'));

// Website Routes
app.use('/', userRoutes);
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
});

// Start Server
app.listen(process.env.PORT || 3000, function(err, result){
    if (err) console.log("Error in server setup");

    console.log("Server listening on Port");
});