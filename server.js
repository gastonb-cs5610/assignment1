
//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

app.set('port', (process.env.PORT || 3000));

var ipaddress = '127.0.0.1';

app.use(express.static(__dirname+'/public'));



app.get('/', function(request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});