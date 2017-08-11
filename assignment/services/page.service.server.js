const app = require('../../express');
var pageModel = require('../models/page/page.model.server.js');

app.get('/api/assignment/website/:websiteId/page', findPagesByWebsite);
app.get('/api/assignment/page/:pageId', findPageById);

app.post('/api/assignment/website/:websiteId/page', createPage);

app.put('/api/assignment/page/:pageId', updatePage);

app.delete('/api/assignment/page/:pageId', deletePage);

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.send(status);
        })
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.send(status);
        })

}

function findPageById(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })

}


function findPagesByWebsite(req, res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (page) {
            res.json(page);
        })

}

function createPage(req, res) {
    var page = req.body;

    pageModel
        .createPage(req.params.websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.send(err);
        });
}

