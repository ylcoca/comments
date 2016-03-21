'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentList
 * @description
 * # commentList
 */
angular.module('commentList', ['comment'])
  .directive('commentList', function () {
    return {
      template:'<div class="twt-wrapper">'+
                 '<div class="media-body">'+
                  '<comment-model ng-repeat="comment in comments">' +
                    '<span class="text-muted pull-left">'+
                      '<small class="text-muted">{{comment.postDate}}</small>'+
                    '</span>'+
                    '<strong class="text-success">@ {{comment.author}}</strong>'+
                    '<p>{{comment.msg}}</p>'+
                  '</comment-model>' +
                 '</div>'+
                '</div>',

      restrict: 'E',
      scope: {
        comments: '='
      },
      link: function postLink(scope, element, attrs) {
      }
  /*    link: function (scope, element, attrs) {
        var watcher = scope.$watch('comments', function (newVal, old){
          if(newVal.length == 0) return;
          watcher();
          scope.comments = newVal;

          var comments = [];
          scope.comments.forEach(function(comment){
            if(comment.postDate) {
              comment.postDate = new Date(comment.postDate);
              var d2 = new Date();
              comment.postDate = d2 - comment.postDate;
              comments.push(comment);
              console.info(comment.postDate);
            }else{
              console.warn(comment.postDate);
            }

          });
          scope.comments = comments;
        });

      }*/
    };
  });
