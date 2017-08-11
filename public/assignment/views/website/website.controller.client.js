(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController(currentUser, WebsiteService) {
        var vm = this;
        vm.userId = currentUser._id;

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

    function NewWebsiteController(currentUser, $location, WebsiteService) {
        var vm = this;
        vm.userId = currentUser._id;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(renderWebsiteList, errorMsg);
        }

        init();

        function errorMsg() {
            vm.error = ("Something went wrong.");

        }

        function renderWebsiteList(websites) {
            vm.websites = websites;
        }


        vm.createWebsite = createWebsite;



        function createWebsite(newSite) {
            if (!newSite || newSite.description === undefined || newSite.description === null || newSite.description === ""
                || newSite.name === undefined || newSite.name === "" || newSite.name === null) {

                vm.error = "Please enter the required fields.";
                return;
            }


            var newWebsite = {
                name: newSite.name,
                description: newSite.description
            };

            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .then(function () {
                    $location.url("/website");
                });
        }

    }

    function EditWebsiteController(currentUser, $routeParams, $location, WebsiteService, $timeout) {
        var vm = this;
        vm.userId = currentUser._id;
        vm.websiteId = $routeParams["wid"];
        vm.websites = [];

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(renderWebsiteList);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(renderWebsite);
        }

        init();

        function renderWebsiteList(websites) {
            vm.websites = websites;
        }

        function renderWebsite(website) {
            vm.website = website;
        }


        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function updateWebsite() {

            var updated = {
                _id: $routeParams.wid,
                name: vm.website.name,
                developerId: vm.userId,
                description: vm.website.description
            };

            if (!updated || updated.description === undefined || updated.description === null || updated.description === ""
                || updated.name === undefined || updated.name === "" || updated.name === null) {
                vm.error = "Please enter the required fields.";
                return;
            }

            WebsiteService
                .updateWebsite($routeParams.wid, updated)
                .then(function () {
                    $location.url("/website");
                });

        }

        function deleteWebsite(wid) {
            WebsiteService
                .deleteWebsite(vm.userId, wid)
                .then(function () {
                    $location.url("/website");
                }, function () {
                    vm.error = "Unable to delete website";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }


    }

})();