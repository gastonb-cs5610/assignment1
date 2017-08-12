const app = require('../express');

var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

passport.serializeUser(serializeUser);


var InstagramStrategy = require('passport-instagram').Strategy;


function serializeUser(user, done) {
    done(null, user);
}


var LocalStrategy = require('passport-local').Strategy;
passport.use('local', new LocalStrategy(localStrategy));

passport.use('project', new LocalStrategy(localStrategy2));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/assignment/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));


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
var instaModel = require('../project/models/instagram/insta.model.server');


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

var instagramConfig = {
    clientID: '5fb9dd6c97da4a89925dad9c62e91947',
    clientSecret: 'fdec21f646884155b73e428133aec67e',
    callbackURL: 'http://localhost:3000/auth/instagram/callback',
    passReqToCallback: true
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

passport.use(new InstagramStrategy(instagramConfig, instagramStrategy));


function instagramStrategy(req, accessToken, refreshToken, profile, done) {
    var signedIn = req.user;

    homeModel
        .findOne({authID: profile.id}, function (err, user) {
            if (err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                console.log("USERFIRST", user);
                console.log("PROFILE", profile);

                // user = {
                //     authID: profile.id,
                //     username: profile.username,
                //     accessToken: accessToken
                // };

                signedIn.authID = profile.id;
                signedIn.usernameIG = profile.username;
                signedIn.accessToken = accessToken;

                signedIn.save()
                    .then(function () {
                    console.log("MADE IT");
                    done(null, signedIn);
                });
            }
        });
}


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
