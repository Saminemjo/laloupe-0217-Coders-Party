angular.module('app')
    .controller('MainController', function($scope, $timeout, CurrentUser, UserService, EventService, $location, GroupService) {
        $scope.spinner = true;

        function callAtTimeout() {
            $scope.spinner = false;
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.allEvents = res.data;
            $scope.events = [];
            function filter() {
                for (var i = 0; i < $scope.allEvents.length; i++) {
                    if ($scope.allEvents[i].private === false) {
                        $scope.events.push($scope.allEvents[i]);
                    }
                }
            }
            filter();

            function autoplay() {
              $(document).ready(function() {
                $('.carousel').carousel('next');
                setTimeout(autoplay, 60000);
              });
            }
            $(document).ready(function() {
                $('.carousel').carousel();
                autoplay();
            });

            $scope.next = function() {
                $(document).ready(function() {
                    $('.carousel').carousel('next');
                });
            };
            $scope.prev = function() {
                $(document).ready(function() {
                    $('.carousel').carousel('prev');
                });
            };
            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
            GroupService.getAll().then(function(res) {
                $scope.groups = res.data;
            });
        });
      }
      $timeout(callAtTimeout, 3000);
    });
