/**
 * Adjust from github:
 * https://github.com/huoming/cs5610-summer-2017/blob/
 * master/client_side_dev/assignment/services/user.service.client.js
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http ) {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
            {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        ];
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;


        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                    
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" + username;

            return $http.get(url)
                .then(function (response) {
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
            console.log("1", userId, user);


            var url = "/api/assignment/user/" + userId;

            console.log(url);


            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
            // var oldUser = findUserById(userId);
            // console.log(oldUser);
            // var index = users.indexOf(oldUser);
            //
            // console.log(oldUser);
            // console.log(index);
            //
            // users[index].firstName = user.firstName;
            // users[index].lastName = user.lastName;
            // users[index].email = user.email;
        }

        function deleteUser(userId) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);
            users.splice(index);
        }
    }
})();