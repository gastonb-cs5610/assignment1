module.exports = function(){


    var mongoose = require('mongoose');
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://assignment:test@ds055495.mlab.com:55495/bgwebdev';
    }
    else
    {
        connectionString = connectionString = 'mongodb://localhost:27017/cs5610'
    }

    console.log(connectionString);

    mongoose.connect(connectionString, {useMongoClient:true});



    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server");
    require("./services/widget.service.server");
};