var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

module.exports = pageModel;


function removeWidget(pageId, widgetId) {
    console.log(pageId, widgetId, "DELETING")
    return pageModel
        .findById(pageId)
        .then(function (page) {
            console.log(page);
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            console.log(page);

            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    console.log("adding widget", pageId, widgetId);
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}



function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page);
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update(
        {_id: pageId},
        {$set:
            {
                name: page.name,
                title: page.title,
                description: page.description
            }}
    );
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}
