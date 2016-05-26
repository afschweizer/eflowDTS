DTS_APP.controller('Scr_DashBoard_Controller',function($scope){
	
	
	$scope.init = function(){
		
		//To_Reload_Eflow_Config();
		eflowDTS = Get_Cookie("EflowCookie");
		$scope.Incidents =eflowDTS.Session.Current_Incidents;
			
		
	};
	
});

