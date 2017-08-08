const app = require('../../express');
var homeModel = require('../models/home/home.model.server.js');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

passport.use('project', new LocalStrategy(localStrategy2));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post  ('/api/project/register',  register);
app.post('/api/project/login', passport.authenticate('project'), login);

app.get('/api/project/user', findAllUsers);
app.get('/api/project/loggedin', loggedin);


function loggedin(req, res) {
    console.log(req.user);
    if (req.isAuthenticated()) {
        console.log("is logged in ");
        res.json(req.user);
    } else {
        console.log("is not logged in ");
        res.send('0');
    }
}

function localStrategy2(username, password, done) {
    homeModel
        .findUserByUsername(username)
        .then(function (user) {
            console.log(user);
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log("here");
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res, next) {
    console.log("login");
    passport.authenticate('project', function (err, user, info) {
        if (err) {
            console.log(err, "error");

            return next(err);
        }
        if (!user) {
            console.log(user, "no user");

            return res.status(401).send(info.message);
        }
        
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
}


function register(req, res) {
    console.log("in server-- register");
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);

    console.log(newUser);
    return homeModel
        .createUser(newUser)
        .then(function (user) {
            console.log("promise recieved");
            req.login(user, function (status) {
                    res.send(status);
                });
        })
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;

    console.log("serverside", username);


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
        console.log("got to here");
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    homeModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (error) {
                done(error, null);
            }
        );
}

