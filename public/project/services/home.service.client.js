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
            "findUserByUsername": findUserByUsername
        };

        return services;

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

            console.log(credentials, "credentials");

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


    }
})();