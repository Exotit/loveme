angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.router'])
  .config(function($routeProvider, $locationProvider, $authProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    templateUrl: "partials/header.html",
                    controller: "HeaderCtrl"
                },
                'footer': {
                    templateUrl: "partials/footer.html"
                },
            }
        })
        .state('home', {
            parent: "root",
            url: "/",
            views: {
                "partial@": {
                    templateUrl: "partials/home.html",
                    controller: "HomeCtrl"
                }
            },
            data: {
                pageTitle: "Home"
            }
        })
        .state('login', {
            parent: "root",
            url: "/login",
            views: {
                "partial@": {
                    templateUrl: "partials/login.html",
                    controller:"LoginCtrl",
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                }
            },
            data: {
                pageTitle: "Login"
            }
        })
        .state('signup', {
            parent: "root",
            url: "/signup",
            views: {
                "partial@": {
                    templateUrl: "partials/signup.html",
                    controller:"SignupCtrl",
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                }
            },
            data: {
                pageTitle: "Signup"
            }
        })
        .state('account', {
            parent: "root",
            url: "/account",
            views: {
                "partial@": {
                    templateUrl: "partials/profile.html",
                    controller:"ProfileCtrl",
                    resolve: { loginRequired: loginRequired }
                }
            },
            data: {
                pageTitle: "Account"
            }
        })
        .state('forgot', {
            parent: "root",
            url: "/forgot",
            views: {
                "partial@": {
                    templateUrl: "partials/forgot.html",
                    controller:"ForgotCtrl",
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                }
            },
            data: {
                pageTitle: "Login"
            }
        })
        .state('reset', {
            parent: "root",
            url: "/reset/:token",
            views: {
                "partial@": {
                    templateUrl: "partials/forgot.html",
                    controller:"ForgotCtrl",
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                }
            },
            data: {
                pageTitle: "Reset password"
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
     $rootScope.$state = $state;
  }]);
