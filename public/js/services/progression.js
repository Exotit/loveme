angular.module('MyApp')
    .factory('Progression', function (Account, $http, $rootScope, $state) {
        var self = this;
        this.slides = [2, 4, 6];
        this.saveProgress = function (slide, chapter) {
            var progress = {};
            progress.slide = slide;
            progress.chapter = chapter;
            var progress2 = {};
            progress2.progress = progress;
            Account.updateProfile(progress2);
        }

        this.nextSlide = function () {
            // if the next slide is the lastone of the chapter
            if ($rootScope.currentUser.progress.slide === self.slides[($rootScope.currentUser.progress.chapter - 1)]) {
                self.nextChapter();
            } else {
                $rootScope.currentUser.progress.slide += 1;
                self.saveProgress($rootScope.currentUser.progress.slide, $rootScope.currentUser.progress.chapter);
                self.goTo($rootScope.currentUser.progress.slide, $rootScope.currentUser.progress.chapter);
            }
        }

        this.nextChapter = function () {
            $rootScope.currentUser.progress.slide = 1;
            $rootScope.currentUser.progress.chapter += 1;
            self.saveProgress($rootScope.currentUser.progress.slide, $rootScope.currentUser.progress.chapter);
            self.goTo($rootScope.currentUser.progress.chapter, $rootScope.currentUser.progress.slide);
        }

        this.goTo = function (chapter, slide) {
            $rootScope.currentUser.progress.slide = slide;
            $rootScope.currentUser.progress.chapter = chapter;
            $state.go("goto", {
                chapter: chapter,
                slide: slide
            })
        }

        this.set = function (chapter, slide) {
            $rootScope.currentUser.progress.slide = slide;
            $rootScope.currentUser.progress.chapter = chapter;
        }
        return self;
    });
