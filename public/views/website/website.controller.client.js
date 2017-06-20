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
        console.log(vm.websites);
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createWebsite = createWebsite;

        function createWebsite(newSite) {

            console.log(newSite);


            if (!newSite || newSite.desc === undefined || newSite.desc === null || newSite.desc === ""
                || newSite.name === undefined || newSite.name === "" || newSite.name === null) {
                console.log("errore");
                vm.error = "Please enter the required fields.";
                return;
            }

            WebsiteService.createWebsite(vm.userId, newSite);

            $location.url("/user/" + vm.userId + "/website");


        }

    }

    function EditWebsiteController($routeParams, $timeout, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }

        init();

        console.log(vm.website);

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function updateWebsite() {
            var updated_page = {
                _id: $routeParams.wid,
                name: vm.website.name,
                developerId: $routeParams.uid,
                description: vm.website.desc

            }
            WebsiteService.updateWebsite($routeParams.pid, updated_page);
        }

        function deleteWebsite(pid) {
            console.log(pid);
            WebsiteService.deletePage(pid)
        }


    }

})();