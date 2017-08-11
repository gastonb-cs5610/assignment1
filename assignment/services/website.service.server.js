const app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.get('/api/assignment/user/:userId/website', findWebsitesByUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);

app.post('/api/assignment/user/:userId/website', createWebsite);

app.put('/api/assignment/website/:websiteId', updateWebsite);

app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

function updateWebsite(req, res) {
    var website = req.body;

    websiteModel
        .updateWebsite(req.params.websiteId, website)
        .then(function (status) {
            res.send(status);
        })

}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;

    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (status) {
            res.send(status);
        });


}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
    });
}


function findWebsitesByUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (user) {
            res.json(user);
        })
}

function createWebsite(req, res) {
    var website = req.body;

    websiteModel
        .createWebsiteForUser(req.params.userId, website)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}