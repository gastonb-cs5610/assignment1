(function () {
    angular
        .module("WebAppMaker")
        .controller("NewJobController", NewJobController)
        .controller("JobListController", JobListController)
        .controller("DisplayJobController", DisplayJobController)
        .controller("FindJobController", FindJobController)
        .controller("EditJobController", EditJobController);


    function DisplayJobController($routeParams, JobService, HomeService) {
        var vm = this;
        vm.jobId = $routeParams.jobId;

        function init() {
            JobService
                .findJobById(vm.jobId)
                .then(function (job) {
                    vm.job = job
                }).then(findOwner)}
        init();

        function findOwner() {
            console.log("here");
            HomeService
                .findUserById(vm.job._user)
                .then(function (user) {
                    vm.owner = user.username;
                });
        }

    }

    function FindJobController(JobService) {
        var vm = this;
        vm.jobsList = [];
        vm.search = search;

        function init() {
            JobService
                .findAllJobs()
                .then(findJobs)
        }
        init();

        function findJobs(jobs) {
            var len = jobs.length;
            for (var i=0; i < len; i++) {
                if (jobs[i].status = 'PENDING') {
                    vm.jobsList.push(jobs[i]);
                }
            }
            vm.jobsList = jobs;
            if (jobs.length <= 1) {
                vm.error = "There are no jobs at this time."
            }
        }

        function search() {
            JobService
                .findAllJobs(vm.search, vm.searchDate)
                .then(function (jobs) {
                    vm.jobList = [];
                    vm.jobList = jobs;
                })
        }
    }

    function JobListController(currentUser, $location, JobService, UserService) {
        var vm = this;
        vm.userId = currentUser._id;
        vm.jobs = currentUser.jobs;
        vm.jobsList = [];
        vm.logout = logout;

        function init() {
            console.log("in iit");

            var len = vm.jobs.length;
            for (var i = 0; i < len; i++) {
                JobService
                    .findJobById(vm.jobs[i])
                    .then(function (job) {
                        vm.jobsList.push(job);
                    }, function (error) {
                        console.log("job not found.")
                    });
            }
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                })

        }
    }

    function EditJobController(currentUser, $routeParams, $location, JobService, $timeout) {
        var vm = this;
        vm.jobId = $routeParams.jobId;
        vm.currentUserId = currentUser._id;

        vm.updateJob = updateJob;
        vm.deleteJob = deleteJob;
        vm.logout = logout;

        function init() {
            JobService
                .findJobById(vm.jobId)
                .then(checkAuth)
                .then(renderJob);
        }

        init();


        function checkAuth(job) {
            if (job._user !== vm.currentUserId) {
                $location.url('/profile')
            } else {
                return job;
            }
        }

        function renderJob(job) {
            job.date = new Date(job.date);
            job.startTime = new Date(job.startTime);
            job.endTime = new Date(job.endTime);
            vm.job = job;
        }

        function updateJob(newjob) {

            if (!newjob || newjob.date === undefined || newjob.name === null || newjob.location === ""
                || newjob.startTime === undefined || newjob.compensation === "" || newjob.endTime === null
                || newjob.zip === undefined) {

                vm.error = "Please enter the required fields.";
                return;
            }


            JobService
                .updateJob(vm.jobId, newjob)
                .updateJob(vm.jobId, newjob)
                .then(function () {
                    $location.url("/job-list");
                });

        }

        function deleteJob() {
            console.log("Delete");
            JobService
                .deleteJob(vm.currentUserId, vm.jobId)
                .then(function () {
                    $location.url("/job-list");
                }, function () {
                    vm.error = "Unable to delete website";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                })

        }

    }


    function NewJobController(currentUser, $timeout, JobService, $location) {
        var vm = this;
        vm.userId = currentUser._id;
        vm.createJob = createJob;
        vm.logout = logout;

        function createJob(newjob) {

            if (!newjob || newjob.date === undefined || newjob.name === null || newjob.location === ""
                || newjob.startTime === undefined || newjob.compensation === "" || newjob.endTime === null
                || newjob.zip === undefined) {

                vm.error = "Please enter the required fields.";
                return;
            }


            newjob.status = 'PENDING';
            newjob.reviewed = false;

            JobService
                .createJob(vm.userId, newjob)
                .then(function () {
                    $location.url("/profile");
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                })

        }


    }

})();
