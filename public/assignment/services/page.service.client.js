/**
 * Created by bluegaston on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" },

            { "_id": "654", "name": "Post 1", "websiteId": "567", "title": "Lorem" },
            { "_id": "765", "name": "Post 2", "websiteId": "567", "title": "Lorem" },
            { "_id": "876", "name": "Post 3", "websiteId": "567", "title": "Lorem" },

            { "_id": "987", "name": "Post 1", "websiteId": "678", "title": "Lorem" },
            { "_id": "198", "name": "Post 2", "websiteId": "678", "title": "Lorem" },
            { "_id": "219", "name": "Post 3", "websiteId": "678", "title": "Lorem" }
        ];

        var services = {
            'createPage': createPage,
            'findPageByWebsiteId': findPageByWebsiteId,
            'findPageById': findPageById,
            'updatePage': updatePage,
            'deletePage': deletePage
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return pages.reduce(getMaxId, 0).toString();
        }

        function createPage(websiteId, page) {
            var newPageId = getNextId();
            var newPage = {
                _id: newPageId,
                name: page.name,
                title: page.title,
                websiteId: websiteId
            };
            pages.push(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            result = [];
            console.log("findPage", websiteId);
            for (mPage in pages) {
                var page = pages[mPage];
                if (parseInt(page.websiteId) === parseInt(websiteId)) {
                    result.push(page);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (mPage in pages) {
                var page = pages[mPage];
                if (parseInt(page._id) === parseInt(pageId)) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {

            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);

            pages[index].name = page.name;
            pages[index].title = page.title;
        }

        function deletePage(pageId) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages.splice(index, 1);
        }
    }
})();
