const app = require('../../express');
var homeModel = require('../models/home/home.model.server.js');

var passport = require('../../shared/passport');

// var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

app.post  ('/api/project/register',  register);
app.post('/api/project/login', passport.authenticate('project'), login);

app.put('app/project/addInsta', addInsta);

app.post('/api/project/logout', logout);
app.get('/api/project/user', findAllUsers);
app.get('/api/project/loggedin', loggedin);
app.get('/api/project/user/:userId', findUserById);

app.get('/auth/instagram/',
    passport.authorize('instagram'),
    function(req, res){});
app.get('/auth/instagram/callback',
    passport.authorize('instagram', { failureRedirect: '/' }),
    renderInsta);

function renderInsta(req, res) {
    var token = req.user.accessToken;
    //TODO: HOW DO I GET THIS!!?!?!
    res.redirect('https://api.instagram.com/v1/users/self/media/recent/access_token='+ token);
}



function addInsta(req, res) {
    console.log("hello");
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    console.log("find User By Id", userId);
    homeModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function loggedin(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function login(req, res, next) {
    passport.authenticate('project', function (err, user, info) {
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


function register(req, res) {
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);

    return homeModel
        .createUser(newUser)
        .then(function (user) {
            req.login(user, function (status) {
                    res.send(status);
                });
        })
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;

    if (username && password) {
        homeModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if (username) {
        homeModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        homeModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}




