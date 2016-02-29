/**
 * Created by RaZr0 on 04/01/2016.
 * This is the Manage Module.
 * It is responsible for the manger page.
 * In the manager page we view all the list in our data base,and we can edit or add new messages.
 */


var manage=angular.module('manageAdsApp',['ngRoute']);

manage.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            controller: 'messagesListController',
            templateUrl: 'views/manage/messageslist.html'
        })
        .when('/messageedit/:id', {
            controller: 'messageEditController',
            templateUrl: '../views/manage/messageedit.html'
        }).
    otherwise({
        redirectTo:'/'
    });
});

manage.directive('nav',function(){
    return{
        templateUrl:'views/navManage.html'
    };
});

manage.directive('header',function(){
    return{
        templateUrl:'../views/header.html'
    };
});


manage.directive('footer',function(){
    return{
        templateUrl:'../views/footer.html'
    };
});



