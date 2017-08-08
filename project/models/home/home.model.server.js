var mongoose = require('mongoose');
var homeSchema = require('./home.schema.server');
var homeModel = mongoose.model('HomeModel', homeSchema);

homeModel.createUser = createUser;
homeModel.findUserById = findUserById;
homeModel.findAllUsers = findAllUsers;
homeModel.findUserByUsername = findUserByUsername;
homeModel.findUserByCredentials = findUserByCredentials;
homeModel.updateUser = updateUser;
homeModel.deleteUser = deleteUser;

module.exports = homeModel;

function createUser(user) {
    console.log("in create");
    return homeModel.create(user);
}

function findUserById(userId) {
    return homeModel.findById(userId);
}

function findAllUsers() {
    return homeModel.find();
}

function findUserByUsername(username) {
    console.log("in Model", username);
    return homeModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return homeModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return homeModel.update(
        {_id: userId},
        {$set:
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }}
    );
}

function deleteUser(userId) {
    return homeModel.remove({_id: userId});
}