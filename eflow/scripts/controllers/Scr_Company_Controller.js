 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
	$scope.init = function(){
		try{
       	Set_Current_Page();
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
                User: eflowDTS.Session.General.User,
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
		
$scope.validate = function(com){
try{
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
					 var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "validate",
            Description: "onError",
            User: eflowDTS.Session.General.User,
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
                Page: "Scr_Company_Controller",
                Method: "validate",
                Description: "Error no controlado",
                User: eflowDTS.Session.General.User,
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
