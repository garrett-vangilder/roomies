app.controller("NewHomeCtrl", function($scope, $window, AuthFactory, $routeParams, HomeFactory) {
    $scope.account = {
        email: "",
        password: ""
    };

    $scope.homeInfo = {
        address: "",
        houseName: "",
        houseMemberUid: ""
    };

    $scope.registerUser = () => {
        console.log("register with me. Hail Mary!");
        AuthFactory.createUser({
            email: $scope.account.email,
            password: $scope.account.password,
            userName: $scope.account.userName
        })
        .then((userData) => {
            $scope.loginNewHome();
        }, (error) => {
            console.log("Error Creating home and new User");
        });
    };

    $scope.loginNewHome = () => {
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    $window.location.href = "#registerhome"
                } else {
                    $window.location.href = "#/login"
                }
            }, (error) => {
                console.log("You have an error")
            });
    };

    $scope.registerNewHome = () => {
      console.log("Register a new home with me. Hail Mary");
      // $scope.homeInfo.houseMemberUid: AuthFactory.getUid();
      HomeFactory.createHome({
        address: $scope.homeInfo.address,
        houseName: $scope.homeInfo.houseName,
        houseMemberUid: AuthFactory.getUid()
      });
    };

    $scope.login = () => {
      console.log("YOURE GOING TO LOGIN");
      AuthFactory.loginUser($scope.account)
      .then( (data) => {
        if (data) {
          HomeFactory.getUsersHome(AuthFactory.getUid())
          .then( function() {
            $window.location.href= `#/profile/${HomeFactory.getHouseid()}`;
          });
        } else {
          $window.location.href = "#/";
        }
      }, (error) => {
        console.log("YOU HAVE AN ERROR");
      });
    };
});
