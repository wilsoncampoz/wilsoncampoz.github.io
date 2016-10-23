;(function () {
    'use strict';

    angular.module('ProductApp', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('product', {
                url: '/product/:id',
                templateUrl: "views/product.html",
                controller: 'ProductController as $productCtrl',
            });
        }]);
})();