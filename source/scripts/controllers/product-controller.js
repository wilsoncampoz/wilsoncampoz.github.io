;(function () {
    'use strict';

    angular.module('ProductApp').controller('ProductController', ['$scope', '$state', '$timeout', 'ProductService', Controller]);

    function Controller($scope, $state, $timeout, ProductService) {
        this.loadingProduct = true;

        ProductService.getProduct($state.params.id).then(function (product) {
            this.product = product;
        }.bind(this)).finally(function (){ this.loadingProduct = false }.bind(this));

        this.buy = function(product){
            this.checkoutInfo = product.getData();
            // Clears checkout info at the top
            $timeout(function(){ this.checkoutInfo = undefined }.bind(this), 5000);
        };

        this.getArray = function(number){
            let array = [];

            for (let i = 1; i <= number; i++)
                array.push(i);

            return array;
        };
    };

})();