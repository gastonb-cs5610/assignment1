const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });


app.get('/api/assignment/page/:pageId/widget', findWidgetsByPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);

app.post('/api/assignment/page/:pageId/widget', createWidget);

app.put('/api/assignment/widget/:widgetId', updateWidget);

app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);


app.post ('/api/assignment/upload',  upload.single('myFile'), uploadImage);

app.put('/api/assignment/page/:pageId/widget/moveWidget', moveWidget);

function moveWidget(req, res) {

    var pageId = req.params.pageId;

    var start = req.query.start;
    var end = req.query.end;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (page) {
            if (page) {
                res.sendStatus(200);
            }
            else {
                res.status(404);
            }
        }, function (err) {
            res.status(404).send(err);
        });



}

function uploadImage(req, res) {

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

    var url = '/assignment/uploads/'+filename;


    widgetModel
        .addUrlToImage(widgetId, url)
        .then(
            function (widget) {
                var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

                res.redirect(callbackUrl);
            },
            function (error) {
                res.status(400).send(error);
            }
        )

}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(
            function (widget) {
                res.send(200);
            },
            function (error) {
                res.status(400).send(error);
            }
        );

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(
            function (widget) {
                res.send(200);
            },
            function (error) {
                res.status(400).send(error);
            }
        )
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                res.send(widget);
            },
            function (error) {
                res.status(400).send(error);
            }
        )
}


function findWidgetsByPage(req, res) {
    var pageId = req.params.pageId;
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.send(widgets);
        }, function (err) {
            res.status(404).send(' Widgets not found ');
        });
}

function createWidget(req, res) {
    var newWidget = req.body;

    widgetModel
        .createWidget(newWidget.pageId, newWidget)
        .then(
            function (widget) {
                res.send(widget);
            },
            function (error) {
                res.status(400).send(error);
            }
        )
}