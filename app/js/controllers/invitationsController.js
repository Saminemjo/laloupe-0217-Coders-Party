angular.module('app')
    .controller('InvitationsController', function($scope, CurrentUser, UserService, GroupService, LocalService, EventService, $state) {

        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            $scope.event = {};
            $scope.event.invitations = [];
            $scope.groupok = function() {
                for (var i = 0; i < $scope.groups.length; i++) {
                    if ($scope.groups[i].selected === true) {
                        return true;
                    }
                }
            };
            var id = LocalService.get('eventId');
            $scope.valider = function() {
                for (var i = 0; i < $scope.groups.length; i++) {
                    if ($scope.groups[i].selected === true) {
                        for (var g = 0; g < $scope.groups[i].members.length; g++) {
                            $scope.event.invitations.push($scope.groups[i].members[g]);
                        }
                    }
                }
                EventService.update(id, $scope.event).then(function() {
                    $state.go('user.tobringlist');
                });
            };
        });
    });
