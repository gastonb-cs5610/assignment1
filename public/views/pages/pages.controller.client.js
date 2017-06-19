(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
    }


    function EditPageController($routeParams, $timeout, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.user = PageService.findPageById(vm.pageId);
        }

        init();
    }

})();