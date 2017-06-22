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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createWebsite = createWebsite;

        function createWebsite(newSite) {


            if (!newSite || newSite.desc === undefined || newSite.desc === null || newSite.desc === ""
                || newSite.name === undefined || newSite.name === "" || newSite.name === null) {

                vm.error = "Please enter the required fields.";
                return;
            }
            WebsiteService.createWebsite(vm.userId, newSite);
            $location.url("/user/" + vm.userId + "/website");
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }

        init();



        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function updateWebsite() {
            var updated = {
                _id: $routeParams.wid,
                name: vm.website.name,
                developerId: $routeParams.uid,
                desc: vm.website.desc

            }

            if (!updated || updated.desc === undefined || updated.desc === null || updated.desc === ""
                || updated.name === undefined || updated.name === "" || updated.name === null) {
                vm.error = "Please enter the required fields.";
                return;
            }
            WebsiteService.updateWebsite($routeParams.wid, updated);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite(wid) {
            WebsiteService.deleteWebsite(wid)
        }


    }

})();