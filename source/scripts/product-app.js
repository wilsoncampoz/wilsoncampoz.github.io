(function () {

    var app = angular.module('ProductApp', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product', {
            url: '/product/:id',
            templateUrl: "views/product.html",
            controller: 'ProductController as $productCtrl',
        });
    });

})();