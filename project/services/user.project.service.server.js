const app = require('../../express');
var homeModel = require('../models/home/home.model.server.js');

var auth = authorized;


app.get('/api/project/profile/:username', findUserByUsername);
app.put('/api/project/user/:userId', auth, updateUser);
app.put('/api/project/taker/apply/:userId/:jobId', addJob);



function addJob(req, res) {
    var jobId = req.params.jobId;
    var userId = req.params.userId;

    homeModel
        .addJob(userId, jobId)
        .then(function (status) {
            console.log("hang");
            res.send(status);
        }, function (err) {
            res.send(err);
        })

}


function findUserByUsername(req, res) {
    var username = req.params.username;

    homeModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });

}

function updateUser(req, res) {
    var user = req.body;

    console.log("I AM HERE~");

    homeModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        })

}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};