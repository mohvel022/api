var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan  = require('morgan')

var points = require('./routes/points/points');
var club = require('./routes/club/club');
var events = require('./routes/events/events');
var autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = require('bluebird');

var db = mongoose.connect('mongodb://admin:mohit@ds147799.mlab.com:47799/mohittestdb', function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("The Database is connected")
  }
});

// Init App
var app = express();


// View Engine
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// for loggin requests to the Server
app.use(morgan('dev'))



// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.get('/', function(req, res){
  res.send('welcome to our API FAMSSS')
})
app.use('/', points);
app.use('/', club);
app.use('/', events);


// Set Port
app.set('port', (process.env.PORT || 3000 ));

app.listen(app.get('port'), function(){
	console.log('Server is open on port: '+ app.get('port'));
});
