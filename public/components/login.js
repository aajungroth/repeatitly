angular.module('flash-card')

.controller('LoginCtrl', function(loginSvc, $location, $http, $scope){

  this.login = function() {
    console.log('trying to signin frontend');
    var that = this;
    loginName = this.loginName;
    loginPw = this.loginPw;
    loginSvc.login(loginName, loginPw, function(res) {
      if (res.error) {
        console.log('lol you errored');
        console.error(res.error);
      } else if (res.data === 'OK') {
        $http.get('/decks', {params: {username: loginName}}).then(function(response) {
          localStorage.setItem('currentUser', loginName);
          localStorage.setItem('decks', JSON.stringify(response.data));
          $location.path('/app');
        }, function(error) {console.log('lol its an error gg'); console.error(error);});
      } else if (res.data === 'NO') {
        alert('Incorrect username or password, please try again.');
        that.loginName = '';
        that.loginPw = '';
        $('#loginName').focus();
      }
    });
  };

  this.signup = function() {
    var that = this;
    accName = this.accName;
    accPw = this.accPw;
    accVerifyPw = this.accVerifyPw;
    loginSvc.signup(accName, accPw, function(res) {
      if (this.accPw !== this.accVerifyPw && res.data === 'NO') {
        alert('Username taken; please try another username.');
        that.accName = '';
        that.accPw = '';
        that.accVerifyPw = '';
      }
      else if (this.accPw !== this.accVerifyPw) {
        alert('Your passwords do not match; please check and try again.');
        that.accPw = '';
        that.accVerifyPw = '';
      } else if (res.error) {
        console.error(res.error);
      } else if (res.data === 'OK') {
        localStorage.setItem('currentUser', accName);
        localStorage.setItem('decks', JSON.stringify([]));
        $location.path('/app');
      } else if (res.data === 'NO') {
        alert('Username taken; please try another username.');
        that.accName = '';
        that.accPw = '';
        that.accVerifyPw = '';
        $('#accName').focus();
      }
    });
  };

  var init = function() {
    $.ajax({
        url: '/sessionDecks',
        type: 'GET',
        success: function(data) {
          console.log(data);
          if (data.length) {
            localStorage.setItem('currentUser', data[0].username);
            localStorage.setItem('decks', JSON.stringify(data));
            $location.path('/app');
            $scope.$apply();
          }
        },
        error: function(err) {
          console.log('no valid session', err)
        }
    });
  };

  init();
})

.component('login', {
  controller: 'LoginCtrl',
  templateUrl: './templates/login.html' //calling from index.html
})
.service('loginSvc', function($http) {
  this.login = function(username, password, callback) {
    console.log('login service call');
    var url = '/login';
    $http.post(url, JSON.stringify({username: username, password:password}))
      .then(function successCallback(response) {
        console.log('then for login service call');
        callback(response);
      },
      function errorCallback(response) {
        console.log('login service error call');
        callback(response);
      });
  };
  this.signup = function(username, password, callback) {
    var url = '/signup';
    $http.post(url, JSON.stringify({username: username, password:password}))
      .then(function successCallback(response) {
        callback(response);
      },
      function errorCallback(response) {
        callback(response);
      });
  };
});
