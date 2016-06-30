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
            resolve: {
                slideData: function($http,$stateParams){
                    return $http({method:'GET', url:"/chapter/"+$stateParams.chapter+"/slide/"+$stateParams.slide});
                }
            },
            views: {
                "partial": {
                    templateProvider: function($http,slideData){
                        switch(slideData.data.type) {
                            case "question":
                                return $http({method:'GET', url:"/partials/slide3.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                            case "video":
                                return $http({method:'GET', url:"/partials/slide2.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                            case "text":
                                return $http({method:'GET', url:"/partials/slide1.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                        }
                    },
                    controller: 'SlideCtrl'
                }
            },
            data: {
                pageTitle: "Amour&numérique - Informations complémentaires",
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
        .state('slide3', {
            url: "/slide3",
            views: {
                "partial": {
                    templateUrl: "partials/slide3.html",
                    controller:"Slide3Ctrl",
                }
            },
            data: {
                pageTitle: "Model question"
            }
        })
        .state('slide4', {
            url: "/slide4",
            views: {
                "partial": {
                    templateUrl: "partials/slide4.html",
                    controller:"Slide4Ctrl",
                }
            },
            data: {
                pageTitle: "Model texte/chat"
            }
        })
        .state('slide5', {
            url: "/slide5",
            views: {
                "partial": {
                    templateUrl: "partials/slide5.html",
                    controller:"Slide5Ctrl",
                }
            },
            data: {
                pageTitle: "Model stats"
            }
        })
        .state('slide6', {
            url: "/slide6",
            views: {
                "partial": {
                    templateUrl: "partials/slide6.html",
                    controller:"Slide6Ctrl",
                }
            },
            data: {
                pageTitle: "Model stats/number"
            }
        })
        .state('slide7', {
            url: "/slide7",
            views: {
                "partial": {
                    templateUrl: "partials/slide7.html",
                    controller:"Slide7Ctrl",
                }
            },
            data: {
                pageTitle: "Model quote"
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

       $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState,fromParams) {
            if (Object.keys(fromParams).length !== 0) {
                if(fromParams.chapter === toParams.chapter)
                {
                    if (fromParams.slide < toParams.slide) {
                        toState.data.backward = false;
                    } else {
                        toState.data.backward = true;
                    }
                    $rootScope.$state = $state;
                }
                else if (fromParams.chapter < toParams.chapter) {
                    toState.data.backward = false;
                    $rootScope.$state = $state;
                }
            }
       });
       $rootScope.$state = $state;
  }]);
