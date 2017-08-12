var mongoose = require('mongoose');
var jobSchema = require('./job.schema.server');
var jobModel = mongoose.model('JobModel', jobSchema);
var homeModel = require('../home/home.model.server.js');


jobModel.createJobForUser = createJobForUser;
jobModel.deleteJobFromUser = deleteJobFromUser;

jobModel.findJobById = findJobById;
jobModel.findJobsByUser = findJobsByUser;
jobModel.findAllJobs = findAllJobs;

jobModel.removePhotographer = removePhotographer;

jobModel.updateJob = updateJob;

module.exports = jobModel;

function removePhotographer(jobId) {
   return jobModel.update({_id: jobId}, {$unset: {photographer: 1}});
}

function findAllJobs() {
        return jobModel.find();
}

function createJobForUser(userId, job) {
    job._user = userId;
    return jobModel
        .create(job)
        .then(function (job) {
            return homeModel
                .addJob(userId, job._id)
        })
}


function findJobById(jobId) {
    return jobModel.findById(jobId);
}

function findJobsByUser(userId) {
    return homeModel
        .find(userId)
        .then(function (user) {
            return user.jobs;
        });
}


function updateJob(jobId, job) {
    return jobModel.update(
        {_id: jobId},
        {$set: job}
    );
}

function deleteJobFromUser(userId, jobId) {

    console.log("in model.");

    return jobModel
        .remove({_id: jobId})
        .then(function (status) {
            console.log("deleting");
            return homeModel
                .deleteJob(userId, jobId);
        });
}