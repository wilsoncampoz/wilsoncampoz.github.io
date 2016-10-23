;(function () {
    'use strict';

    angular.module('ProductApp').factory('ProductFactory', [ProductFactory]);

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
            installments: this.selectedInstallment,
            installmentValue: (this.price * this.selectedQuantity) / this.selectedInstallment,
            price: this.price
        }
    };

    function ProductFactory() {
        return { createProduct: Product };
    }

})();