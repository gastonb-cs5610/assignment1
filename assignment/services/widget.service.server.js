const app = require('../../express');


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "here", "position": "0"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/" , "name": "here", "text": "Lorem ipsum", "position": "2"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "here", "position": "1"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum" , "name": "here", "position": "3"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum", "position": "4"},

    { "_id": "777", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum", "name": "here", "position": "1"},
    { "_id": "666", "widgetType": "IMAGE", "pageId": "654", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "name": "here", "text": "Lorem ipsum", "position": "2"},
    { "_id": "621", "widgetType": "HEADING", "pageId": "654", "size": 2, "text": "GIZMODO", "name": "here", "position": "0"},
    { "_id": "555", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum", "name": "here", "position": "3"},
    { "_id": "444", "widgetType": "YOUTUBE", "pageId": "654", "width": "100%",
        "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum", "position": "4"},

    { "_id": "112", "widgetType": "HEADING", "pageId": "765", "size": 4, "text": "Lorem ipsum", "name": "here", "position": "0"},
    { "_id": "442", "widgetType": "IMAGE", "pageId": "765", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "name": "here", "text": "Lorem ipsum", "position": "2" },
    { "_id": "889", "widgetType": "HEADING", "pageId": "765", "size": 2, "text": "GIZMODO", "name": "here", "position": "1"},
    { "_id": "111", "widgetType": "HEADING", "pageId": "765", "size": 4, "text": "Lorem ipsum", "name": "here", "position": "3"},
    { "_id": "132", "widgetType": "YOUTUBE", "pageId": "765", "width": "100%",
        "url": "https://youtube.com/embed/AM2Ivdi9c4E" , "name": "here", "text": "Lorem ipsum", "position": "4"}

];

app.get('/api/assignment/page/:pageId/widget', findWigetsByPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);

app.post('/api/assignment/page/:pageId/widget', createWidget);

app.put('/api/assignment/widget/:widgetId', updateWidget);

app.delete('/api/assignment/widget/:widgetId', deleteWidget);


app.post ('/api/assignment/upload',  upload.single('myFile'), uploadImage);

app.put('/api/assignment/page/:pageId/widget/moveWidget', moveWidget);

function moveWidget(req, res) {

    console.log("IN SERVE");


    var pageId = req.params.pageId;

    var start = req.query.start;
    var end = req.query.end;

    var page = findItemsByParent(pageId);

    // order widgets by position
    page.sort(function(a, b) {
        return parseInt(a.position) - parseInt(b.position);
    });

    var toMoveWidget = page[start];

    console.log(start, end, toMoveWidget);


    if (toMoveWidget === undefined) {
        res.sendStatus(404);
    }
    if (start != end) {
        reOrderArray(start, end, page);
    }

    res.sendStatus(200);

}

function uploadImage(req, res) {

    console.log("inside");

    var widgetId      = req.body.widgetId;

    var width         = req.body.width;
    var myFile        = req.file;

    var pageId = req.body.pageId;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = findItemById(widgetId);
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);

}

function updateWidget(req, res) {

    var widget = req.body;
    var oldWidget;

    for (w in widgets) {
        if (parseFloat(widgets[w]._id) === parseFloat(req.params.widgetId)) {
            oldWidget = widgets[w];
        }
    }

    if (!oldWidget) {
        res.sendStatus(404);
    }

    if (oldWidget.widgetType != widget.widgetType) {
        res.sendStatus(400);
        return;
    }

    Object.keys(widget).forEach(function (property) {
        if (property === '_id' || property === 'widgetType' || property === 'pageId') {
            return;
        }
        if (oldWidget.hasOwnProperty(property)) {

            oldWidget[property] = widget[property];
        }
    });


    res.sendStatus(200);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for (var w in widgets) {
        var widget = widgets[w];

        if (widgets[w]._id === widgetId) {
            var position = widget.position;
            var pageId = widget.pageId;

            widgets.splice(w, 1);
            rePositionAfterDelete(position, pageId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    for (w in widgets) {
        if (parseInt(widgets[w]._id) === parseInt(widgetId)) {
            res.send(widgets[w]);
            return;
        }
    }

    res.sendStatus(404);
}


function findWigetsByPage(req, res) {

    var result = findItemsByParent(req.params.pageId);

    result.sort(function(a, b) {
        return parseInt(a.position) - parseInt(b.position);
    });

    res.json(result);
}

function createWidget(req, res) {
    var widget = req.body;

    widget._id = getNextId();
    widgets.push(widget);

    result = findItemsByParent(widget.pageId);
    widget.position = result.length;

    res.json(widget);
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


function findItemById(id) {
    for (i in widgets) {
        if (parseInt(widgets[i]._id) === parseInt(id)) {
            return widgets[i];
        }
    }
    return undefined;
}

function findItemsByParent(pageId) {

    var result = [];

    for (i in widgets) {
        var widget = widgets[i];
        if (parseInt(widget.pageId) === parseInt(pageId)) {
            result.push(widget);
        }
    }

    return result;
}

function rePositionAfterDelete(position, pageId) {
    var result = findItemsByParent(pageId);

    result.sort(function(a, b) {
        return parseInt(a.position) - parseInt(b.position);
    });

    var i = position;

    for (i = position; i < result.length; i++) {
        result[i].position = i;
    }

}

function reOrderArray(start, end, array) {
    var movingItem = array[start];

    if (start < end) {

        for (i = start + 1; i <= end; i++) {
            array[i - 1] = array[i];
        }
    } else if (start > end) {

        for (i = start; i >= end + 1; i--) {
            array[i] = array[i - 1];
        }
    }
    array[end] = movingItem;

    //set new orders
    for(i = 0; i < array.length; i++) {
        item = array[i];
        item.position = i;
    }
}