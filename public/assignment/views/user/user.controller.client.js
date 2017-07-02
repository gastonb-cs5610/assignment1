(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;


        function login(user) {

            if (!user || user.username === "" || user.password === "") {
                vm.error = "Enter your login credentials.";
            } else {

                //var userCheck = UserService.findUserByCredentials(user.username, user.password);
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function (userCheck) {
                        if (userCheck) {
                            $location.url("/user/" + userCheck._id);
                        } else {
                            vm.error = "Unable to login";
                        }
                    });
            }
        }


    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(mUser) {
            console.log(mUser);
            if (mUser.username === undefined || mUser.username === null || mUser.username === ""
                || mUser.password === undefined || mUser.password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (mUser.password !== mUser.vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            //var user = UserService.findUserByUsername(mUser.username);
            UserService.findUserByUsername(mUser.username)
                .then(function () {
                        vm.error = "Username already exists.";
                    }, function () {
                        var newUser = {
                            username: mUser.username,
                            password: mUser.password,
                            firstName: "",
                            lastName: "",
                            email: ""
                        };
                        UserService
                            .createUser(newUser)
                            .then(function (user) {
                        $location.url("/user/" + user._id);
                    });
                    }
                );

            // if (user === null) {
            //     user = {
            //         username: mUser.username,
            //         password: mUser.password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     UserService.createUser(user);
            //     user = UserService.findUserByUsername(user.username);
            //     console.log(user);
            //     $location.url("/user/" + user._id);
            // }
            // else {
            //     vm.error = "Username already exists.";
            // }
        }
    }

    function ProfileController($routeParams, $timeout, UserService) {

        var vm = this;
        vm.userId = $routeParams["uid"];
        //vm.user = angular.copy(UserService.findUserById(vm.userId));


        UserService
            .findUserById(vm.userId)
            .then(renderUser);

        function renderUser(user) {
            vm.user = user;
        }


        vm.updateUser = updateUser;

        function updateUser() {

            var update_user = {
                _id: $routeParams.uid,
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                email: vm.user.email
            };
            UserService.updateUser($routeParams.uid, update_user);
            vm.updated = "Profile changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }


    }

})();