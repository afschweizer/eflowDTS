function comprueba(val,input){
	 
var arroba = /@/;

/*if(arroba.test(val)){
	input.value = val.replace(arroba,'');
	}*/
if(!arroba.test(val)){
return val;	
}

};

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
		cargar_paises(); 
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
			try{
			if(Show_Map){
			$scope.Class_Map = "fa fa-eye-slash";
		    $scope.Text_Map = "Ocultar Mapa";
			}else{
			$scope.Class_Map = "fa fa-eye";
			$scope.Text_Map = "Mostar Mapa";
			}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Switch_Map_Data",
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
		
	

  function cargar_paises(){
  	try{
  		
  	var Callback=function(response){
  		
  		$scope.Array_Country=JSON.parse(response);
  		
  	};
  	
  	Load_JSON("scripts/externals/Paises.json", Callback);
  	
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "cargar_paises",
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
  
  
	function Load_Map_Init(){
		
	try{
		var div = document.getElementById('Map_Dashboard_Company');
		$('#Charging').modal('show');
		if(div){ 			
			map = new GMaps({
				div: div,
				lat: 9.904668,
				lng: -83.906478,
				zoom: 1,
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
				    title: 'Seleccionar Ubicación',
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
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
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
User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
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
    			"Identifier": $scope.Companys.name.toUpperCase(),
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
                Page: "Scr_Company_Controller",
                Method: "Select_Company",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
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
				"Mail": $scope.User.Mail.toLowerCase()+ "@"+$scope.Companys.domain1.toLowerCase()+"."+$scope.Companys.domain2.toLowerCase()
            },
            'Fields':{
            	
            	
            	
            	
            }
        };
		var onSuccess = function(arr){
			if(arr.length > 0){
        $scope.Show_Company=false;
        $scope.Show_User=true;
        $scope.Show_Settings=false;
				alert("Este Usuario ya esta registrado");
				document.getElementById("Mail_User")===""; 
                document.getElementById("Mail_User").focus(); 
			}
			
		}
		var onError = function(e){
					 var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "Select_User",
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
                Page: "Scr_Company_Controller",
                Method: "Select_User",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  }

						
$scope.SaveData= function(){
try{
	  var JsonData = {
						  	'Method_Name': 'Insert',
							 'Company_Data': {
							 	"Control":{
							 	"Creation_Date": new Date().getTime(),
							 	"Created_User" : "Default"
							 	},
				    			"Name": $scope.Companys.name,
				    			"Identifier": $scope.Companys.name.toUpperCase(),
							    "Domain": "@"+$scope.Companys.domain1.toLowerCase()+"."+$scope.Companys.domain2.toLowerCase(),
							    "Mail": $scope.Companys.mail.toLowerCase(),
							    "Country":$scope.Companys.country,
							    "Location":
							    {
							    	"Latitud":$scope.Companys.location_Latitud,
							    	"Longitud":$scope.Companys.location_Longitud
							    },
							     "Address": $scope.Companys.Address,
							    "Phone": $scope.Companys.phone,
							    "Fax": $scope.Companys.fax,
							    "Settings":{
							    "Unity": $scope.Array_Unity,
							    "Fuel": $scope.Array_Fuel,
							    "User": [
							    	    {
								          "Value": "Conductor",
								          "Description": "Conductor"
								        },
								        {
								          "Value": "Administrador",
								          "Description": "Administrador"
								        }
							    ],//$scope.Array_User ,
							    "Vehicle": $scope.Array_Vehicle ,
							    "License": $scope.Array_License 
							    }
							    },
							 'User_Data': {
							 	"Control":{
							 	"Creation_Date": new Date().getTime(),
							 	"Created_User" : "Default"
							 	},
				    			"Company": $scope.Companys.name.toUpperCase(),
				    			"UserName": $scope.User.UserName,
							    "Password": $scope.User.Password,
							    "ID": $scope.User.ID,
							    "Name":$scope.User.Name,
							    "Lastname": $scope.User.Lastname,
							    "Lastname2": $scope.User.Lastname2,
							    "Identification": $scope.User.Identification,
							    "Mail": $scope.User.Mail.toLowerCase()+ "@"+$scope.Companys.domain1.toLowerCase()+"."+$scope.Companys.domain2.toLowerCase(),
							    "Gender": $scope.User.Gender,
							    "Birthdate": $scope.User.Birthdate,
							    "Type": "Administrador",
							    "Address": $scope.User.Address
							    }
						};
			  var onSuccess = function(onSuccess){
			  	window.location.href = "#";
				};
				
			var onError = function(onError){
					 
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "SaveData",
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

$scope.validate_Settings =function(Obj,Arr){
		try{
	    if(Obj.Value===""||Obj.Value===undefined||Obj.Description===""||Obj.Description===undefined){
	    	alert("Debe de ingresar los valores");	
	    	
	    	}
		else{
			existe=false;
			for (var i=0; i< Arr.length;i++){
				if( Arr[i].Value === Obj.Value)	{
					existe = true;
					break;
				}			
			}	
			if(existe===true){
				alert("Los datos que ha ingresado ya fueron ingresados en el sistema");
			}
			else{
				var Unity = {};
				Unity.Value = Obj.Value;
				Unity.Description = Obj.Description;
				Arr.push(Unity);
				
				var inputValues = document.getElementsByName("Input_Value");
var inputDescription = document.getElementsByName("Input_Description");

for(var j = 0; j < inputValues.length;j++){
    inputValues[j].value = "";
    //console.log("Limpiando input value: "+ i);
}

for(var k= 0; k < inputDescription.length; k++){
    inputDescription[k].value = "";
    //console.log("Limpiando input description: "+ i);
}

				
				
			//	document.getElementById("Input_Value").value="";
			//	document.getElementById("Input_Description").value="";
			}
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_Settings",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Remove_In_Array = function(Obj,Array){
	try{
	Array_Remove(Array,Obj);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Remove_In_Array",
                Description: "Error no controlado",
              User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
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