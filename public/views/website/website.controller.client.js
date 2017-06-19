(function() {
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

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

    }

    function EditWebsiteController($routeParams, $timeout, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.user = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        vm.deleteWebsite = deleteWebsite;


        function deleteWebsite(wid) {
            console.log(wid);
            WebsiteService.deleteWebsite(wid)
        }


        }

})();