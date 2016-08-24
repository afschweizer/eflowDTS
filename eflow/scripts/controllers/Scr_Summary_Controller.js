DTS_APP.controller('Scr_Summary_Controller',function($scope) {
  
	$scope.init = function(){
		try{
        Set_Current_Page();
		//Get_Cookie("EflowCookie");
		
		$scope.query = {};
		var User = eflowDTS.Session.Current_User.ID;
		var Current_Date = new Date(new Date().format("yyyy-mm-dd")).getTime()+eflowDTS.Time.Difference;	
		
		$scope.QueryForUser = {"User":User};
		
		$scope.QueryForDate = function(DataSets){
		return DataSets.Date_Updated >= Current_Date;
		};

       $("#Charge_New_Modal").modal('show');
       Select_DataSet();
		
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
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
                Page: "Scr_Summary_Controller",
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

	function Select_DataSet(){
	 try {
	 	
	 	$scope.User = eflowDTS.Session.Ram.ID;
	 	
        var JsonData = {
            'Method_Name': 'Select_DataSet',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            }
        };
		var onSuccess = function(JsonData){		
		   $scope.ArrayDataSet = JsonData;		
		};		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Select_DataSet",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);        
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Select_DataSet",
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
   
   $scope.Charge_DataSet = function(DataSet){
		try{
   	$scope.Filter={};
   	$("#Charge_New_Modal").modal('hide');
		$scope.Filter.End_Date =  new Date(DataSet.End_Date).format("yyyy-mm-dd");
		$scope.Filter.Start_Date =  new Date(DataSet.Start_Date).format("yyyy-mm-dd");  	
		$scope.Filter.Type =  DataSet.Type;  	
   
   	$scope.Refresh_Pivot_Table(DataSet);   	
   	
  }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Charge_DataSet",
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
   
   function Create_Pivot_Table(){
		try{
   	
   	var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);
   
     $("#Pivot_Table").pivotUI($scope.PivotData, {
                renderers: renderers,
                aggregatorName: $scope.DataSet.Aggregator_Name,
                cols: $scope.DataSet.Cols,
                rows: $scope.DataSet.Rows,
                rendererName: $scope.DataSet.Renderer_Name,
                onRefresh: function(config){
					$scope.DataSet.Cols = config.cols;
					$scope.DataSet.Rows = config.rows;
					$scope.DataSet.Renderer_Name = config.rendererName;
					$scope.DataSet.Aggregator_Name = config.aggregatorName;
					$scope.$apply();				
				}
     });
   	   	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Create_Pivot_Table",
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
   
   $scope.New_DataSet = function(){
		try{
   	
   	$("#Charge_New_Modal").modal('hide');
   	   	
   	eflowDTS.Session.Flag_DataSet = "New";
   	
	   	$scope.DataSet = {
	   		"Name":"",
	   		"Rows":[],
	   		"Cols":[],
	   		"Aggregator_Name":"Count",
	   		"Renderer_Name": "Table"
	   	};
	   	
	   	$scope.PivotData = [];
	   	
	   	Create_Pivot_Table();
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "New_DataSet",
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
   
   $scope.Refresh_Pivot_Table = function(Filter){
		try{
   	var JsonData = {
            'Method_Name': 'Select_Summary_'+Filter.Type,
             'Data': {
             	"Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime(),
                        "$lte": new Date(Filter.End_Date).getTime()
                		},
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            }
        };
		var onSuccess = function(ArrData){
		
		if($scope.DataSet.Name === ""){
			eflowDTS.Session.Ram.Flag_DataSet = "New";
		}else{
			eflowDTS.Session.Ram.Flag_DataSet = "Old";
		}
		$scope.PivotData = ArrData;
		$scope.DataSet.Type = Filter.Type;
		$scope.DataSet.Start_Date = new Date(Filter.Start_Date).getTime();
		$scope.DataSet.End_Date = new Date(Filter.End_Date).getTime();
		$scope.$apply();	
		Create_Pivot_Table();	
		
		};		
		var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Refresh_Pivot_Table",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;		
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
   	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Refresh_Pivot_Table",
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
   
   $scope.Confirm_DataSet = function(){
		try{
   	
   	if(typeof $scope.DataSet.Type === "undefined" || typeof $scope.DataSet.Start_Date === "undefined" || typeof $scope.DataSet.End_Date === "undefined"){
   		
   		bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe elegir un tipo de DataSet y un rango de fechas antes de guardar",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}}); 
   		
   	}else{
   	    $("#Save_Modal").modal('show');
   	 }
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Confirm_DataSet",
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
   
   $scope.Save_DataSet = function(Name){
		try{
   	$scope.DataSet.Name = Name;
   	$scope.DataSet.Company = eflowDTS.Session.Company.Identifier;
  	$scope.DataSet.User = eflowDTS.Session.Current_User.ID;
   	if(eflowDTS.Session.Flag_DataSet === "New"){
      $scope.DataSet.Date_Created = new Date().getTime();
   	}
   	$scope.DataSet.Date_Updated = new Date().getTime();
   	
   	var JsonData = {
            'Method_Name': 'Insert_DataSet',
             'Data': [$scope.DataSet]
        };
        
		var onSuccess = function(ArrData){
			
		$('#Save_Modal').on('hidden.bs.modal', function (e) {
  			bootbox.dialog({
			title:"¡Alerta!",
			message:"Se ha guardado el DataSet",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}});
	});
    
	$("#Save_Modal").modal('hide');
	};	
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Save_DataSet",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
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
                Page: "Scr_Summary_Controller",
                Method: "Save_DataSet",
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