/**
 * Created by bluegaston on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService() {
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
            'deleteWidgetsByPage': deleteWidgetsByPage
        };
        return api;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return widgets.reduce(getMaxId, 0).toString();
        }

        function createHeaderWidget(widgetId, pageId, widget) {
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

        function createHTMLWidget(widgetId, pageId, widget) {
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

        function createImageWidget(widgetId, pageId, widget) {
            return {
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(widgetId, pageId, widget) {
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


        /*
         * Standard CRUD
         */
        function createWidget(pageId, widget) {
            var newWidget = createWidgetMap[widget.widgetType](pageId, widget);
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, newWidget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            results = [];
            function filterByPageId(widget) {
                return widget.pageId === pageId;
            }

            results = widgets.filter(filterByPageId);
            return results;
        }

        function findWidgetById(widgetId) {
            for (wid in widgets) {
                var widget = widgets[wid];
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            if (oldWidget.widgetType != widget.widgetType) {
                return;
            }
            console.log(index);
            Object.keys(widget).forEach(function (property) {
                if (property === '_id' || property === 'widgetType' || property === 'pageId') {
                    return;
                }
                if (oldWidget.hasOwnProperty(property)) {
                    oldWidget[property] = widget[property];
                }
            });

        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }

        function deleteWidgetsByPage(pageId) {
            for (wid in widgets) {
                widget = widgets[wid];
                if (widget.pageId === pageId) {
                    deleteWidget(widget._id);
                }
            }
        }
    }
})();
