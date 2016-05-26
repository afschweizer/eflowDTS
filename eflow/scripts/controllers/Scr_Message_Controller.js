DTS_APP.controller('Scr_Message_Controller',function($scope) {

$scope.init = function() {
	
		//To_Reload_Eflow_Config();
		eflowDTS = Get_Cookie("EflowCookie");
var HeadersEs = [{"es":"USUARIO","value":"User"},{"es":"FECHA","value":"Date"},
	{"es":"ASUNTO","value":"Matter"},{"es":"DETALLE","value":"Detail"}] ;
$scope.ArrayHeadersEs = HeadersEs;
$scope.date=new Date();
$scope.Select();
$scope.Select_User();
  var myVar = setInterval(function() {
       $scope.Select();
    }, 10000);
    
}
$scope.Checking_Checkboxes_Check = function(){
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked = true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
};
$scope.Action_Option= function(Option){
	if(Option === "Eliminar"){
		$scope.Delete_Message_DB();
	}
};


$scope.Delete_Message_DB = function(){
	
	var onSuccess = function(result){

	if(result === true){

	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked == true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
	}
	var JsonData = {
            'Method_Name': 'Delete_Message',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		};
	
	var onError = function(JsonData){
		alert(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	   } 
	   
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess);
	 
};

/*
$scope.Remove_Message = function(obj){
	
	if(confirm("¿Realmente desea borrar los elementos seleccionados?") == true){
		
	
	var JsonData = {
            'Method_Name': 'Delete_Message',
            'Data': obj._id.$id
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		};
	
	var onError = function(JsonData){
		alert(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
};*/
$scope.To_Order_By = function(Order_Type){
	
	if ($scope.OrderList === Order_Type) {
		
    var Reverse = Order_Type.charAt(0);
    if (Reverse === '-') {
        $scope.OrderList = Order_Type.substr(1);
    } else {
        $scope.OrderList = '-' + Order_Type;
    }
	} else {
	    $scope.OrderList = Order_Type;
	}
};

$scope.Select = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_Notification',
            'Data': {
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayMessage = JsonData;
		$scope.$apply($scope.ArrayMessage);
		}
		var onError = function(JsonData){
		alert(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
};
$scope.Select_User = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_User',
            'Data': {
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);
		}
		var onError = function(JsonData){
		alert(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
};
   
$scope.habilitar = function (value)
{
	if(value==true)
	{
		// deshabilitamos
		document.getElementById("Usuario").disabled=true;
		
	}else if(value==false){
	    // habilitamos
		document.getElementById("Usuario").disabled=false;
	}
}

$scope.Message = function(TextUsuario,TextAsunto,TextMessage,checked) {
	if(TextAsunto == null || TextMessage == null || TextAsunto == "" || TextMessage == "" ){
		bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Es necesario que digite el mensaje y el asunto para guardar la notificación.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
	}
	else
	{	if(checked==true){
			for (i=0; i<$scope.ArrayUser.length;i++){
				var JsonData = 
				{
					'Method_Name': 'Insert_Notification',
					'Data': 
					{
						"Collection_Info": 
						{
							"COLLECTION_NAME": "Store_Notification",
							"COLLECTION_SCHEMA": "'_id.$id,User,Date,State,Matter,Details,Transferring_State'"
						},
						"User": $scope.ArrayUser[i].ID,
						"State": "Unread",
						"Date":  ($scope.date.getTime()) + eflowDTS.Time.Difference,
						"Matter": TextAsunto,
						"Detail": TextMessage,
						"Transferring_State": "Pending_To_Mobile"
					}
				};
				var onSuccess = function(JsonData){
				$scope.Select();
				}
				var onError = function(JsonData){
				alert(JsonData);
				}
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
			}
		}
		else{
			if(TextUsuario == null || TextUsuario == "" ){
				bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Es necesario que seleccione almenos un usuario.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
			}
			else
			{
				SaveMessage(TextUsuario,TextAsunto,TextMessage,function(obj) {
					if (obj.Result === false) {
						alert("false");
					} 
					else 
					{
						alert("true");
					};		
				});
			}
		}
	}
}




function SaveMessage(TextUsuario,TextAsunto,TextMessage, onSuccess, onError) {
  var JsonData = {
            'Method_Name': 'Insert_Notification',
            'Data': {
				"Collection_Info": 
				{
					"COLLECTION_NAME": "Store_Notification",
					"COLLECTION_SCHEMA": "'_id.$id,User,Date,State,Matter,Details,Transferring_State'"
    
				},
				"User": TextUsuario,
				"State": "Unread",
				"Date": ($scope.date.getTime()) + eflowDTS.Time.Difference,
				"Matter": TextAsunto,
				"Detail": TextMessage,
				"Transferring_State": "Pending_To_Mobile"
			 }
			 };
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);

};


});
