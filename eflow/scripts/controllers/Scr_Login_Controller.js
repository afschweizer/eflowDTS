DTS_APP.controller('Scr_Login_Controller', function($scope) {

    $scope.init = function() {  
      
		//$scope.Show_Components = {};		
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
	$scope.Log = {};	
	
	
	if(eflowDTS.Save_Session === true){
		
		$scope.Show_Components.Main_Menu = true;
		$scope.Show_Components.SubMenu_Maintenance = true;
		$scope.Show_Components.Login = true;
		
		window.location.href = eflowDTS.Ultimate_Page;
		$scope.Mail = String(eflowDTS.Session.Mail);
	   
	}
	
	};

   // $scope.Show_Components.Main_Menu = false;
		
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
		}
		else{
   
        var JsonData = {
            'Method_Name': 'Login_Admin',
            'Data': {
                'Mail': Log.Mail.toLowerCase(),
                'Password': Log.Password,
    			'Type': 'Administrador',
    			'Company':  Log.Company = Log.Mail.split("@")[1].split(".")[0].toUpperCase() 
            }
        };
		var onSuccess = function(obj) {
            if (obj.Result === false) {
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
				// create a message to display in our view
					$scope.Show_Components.Main_Menu = true;
					eflowDTS.Session = obj;
					
					if($scope.Save_Session === true){						
						eflowDTS.LoggedIn = true;
						eflowDTS.Save_Session = true;
						Set_Cookie("EflowCookie",eflowDTS);						
				    }else{				    	
						eflowDTS.LoggedIn = true;	
						eflowDTS.Save_Session = false;
						Set_Cookie("EflowCookie",eflowDTS);							
					}
			    	DataCompany();
			    //	To_Save_Eflow_Config();
	            	$scope.Mail = String(eflowDTS.Session.Mail);
	                $scope.Show_Components.Login = true;
			    	window.location.href = "#Calendar";
            }
            
        };
		
		var onError = function(obj) {
            console.log(obj.message);
            
        };
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        }
    } catch (err) {
	
                console.log(err.message);
    }
};

	
 function DataCompany() {	

		 var JsonData = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(arr){
			
					eflowDTS.Session.DataCompany = arr[0];
					
		      	 //To_Save_Eflow_Config();
		      	 Set_Cookie("EflowCookie",eflowDTS);
		}
		var onError = function(e){
		console.log(e);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        }
		
    });
	