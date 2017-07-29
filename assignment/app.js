/**
 * Created by bluegaston on 6/29/17.
 */


module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/webdev');
    mongoose.Promise = require('q').Prommise;

    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server.js");
    require("./services/widget.service.server.js");
};