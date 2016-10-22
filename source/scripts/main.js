(function () {
  'use strict';

  var settings = {
    productIdStart: 1,
    productEndpoint: '/api/products/'
  };

  function initializePage() {
    // setCarousel();
    // getProduct();
  };

  function getProduct(productId) {
    let product = productId || settings.productIdStart;
    $.ajax(`${settings.productEndpoint}${product}.json`);
  }

  function setCarousel() {
    new ch.Carousel(ch('.related-products-slider')[0], { pagination: true });
  }

  initializePage();

})();
