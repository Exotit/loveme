angular.module('MyApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $location, $window, $auth, $state) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (response) {
                    $rootScope.currentUser = response.data.user;
                    $window.localStorage.user = JSON.stringify(response.data.user);
                    $state.go("signup2");
                })
                .catch(function (response) {
                    if (response.error) {
                        $scope.messages = {
                            error: [{
                                msg: response.error
                            }]
                        };
                    } else if (response.data) {
                        $scope.messages = {
                            error: [response.data]
                        };
                    }
                });
        };


    });
