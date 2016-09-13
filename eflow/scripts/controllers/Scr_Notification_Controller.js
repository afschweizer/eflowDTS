DTS_APP.controller('Scr_Notification_Controller',function($scope) {

$scope.init = function(){
	try{
		$scope.Show_Folder=true;
		$scope.Show_Read_Message=false;
		$scope.Show_All_Message=false;
		$scope.Show_Delete_Message=false;
$scope.currentPage = 0;
$scope.pageSize = 10; 
$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayNotificacion.length/$scope.pageSize);
};

        $scope.Class_Folder = "fa fa-minus";
		$scope.Select();
		$scope.Select_User();
		$scope.Select_Vehicle();
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "init",
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
$scope.refresh = function(){
	try{
		$scope.Select();
		$scope.Select_User();
		$scope.Select_Vehicle();
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "refresh",
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

$scope.Checking_Checkboxes_Check = function(){
	try{
	$scope.Show_Delete_Message = false;
	var CheckBoxes_Array = document.getElementsByName("CheckBox_messages");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Delete_Message=true;	
		break;
	   }
	} 
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Checking_Checkboxes_Check",
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

$scope.Checking_Checkboxes_Check_Master = function(master){
try{
		$scope.Show_Delete_Message=true;	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_messages");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Checking_Checkboxes_Check_Master",
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
$scope.Delect_messages =function(Obj){
try{
	var Success = function(result){
	
	if(result === true){
		
	var JsonData = {
            'Method_Name': 'Delete_Message',
            'Data':[ Obj._id.$id]
        };
        
	var onSuccess = function(onSuccess){
		$scope.Select();
		$scope.Show_Read_Message=false;
		$scope.Show_All_Message=false;
		};
	
	var onError =function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Notification_Controller",
                Method: "Delect_message",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;	
		console.log(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",Success);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Delect_messages",
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

$scope.Delect_message = function(){
		try{
	var Success = function(result){
	
	if(result === true){
		    
	var CheckBoxes_Array = document.getElementsByName("CheckBox_messages");
	var Array_Delete_ID=[];
	
		for (var i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked === true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
	}
		
	
	
	var JsonData = {
            'Method_Name': 'Delete_Message',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(onSuccess){
		$scope.Select();
		};
	
	var onError =function(onError){
			var erro1={
			Generated: true,
                Page: "Scr_Notification_Controller",
                Method: "Delect_message",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro1;	
		console.log(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",Success);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Delect_message",
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
$scope.Send_Message= function(Noti){
	try{
		var JsonData = {
            'Method_Name': 'Insert_Notification',
            'Data': {
				"Collection_Info": 
				{
					"Collection_Name": "Store_Notification",
					"Collection_Schema": "'_id.$id,User,ID_Truck,Company,Estimated_Date,State,Matter,Details,[User+ID_Truck+Company],Transferring_State'"
    
				},
			   "Control":{
					 	"Creation_Date": new Date().getTime(),
					 	"Created_User" : eflowDTS.Session.Current_User.UserName
					 	},
    			"Company": eflowDTS.Session.Company.Identifier,
                "User": Noti.User,
    			"ID_Truck": new Date(Noti.ID_Truck).format('yyyy-mm-dd'),
                "Estimated_Date":Noti.Date,
                "State_Created": true,
				"State_Sent": false,
				"State_Received": false,
				"State_Open": false,
				"State": "Unread",
				"Matter": Noti.Matter,
				"Detail": Noti.Detail,
				"Transferring_State": "Pending_To_Mobile"
			 }
			 };
				var onSuccess = function(onSuccess){
				
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Notificación Enviada",
					buttons:{
						main:{
							label:'Ok',
							className:'btn-primary'
						}}				
				});
				$scope.Select();
				$scope.Show_Read_Message=false;
				$scope.Show_New_Message=false;
				$scope.Show_All_Message=false;
				};
				var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Notification_Controller",
                Method: "Send_Message",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;	
				console.log(onError);
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
		
}catch (e) {
        
        var err;
         
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Send_Message",
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
$scope.Reenviar_Message= function(mess){
	try{
		var JsonData = {
            'Method_Name': 'Insert_Notification',
            'Data': {
				"Collection_Info": 
				{
					"Collection_Name": "Store_Notification",
					"Collection_Schema": "'_id.$id,User,ID_Truck,Company,Estimated_Date,State,Matter,Details,[User+ID_Truck+Company],Transferring_State'"
    
				},
			   "Control":{
					 	"Creation_Date": new Date().getTime(),
					 	"Created_User" : eflowDTS.Session.Current_User.UserName
					 	},
    			"Company": eflowDTS.Session.Company.Identifier,
                "User": mess.User,
    			"ID_Truck": mess.ID_Truck,
                "Estimated_Date":new Date().format('yyyy-mm-dd'),
                "State_Created": true,
				"State_Sent": false,
				"State_Received": false,
				"State_Open": false,
				"State": "Unread",
				"Matter": mess.Matter,
				"Detail": mess.Detail,
				"Transferring_State": "Pending_To_Mobile"
			 }
			 };
				var onSuccess = function(onSuccess){
				
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Notificación Enviada",
					buttons:{
						main:{
							label:'Ok',
							className:'btn-primary'
						}}				
				});
				$scope.Select();
				$scope.Show_Read_Message=false;
				$scope.Show_All_Message=false;
				};
				var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Vehicles_Detail_Controller",
                Method: "Message",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;	
				console.log(onError);
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
		
}catch (e) {
        
        var err;
         
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Renviar_Message",
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
$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_Notification',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(onSuccess){
		
		$scope.ArrayNotificacion = onSuccess;
		$scope.$apply($scope.ArrayNotificacion);

		};
		
		var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Notification_Controller",
                Method: "Select",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;		
		console.log(onError);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Select",
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

$scope.Switch_Folder_Data = function(Show_Folder){
			try{
			if(Show_Folder){
			$scope.Class_Folder = "fa fa-minus";
			}else{
			$scope.Class_Folder = "fa fa-plus";
			}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Switch_Folder_Data",
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
		
$scope.Info_Message = function(obj,type){
	try{
		$scope.Message=[];
	if(type === "Read"){
		$scope.Message.push(obj);
		$scope.$apply($scope.Message);
		$scope.Show_Read_Message=true;
		$scope.Show_New_Message = false;
		$scope.Show_All_Message = false;
		}else{
		$scope.Show_Read_Message=false;
		$scope.Show_New_Message = false;
		$scope.Show_All_Message = true;
		}
		
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Notification_Controller",
                Method: "Info_Message",
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


$scope.Filter_License = function(ID){
try{
	
for(var j = 0; j < $scope.ArrayUser.length; j++){
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


$scope.Select_User = function(){
	try {
        var Request = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"Type": "Conductor"
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(Response){
		$scope.ArrayUser = Response;
		$scope.$apply($scope.ArrayUser);
		};
		var onError =  function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;			
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {        
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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
    }  
  
};



$scope.Select_Vehicle = function(){
	try {
        var Request = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(Response){
			$scope.ArrayVehicle = Response;
			$scope.$apply($scope.ArrayVehicle);
		};
		
		var onError = function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_Vehicle",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
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

		
$scope.printDiv = function(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;        
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
};
});