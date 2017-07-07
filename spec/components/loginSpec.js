/*
login with non existing account
  should redirect to /login via angular router

login with existing account
  should redirect to /app via angular router
 */



var expect = chai.expect;
var $httpBackend, Person, LoginSvc;

describe('app', function() {
  var element;

  beforeEach(module('flash-card'));

  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile, _loginSvc_, _PersonSvc_, _$httpBackend_) {
    var scope = $rootScope.$new();

    // We're stubbing out the youTube search function so it doesn't
    // make an http request
    /*
     youTube.search = function(str, callback) {
     callback(fakeVideoData);
     };

     youTubeSpy = sinon.spy(youTube, 'search');
     */
    $httpBackend = _$httpBackend_;
    PersonSvc = _PersonSvc_;
    LoginSvc = _loginSvc_;
    element = angular.element('<flash-card></flash-card>');
    element = $compile(element)(scope);

    $rootScope.$digest();
  }));

  describe('login logic', function () {

    it('should fail for an unknown username', function () {
      console.log('start of assertion');
      $httpBackend
        .expectPOST('/login', {
          username: 'abc',
          password: '123'
        })
        .respond(200);
      var succeeded = false;
      LoginSvc.loginReturnPromise('abc', '123')
        .then(function() {
          succeeded = true;
          console.log('login service promise then');
        });
      LoginSvc.login('abc', '123', function(response) {
        console.log('callback of regular login function');
      });
      /*
      new PersonSvc('Ben').create()
        .then(function () {
          console.log('inside the then');
          succeeded = true;
        });
        */
      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });
});


