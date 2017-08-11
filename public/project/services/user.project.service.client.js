(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "findUserByUsername": findUserByUsername,
            "logout": logout,
            "updateUser": updateUser
        };
        return services;

        function findUserByUsername(username) {
            var url = "/api/project/profile/" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
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