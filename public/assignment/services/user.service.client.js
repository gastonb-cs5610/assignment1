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

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return users.reduce(getMaxId, 0).toString();
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            $http.post(url);


            // var newUserId = getNextId();
            //
            // var newUser = {
            //     _id: newUserId,
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.email
            // };
            //
            // users.push(newUser);
            // return newUser;
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
            // var user = users.find(function(user) {
            //     return user.username == username;
            // });
            // if (typeof user === 'undefined') {
            //     return null;
            // }
            // return user;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username+"&password=" +password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);

            users[index].firstName = user.firstName;
            users[index].lastName = user.lastName;
            users[index].email = user.email;
        }

        function deleteUser(userId) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);
            users.splice(index);
        }
    }
})();