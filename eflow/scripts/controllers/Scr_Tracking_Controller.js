var map;
DTS_APP.controller('Scr_Tracking_Controller',function($scope){


			$scope.init = function(){	
try{
			$scope.Show_Components.Map_Online_User = true;
			Load_Init_Map();
			}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Tracking_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: eflowDTS.Session.General.User,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
			
			function Load_Init_Map(){
		try{
		var div = document.getElementById('Map_Online_User');
   			
   			if(div){
	   		    map = new GMaps({
				div: div,
			    lat: eflowDTS.Geolocation.Latitude, 
				lng: eflowDTS.Geolocation.Longitude,
			    zoom: 12
			    }); 
			 }
			 
		//$scope.Show_Components.Map_Online_User = false;
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Tracking_Controller",
                Method: "Load_Init_Map",
                Description: "Error no controlado",
                User: eflowDTS.Session.General.User,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
	
			});