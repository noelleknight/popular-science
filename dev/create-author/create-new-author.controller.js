(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['$state', 'NewAuthorService', 'LoginService'];

      function CreateNewAuthorController($state, NewAuthorService, LoginService){

        console.log('In Author Stories');
        var that = this;
        this.newAuthor = {};
        this.errorMessage = "";

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          return NewAuthorService.createAuthor(this.newAuthor)
            .then(LoginService.authenticate(this.newAuthor))
            .then( function goHome() {
              $state.go('home');
            })
            .catch( function errorHandler(response) {
             if (response.status > 399) {
               that.errorMessage = "Oops, you've encountered an error, please try logging in .";
             }
           });

          };

      }

})();
