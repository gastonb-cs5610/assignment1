const app = require('../../express');
var userModel = require('../models/user/user.model.server.js');

var passport = require('passport');
var auth = authorized;

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));


var bcrypt = require("bcrypt-nodejs");




var FacebookStrategy = require('passport-facebook').Strategy;

var facebookConfig = {
    clientID: '320404104996627', // facebook app id
    clientSecret: 'c6b8bc610c3bafc10c462b9271871cf9',
    callbackURL: 'http://localhost:3000/assignment/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'displayName', 'name']
};


passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/assignment/login', login);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.get('/api/assignment/loggedin', loggedin);

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/assignment/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

app.get('/api/assignment/user', findAllUsers);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId', auth, updateUser);
app.delete('/api/assignment/user/:userId', auth, deleteUser);
app.post('/api/assignment/user', auth, createUser);


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var userEmail = profile.emails[0].value;
                var signature = userEmail.split("@")[0];
                var newFacebookUser = {
                    username: signature + '-fb',
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: userEmail,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };
                return userModel.createUser(newFacebookUser);
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        }).then(
        function (user) {
            return done(null, user);
        }, function (err) {
            if (err) {
                return done(err);
            }
        }
    );
}


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
    console.log("touched");
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};


function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username, password)
        .then(
            function (user) {
                if (user) {
                    if (user.password && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Invalid Password'});
                    }
                }
                else {
                    return done(null, false, {message: 'Incorrect Username / Password'});
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function login(req, res, next) {
    console.log("login")
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }

        console.log("LOGIN");

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
    console.log(req.user);
    if (req.isAuthenticated()) {
        console.log("is logged in ");
        res.json(req.user);
    } else {
        console.log("is not logged in ");
        res.send('0');
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
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

    console.log("serverside", username);


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
        console.log("got to here");
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

