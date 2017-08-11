const app = require('../../express');
var homeModel = require('../models/home/home.model.server.js');
var jobModel = require('../models/jobs/job.model.server.js');

var auth = authorized;

app.get("/api/project/job/:jobId", findJobById);
app.post("/api/project/job/:userId", auth, createJob);

app.put("/api/project/job/:jobId", auth, updateJob);
app.delete("/api/project/user/:userId/job/:jobId", auth, deleteJob);

app.get("/api/project/job", findAllJobs);

function findAllJobs(req, res) {

    console.log("1");
    if (req.query['search'] !== "undefined") {
        var resSearch = req.query['search'];
    }

    if (req.query['date'] !== "undefined") {
        var resDate = req.query['date'];
    }

    if (resSearch && resDate) {
        //TODO: search based on words and date
    } else if (resSearch) {
        //TODO: search based on date
    } else if (resDate){
        //TODO: search based on search
    } else {
        jobModel
            .findAllJobs()
            .then(function (jobs) {
                console.log(jobs);
                res.json(jobs);
            });
    }
}

function deleteJob(req,res) {

    var jobId = req.params.jobId;
    var userId = req.params.userId;

    console.log("variables", jobId, userId);
    jobModel
        .deleteJobFromUser(userId, jobId)
        .then(function (status) {
            res.send(status);
        });
}

function updateJob(req, res) {
    var job = req.body;

    jobModel
        .updateJob(req.params.jobId, job)
        .then(function (status) {
            res.send(status);
        })
}


function findJobById(req, res) {
    console.log("server side service");

    var jobId = req.params.jobId;

    console.log("server side service");

    console.log(jobId);

    jobModel
        .findJobById(jobId)
        .then(function (website) {
            res.json(website);
        });
}

function createJob(req, res) {
    var job = req.body;

    jobModel
        .createJobForUser(req.params.userId, job)
        .then(function (job) {
            res.json(job);
        }, function (err) {
            res.send(err);
        });
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}