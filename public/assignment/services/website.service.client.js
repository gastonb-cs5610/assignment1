/**
 * Created by bluegaston on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
            {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
            {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
            {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
            {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
        ];

        var services = {
            'createWebsite': createWebsite,
            'findWebsitesByUser': findWebsitesByUser,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite,
            'deleteWebsitesByUser': deleteWebsitesByUser
        };
        return services;


        function createWebsite(userId, website) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsitesByUser(userId) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(userId, websiteId) {
            var url = "/api/assignment/user/" + userId+ "/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsite(website._id);
                }
            }
        }
    }
})();
