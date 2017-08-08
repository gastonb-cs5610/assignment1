(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: "views/user/profile.view.client.html",
                // controller: "LoginController",
                // controllerAs: "model"
                // resolve: {
                //     currentUser: check
                // }
            })
            .when('/login', {
                templateUrl: "views/home/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/register', {
                templateUrl: "views/home/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/about', {
                templateUrl: "views/home/about.view.client.html"
            })
            .when('/', {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            });
    }

    function checkLoggedIn(HomeService, $q, $location) {
        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    console.log("rejected");
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(HomeService, $q, $location) {

        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if(user === '0') {
                    console.log("not logged");
                    deferred.resolve({});
                } else {
                    console.log("logged");
                    deferred.resolve(user);
                    $location.url('/profile');
                }
            });

        return deferred.promise;
    }


})();