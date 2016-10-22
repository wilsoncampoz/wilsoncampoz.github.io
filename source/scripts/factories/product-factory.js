(function () {

    angular.module('ProductApp').factory('ProductFactory', ProductFactory);

    function Product(product) {
        Object.keys(product).forEach(key => {
            this[key] = product[key];
        });

        // Product Default Properties
        this.selectedQuantity = 1;
        this.selectedInstallment = 1;
    }

    Product.prototype.getData = function () {
        return {
            quantity: this.selectedQuantity,
            installment: this.selectedInstallment,
            price: this.price
        }
    };

    function ProductFactory() {
        return { createProduct: Product };
    }

})();