var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

passport.serializeUser(serializeUser);
function serializeUser(user, done) {
    done(null, user);
}


var LocalStrategy = require('passport-local').Strategy;
passport.use('local', new LocalStrategy(localStrategy));

passport.use('project', new LocalStrategy(localStrategy2));


function localStrategy2(username, password, done) {
    homeModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

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


var userModel = require('../assignment/models/user/user.model.server');
var homeModel = require('../project/models/home/home.model.server');

passport.deserializeUser(deserializeUser);
function deserializeUser(user, done) {
    if (user.project) {
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
    } else {
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
}


//FACEBOOK

var FacebookStrategy = require('passport-facebook').Strategy;


var facebookConfig = {
    clientID: '320404104996627', // facebook app id
    clientSecret: 'c6b8bc610c3bafc10c462b9271871cf9',
    callbackURL: 'http://localhost:3000/assignment/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'displayName', 'name']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


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

module.exports = passport;
