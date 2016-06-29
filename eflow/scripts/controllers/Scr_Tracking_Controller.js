var map;
DTS_APP.controller('Scr_Tracking_Controller',function($scope){


			$scope.init = function(){	

			$scope.Show_Components.Map_Online_User = true;
			Load_Init_Map();
			}
			
			function Load_Init_Map(){
		
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
	};
	
			});