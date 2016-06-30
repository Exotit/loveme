angular.module('MyApp')
.controller('SlideCtrl', function($sce, $scope, NavBar, slideData, Progression,$stateParams) {
  Progression.set($stateParams.chapter,$stateParams.slide);
  $scope.data = slideData.data;
  angular.element(document).ready(function () {
    var container = angular.element(document.querySelector("[ui-view='partial']"));
    var hello = NavBar.createNavBar(container);
  });
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
});
