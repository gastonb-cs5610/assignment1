const app = require('../../express');

var websites = [
    {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
    {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
    {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
    {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
    {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
    {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
];

app.get('/api/assignment/user/:userId/website', findWebsitesByUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);

app.post('/api/assignment/user/:userId/website', createWebsite);

app.put('/api/assignment/website/:websiteId', updateWebsite);

app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function updateWebsite(req, res) {
    var website = req.body;

    for (w in websites) {
        if (parseInt(websites[w]._id) === parseInt(req.params.websiteId)) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for (w in websites) {
        if (parseInt(websites[w]._id) === parseInt(websiteId)) {
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}


function findWebsitesByUser(req, res) {

    var result = [];
    for (w in websites) {

        var website = websites[w];

        if (parseInt(website.developerId) === parseInt(req.params.userId)) {
            result.push(website);
        }
    }
    res.json(result);
}

function createWebsite(req, res) {
    var website = req.body;
    website._id = getNextId();
    websites.push(website);
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
    return websites.reduce(getMaxId, 0).toString();
}