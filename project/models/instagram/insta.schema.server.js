var mongoose = require('mongoose');

var instaSchema = mongoose.Schema({
    authID: String,
    username: String,
    accessToken: String
}, {collection: "proj.insta"});

module.exports = instaSchema;