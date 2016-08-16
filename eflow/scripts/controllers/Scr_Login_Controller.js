DTS_APP.controller('Scr_Login_Controller', function($scope) {

    $scope.init = function() {  
      try{
				
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
	    $scope.Log = {};	
	
	
	if(eflowDTS.Session.Save_Session === true){
		
		$scope.Show_Components.Main_Menu = true;
		$scope.Show_Components.SubMenu_Maintenance = true;
		$scope.Show_Components.Login = true;
		
		window.location.href = eflowDTS.Session.Ultimate_Page;		
	   
	}
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
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
		
	$scope.Log_In = function(Log){
	try {
		 	
		if(Log.Mail === "" || Log.Mail === undefined || Log.Password === "" || Log.Password === undefined ){
			
		bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe completar todos los campos",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}				
			});
			
		}else{
   
        var Request = {
            'Method_Name': 'Login_Admin',
            'Data': {
                'Mail': Log.Mail.toLowerCase(),
                'Password': Log.Password,
    			'Type': 'Administrador'
            }
        };
        
		var onSuccess = function(Response) {
            if (Response.Result === false) {
            	
             bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Datos incorrectos.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                     }
                });
                
            } else {
				
					$scope.Show_Components.Main_Menu = true;
					
					eflowDTS.Session.Current_User = Response;
					
					eflowDTS.Session.LoggedIn = true;
					eflowDTS.Session.Save_Session = $scope.Save_Session;
					Set_Cookie("EflowCookie",eflowDTS);						
				    											
			    	DataCompany();
	                $scope.Show_Components.Login = true;
			    	//window.location.href = "#Calendar";
            }
            
        };
		
		var onError = function(Response_Error) {
			
           var erro = {
			Generated: true,
            Page: "Scr_Login_Controller",
            Method: "Log_In",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: Response_Error
        };
			throw erro;          
        };
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
        }
        
    } catch (e) {
	
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "Log_In",
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

	
 function DataCompany() {	

      try{
		 var Request = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": eflowDTS.Session.Current_User.Company.toUpperCase()
            },
            'Fields':{
            	
            }
        };
        
		var onSuccess = function(Response){
			
			eflowDTS.Session.Company = Response[0];
		    Set_Cookie("EflowCookie",eflowDTS);
		    
		};
		
		var onError = function(e){
		
		var erro = {
			Generated: true,
            Page: "Scr_Login_Controller",
            Method: "DataCompany",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
       
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "DataCompany",
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
}

		
    });
	