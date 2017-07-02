var app = require('../../express');

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


app.post('/api/assignment/user', createUser);

function createUser(req, res) {
    var user = req.body;

}



function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        console.log("serivce server");
        for (var u in users) {
            var user = users[u];
            if (user.username === username && user.password === password) {
                res.json(user);
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
    var userId = req.params['userId'];
    console.log(userId);
    for (u in users) {
        if (parseInt(users[u]._id) === parseInt(userId)) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

