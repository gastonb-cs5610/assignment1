(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;

        function createPage(newPage) {


            if (!newPage || newPage.title === undefined || newPage.title === null || newPage.title === ""
                || newPage.name === name || newPage.name === "" || newPage.name === null) {
                console.log("errore");
                vm.error = "Please enter the required fields.";
                return;
            }

            PageService.createPage(vm.websiteId, newPage);

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }


    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];


        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function updatePage() {
            var updated_page = {
                _id: $routeParams.pid,
                name: vm.page.name,
                websiteId: $routeParams.wid,
                title: vm.page.title

            }
            console.log(vm.page, "updated:", updated_page);

            if (!updated_page || updated_page.title === undefined || updated_page.title === null || updated_page.title === ""
                || updated_page.name === name || updated_page.name === "" || updated_page.name === null) {
                vm.error = "Please enter the required fields.";
                return;
            }
            PageService.updatePage($routeParams.pid, updated_page);

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function deletePage(wid) {
            console.log(wid);
            PageService.deletePage(wid)
        }

    }

})();