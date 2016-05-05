
(function() {
  'use strict';

  var assert = chai.assert;

  suite('new author service', function() {
    var NewAuthorService, $httpBackend;

    setup(module('blog'));

    setup(inject(function(_NewAuthorService_, _$httpBackend_) {
      NewAuthorService = _NewAuthorService_;
      $httpBackend = _$httpBackend_;

      $httpBackend
      .whenPOST('https://tiy-blog-api.herokuapp.com/api/Authors')
      .respond({
        name: 'noelle',
        email: 'noelle.email',
        password: 'noelle'
      });

      $httpBackend
      .whenGET('home/home.template.html')
      .respond('<p>Hi! I pretend to be the home page template!</p>');
    }));

    test('creating new author', function(done) {
      NewAuthorService.createAuthor({})
      .then(function(data) {
        assert.strictEqual(data.name, 'noelle', 'author name is correct in return data');
        assert.strictEqual(data.password, 'noelle', 'author name is correct in return data');
        assert.strictEqual(data.email, 'noelle.email', 'author name is correct in return data');
        assert.ok(data, 'we have new author data');
        done();
      })
      .catch(function() {
        assert.ok(false, 'should not fail promise');
        done();
      });
      $httpBackend.flush();
    });
  });
})();
