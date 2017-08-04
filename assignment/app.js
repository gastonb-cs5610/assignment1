module.exports = function(){


    var mongoose = require('mongoose');

    connectionString = 'mongodb://localhost/cs5610'


    if(process.env.NODE_ENV === 'development') {
        connectionString = 'mongodb://localhost/cs5610'
    } else {
        connectionString = 'mongodb://assignment:test@ds055495.mlab.com:55495/bgwebdev';
    }

    console.log(connectionString);

    mongoose.Promise = require('q').Promise;
    mongoose.connect(connectionString);


    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server");
    require("./services/widget.service.server");
};