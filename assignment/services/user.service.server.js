const app = require('../../express');
var userModel = require('../models/user/user.model.server.js');

var users = [
    {
        _id: "123",
        username: "alice",
        password: "alice",
        firstName: "Alice",
        lastName: "Wonder",
        email: "alice@gmail.com"
    },
    {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    {
        _id: "345",
        username: "charly",
        password: "charly",
        firstName: "Charly",
        lastName: "Garcia",
        email: "charles@bing.com"
    },
    {
        _id: "456",
        username: "jannunzi",
        password: "jannunzi",
        firstName: "Jose",
        lastName: "Annunzi",
        email: "jose@neu.com"
    }
];


app.get('/api/assignment/user', findAllUsers);
app.get('/api/assignment/user/:userId', findUserById);

app.put('/api/assignment/user/:userId', updateUser);

app.delete('/api/assignment/user/:userId', deleteUser);

app.post('/api/assignment/user', createUser);


function deleteUser(req, res) {
    var userId = req.params.userId;

    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function updateUser(req, res) {
    var user = req.body;
    console.log("THIS USER:", user)
    for (u in users) {
        if (parseInt(users[u]._id) === parseInt(req.params.userId)) {
            users[u] = user;
            res.sendStatus(200);
            console.log(users);
            return;
        }
    }
    res.sendStatus(404);
}

function createUser(req, res) {

    console.log(userModel);
    var user = req.body;


    userModel
        .createUser(user)
        .then(function (doc) {
            res.json(user);
        })
}


function findAllUsers(req, res) {

    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        for (var u in users) {
            var user = users[u];
            if (user.username === username && user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else if (username) {
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else {
        res.json(users);
    }
};


function findUserById(req, res) {
    console.log("umm in server");

    var userId = req.params['userId'];
    console.log("umm in server", userId);

    for (u in users) {
        if (parseInt(users[u]._id) === parseInt(userId)) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
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

    return users.reduce(getMaxId, 0).toString();
}