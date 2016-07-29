var map;
DTS_APP.controller('Scr_VisitPoint_General_View_Controller',function($scope){

$scope.init = function(){
try{
	
	$scope.ArrayRoute = [];
       	    Set_Current_Page();
	        $('#Charging').modal('show');
			
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
			Select_VisitPoint();
			Select_Routes();
				
			
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
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


	function Select_Routes(){
		
		try{
			
			var JsonData = {
				'Method_Name':'Select_All_Route',
				'Data':{
					"Company":eflowDTS.Session.Company
				},
				'Fields':{}
			};
			
			var onSuccess = function(Response){
				
				$scope.Array_Route = Response;
				
			};
			
			var onError = function(e){
				
				var err = {
				Generated : true,
				Page: "Scr_VisitPoint_General_View",
				Method:"Select_Routes",
				Description: "onError",
				User: eflowDTS.Session.UserName,
				Company: eflowDTS.Session.Company,
				Date: new Date().getTime(),
				Error: e
				};
				
				throw err;
				
			};
			
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,JsonData,onSuccess,onError);
			
		}catch(e){
			var obj;
			if(e.hasOwnProperty("Generated") === false){
				obj = {
					Generated: false,
					Page:"Scr_VisitPoint_General_View",
					Method:"Select_Routes",
					Description:"Error no Controlado",
					User: eflowDTS.Session.UserName,
					Company: eflowDTS.Session.Company,
					Date: new Date().getTime(),
					Error: e			
				};
				Save_Error(obj);
			}else{
				Save_Error(e);
			}
			
		}
		
	};
	
	function Load_Init_Map(){
		try{
			
		var div = document.getElementById('Map_VisitPoint');
   			
   			if(div){
	   		    map = new GMaps({
				div: div,
			    lat: eflowDTS.Geolocation.Latitude, 
				lng: eflowDTS.Geolocation.Longitude,
			    zoom: 12,
			    tilesloaded: function(e){	
			    	 GMaps.off('tilesloaded',map);
			    	 setTimeout(function(){
			    	 	Add_Markers();
	                	$('#Charging').modal('hide');
	                	}, 3000);
			    	}
			    }); 
			 }
			 
		//$scope.Show_Components.Map_Online_User = false;
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Load_Init_Map",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
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
	
	$scope.See_Routes = function(){ 
	try{
	map.removePolygons();
	
		for(var i = 0; i < $scope.Array_Route.length; i++){
			
			var Route = $scope.Array_Route[i];	
			var color = getRandomColor();
				map.drawPolygon({
					paths: Route.Route_Path,
					strokeColor: color, 
					strokeOpacity: 1,
					strokeWeigth: 3,
					fillColor: color,
					fillOpacity: 0.6	
				});				
		}
		
	}catch(e){		
		console.error(e);
	}
	
	};
	
	
	function Add_Markers(){
		
		for(var i = 0; i < $scope.Array_VisitPoint.length; i++){
			var VP = $scope.Array_VisitPoint[i];
			
			map.addMarker({
				lat: VP.Latitude,
				lng: VP.Longitude,
				value: VP,
				title: VP.Name,
				infoWindow:{
					content: '<H3>'+VP.Name+'</H3></br><p><b>Sector: </b>'+VP.Route.Route_Name+'</p>'
				},
				click:function(e){
					map.setCenter(VP.Latitude,VP.Longitude);
					map.refresh();
				}
			});	
			
			map.refresh();
		}
		
	};
	
	$scope.Resize = function(){
		
		if(typeof map === "object"){
			map.refresh();	
		}

	};
	
	
	 
	function Select_VisitPoint(){
		try{
			 
		var Query = {
			'Method_Name':'Select_All_Visit_Point',
			'Data':{
				'Company':eflowDTS.Session.Company                
			},
			'Fields':{			
			}
		};
		
		var Success = function(json){
			$scope.Array_VisitPoint = json;			
			Load_Init_Map();
			
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_Jobs",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		console.log(e);				
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Query,Success,onError);
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_Jobs",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
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