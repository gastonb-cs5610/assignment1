var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:'Page'}]
}, {collection: 'websites'});

module.exports = websiteSchema;