var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server.js');

// api
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;


module.exports = websiteModel;



function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId});
}

function deleteWebsiteFromUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}
function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function createWebsiteForUser(userId, website) {
    website._user = userId;

    console.log("adding", website);

    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findAllWebsites() {
    return websiteModel.find();
}

function updateWebsite(websiteId, website) {
    return websiteModel.update(
        {_id: websiteId},
        {$set:
            {
                name: website.name,
                description: website.description
            }}
    );
}