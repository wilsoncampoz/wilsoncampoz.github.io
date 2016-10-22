(function() {
  'use strict';

  function initializePage(){
    setCarousel();
    getProduct();
  };

  function getProduct(){
      $.ajax('http://localhost:3000/api/product.json').then(alert('hey'));
  }

  function setCarousel(){
    new ch.Carousel(ch('.related-products-slider')[0], { pagination: true });
  }

  initializePage();
  
})();
