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
            }
        })
        .state('signup2', {
            url: "/signup2",
            views: {
                "partial": {
                    templateUrl: "partials/signup2.html",
                    controller:"Signup2Ctrl",
                    resolve: { loginRequired: loginRequired }
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
                            case "bubbles":
                                return $http({method:'GET', url:"/partials/slide4.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                            case "textimgs":
                                return $http({method:'GET', url:"/partials/slide5.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                            case "audios":
                                return $http({method:'GET', url:"/partials/slide6.html"})
                                    .then(function(tpl){
                                        return tpl.data
                                    });
                            break;
                        }
                    },
                    controller: 'SlideCtrl',
                    resolve: { loginRequired: loginRequired }
                }
            },
            data: {
                pageTitle: "Amour&numérique - Informations complémentaires",
            }
        })

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '261242330915898',
      redirectUri: 'https://amour-et-numerique.herokuapp.com/auth/facebook/callback'
    });
    //heroku  980220002068787
    //heroku  http://localhost:3000/auth/facebook/callback
    function skipIfAuthenticated($location, $auth,Progression) {
      if ($auth.isAuthenticated()) {
          Progression.goTo(1,1);
      }
    }

    function loginRequired($location, $auth, $state) {
      if (!$auth.isAuthenticated()) {
        $state.go("login");
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
