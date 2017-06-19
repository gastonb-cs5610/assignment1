/**
 * Created by bluegaston on 6/14/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.widgets = WidgetService.findWidgetByPageId(pageId);
        }
        init();
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
    }

    function EditWidgetController($routeParams, $timeout, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams["widgetId"];
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }

})();