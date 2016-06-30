angular.module('MyApp')
  .controller('Slide1Ctrl', function($scope, $location, $window, $auth) {
    angular.element(document).ready(function () {
      var navControl = angular.element(document.querySelector('.nav-control'));
      var navBar = angular.element(document.querySelector('nav'));
      angular.element(navControl).on('click', function(){
        navBar.toggleClass('up');
      })
    });
  });
