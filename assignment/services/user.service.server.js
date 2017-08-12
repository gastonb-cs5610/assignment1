const app = require('../../express');
var userModel = require('../models/user/user.model.server.js');

var passport = require('../../shared/passport');

var auth = authorized;

var bcrypt = require("bcrypt-nodejs");



app.post('/api/assignment/login', login);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.get('/api/assignment/loggedin', loggedin);



app.get('/api/assignment/user', findAllUsers);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId', auth, updateUser);
app.delete('/api/assignment/user/:userId', auth, deleteUser);
app.post('/api/assignment/user', auth, createUser);

function register(req, res) {
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);
    return userModel
        .createUser(newUser)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        })
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};

function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }

        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
}


function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        })
}


function updateUser(req, res) {
    var user = req.body;

    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        })

}

function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        })
}


function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}


function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

