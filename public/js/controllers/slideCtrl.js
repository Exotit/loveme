angular.module('MyApp')
.controller('SlideCtrl', function($sce, $scope, NavBar, slideData, Progression,$stateParams, Video) {
  Progression.set($stateParams.chapter,$stateParams.slide);
  $scope.data = slideData.data;
  angular.element(document).ready(function () {
    var container = angular.element(document.querySelector("[ui-view='partial']"));
    var hello = NavBar.createNavBar(container);

    if($scope.data.type === "video")
    {
        Video.initEvent($scope.data.nextChapter,$scope.data.nextSlide);
    }
    else if($scope.data.type === "audios")
    {
        $scope.wave = [];
        for(var i=0, l = $scope.data.audios.length; i <l;i++)
        {
            console.log($scope.data.audios);
           $scope.wave[i] = WaveSurfer.create({
                      container: '#'+$scope.data.audios[i].name,
                      height:200,
                      barWidth:0.5,
                      waveColor: '#e5e5ea',
                      progressColor: "#FF6A6A",
                      cursorWidth:2
                  });
          $scope.wave[i].load($scope.data.audios[i].audiolink);
        }
    }
  });
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

});
