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

                UserService
                    .login(user.username, user.password)
                    .then(function (userCheck) {
                        if (userCheck) {
                            $location.url("/profile");
                        }
                    }, function (error) {
                        vm.error = "User not found.";
                    });
            }
        }


    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(mUser) {

            console.log("called register")

            if (mUser.username === undefined || mUser.username === null || mUser.username === ""
                || mUser.password === undefined || mUser.password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (mUser.password !== mUser.vpassword) {
                vm.error = "Password does not match.";
                return;
            }

            console.log("called register2")


            UserService
                .findUserByUsername(mUser.username)
                .then(function () {
                        console.log("erroer");
                        vm.error = "Username already exists.";
                    }, function () {
                        var newUser = {
                            username: mUser.username,
                            password: mUser.password,
                            firstName: "",
                            lastName: "",
                            email: ""
                        };
                        return UserService
                            .register(newUser)
                            .then(function () {
                                $location.url("/profile");
                            });
                    }
                );
        }
    }

    function ProfileController(currentUser, $timeout, UserService, $location) {
        var vm = this;

        vm.user = currentUser;

        vm.logout = logout;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })

        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login')
                }, function () {
                    model.error = "Unable to delete user";

                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }

        function updateUser(user) {

            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.updated = "Profile changes saved!!";

                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);

                }, function () {
                    vm.updated = "Profile was unable to be updated.";
                });

        }


    }

})();