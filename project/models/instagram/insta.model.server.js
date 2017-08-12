var mongoose = require('mongoose');
var instaSchema = require('./insta.schema.server');
var instaModel = mongoose.model('InstaModel', instaSchema);

instaModel.createInsta = createInsta;


module.exports = instaModel;


function createInsta(insta) {
    console.log("insta", insta);
    return instaModel.create(insta);
}