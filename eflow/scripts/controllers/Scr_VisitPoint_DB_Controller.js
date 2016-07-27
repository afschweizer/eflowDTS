DTS_APP.controller('Scr_VisitPoint_DB_Controller',function($scope) {
 
$scope.init = function(){
	try{
       	Set_Current_Page();
	 
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
	//$scope.Show_Quantity=true;
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
           $scope.Show_Select_Vehicule = false;
	    $scope.Array_Serials =  [];
        $scope.Check = false;
        $scope.Date = new Date(eflowDTS.Session.Calendar_Date);
		$scope.Headers = [{"es":"NOMBRE","value":"Name"},
		{"es":"VEHICULO","value":"ID_Truck"},{"es":"USUARIO","value":"User"},
		{"es":"SECTOR","value":"Route"},{"es":"SECUENCIA","value":"Sequence"},
		{"es":"DURACION","value":"Estimated_Delivery_Time"}];
		$scope.ArrayStatus =[{"ID":"Partial","Name":"Parcialmente Finalizado"},{"ID":"In_Process","Name":"En Proceso"},
		{"ID":"Aborted","Name":"Abortado"},{"ID":"Finalized","Name":"Finalizado"},{"ID":"Unassigned","Name":"No Asignado"}];
		var Unity= [{"es":"Unidad","value":"Unidad"},{"es":"Caja","value":"Caja"},
		{"es":"Paquete","value":"Paquete"},{"es":"Bulto","value":"Bulto"}] ;
		$scope.ArrayUnidads = Unity;	
		$scope.Select_VisitPoint();
		$scope.Select_Local();
		$scope.Select_User();
		$scope.Select_Vehicle();
		clearInterval(myVar);
    
   var myVar = setInterval(function() {   	
       $scope.Select_VisitPoint();
    }, 120000);
    
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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
	
	
	
	$scope.Add_Serial =function(value){try{
	    if(value===""||value===undefined){
	    	alert("Debe de ingresar una serie");	
	    	
	    	}
		else{
			existe=false;
			for (var i=0; i<  $scope.Array_Serials.length;i++){
				if( $scope.Array_Serials[i].Serial===value)	{
					existe=true;
					break;
				}			
			}	
			if(existe===true){
				alert("La serie que ha ingresado ya fue ingresada");
			}
			else{
			   var obj_serials={};
			   obj_serials.Serial = value;
				$scope.Array_Serials.push(obj_serials);
				document.getElementById("Input_Serial").value="";
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
			
 $scope.Show_Serial = function(Value) {try{
      if (Value.Serial ==="SP"){
           $scope.Show_Serie=true;
		   $scope.Show_Quantity=false;
      }else{
           $scope.Show_Serie=false;
      } 
      if (Value.Serial ==="SS"){
           $scope.Show_Code=true;
           $scope.Show_Quantity=true;
      }else{
           $scope.Show_Code=false;
      } 
      if (Value.Serial ==="SU"){
           $scope.Show_Quantity=true;
      }

		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Show_Serial",
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
	$scope.Select_Local= function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Visit_Point',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayVisitPoint = JsonData;
		$scope.$apply($scope.ArrayVisitPoint);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
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

$scope.Filter_License = function(ID){
try{
for(var j = 0; j <$scope.ArrayUser.length; j++){
	if($scope.ArrayUser[j].ID === ID){
		var User = $scope.ArrayUser[j];
		break;
	}
}
$scope.Show_Select_Vehicule = true;
$scope.ArrayVehicle_Filter = [];

for(var x = 0; x < $scope.ArrayVehicle.length; x++){
    for(var y = 0; y < $scope.ArrayVehicle[x].License.length; y++){
         for(var z = 0; z < User.License.length; z++){
                    if($scope.ArrayVehicle[x].License[y] === User.License[z]){
                        if($scope.ArrayVehicle_Filter.indexOf($scope.ArrayVehicle[x]) === -1){
                            $scope.ArrayVehicle_Filter.push($scope.ArrayVehicle[x]);
                           }
                        break;
                    }         
         }
     }

}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Filter_License",
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

	
 $scope.See_Status=function(status){
 	try{
	$scope.Status_Filter=status;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "See_Status",
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

$scope.Checking_Checkboxes_Check = function(){
	try{
	$scope.Show_Actions = false;
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check",
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

$scope.Checking_Checkboxes_Check_Master = function(master){
	try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check_Master",
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


$scope.Action_Option= function(Option){try{
	if(Option === "Cambiar"){
		$scope.Open_Modal_Change();
	}	
	if(Option === "Eliminar"){
		$scope.Delete_Job_DB();
	}
	if(Option === "Estados"){
		$scope.Open_Modal_Change_Status();
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Action_Option",
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
 $scope.Info_Vehicle = function(Vehicle,ArrayVehicle){
	try{for ( i = 0; i < ArrayVehicle.length ; i++ ){
      if(Vehicle === ArrayVehicle[i].ID_Truck){
		$scope.ObjVeh = {};
		$scope.ObjVeh.Description = ArrayVehicle[i].Description;
		$scope.ObjVeh.Weight = ArrayVehicle[i].Weight;
		$scope.ObjVeh.Cubics = ArrayVehicle[i].Cubics;
      }     
   } 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Info_Vehicle",
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

$scope.Select_User = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company,
    			"Type": "Conductor"
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);
		}
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
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



$scope.Select_Vehicle = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayVehicle = JsonData;
		$scope.$apply($scope.ArrayVehicle);
		}
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
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

function Change_Structure(arr){
	try{
	var NewArray = [];
	
	for(var i = 0; i < arr.length; i++){
	
	var obj = {};
	var y = arr[i];

	obj.Order_Number = 1455667200000+i;
	obj.ID_Location = y.VisitPoint.IDDelivery_Location;
	obj.Name = y.VisitPoint.Name;
	obj.Address = y.VisitPoint.Address;
	obj.Manager = y.VisitPoint.Manager;
	obj.Telephone_Number = y.VisitPoint.TelephoneNumber;
	obj.Mail = y.VisitPoint.Mail;
	obj.Latitude = y.VisitPoint.Geolocation.Latitude;
	obj.Longitude = y.VisitPoint.Geolocation.Longitude;
	obj.Estimated_Date = (new Date("2016-02-01").getTime()) + eflowDTS.Time.Difference;
	obj.Control.Creation_Date = new Date().getTime();
	obj.Control.Created_User = eflowDTS.Session.UserName;
	obj.Delivery_Period_Start = y.DeliveryPeriod.Start;
	obj.Delivery_Period_End = y.DeliveryPeriod.End;
	obj.Estimated_Delivery_Time = y.EstimatedDeliveryTime;
	obj.Sequence = y.Sequence;
	obj.User = y.User;
	obj.ID_Truck = new Date().getTime();
	obj.Visit_State = y.VisitPoint.State_Visit;
	obj.Transferring_State = "Pending_To_Mobile";
	obj.Invoice = new Date().getTime();
	obj.Collection_Info = {};
	obj.Collection_Info.Collection_Name = "Store_Jobs";
	obj.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
	obj.Visit_Point_Incidents = [];
	obj.Visit_Point_Incidents_Type = y.Visit_Point_Incidents_Type;
	obj.Visit_Point_States =  [
        {
        