(function () {

    angular.module('ProductApp').service('ProductService', ['$http', '$timeout', '$q', 'ProductFactory', Service]);

    function Service($http, $timeout, $q, ProductFactory) {
        const endpoint = "/api/products/";

        this.getProduct = function (id) {
            var defer = $q.defer();
            
            $http.get(`${endpoint}${id}.json`).then(response => {
                //Timeout to simulate Loader State
                $timeout(() => defer.resolve(new ProductFactory.createProduct(response.data.product)), 2000);
            });

            return defer.promise;
        };
    };

})();