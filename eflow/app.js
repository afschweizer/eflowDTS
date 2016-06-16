// script.js

    // create the module and name it DTS_APP
        // also include ngRoute for all our routing needs
    var DTS_APP = angular.module('DTS_APP', ['ngRoute','ngPagination']);

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
            .when('/notification', {
                templateUrl : 'views/Scr_Message.html'
            })
            .when('/history', {
                templateUrl : 'views/Scr_Vehicle_History.html'
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
            .when('/dashboard',{
            	templateUrl : 'views/Scr_DashBoard.html'
            })
            .when('/detail',{
            	templateUrl : 'views/Scr_Vehicles_Detail.html'
            })         
            .when('/Vehicles_Online', {
                templateUrl : 'views/Scr_Vehicles_Online.html'
            })
            .when('/product',{
                templateUrl : 'views/Scr_Product.html'
            })
            .when('/Company',{
                templateUrl : 'views/Scr_Company.html'
            })
            
            .when('/Routes',{
            	templateUrl : 'views/Scr_Route.html'
            })
            /*
            
           
             // route for the Scr_Jobs page
            .when('/Jobs2', {
                templateUrl : 'views/Scr_Jobs2.html'
              
            })
             // route for the Scr_Jobs page
            .when('/PV_DB', {
                templateUrl : 'views/Scr_VisitPoint_DB.html'
            })
            // route for the map page
           
            // route for the map page
            .when('/tareas', {
                templateUrl : 'views/Scr_Tareas.html'
               
            })
            // route for the map page
            .when('/map', {
                templateUrl : 'views/Scr_Map.html'
               
            })
            // route for the map page
            .when('/map1', {
                templateUrl : 'views/Scr_Map_Position.html'
               
            })
			
            // route for the map page
            .when('/item', {
                templateUrl : 'views/Scr_Item.html'
               
            })
			
            // route for the map page
            
			
            // route for the map page
            .when('/map_notification', {
                templateUrl : 'views/Scr_Map_Vehicle.html'
               
            })
			
            // route for the map page
            .when('/login', {
                templateUrl : 'views/Scr_Login.html'
               
            })
			
            // route for the map page
            .when('/user', {
                templateUrl : 'views/Scr_User.html'
               
            })
			
            // route for the map page
            .when('/job', {
                templateUrl : 'views/Scr_Job.html'
               
            })
            // route for the map page
           
			.when('/main', {
                templateUrl : 'views/Scr_Main.html'
               
            })	
            */
           ;
			
    });
