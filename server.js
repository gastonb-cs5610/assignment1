
//using express with node js
var app = require('./express');


// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', (process.env.PORT || 3000));

var ipaddress = '127.0.0.1';

app.use(app.express.static(__dirname+'/public'));


var appFn = require("./assignment/app.js");
appFn();

app.get('/', function(request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});