(function () {
    angular
        .module("WebAppMaker")
        .controller("NewJobController", NewJobController)
        .controller("JobListController", JobListController)
        .controller("DisplayJobController", DisplayJobController)
        .controller("FindJobController", FindJobController)
        .controller("EditJobController", EditJobController);


    function DisplayJobController($routeParams, JobService, HomeService, currentUser, UserService) {
        var vm = this;
        vm.jobId = $routeParams.jobId;
        vm.currentUserId = currentUser._id;
        vm.apply = apply;
        vm.user = currentUser;

        function apply() {
            vm.job.interested.push(currentUser);
            JobService
                .updateJob(vm.jobId, vm.job)
                .then(function () {
                    UserService
                        .applyToJob(vm.currentUserId, vm.jobId)
                        .then(function () {
                            console.log("applied");
                            vm.success = "Applied!";
                            vm.applied = true;
                        });
                });

        }

        function init() {
            JobService
                .findJobById(vm.jobId)
                .then(function (job) {
                    vm.job = job
                }).then(findOwner);
            vm.applied = checkIfApplied();

        }
        init();

        //Find Seeker who posted job.
        function findOwner() {
            console.log("here");
            HomeService
                .findUserById(vm.job._user)
                .then(function (user) {
                    vm.owner = user.username;
                });
            vm.owned = checkIfOwned();
        }

        //Check if Taker has applied for position.
        function checkIfApplied() {
            console.log("In check")

            var len = currentUser.jobs.length;
            console.log(len)
            for (var i=0; i < len; i++) {
                if (currentUser.jobs[i] === vm.jobId) {
                    console.log("In loop")
                    return true;
                }
            }
            return false;
        }

        function checkIfOwned() {
            return (vm.currentUserId === vm.job.photographer);
        }

    }

    function FindJobController(JobService) {
        var vm = this;
        vm.allJobs = [];
        vm.search = search;
        vm.jobsList = [];

        function init() {
            JobService
                .findAllJobs()
                .then(findJobs)
        }
        init();

        function findJobs(jobs) {
            var len = jobs.length;
            if (jobs.len < 1) {
                vm.error = "There are no jobs at this time.";
                return;
            }
            for (var i=0; i < len; i++) {
                if (jobs[i].status = 'PENDING') {
                    vm.allJobs.push(jobs[i]);
                }
            }
            vm.jobsList = vm.allJobs;
        }

        function search() {
            vm.searchJobs = [];
            var len = vm.allJobs.length;
            for (var i = 0; i < len; i++) {
                var job = vm.allJobs[i];
                if (job.date === vm.searchDate
                    || (vm.searchWords && (job.description.indexOf(vm.searchWords) !== -1)
                    || job.name.indexOf(vm.searchWords) !== -1)) {
                    vm.searchJobs.push(job);
                }
            }
            vm.jobsList = vm.searchJobs;
            if (vm.jobsList.length < 1) {
                vm.error = "No jobs matching search."
            }
        }
    }

    function JobListController(currentUser, $location, JobService, UserService) {
        var vm = this;
        vm.userId = currentUser._id;
        vm.jobs = currentUser.jobs;
        vm.type = currentUser.type;
        vm.jobsList = [];
        vm.logout = logout;

        function init() {
            var len = vm.jobs.length;
            for (var i = 0; i < len; i++) {
                JobService
                    .findJobById(vm.jobs[i])
                    .then(function (job) {
                        console.log("JOBS Interest", job.interested.length);
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
