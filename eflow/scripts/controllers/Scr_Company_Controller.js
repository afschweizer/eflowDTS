 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
$scope.Type = "password"; 
	$scope.init = function(){
		
		try{
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
		$scope.Show_Map = true;
		$scope.Class_Map = "fa fa-eye";
		$scope.Text_Map = "Mostar Mapa";
        $scope.Show_Company=true;
        $scope.Show_User=false;
        $scope.Show_Settings=false;
        $scope.Show_Settings_License= false;
        $scope.Show_Settings_User= false;
        $scope.Show_Settings_Fuel= false;
        $scope.Show_Settings_Vehicle= false;
        $scope.Show_Settings_Unity = false;
		$scope.Array_Unity = [];
		$scope.Array_Fuel = [];
		$scope.Array_User = [];
		$scope.Array_Vehicle = [];
		$scope.Array_License = [];
		$scope.Companys={};
      // 	Set_Current_Page();
       	var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
		$scope.ArrayGenders = Gender;
	Load_Map_Init();
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};
		
		$scope.Switch_Map_Data = function(Show_Map){
			if(Show_Map){
			$scope.Class_Map = "fa fa-eye-slash";
		    $scope.Text_Map = "Ocultar Mapa";
			}else{
			$scope.Class_Map = "fa fa-eye";
			$scope.Text_Map = "Mostar Mapa";
			}
		};
		
	function Load_Map_Init(){
		
	try{
		var div = document.getElementById('Map_Dashboard_Company');
		$('#Charging').modal('show');
		if(div){ 			
			map = new GMaps({
				div: div,
				lat:eflowDTS.Geolocation.Latitude,
				lng:eflowDTS.Geolocation.Longitude,
				zoom:12	,
				tilesloaded: function(e){					
	                GMaps.off('tilesloaded',map);
	                setTimeout(function(){
	                	$('#Charging').modal('hide');
	                	$scope.Show_Map = false;
	                	}, 3000);
	                
                }
			});	
			
			
		map.removeMarkers();
		    		
		$scope.Array_Route = [];
		    
		map.setContextMenu({
				  control: 'map',
				  options: [{
				    title: 'Agregar Vértice',
				    name: 'Add_Vertex',
				    action: function(e) {
				    	
			this.removeMarkers();
				    	
			  $scope.Companys.location_Latitud = e.latLng.lat();
			  $scope.Companys.location_Longitud = e.latLng.lng();
			  
				   var marker =   this.addMarker({
				        lat: e.latLng.lat(),
				        lng: e.latLng.lng(), 
				        draggable: true,
				        title: 'Vértice',
				        icon: 'images/Point_Blue.png'
				      });
				      
			function refresh_Coords(e) {
   			  $scope.Companys.location_Latitud = e.latLng.lat();
			  $scope.Companys.location_Longitud = e.latLng.lng();
			}
	marker.addListener('drag', refresh_Coords);
    marker.addListener('dragend', refresh_Coords);
}
				  }, {
				    title: 'Centrar aquí',
				    name: 'Center_here',
				    action: function(e) {
				      this.setCenter(e.latLng.lat(), e.latLng.lng());
				    }
				  }]
				});
		
		}
		
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Load_Map_Init",
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
		
	$scope.Password = function(x){
	try{

if(x === true){
$scope.Type = "text";
}else{
$scope.Type = "password";
}

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Password",
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

$scope.validate_Companys= function(Companys){
try{
	   Select_Company();
        $scope.Companys=Companys;	
        $scope.Show_User= true; 
        $scope.Show_Company = false;
        
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_Companys",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};


function Select_Company(){

      try{
		 var JsonData = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": $scope.Companys.identifier,
    			"Domain":"@"+$scope.Companys.domain1.toLowerCase()+"."+$scope.Companys.domain2.toLowerCase(),
    			"Name":$scope.Companys.name
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(arr){
			if(arr.length > 0){
				alert("Esta Compañia ya esta registrada");
				window.location.href='#';
			}
			
		}
		var onError = function(e){
					 var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "Select_Company",
            Description: "onError",
            User: "Default",
            Company: "Default",
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		console.log(e);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
       
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "DataCompany",
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
    }  }
   		
$scope.validate_User= function(User){
try{
	   Select_User();
        $scope.User=User;	
        $scope.Show_User= false; 
        $scope.Show_Company = false;
        $scope.Show_Settings = true;
        
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_User",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};		
function Select_User(){

      try{
		 var JsonData = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Identifier": $scope.Companys.identifier,
    			"Mail":,
    			"Name":$scope.Companys.name
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(arr){
			if(arr.length > 0){
				alert("Esta Compañia ya esta registrada");
				window.location.href='#';
			}
			
		}
		var onError = function(e){
					 var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "Select_Company",
            Description: "onError",
            User: "Default",
            Company: "Default",
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		console.log(e);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
       
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "DataCompany",
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
    }  }




















});