angular.module('MyApp')
  .controller('Signup2Ctrl', function($scope,$state,Account) {
    this.form = {};

    $scope.updateSignInfo = function() {
        Account.updateProfile($scope.form.user).then(function(response){
            if(response.status === 200) {
                $state.go("home");
            }
        });
    }
  });
