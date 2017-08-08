/**
 * Adjust from github:
 * https://github.com/huoming/cs5610-summer-2017/blob/
 * master/client_side_dev/assignment/services/user.service.client.js
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "checkLoggedIn": checkLoggedIn,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "login": login,
            "logout": logout,
            "register": register
        };
        return services;
        
        function register(newUser) {
            var url = "/api/assignment/register";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                    
                })
        }
        
        function checkLoggedIn() {
            var url=  '/api/assignment/loggedin';

            return $http.get(url)
                .then(function (response) {
                    return response.data;
            });

        }

        function login(username, password) {
            console.log("trying")
            var url = "/api/assignment/login";
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

        function logout() {
            var url = "/api/assignment/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" + username;
            console.log("in client server", username);
            return $http.get(url)
                .then(function (response) {
                    console.log("wut", response);
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username+"&password=" +password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });

        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users.splice(index);
        }
    }
})();