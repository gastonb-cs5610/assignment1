module.exports = function(){


    var mongoose = require('mongoose');

    connectionString = 'mongodb://localhost/cs5610';


    if(process.env.NODE_ENV === 'development') {
        connectionString = 'mongodb://localhost/cs5610'
    } else {
        connectionString = 'mongodb://assignment:test@ds055495.mlab.com:55495/bgwebdev';
    }

    mongoose.Promise = require('q').Promise;
    mongoose.connect(connectionString);


    require("./services/home.service.server.js");
    require("./services/user.project.service.server");
    require("./services/job.service.server");



    require("../shared/passport.js");

};