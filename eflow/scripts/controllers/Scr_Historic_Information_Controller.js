DTS_APP.controller('Scr_Historic_Information_Controller',function($scope) {
 
$scope.init = function(){
	try{
		 $("#Charge_New_Modal").modal('show');
		$scope.Information = false;
		
	}catch (e) {
		var err;
		if (e.hasOwnProperty("Generated") === false) {
	       err = {
	            Generated: false,
	            Page: "Scr_Historic_Information_Controller",
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
        
$scope.Close_Modal = function(){
		try{
	$('#Charge_New_Modal').on('hidden.bs.modal', function (e) {
  			window.location.href = "#Calendar";	
    });
	$("#Charge_New_Modal").modal('hide');
	
}catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
                Method: "Close_Modal",
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

$scope.Select_VisitPoint = function(Historic_Date){
	try {
		
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Estimated_Date":  Historic_Date
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(Response){
		$scope.ArrayJobs = Response;
		//Change_Structure(JsonData);
		$scope.Load_Select($scope.ArrayJobs);
		//$scope.Information=true; 
		};
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		
		};
	    Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
	    
        } catch (e) {
      
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
                Method: "Select_VisitPoint",
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

$scope.Load_Select = function(ArrayJobs){
	try {
		$scope.User_Truck=[]; 
		 for(var i=0; i<ArrayJobs.length;i++){
		
			var data={ User : ArrayJobs[i].User,
			ID_Truck : ArrayJobs[i].ID_Truck};
			var existe =false;
			for(var j=0; j<$scope.User_Truck.length;j++){
				if($scope.User_Truck[j]===data){
					existe=true;	
					break;
				}	
			}					
			if(existe===false){
				$scope.User_Truck.push(data);
			}	
		}
		$scope.Information=true; 
} catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
                Method: "Load_Select",
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

$scope.Send_Information = function(Historic){
	try {
		$scope.Select_User(Historic.User.split("(")[0]);
		eflowDTS.Session.Ram.UserControl={};
		eflowDTS.Session.Ram.UserControl.User = Historic.User.split("(")[0];
		eflowDTS.Session.Ram.UserControl.UserName = $scope.ArrayUser[0].Name+" "+$scope.ArrayUser[0].Lastname;
    	eflowDTS.Session.Ram.UserControl.ID_Truck = Historic.User.split("(")[1].split(")")[0];
		eflowDTS.Session.Ram.UserControl.Date = Historic.Date;
		location.href="#/detail";
		eflowDTS.Session.Ultimate_Page="#/detail";
	    Set_Cookie("EflowCookie",eflowDTS);
	} catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
                Method: "Send_Information",
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

$scope.Select_User = function(User){
	try {
        var Request = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"ID":User,
    			"Type": "Conductor"
            },
            'Fields':{
            }
        };
		var onSuccess = function(Response){
		$scope.ArrayUser = Response;
		$scope.$apply($scope.ArrayUser);
		};
		var onError =  function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;			
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {        
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
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


});