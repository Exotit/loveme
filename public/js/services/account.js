angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
    };
  });
