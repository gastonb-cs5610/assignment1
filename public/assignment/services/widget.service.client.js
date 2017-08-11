
(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService($http) {

        var createWidgetMap = {
            'HEADING': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget,
            'LINK': createLinkWidget,
            'TEXTINPUT': createTextInputWidget,
            'LABEL': createLabelWidget,
            'BUTTON': createButtonWidget,
            'REPEATER': createRepeaterWidget,
            'DATATABLE': createDataTableWidget
        };

        var api = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'moveWidget': moveWidget,

            //'deleteWidgetsByPage': deleteWidgetsByPage
        };
        return api;


        function moveWidget(start, end, pageId) {
            var url = "/api/assignment/page/" +pageId+ "/widget/moveWidget?start=" + start + "&end=" + end;


            ""(url, "URL");


            ""(pageId, "page in client");
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createHeaderWidget(pageId, widget) {
            return {
                type: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createLabelWidget(widgetId, pageId, widget) {
        }

        function createHTMLWidget(pageId, widget) {
            return {
                type: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createTextInputWidget(widgetId, pageId, widget) {

        }

        function createLinkWidget(widgetId, pageId, widget) {

        }

        function createButtonWidget(widgetId, pageId, widget) {

        }

        function createImageWidget(pageId, widget) {
            return {
                type: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(pageId, widget) {
            ""("createYoutube", widget);

            return {
                type: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createDataTableWidget(widgetId, pageId, widget) {

        }

        function createRepeaterWidget(widgetId, pageId, widget) {

        }

        function createWidget(pageId, widget) {
            ""("widget:", widget);
            var newWidget = createWidgetMap[widget.type](pageId, widget);
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, newWidget)
                .then(function (response) {
                    ""("widget create");

                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            ""("going");

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;

            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    vm.error = "Something went wrong";
                });

        }

        function deleteWidget(pageId, widgetId) {
            var url = "/api/assignment/page/" + pageId + "/widget/" + widgetId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();
