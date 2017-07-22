const app = require('../../express');


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

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

app.get('/api/assignment/page/:pageId/widget', findWigetsByPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);

app.post('/api/assignment/page/:pageId/widget', createWidget);

app.put('/api/assignment/widget/:widgetId', updateWidget);

app.delete('/api/assignment/widget/:widgetId', deleteWidget);


app.post ('/api/assignment/upload',  upload.single('myFile'), uploadImage);

app.post('/api/assignment/moveWidget', moveWidget);

function moveWidget(req, res) {
    // get all widgets for page

    // order widgets by position
    var toMoveWidget = req.wid;
    // splice widget toMoveWidget at start
    // figure out index to splice into
    // set pos to current index
    // save
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
    console.log("it happened", widget);
    widget.url = '/assignment/uploads/'+filename;


    console.log(userId, websiteId, pageId, widgetId);

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    console.log(callbackUrl)
    res.redirect(callbackUrl);

}

function updateWidget(req, res) {
    console.log("IN HERE")
    var widget = req.body;
    var oldWidget;

    console.log("body", req.body);

    for (w in widgets) {
        if (parseInt(widgets[w]._id) === parseInt(req.params.widgetId)) {
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
            (console.log("hi"));
            oldWidget[property] = widget[property];
        }
    });


    res.sendStatus(200);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
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
    var result = [];

    for (w in widgets) {
        var widget = widgets[w];
        if (parseInt(widget.pageId) === parseInt(req.params.pageId)) {
            result.push(widget);
        }
    }

    //sort by position

    res.json(result);
}

function createWidget(req, res) {
    var widget = req.body;

    widget._id = getNextId();
    widgets.push(widget);

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
    console.log("inside again");
    console.log(id);

    for (i in widgets) {
        if (parseInt(widgets[i]._id) === parseInt(id)) {
            return widgets[i];
        }
    }

    return undefined;
}