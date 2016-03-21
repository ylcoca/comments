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
            var today=  new Date();
            for(var i=0;i<scope.data.length;i++){
              if(scope.data[i].postDate==null||scope.data[i].postDate==""){
                scope.data[i].postDate="";
              }
              else{
               var postedOn=new Date(scope.data[i].postDate);
               var result= today.getTime()-postedOn.getTime();

                var resultInSeconds = Math.round(result / 1000);
                var resultInMinutes = Math.round(result / 60000);
                var resultInHours = Math.round(result / 3600000);
                var resultInDays = Math.round(result / 86400000);
                if(resultInSeconds<59){
                  scope.data[i].postDate="1 minute ago";
                }
                else if(resultInSeconds>59 && resultInMinutes<59){
                  if(resultInMinutes>1){
                    scope.data[i].postDate=resultInMinutes+" minutes ago";
                  }
                }
                else if(resultInMinutes>59 && resultInHours<24){
                  if(resultInHours==1){
                    scope.data[i].postDate=resultInHours+" hour ago";
                  }
                  else{
                    scope.data[i].postDate=resultInHours+" hours ago";
                  }

                }
                else if(resultInHours>24){
                  if(resultInDays==1){
                    scope.data[i].postDate=resultInDays+" day ago";
                  }else{
                    scope.data[i].postDate=resultInDays+" days ago";
                  }

                }
              }
            }
           // $log.info(date);
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
