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
      Video.initEvent();
  }
  else if($scope.data.type === "audios")
  {
        var wavesurfer = WaveSurfer.create({
        container: '#aurelien',
        height:300,
        barWidth:0.5,
        waveColor: '#e5e5ea',
        progressColor: "#FF6A6A",
        cursorWidth:2
    });

    wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });
    wavesurfer.zoom(150);

  }

});
