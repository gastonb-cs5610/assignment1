(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.trustSrc = trustSrc;

        vm.callBack = callBack;

        console.log(vm.uid, "ID");

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
            console.log(start);
            console.log(end);
            var wid = vm.widgets[start]._id;
        }

    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.createWidget = createWidget;
        vm.createError = null;


        function createWidget(widgetType) {

            var newWidget = {
                name: "",
                text: "",
                widgetType: widgetType,
                pageId: "",
                size: "",
                width: "",
                url: ""
            };


            console.log("controller", newWidget);

            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function (widget) {
                    console.log(widget._id);
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {

        console.log("loaded.")

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        console.log("GET STUFF", vm.wid, vm.uid, vm.pid);

        function init() {
            console.log("bought to break?");
            console.log(vm.wgid);

            WidgetService
                .findWidgetById(vm.wgid)
                .then(renderWidget);
        }

        init();

        function renderWidget(widget) {
            console.log("naw");


            vm.widget = widget;

        }
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;
        vm.error = null;

        function editWidget() {

            var latestData = {
                name: vm.widget.name,
                text: vm.widget.text,
                widgetType: vm.widget.widgetType,
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


            if (vm.widget.widgetType === 'HEADING') {
                if (latestData.size === undefined || latestData.size === "" || latestData.size === null) {
                    vm.error = "Please enter the required fields.";
                    return;
                }
            } else if (vm.widget.widgetType === 'YOUTUBE' || vm.widget.widgetType === 'IMAGE') {
                if (latestData.width === undefined || latestData.width === "" || latestData.width === null ||
                    latestData.url === undefined || latestData.url === "" || latestData.url === null) {
                    vm.error = "Please enter the required fields.";
                    return;
                }
            }

            console.log("latest", latestData);

            WidgetService
                .updateWidget($routeParams.wgid, latestData)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})
();