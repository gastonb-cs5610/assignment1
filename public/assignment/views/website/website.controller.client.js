(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites) {
            vm.websites = websites;
        }

    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;

        function createWebsite(newSite) {
            if (!newSite || newSite.desc === undefined || newSite.desc === null || newSite.desc === ""
                || newSite.name === undefined || newSite.name === "" || newSite.name === null) {

                vm.error = "Please enter the required fields.";
                return;
            }

            var newWebsite = {
                name: newSite.name,
                desc: newSite.desc,
                developerId: vm.userId
            };

            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website");
                });
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService, $timeout) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(renderWebsite);
        }

        init();

        function renderWebsite(website) {
            vm.website = website;
        }


        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function updateWebsite() {
            (console.log("controller"));
            var updated = {
                _id: $routeParams.wid,
                name: vm.website.name,
                developerId: $routeParams.uid,
                desc: vm.website.desc

            };

            if (!updated || updated.desc === undefined || updated.desc === null || updated.desc === ""
                || updated.name === undefined || updated.name === "" || updated.name === null) {
                vm.error = "Please enter the required fields.";
                return;
            }

            WebsiteService
                .updateWebsite($routeParams.wid, updated)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website");
                });

        }

        function deleteWebsite(wid) {
            WebsiteService
                .deleteWebsite(wid)
                .then(function () {
                    $location.url('/user/' + vm.userId + "/website");
                }, function() {
                    model.error= "Unable to delete website";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }


    }

})();