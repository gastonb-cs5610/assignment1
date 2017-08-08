const app = require('../../express');
var homeModel = require('../models/home/home.model.server.js');

var passport = require('passport');
//var auth = authorized;

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post  ('/api/project/register',  register);
app.post('/api/project/login', passport.authenticate('local'), login);

app.get('/api/project/user', findAllUsers);

function localStrategy(username, password, done) {
    homeModel
        .findUserByUsername(username)
        .then(function (user) {

            console.log("LOCAL,", user);

            console.log(user);
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log("wuddup");

                return done(null, user);
            } else {
                console.log("oh no no no no");

                return done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    console.log("loginigng in");
    var user = req.user;
    res.json(user);
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
