(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);

        vm.trustSrc = trustSrc;


        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createWidget = createWidget;
        vm.createError = null;
        console.log('hey');

        function createWidget(widgetType) {
            console.log('hey');
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            var newId = WidgetService.createWidget(vm.pid, newWidget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + newId);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widget = angular.copy(WidgetService.findWidgetById(vm.wgid));
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;
        vm.error = null;

        function editWidget() {
            console.log(vm.widget.name);
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

        WidgetService.updateWidget(vm.wgid, latestData);
        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }

    function deleteWidget() {
        WidgetService.deleteWidget(vm.wgid);
        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
    }

}
})
();