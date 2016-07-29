 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
	$scope.init = function(){
		
		try{
        $scope.Show_Company=true;
        $scope.Show_User=false;
        $scope.Show_Settings=false;
        $scope.Show_Settings_License= false;
        $scope.Show_Settings_User= false;
        $scope.Show_Settings_Fuel= false;
        $scope.Show_Settings_Vehicle= false;
        $scope.Show_Settings_Unity = false;
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
						  var JsonData = {
					            'Method_Name': 'Insert_Company',
					            'Data': {
					                'Name': Companys.name,
					                'Identifier': Companys.identifier,
					                'Domain': Companys.domain,
					                'Mail': Companys.mail,
					                'Country': Companys.country,
					                'Location': Companys.location,
					                'Phone': Companys.phone,
					                'fax': Companys.fax
					            }
					        };
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