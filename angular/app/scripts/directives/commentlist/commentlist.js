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
      template: '<div class="twt-wrapper">' +
      '<div class="media-body">' +
      '<comment-model ng-repeat="comment in comments">' +
      '<span class="text-muted pull-left">' +
      '<small class="text-muted">{{comment.postDate}}</small>' +
      '</span>' +
      '<strong class="text-success">@ {{comment.author}}</strong>' +
      '<p>{{comment.msg}}</p>' +
      '</comment-model>' +
      '</div>' +
      '</div>',

      restrict: 'E',
      scope: {
        comments: '='
      },
      link: function (scope, element, attrs) {
        var watcher = scope.$watch('comments', function (response) {
          scope.data = [];
          scope.data = response;
          var today = new Date();

          if (scope.data.length == 0) {
            return;
          }
          else {
            console.log(scope.data[0].postDate);
            for (var i = 0; i < scope.data.length; i++) {
              if (scope.data[i].postDate == null || scope.data[i].postDate == "") {
                scope.data[i].postDate = "";
              }
              else {
                var postedOn = new Date(scope.data[i].postDate);
                var result = today.getTime() - postedOn.getTime();

                var resultInSeconds = Math.round(result / 1000);
                var resultInMinutes = Math.round(result / 60000);
                var resultInHours = Math.round(result / 3600000);
                var resultInDays = Math.round(result / 86400000);
                if (resultInSeconds < 59) {
                  scope.data[i].postDate = "1 minute ago";
                }
                else if (resultInSeconds > 59 && resultInMinutes < 59) {
                  if (resultInMinutes > 1) {
                    scope.data[i].postDate = resultInMinutes + " minutes ago";
                  }
                }
                else if (resultInMinutes > 59 && resultInHours < 24) {
                  if (resultInHours == 1) {
                    scope.data[i].postDate = resultInHours + " hour ago";
                  }
                  else {
                    scope.data[i].postDate = resultInHours + " hours ago";
                  }

                }
                else if (resultInHours > 24) {
                  if (resultInDays == 1) {
                    scope.data[i].postDate = resultInDays + " day ago";
                  } else {
                    scope.data[i].postDate = resultInDays + " days ago";
                  }

                }
              }
            }
          }
          console.log(response[0].postDate);

        });

      }
    };
  });
