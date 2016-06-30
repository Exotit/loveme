angular.module('MyApp')
  .controller('Slide4Ctrl', function($scope, $location, $window, $auth) {
    angular.element(document).ready(function () {
      var navControl = angular.element(document.querySelector('.nav-control'));
      var navOverlay = angular.element(document.querySelector('.nav-overlay'));
      var navBar = angular.element(document.querySelector('nav'));
      angular.element(navControl).on('click', function(){
        navBar.toggleClass('up');
      });
      angular.element(navOverlay).on('click', function(){
        navBar.toggleClass('up');
      });
    });
  });
