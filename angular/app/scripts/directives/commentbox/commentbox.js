'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentBox
 * @description
 * # commentBox
 */
angular.module('commentBox', ['commentList', 'commentForm'])
  .directive('commentBox', function ($http,$log) {
    return {
      template: '<div class="commentBox">' +
                  '<h1>Comments</h1>' +
                  '<comment-list comments="data"></comment-list>' +
                  '<comment-form></comment-form>' +
                '</div>',
      restrict: 'E',
      scope: {
        url: '@',
        pollInterval: '@'
      },
      link: function postLink(scope, element, attrs) {
        scope.data = [];
        var loadCommentsFromServer = function () {
          var successCallback= function(response){
            scope.data=response.data;
            
            console.log('success')
          };
          var errorCallback=function(data, status, headers, config){
            console.log(status);
          };

          $http({
            method:"GET",
            url:scope.url
          }).then(successCallback,errorCallback);


        };
        var handleCommentSubmit = function (event, data) {
          var comment = data;
          scope.data.concat([comment]);
          $http.post(scope.url, comment)
            .success(function(data, status, headers, config){
              console.log('success')
            })
            .error(function(data, status, headers, config){
              console.log(status);
            });
        };
        loadCommentsFromServer();
        setInterval(loadCommentsFromServer, scope.pollInterval);
        scope.$on('submitted', handleCommentSubmit);
      }
  }});
