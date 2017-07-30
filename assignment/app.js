module.exports = function(){


    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/webdev');
    //mongoose.Promise = require('q').Promise;

    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server");
    require("./services/widget.service.server");
};