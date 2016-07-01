angular.module('MyApp')
    .factory('Video', function (Progression, $http, $rootScope, $state, $interval, $timeout) {
        var self = this;
        this.player = {};

        this.initEvent = function (chapter, slide) {

            self.player.container = document.querySelector('.player');
            self.player.video = self.player.container.querySelector('video');
            self.player.seek_bar = self.player.container.querySelector('.seek-bar');
            self.player.progress_bar = self.player.container.querySelector('.progress-bar');

            //check progress
            console.log(self);
            $interval(function () {
                var ratio = self.player.video.currentTime / self.player.video.duration,
                    percent = ratio * 100 + '%';
                self.player.progress_bar.style.transform = 'scaleX(' + ratio + ')';

            }, 10);

            self.player.seek_bar.addEventListener("click", function (e) {
                var bouding_rect = self.player.seek_bar.getBoundingClientRect(),
                    x = e.clientX - bouding_rect.left,
                    ratio = x / bouding_rect.width,
                    time = ratio * self.player.video.duration;

                self.player.video.currentTime = time;
            });

            document.addEventListener("keypress", function (e) {
                if (self.player.video.paused == true && e.keyCode == 32) {
                    self.player.video.play();
                } else if (self.player.video.paused == false && e.keyCode == 32) {
                    self.player.video.pause();
                }
            });

            self.player.video.addEventListener("click", function (e) {
                if (self.player.video.paused === true) {
                    self.player.video.play();
                } else if (self.player.video.paused === false) {
                    self.player.video.pause();
                }
            });

            document.addEventListener("mousemove", function (e) {
                angular.element(self.player.seek_bar).removeClass("hide");
                $timeout.cancel(self.player.hide);
                self.player.hide = $timeout(function () {
                    angular.element(self.player.seek_bar).addClass("hide");
                }, 2000);
            });

            self.player.video.addEventListener("ended", function () {
                Progression.goTo(chapter, slide);
            })
        }

        return self;
    });
