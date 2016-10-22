(function () {

    angular.module('ProductApp').controller('ProductController', ['$scope', '$state', 'ProductService', Controller]);

    function Controller($scope, $state, ProductService) {
        this.loadingProduct = true;

        ProductService.getProduct($state.params.id).then(function (product) {
            this.product = product;
        }.bind(this)).finally(function (){ this.loadingProduct = false }.bind(this));

        this.getArray = function(number){
            let array = [];

            for (let i = 1; i <= number; i++)
                array.push(i);

            return array;
        };

        this.routeManager = function (path) {
            $location.path(path);
        };
    };

})();