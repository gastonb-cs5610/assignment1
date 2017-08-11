(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService, $location) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.trustSrc = trustSrc;

        vm.callBack = callBack;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(renderWidgets);
        }

        init();

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function callBack(start, end) {
            WidgetService
                 .moveWidget(start, end, vm.pid)
                .then (function () {
                     $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                 });
        }

    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.createWidget = createWidget;
        vm.createError = null;


        function createWidget(type) {

            var newWidget = {
                name: "",
                text: "",
                type: type,
                pageId: "",
                size: "",
                width: "",
                url: ""
            };

            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function (widget) {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(renderWidget);
        }

        init();

        function renderWidget(widget) {
            vm.widget = widget;

        }
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;
        vm.error = null;

        function editWidget() {

            var latestData = {
                name: vm.widget.name,
                text: vm.widget.text,
                type: vm.widget.type,
                size: vm.widget.size,
                width: vm.widget.width,
                url: vm.widget.url,
                pageId: vm.pid
            };


            if (latestData.name === undefined || latestData.name === "" || latestData.name === null ||
                latestData.text === undefined || latestData.text === "" || latestData.text === null) {
                vm.error = "Please enter the required fields.";
                return;
            }


            if (vm.widget.type === 'HEADING') {
                if (latestData.size === undefined || latestData.size === "" || latestData.size === null) {
                    vm.error = "Please enter the required fields.";
                    return;
                }
            } else if (vm.widget.type === 'YOUTUBE' || vm.widget.type === 'IMAGE') {
                if (latestData.width === undefined || latestData.width === "" || latestData.width === null ||
                    latestData.url === undefined || latestData.url === "" || latestData.url === null) {
                    vm.error = "Please enter the required fields.";
                    return;
                }
            }

            WidgetService
                .updateWidget($routeParams.wgid, latestData)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.pid, vm.wgid)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})
();