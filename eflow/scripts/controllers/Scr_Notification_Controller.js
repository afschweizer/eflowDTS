DTS_APP.controller('Scr_Notification_Controller',function($scope) {


$scope.init = function(){
	try{
		$scope.Show_Folder=true;
		$scope.Show_Read_Message=false;
		$scope.Show_All_Message=false;
        $scope.Class_Folder = "fa fa-minus";
		$scope.Select();
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
		$scope.Show_All_Message = false;
		}else{
		$scope.Show_Read_Message=false;
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

});