angular.module('MyApp')
  .controller('SlideCtrl', function($scope, NavBar, slideData, Progression,$stateParams) {
    Progression.set($stateParams.chapter,$stateParams.slide);
    $scope.data = slideData.data;
    angular.element(document).ready(function () {
        var container = angular.element(document.querySelector("[ui-view='partial']"));
        var hello = NavBar.createNavBar(container);
    });
  });
