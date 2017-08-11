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
homeModel.deleteJob = deleteJob;
homeModel.addJob = addJob;



module.exports = homeModel;

function deleteJob(userId, jobId) {
    return homeModel
        .findById(userId)
        .then(function (user) {
            var index = user.jobs.indexOf(jobId);
            user.jobs.splice(index, 1);
            return user.save();
        });
}

function addJob(userId, jobId) {
    console.log("adding a job");
    return homeModel
        .findById(userId)
        .then(function (user) {
            user.jobs.push(jobId);
            return user.save();
        });
}

function createUser(user) {
    return homeModel.create(user);
}

function findUserById(userId) {
    return homeModel.findById(userId);
}

function findAllUsers() {
    return homeModel.find();
}

function findUserByUsername(username) {
    return homeModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return homeModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return homeModel.update(
        {_id: userId},
        {$set: user}
    );
}

function deleteUser(userId) {
    return homeModel.remove({_id: userId});
}