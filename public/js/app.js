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
                    controller: 'SlideCtrl'
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
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });
    //heroku 261242330915898
    //heroku https://amour-et-numerique.herokuapp.com/auth/facebook/callback
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


  var wavesurfer = WaveSurfer.create({
    container: '#waveform',
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
