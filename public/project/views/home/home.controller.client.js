(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("HomeController", HomeController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, HomeService) {
        var vm = this;
        vm.login = login;

        function login(user) {


            if (!vm.user || vm.user.username === "" || vm.user.password === "") {
                vm.error = "Enter your login credentials.";
            } else {

                HomeService
                    .login(vm.user.username, vm.user.password)
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

    function HomeController($location, HomeService) {
        var vm = this;
        vm.collectData = collectData;

        function collectData(user, vPassword) {

            if (!user || user.name === "" || user.name === "") {
                vm.error = "Enter all required fields credentials.";
                return;
            }

            if (user.password !== vPassword) {
                vm.error = "Passwords do not match.";
                return;
            }

            if (user.type === 'SEEKER' || user.type === 'TAKER') {
                HomeService.userRemember(user);
                $location.url("/register")
            } else {
                vm.error = "Missing user type selection."
            }
        }
    }

    function RegisterController(HomeService, $location) {
        var vm = this;
        vm.register = register;

        function init() {
            vm.user = HomeService.rememberUser();
        }
        init();

        function register() {
            if (!vm.user || vm.user.device === "" || vm.apps === "" ||
                vm.user.device === undefined || vm.apps === undefined) {
                vm.error = "Please provide additional information.";
                return;
            }

            vm.user.apps = [];
            for (var property in vm.apps) {
                if (vm.apps.hasOwnProperty(property)) {
                    console.log(property);
                    vm.user.apps.push(property);
                }
            }

            HomeService
                .findUserByUsername(vm.user.username)
                .then(function () {
                        console.log("error");
                        vm.error = "Username already exists.";
                    }, function () {
                        console.log("goign to get");
                        var newUser = vm.user;
                        return HomeService
                            .register(newUser)
                            .then(function (){
                                $location.url("/profile");
                            });
                    }
                );


        }
    }
})();