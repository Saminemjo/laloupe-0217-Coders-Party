angular.module('app')
    .controller('InvitationsController', function($scope, CurrentUser, UserService, GroupService, LocalService, InvitationService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);
        $scope.events = {};
        $scope.events.list = [];
        $scope.groupok = function() {
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].selected === true) {
                    return true;
                }
            }
        };
      });
        $scope.valider = function() {
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].selected === true) {
                    $scope.events.list.push($scope.groups[i]);
                }
            }
            console.log($scope.events);
        };
    });
