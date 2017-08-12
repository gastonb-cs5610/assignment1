var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "HomeModel"},
    interested: [{type: mongoose.Schema.Types.ObjectId, ref: "HomeModel"}],
    photographer: {type: mongoose.Schema.Types.ObjectId, ref: "HomeModel"},
    status: {type: String, enum: ['PENDING', 'MATCHED', 'COMPLETED', 'INCOMPLETE']},
    name : String,
    location: String,
    zip: String,
    description: String,
    startTime: String,
    endTime: String,
    compensation: String,
    date: {type:Date},
    reviewed: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "proj.job"});

module.exports = jobSchema;