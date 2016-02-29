/**
 * Created by Mor on 13/01/2016.
 * This is the home Module.
 * It is responsible for the home page controllers and templates.
 */

var home=angular.module('homeApp',['ngRoute']);

home.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: '',
            templateUrl: 'views/Home/home.html'
        }).
        when('/login', {
            controller: 'loginController',
            templateUrl: 'views/Home/login.html'
        }).
        otherwise({
            redirectTo:'/'
        });
});


home.directive('header',function(){
    return{
        templateUrl:'views/header.html'
    };
});

home.directive('about',function(){
    return{
        controller:'googleMapController',
        templateUrl:'views/Home/about.html'
    };
});

home.directive('screens',function(){
    return{
        templateUrl:'views/Home/screens.html'
    };
});

home.directive('videos',function(){
    return{
        templateUrl:'views/Home/videos.html'
    };
});

home.directive('nav',function(){
    return{
        templateUrl:'views/nav.html'
    };
});

home.directive('footer',function(){
    return{
        templateUrl:'views/footer.html'
    };
});



