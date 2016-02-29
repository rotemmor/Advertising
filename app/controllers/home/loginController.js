/**
 * Created by Mor on 12/01/2016.
 * This is the LoginController.
 * It is responsible for the verification of the admin and its entrance to the admin manage page.
 */


home.controller('loginController', function ($scope, $routeParams, $http,$window) {


    $scope.user=
    {
        "username": "",
        "pass": ""
    };

    /**
     * The sign in function which verifies if the user and password are valid.
     */
    $scope.signIn = function() {
        $http.post('verifyUser', $scope.user).
            success(function(data, status) {
                if(data.toString()=="true") {
                    $window.location.href = '/list';
                }
                else {
                    $window.alert("No such user! Please enter username and password again.");
                }


            })
    };



});
