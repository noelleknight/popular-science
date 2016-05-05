(function() {
  'use strict';


  suite('create new author controller', function() {
    var $rootScope;
    var mockNewAuthorService = {};
    var mockLoginService = {};

    setup(module('blog'));

    setup(module(function ($provide) {
      $provide.value('NewAuthorService', mockNewAuthorService);
      $provide.value('LoginService', mockLoginService);
    }));

    setup(inject(function ($controller, $q, _$rootScope_) {
      $rootScope = _$rootScope_;
      createNewAuthorController = $controller('CreateNewAuthorController');
      mockNewAuthorService.createAuthor = function (author) {
        var defer = $q.defer();

        if (author.name === 'foobar') {
          defer.reject({
            status: 400
          });
        } else {
          defer.resolve({
            "id": 13,
            "name": 'noelle',
            "email": 'noelle@noelle.com',
            "password": 'hello'
          });
        }
        return defer.promise;
      };

      mockLoginService.authenticate = function () {
        var deferLogin = $q.defer();
        deferLogin.resolve({
          id: 123,
          userId: 456
        });
        return deferLogin.promise;
      };
    }));
    test('newAuthorForm errors correctly', function (doneCallback) {
      createNewAuthorController.newAuthor = {
        name: 'foobar'
      };
      doneCallback();
    });
    $rootScope.$digest();
  });

});

})();
