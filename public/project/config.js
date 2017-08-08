(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: "views/home/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
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


})();