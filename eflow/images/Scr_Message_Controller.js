DTS_APP.controller('Scr_Message_Controller',function($scope) {

$scope.init = function() {
	
	
var HeadersEs = ["Usuario","Fecha de Emitido","Asunto","Detalle"] ;
$scope.ArrayHeadersEs = HeadersEs;

var Headers = ["User","Date","Matter","Detail"];
$scope.ArrayHeaders = Headers;

	
$scope.Select();
$scope.Select_User();
$scope.Select_Vehicule();
}

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
$scope.Select_Vehicule = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayVehicle = JsonData;
		$scope.$apply($scope.ArrayVehicle);
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
		alert("Es necesario que digite el mensaje y el asunto para guardar la notificación.");
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
						"Vehicle": $scope.ArrayVehicle[i].ID_Truck
						"State": "Unread",
						"Date": new Date(),
						"Matter": TextAsunto,
						"Detail": TextMessage,
						"Transferring_State": "Pending_To_Mobile"
					}
				};
				var onSuccess = function(JsonData){
				alert("hola");
				}
				var onError = function(JsonData){
				alert(JsonData);
				}
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
			}
		}
		else{
			if(TextUsuario == null || TextUsuario == "" ){
				alert("Es necesario que seleccione almenos un usuario.");
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
    try {
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
				"Date": new Date(),
				"Matter": TextAsunto,
				"Detail": TextMessage,
				"Transferring_State": "PEND"
			 }
			 };
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
};

});
