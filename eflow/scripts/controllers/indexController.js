DTS_APP.controller('indexController', function($scope) {
	

       $scope.init = function() {try{
  /*     
       //	if(Exist_Cookie("EflowCookie") === true){
       		Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
       	}else{*/
       		Set_Current_Page();
       //	}
       	
		$scope.Show_Components = {};		
		$scope.Show_Components.Main_Menu = true;  
		$scope.Show_Components.SubMenu_Maintenance = true;
		$scope.Show_Components.Login = true;
		//To_Reload_Eflow_Config();
		//eflowDTS = GetCookie("EflowCookie");
		
           setInterval(function() {
                    timers();
                }, 1000);
  
        }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
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

      

        function timers() {
        try{
		Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
		var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		$scope.UserName = eflowDTS.Session.UserName;
		$scope.Company = eflowDTS.Session.Company;
		});
            }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
                Method: "timers",
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
		
	$scope.Sign_Out = function(){
		try{
		$("#Log_Out").modal('show');
		
		    eflowDTS.Save_Session = false;
			eflowDTS.LoggedIn = false;	
			Set_Cookie("EflowCookie",eflowDTS);
		      	 //To_Save_Eflow_Config();
		      	// Set_Cookie("EflowCookie",eflowDTS);
		
		setTimeout(function(){
	         	$('#Log_Out').modal('hide');
	         	window.location.href = "#";
	    }, 3000);
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
                Method: "Sign_Out",
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
	
	
	
	