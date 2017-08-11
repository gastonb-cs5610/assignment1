(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/job-view/:jobId', {
                templateUrl: "views/jobs/job.display.view.client.html",
                controller: "DisplayJobController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkTaker
                }
            })
            .when('/find-job', {
                templateUrl: "views/jobs/job.search.view.client.html",
                controller: "FindJobController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkTaker
                }
            })
            .when('/job-list', {
                templateUrl: "views/jobs/jobs.list.view.client.html",
                controller: "JobListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/edit-job/:jobId', {
                templateUrl: "views/jobs/job.edit.view.client.html",
                controller: "EditJobController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/post-job', {
                templateUrl: "views/jobs/job.create.view.client.html",
                controller: "NewJobController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkTaker
                }
            })
            .when('/post-job', {
                templateUrl: "views/jobs/job.create.view.client.html",
                controller: "NewJobController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkTaker
                }
            })
            .when('/edit-profile', {
                templateUrl: "views/user/profile.edit.view.client.html",
                controller: "EditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/:username', {
                templateUrl: "views/user/display.view.client.html",
                controller: "DisplayController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
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
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentNoRedirect
                }
            });
    }

    function checkLoggedIn(HomeService, $q, $location) {
        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0' || !user.project) {
                    deferred.reject();
                    $location.url('/');
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
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                    $location.url('/profile');
                }
            });

        return deferred.promise;
    }

    function checkCurrentNoRedirect(HomeService, $q, $location) {

        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkTaker(HomeService, $q, $location) {
        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0' || !user.type === 'TAKER') {
                    deferred.reject();
                    $location.url('/profile');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkSeeker(HomeService, $q, $location) {
        var deferred = $q.defer();

        HomeService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0' || !(user.type === 'SEEKER')) {
                    deferred.reject();
                    $location.url('/profile');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


})();