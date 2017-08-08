var mongoose = require('mongoose');

var homeSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    phone: String,
    description: String,
    email: String,
    type: {type: String,
        enum: ['TAKER', 'SEEKER']},
    apps: [{type: String,
        enum: ['FACEBOOK', 'INSTAGRAM', 'BOOMERANG', 'TWITTER', 'SNAPCHAT']}],
    device: {type: String, enum:['IPHONE', 'ANDROID', 'BOTH', 'OTHER']},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "proj.user"});

module.exports = homeSchema;