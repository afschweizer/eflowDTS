// script.js

    // create the module and name it DTS_APP
        // also include ngRoute for all our routing needs
    var DTS_APP = angular.module('DTS_APP', ['ngRoute']);

    // configure our routes
    DTS_APP.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'views/Scr_Login.html'
            })
            .when('/Data_Summary',{
            	templateUrl : 'views/Scr_Summary.html'
            })
            .when('/Calendar', {
                templateUrl : 'views/Scr_Calendar.html'
            })
            .when('/Job_Import',{
                templateUrl : 'views/Scr_Job_Import.html'
            })
			.when('/User_Import',{
            	templateUrl : 'views/Scr_User_Import.html'
            })
			.when('/Vehicle_Import',{
            	templateUrl : 'views/Scr_Vehicle_Import.html'
            })
			.when('/Route_Import',{
            	templateUrl : 'views/Scr_Route_Import.html'
            })
			.when('/VisitPoint_Import',{
            	templateUrl : 'views/Scr_VisitPoint_Import.html'
            })
            .when('/PV_DB', {
                templateUrl : 'views/Scr_VisitPoint_DB.html'
            })
            .when('/Login', {
                templateUrl : 'views/Scr_Login.html'
            })
             .when('/user', {
                templateUrl : 'views/Scr_User.html'
            })
             .when('/VisitPoint', {
                templateUrl : 'views/Scr_VisitPoint.html'
            })
            .when('/vehicle', {
                templateUrl : 'views/Scr_Vehicle.html'  
            })
            .when('/detail',{
            	templateUrl : 'views/Scr_Vehicles_Detail.html'
            })         
            .when('/Vehicles_Online', {
                templateUrl : 'views/Scr_Vehicles_Online.html'
            })
            .when('/Company',{
                templateUrl : 'views/Scr_Company.html'
            }) 
            .when('/Routes',{
            	templateUrl : 'views/Scr_Route.html'
            })
            .when('/tracking',{
            	templateUrl : 'views/Scr_Tracking.html'
            })
            .when('/VisitPoint_General_View',{
            	templateUrl : 'views/Scr_VisitPoint_General_View.html'
            })
            .when('/General_Detail',{
            	templateUrl : 'views/Scr_General_Detail.html'
            })
            .when('/Settings',{
            	templateUrl : 'views/Scr_Settings.html'
            })
            .when('/404',{
            	templateUrl: 'views/Scr_404.html'
            })
            .when('/Historic_Information',{
            	templateUrl: 'views/Scr_Historic_Information.html'
            })
            .when('/Restoring_DB',{
            	templateUrl: 'views/Scr_Restoring_DB.html'
            })
            .when('/Info',{
            	templateUrl: 'views/Scr_Info.html'
            })
            .when('/Subscription',{
            	templateUrl: 'views/Scr_Subscription.html'
            })
            .when('/Notification',{
            	templateUrl: 'views/Scr_Notification.html'
            })
            .when('/Tuto',{
            	templateUrl: 'views/Scr_Tutorial.html'
            })
            .otherwise({
            	redirectTo : '/404'
            });
			
    });
    
    
    
    DTS_APP.filter('startFrom',function(){
    	return function(input,start){
    		start = +start;
    	    return input.slice(start);
	    };
    });
