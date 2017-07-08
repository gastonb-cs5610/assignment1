const app = require('../../express');

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

//app.get('/api/assignment/page/:pageId/widget', findWidgetsByPage);
//app.get('/api/assignment/widget/:widgetId', findWidgetById);

app.post('/api/assignment/user/:pageId/widget', createWidget);

//app.put('/api/assignment/widget/:widgetId', updateWidget);

//app.delete('/api/assignment/widget/:widgetId', deleteWidget);


function createWidget(req, res) {
    var widget = req.body;
    widget._id = getNextId();
    widgets.push(widget);
    res.sendStatus(200);
}

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