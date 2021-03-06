(function() {
  'use strict';

  angular
    .module('blog')
    .factory( 'CreatePostService', CreatePostService );

  CreatePostService.$inject = ['$http'];

  function CreatePostService ($http){

    return {
      submitPost: submitPost,
      createCategory: createCategory
    };

    function submitPost (blogPost, authorization){
      return $http ({
        method:'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Posts",
        data: blogPost,
        headers: {
          Authorization: authorization
        }
      }).then (function onSuccess(response){
        return response.data;
      }, function error(response) {
        console.log(response);
      }
    );
    }

    function createCategory(newCategory, authorization){
      return $http ({
        method: 'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Categories",
        data: { name: newCategory},
        headers: {
          Authorization: authorization
        }
      }).then (function onSuccess(response){
        return response.data;
      }, function error(response) {
        console.log(response);
      });
    }
  }

}());
