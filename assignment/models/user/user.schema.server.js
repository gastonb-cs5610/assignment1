var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,

    roles: [{type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']}],

    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id: String,
        token: String
    }
}, {collection: "user"});

module.exports = userSchema;