/**
 * Created by bluegaston on 6/29/17.
 */



module.exports = function() {
    console.log("inside module exports");
    require("./services/user.service.server.js");
    require("./services/website.service.server.js");
    require("./services/page.service.server.js");
    require("./services/widget.service.server.js");
};