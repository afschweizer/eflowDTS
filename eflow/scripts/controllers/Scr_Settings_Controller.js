DTS_APP.controller('Scr_Settings_Controller', function($scope) {

    $scope.init = function() {
    		try{
       	Set_Current_Page();
$scope.Array_License = eflowDTS.Session.DataCompany.Settings.License;
$scope.Array_User = eflowDTS.Session.DataCompany.Settings.User;
$scope.Array_Vehicle = eflowDTS.Session.DataCompany.Settings.Vehicle;
$scope.Array_Fuel = eflowDTS.Session.DataCompany.Settings.Fuel;
$scope.Array_Unity = eflowDTS.Session.DataCompany.Settings.Unity;


   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Settings_Controller",
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

$scope.Remove_In_Array = function(Obj,Array){
	try{
	Array_Remove(Array,Obj);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Settings_Controller",
                Method: "Remove_In_Array",
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
				document.getElementById("Input_Value").value="";
				document.getElementById("Input_Description").value="";
			}
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Settings_Controller",
                Method: "validate_Settings",
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

$scope.SaveData= function(){
try{
		var Json = eflowDTS.Session.DataCompany;
		Json.Control.Modification_date = new Date().getTime();
		Json.Control.Modify_User = eflowDTS.Session.UserName;
		Json.Settings = {
							    "Unity": $scope.Array_Unity,
							    "Fuel": $scope.Array_Fuel,
							    "User": $scope.Array_User ,
							    "Vehicle": $scope.Array_Vehicle ,
							    "License": $scope.Array_License 
							    };
		var JsonData = 
				{
					'Method_Name': 'Update_Company',
					'Data': Json
				};
		var onSuccess = function(JsonData){
			alert(JsonData);
			};
				
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Save_User_Edit",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;		
			console.log(JsonData);
			};
				
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
									    
							    
							    
			
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Settings_Controller",
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




    });