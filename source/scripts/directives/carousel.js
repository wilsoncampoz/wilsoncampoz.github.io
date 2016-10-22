(function () {
    angular.module('ProductApp').directive('simpleCarousel', ['$timeout', function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                $timeout(function(){
                    new ch.Carousel(element[0], { pagination: true });
                }, 0);
            }
        };
    }])
})();