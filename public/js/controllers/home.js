angular.module('MyApp')
    .controller('HomeCtrl', function ($scope, $location, $window, $auth, $rootScope) {
        angular.element(document).ready(function () {
            // When angular finishes loading, get loader out of the way
            window.setTimeout(function () {
                var loader = angular.element(document.querySelector('.loader'));
                var loaderHeart = angular.element(document.querySelector('.loader--heart'));
                loaderHeart.removeClass('loader__beating');
                loaderHeart.addClass('loader__out');
                loader.addClass('loader__out');
            }, 1500)
        });

    });
