var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}]
}, {collection: "assignment_user"});

module.export = userSchema;