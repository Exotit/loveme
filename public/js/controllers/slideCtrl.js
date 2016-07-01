angular.module('MyApp')
.controller('SlideCtrl', function($sce, $scope, NavBar, slideData, Progression,$stateParams, Video) {
  Progression.set($stateParams.chapter,$stateParams.slide);
  $scope.data = slideData.data;
  angular.element(document).ready(function () {
    var container = angular.element(document.querySelector("[ui-view='partial']"));
    var hello = NavBar.createNavBar(container);
  });
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  console.log($scope.data);
  if($scope.data.type === "video")
  {
      Video.initEvent($scope.data.nextChapter,$scope.data.nextSlide);
  }
});
