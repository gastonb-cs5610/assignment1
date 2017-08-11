(function () {
    angular
        .module("WebAppMaker")
        .factory('HomeService', HomeService);

    function HomeService($http) {

        var interestedUser;


        var services = {
            'userRemember': userRemember,
            'rememberUser': rememberUser,
            'register': register,
            'login' : login,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };

        return services;

        function checkLoggedIn() {
            var url=  '/api/project/loggedin';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function userRemember(newUser) {
            interestedUser = newUser;
        }

        function rememberUser() {
            return interestedUser;
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username : username,
                password : password
            };

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(newUser) {
            var url = "/api/project/register";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
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