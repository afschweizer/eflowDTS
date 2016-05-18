 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
	$scope.init = function(){
		
		To_Reload_Eflow_Config();
		};
		
$scope.validate = function(com){

						  var JsonData = {
					            'Method_Name': 'Insert_Company',
					            'Data': {
					                'Name': com.name,
					                'Identifier': com.identifier,
					                'Mail': com.mail,
					                'Country': com.country,
					                'Location': com.location,
					                'Phone': com.phone,
					                'fax': com.fax
					            }
					        };
					        var onSuccess = function(JsonData){
				
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Compañia Enviada",
					buttons:{
						main:{
							label:'Ok',
							className:'btn-primary'
						}}				
				});
				$scope.name="";
				$scope.identifier="";
				$scope.mail="";
				$scope.country="";
				$scope.location="";
				$scope.phone="";
				$scope.fax="";
				};
				var onError = function(JsonData){
				alert(JsonData);
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
	
						};

});
