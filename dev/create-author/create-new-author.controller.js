(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['$state', 'NewAuthorService', 'LoginService'];

      function CreateNewAuthorController($state, NewAuthorService, LoginService){

        console.log('In Author Stories');
        var that = this;
        this.newAuthor = {};

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          return NewAuthorService.createAuthor(this.newAuthor)
            .then(function login(data) {
              console.log('Promise data', data);
              console.log("that", that.newAuthor);
              LoginService.authenticate(that.newAuthor);
            })
            .then( function goHome() {
              $state.go('home');
            });


          };

      }

})();
