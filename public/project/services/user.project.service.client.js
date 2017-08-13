(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "findUserByUsername": findUserByUsername,
            "logout": logout,
            "applyToJob" : applyToJob,
            "updateUser": updateUser
        };
        return services;

        function applyToJob(userId, jobId) {
            var url = "/api/project/taker/apply/" + userId + "/" + jobId;
            return $http.put(url)
                .then(function (response) {
                    console.log("here");
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/project/profile/" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            console.log("update... ", userId, user);
            var url = "/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });

        }

        function logout() {
            var url = "/api/project/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



    }
})();