
//using express with node js
var app = require('./express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', (process.env.PORT || 3000));

var ipaddress = '127.0.0.1';

app.use(app.express.static(__dirname+'/public'));

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var appFn = require("./assignment/app.js");
appFn();

var appPn = require("./project/app.js");
appPn();



app.get('/', function(request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});