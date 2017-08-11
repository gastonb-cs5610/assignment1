var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server.js');


widgetModel.createWidget = createWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.reorderWidget = reorderWidget;
widgetModel.addUrlToImage = addUrlToImage;


module.exports = widgetModel;

function addUrlToImage(widgetId, url) {
    return widgetModel
        .update({_id: widgetId},
            {
                $set: {url: url}
            });
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id)
            return widget;
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            pageModel
                .removeWidget(pageId, widgetId);
        });
}

function updateWidget(widgetId, widget) {
    switch (widget.type) {
        case "HEADING":
            return widgetModel
                .update(
                    {_id: widgetId},
                    {
                        $set: {
                            name: widget.name,
                            text: widget.text,
                            size: widget.size
                        }
                    }
                );
            break;
        case "IMAGE":
            return widgetModel.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }
                }
            );
            break;
        case "HTML":
            return widgetModel.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
                        text: widget.text
                    }
                }
            );
            break;
        case "YOUTUBE":
            return widgetModel.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height
                    }
                }
            );
            break;
        case "TEXT":
            return widgetModel.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }
                }
            );
            break;
        case "HTML":
            return widgetModel.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name
                    }
                }
            );
            break;
        default:
    }
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            if (page) {
                return page.widgets;
            }
            else {
                return null;
            }

        }, function (err) {
            return null;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function reorderWidget(pageId, start, end) {


    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var item = page.widgets[start];
            if (page) {
                page.widgets.splice(start, 1);
                page.widgets.splice(end, 0, item);

                return page.save();
            }
            else {
                return null;
            }

        }, function (err) {
            return null;
        });
}