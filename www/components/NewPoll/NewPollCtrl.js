app.controller('NewPollCtrl', ['$scope', '$rootScope', 'ForumsFactory', '$stateParams', function($scope, $rootScope, ForumsFactory, $stateParams) {
  
  $scope.title = 'Add Poll';

  // Create empty newPoll object on $scope and set starting rank to 0
  $scope.newPoll = {};
  $scope.newPoll.rank = 0;
  $scope.currentPoll = ForumsFactory.getPolls($stateParams.forumKey);
  ForumsFactory.pollAvailable($stateParams.forumKey)
    .then(function(result) {
      $scope.pollAvailable = result;
    });

  $scope.submitPoll = function() {
    //if text has been inputted in the Poll input
    if ($scope.newPoll.text !== undefined) {
      ForumsFactory.addPoll($stateParams.forumKey, $scope.newPoll);
      // Go back to the forum view
      $rootScope.goBack();
    }
  };

  $scope.endPoll = function() {
    ForumsFactory.endPoll($stateParams.forumKey);
    $rootScope.goBack();
  }

  $scope.getPollText = function(optionNumber) {
    var optionString = 'option' + optionNumber;
    console.log($scope.currentPoll[0][optionString]);
    return $scope.currentPoll[0][optionString];
  }
}]);
