DTS_APP.controller('indexController', function($scope) {
	

       $scope.init = function() {
       
       	if(Exist_Cookie("EflowCookie") === true){
       		eflowDTS = Get_Cookie("EflowCookie");
       	}else{
       		Set_Cookie("EflowCookie",eflowDTS);
       	}
       	
		$scope.Show_Components = {};		
		$scope.Show_Components.Main_Menu = true;  
		$scope.Show_Components.SubMenu_Maintenance = true;
		$scope.Show_Components.Login = true;
		//To_Reload_Eflow_Config();
		//eflowDTS = GetCookie("EflowCookie");
		
           setInterval(function() {
                    timers();
                }, 1000);
  
        };

      

        function timers() {
        
		Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
		var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		$scope.UserName = eflowDTS.Session.UserName;
		$scope.Company = eflowDTS.Session.Company;
		});
            
        };
		
	$scope.Sign_Out = function(){
		
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
	}
	
	
	
	
    });
	
	
	
	