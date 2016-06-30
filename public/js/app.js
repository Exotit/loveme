angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.router', 'ngAnimate'])
  .config(function($routeProvider, $locationProvider, $authProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "partial": {
                    templateUrl: "partials/home.html",
                    controller: "HomeCtrl"
                }
            },
            data: {
                pageTitle: "Amour&numérique",
                index: 1
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "partial": {
                    templateUrl: "partials/login.html",
                    controller:"LoginCtrl",
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                }
            },
            data: {
                pageTitle: "Amour&numérique - Se connecter",
                index: 2
            }
        })
        .state('signup2', {
            url: "/signup2",
            views: {
                "partial": {
                    templateUrl: "partials/signup2.html",
                    controller:"Signup2Ctrl",
                }
            },
            data: {
                pageTitle: "Amour&numérique - Informations complémentaires"
            }
        })
        .state('goto', {
            url: "/:chapter/:slide",
            views: {
                "partial": {
                    templateUrl: "partials/slide.html",
                    controller: function($scope, $stateParams, Progression) {
                        $scope.chapter = $stateParams.chapter;
                        $scope.slide = $stateParams.slide;
                        angular.element(document.querySelector(".button")).on("click",Progression.nextSlide);
                    }
                }
            },
            data: {
                pageTitle: "Amour&numérique - Informations complémentaires"
            }
        })
        .state('slide1', {
            url: "/slide1",
            views: {
                "partial": {
                    templateUrl: "partials/slide1.html",
                    controller:"Slide1Ctrl",
                }
            },
            data: {
                pageTitle: "Model text"
            }
        })
        .state('slide2', {
            url: "/slide2",
            views: {
                "partial": {
                    templateUrl: "partials/slide2.html",
                    controller:"Slide2Ctrl",
                }
            },
            data: {
                pageTitle: "Model video"
            }
        })


    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(['$rootScope', '$state','$window', function($rootScope, $state, $window) {
        if ($window.localStorage.user) {
          $rootScope.currentUser = JSON.parse($window.localStorage.user);
        }

       $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (typeof fromState.data != "undefined") {
                if (fromState.data.index < toState.data.index) {
                    toState.data.backward = false;
                } else {
                    toState.data.backward = true;
                }
                $rootScope.$state = $state;
            }
       });
       $rootScope.$state = $state;
  }]);
