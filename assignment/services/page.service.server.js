const app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" },

    { "_id": "654", "name": "Post 1", "websiteId": "567", "title": "Lorem" },
    { "_id": "765", "name": "Post 2", "websiteId": "567", "title": "Lorem" },
    { "_id": "876", "name": "Post 3", "websiteId": "567", "title": "Lorem" },

    { "_id": "987", "name": "Post 1", "websiteId": "678", "title": "Lorem" },
    { "_id": "198", "name": "Post 2", "websiteId": "678", "title": "Lorem" },
    { "_id": "219", "name": "Post 3", "websiteId": "678", "title": "Lorem" }
];

app.get('/api/assignment/website/:websiteId/page', findPagesByWebsite);
app.get('/api/assignment/page/:pageId', findPageById);

app.post('/api/assignment/website/:websiteId/page', createPage);

app.put('/api/assignment/page/:pageId', updatePage);

app.delete('/api/assignment/page/:pageId', deletePage);

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for (p in pages) {
        if (parseInt(pages[p]._id) === parseInt(pageId)) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for (p in pages) {
        if (parseInt(pages[p]._id) === parseInt(pageId)) {
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}


function findPagesByWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var result = [];

    for (p in pages) {
        var page = pages[p];
        if (parseInt(page.websiteId) === parseInt(websiteId)) {
            result.push(page);
        }
    }
    res.json(result);
}

function createPage(req, res) {

    var page = req.body;
    page._id = getNextId();
    pages.push(page);
    res.sendStatus(200);
}

function getNextId() {

    function getMaxId(maxId, currentId) {
        var current = parseInt(currentId._id);
        if (maxId > current) {
            return maxId;
        } else {
            return current + 1;
        }
    }
    return pages.reduce(getMaxId, 0).toString();
}