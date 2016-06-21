DTS_APP.controller('Scr_DashBoard_Controller',function($scope){
	
	
	$scope.init = function(){
		
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
		$scope.Incidents =eflowDTS.Session.Current_Incidents;
			
		
	};
	
});

