/**
 * Created by bluegaston on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService($http) {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem"},

            {"_id": "654", "name": "Post 1", "websiteId": "567", "title": "Lorem"},
            {"_id": "765", "name": "Post 2", "websiteId": "567", "title": "Lorem"},
            {"_id": "876", "name": "Post 3", "websiteId": "567", "title": "Lorem"},

            {"_id": "987", "name": "Post 1", "websiteId": "678", "title": "Lorem"},
            {"_id": "198", "name": "Post 2", "websiteId": "678", "title": "Lorem"},
            {"_id": "219", "name": "Post 3", "websiteId": "678", "title": "Lorem"}
        ];

        var services = {
            'createPage': createPage,
            'findPageByWebsiteId': findPageByWebsiteId,
            'findPageById': findPageById,
            'updatePage': updatePage,
            'deletePage': deletePage
        };
        return services;



        function createPage(websiteId, page) {

            var url = "/api/assignment/website/" + websiteId + "/page";

            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
