(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);


    function configuration($routeProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);

        $routeProvider
            .when('/register', {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile', {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website', {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:wid', {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl: "views/pages/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: "views/pages/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: "views/pages/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when('/', {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            });
    }


    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .checkLoggedIn()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                    $location.url('/profile');
                }
            });

        return deferred.promise;
    }

})();