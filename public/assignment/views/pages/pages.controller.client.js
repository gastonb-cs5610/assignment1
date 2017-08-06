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
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(renderPage);
        }

        init();

        function renderPage(pages) {
            vm.pages = pages;
        }
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;

        function createPage(newPage) {

            console.log("controller");

            if (!newPage || newPage.title === undefined || newPage.title === null || newPage.title === ""
                || newPage.name === name || newPage.name === "" || newPage.name === null) {
                console.log("errore");
                vm.error = "Please enter the required fields.";
                return;
            }

            var newPageInfo = {
                title: newPage.title,
                name: newPage.name,
                websiteId: vm.websiteId
            };

            PageService
                .createPage(vm.websiteId, newPageInfo)
                .then(function () {
                    $location.url("/website/" + vm.websiteId + "/page");

                });

        }


    }


    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];


        function init() {

            PageService
                .findPageById(vm.pageId)
                .then(renderPage);
        }
        init();

        function renderPage(page) {
            vm.page = page;
        }

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function updatePage() {
            var updated_page = {
                _id: $routeParams.pid,
                name: vm.page.name,
                websiteId: $routeParams.wid,
                title: vm.page.title

            }

            if (!updated_page || updated_page.title === undefined || updated_page.title === null || updated_page.title === ""
                || updated_page.name === name || updated_page.name === "" || updated_page.name === null) {
                vm.error = "Please enter the required fields.";
                return;
            }

            PageService
                .updatePage($routeParams.pid, updated_page)
                .then(function () {
                    $location.url("/website/" + vm.websiteId + "/page");
                });

        }

        function deletePage(pid) {
            PageService
                .deletePage(pid)
                .then(function () {
                    $location.url('/website/' + vm.websiteId + "/page");
                }, function() {
                    model.error= "Unable to delete page";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

    }

})();