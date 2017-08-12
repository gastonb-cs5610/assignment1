(function () {
    angular
        .module("WebAppMaker")
        .factory('JobService', JobService);

    function JobService($http) {

        var services = {
            'findJobById': findJobById,
            'findAllJobs': findAllJobs,
            'createJob': createJob,
            'updateJob': updateJob,
            'removePhotographer': removePhotographer,
            'deleteJob': deleteJob
        };
        return services;

        function removePhotographer(jobId) {
            var url = '/api/project/removePhotographer/' + jobId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function findJobById(jobId) {
            var url = '/api/project/job/' + jobId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllJobs(search) {
            var url = '/api/project/job?search=' + search;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createJob(userId, job) {
            var url = "/api/project/job/" + userId;
            return $http.post(url, job)
                .then(function (response) {
                    return response.data;
                });

        }

        function updateJob(jobId, job) {
            var url = "/api/project/job/" + jobId;
            return $http.put(url, job)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteJob(userId, jobId) {
            var url = "/api/project/user/" + userId +"/job/" + jobId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }


})();