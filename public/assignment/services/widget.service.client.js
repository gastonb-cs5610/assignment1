/**
 * Created by bluegaston on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService($http) {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "here"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "here"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/" , "name": "here", "text": "Lorem ipsum"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum" , "name": "here"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum"},

            { "_id": "621", "widgetType": "HEADING", "pageId": "654", "size": 2, "text": "GIZMODO", "name": "here"},
            { "_id": "777", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum", "name": "here"},
            { "_id": "666", "widgetType": "IMAGE", "pageId": "654", "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name": "here", "text": "Lorem ipsum"},
            { "_id": "555", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum", "name": "here"},
            { "_id": "444", "widgetType": "YOUTUBE", "pageId": "654", "width": "100%",
                "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum"},

            { "_id": "889", "widgetType": "HEADING", "pageId": "765", "size": 2, "text": "GIZMODO", "name": "here"},
            { "_id": "112", "widgetType": "HEADING", "pageId": "765", "size": 4, "text": "Lorem ipsum", "name": "here"},
            { "_id": "442", "widgetType": "IMAGE", "pageId": "765", "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name": "here", "text": "Lorem ipsum" },
            { "_id": "111", "widgetType": "HEADING", "pageId": "765", "size": 4, "text": "Lorem ipsum", "name": "here"},
            { "_id": "132", "widgetType": "YOUTUBE", "pageId": "765", "width": "100%",
                "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum"}

        ];

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


            console.log(url, "URL");


            console.log(pageId, "page in client");
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createHeaderWidget(pageId, widget) {
            return {
                widgetType: 'HEADING',
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
                widgetType: 'HTML',
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
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(pageId, widget) {
            console.log("createYoutube", widget);

            return {
                widgetType: 'YOUTUBE',
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
            console.log("widget:", widget);
            var newWidget = createWidgetMap[widget.widgetType](pageId, widget);
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, newWidget)
                .then(function (response) {
                    console.log("widget create");

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
            console.log("going");

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

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function deleteWidgetsByPage(pageId) {
        //     for (wid in widgets) {
        //         widget = widgets[wid];
        //         if (widget.pageId === pageId) {
        //             deleteWidget(widget._id);
        //         }
        //     }
        // }
    }
})();
