 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
	$scope.init = function(){
		
		try{
        $scope.Show_Company=false;
        $scope.Show_User=false;
        $scope.Show_Settings=true;
        $scope.Show_Settings_License= false;
        $scope.Show_Settings_User= false;
        $scope.Show_Settings_Fuel= false;
        $scope.Show_Settings_Vehicle= false;
        $scope.Show_Settings_Unity = false;
				$scope.Array_Unity={};
       	Set_Current_Page();
       	var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
		$scope.ArrayGenders = Gender;
		//To_Reload_Eflow_Config();
		//eflowDTS = Get_Cookie("EflowCookie");
		//Get_Cookie("EflowCookie"); 
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
function Select_Company(){

      try{
		 var JsonData = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": $scope.Companys.identifier,
    			"Domain":"@"+$scope.Companys.domain.toLowerCase(),
    			"Name":$scope.Companys.name
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(arr){
			if(arr.length > 0){
				alert("Esta Compañia ya esta registrada");
				window.location.href='#'
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
$scope.validate_Settings =function(Obj,Array){
		try{
	    if(Obj.Value===""||Obj.Value===undefined||Obj.Description===""||Obj.Description===undefined){
	    	alert("Debe de ingresar los valores");	
	    	
	    	}
		else{
			existe=false;
			for (var i=0; i<  $scope.Array.length;i++){
				if( $scope.Array[i].Value === Obj.Value)	{
					existe = true;
					break;
				}			
			}	
			if(existe===true){
				alert("Los datos que ha ingresado ya fueron ingresados en el sistema");
			}
			else{
			   var obj_Array = {};
			    obj_Array.Value = Obj.Value;
			    obj_Array.Description = Obj.Description;
				$scope.Array.value.push(obj_Array);
				document.getElementById("Input_Serial").value="";
				document.getElementById("Input_Description").value="";
			}
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_Serial",
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



		
$scope.validate_User= function(User){
try{
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
		
$scope.validate = function(Companys,User,Settings){
try{
						 
						  var JsonData1 = {
						  	'Method_Name': 'Insert_User',
							 'Data': [{
							 	"Control":{
							 	"Creation_Date": new Date().getTime(),
							 	"Created_User" : "Default"
							 	},
				    			"Company": Companys.name,
				    			"UserName": User.UserName,
							    "Password": User.Password,
							    "ID": User.ID,
							    "Name":User.Name,
							    "Lastname": User.Lastname,
							    "Lastname2": User.Lastname2,
							    "Identification": User.Identification,
							    "Mail": User.Mail.toLowerCase()+ Companys.domain.toLowerCase(),
							    "Gender": User.Gender,
							    "Birthdate": User.Birthdate,
							    "Type": "Administrador",
							    "Address": User.Address
							    }]
						};
						  	
						  	
						  	
					            
					        var onSuccess = function(onSuccess){
				
				
				};
				
				var onError = function(onError){
					 
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData1, onSuccess, onError);
	
	 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate",
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