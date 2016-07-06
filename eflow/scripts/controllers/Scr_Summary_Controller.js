DTS_APP.controller('Scr_Summary_Controller',function($scope) {
  
	$scope.init = function(){
        Set_Current_Page();
		//Get_Cookie("EflowCookie");
		
		$scope.query = {};
		var User = eflowDTS.Session.ID;
		var Current_Date = new Date(new Date().format("yyyy-mm-dd")).getTime()+eflowDTS.Time.Difference;	
		
		$scope.QueryForUser = {"User":User};
		
		$scope.QueryForDate = function(DataSets){
		return DataSets.Date_Updated >= Current_Date;
		};

       $("#Charge_New_Modal").modal('show');
       Select_DataSet();
		
	};
	
	$scope.Close_Modal = function(){
		
	$('#Charge_New_Modal').on('hidden.bs.modal', function (e) {
  			window.location.href = "#Calendar";	
    });
    
	$("#Charge_New_Modal").modal('hide');
	
	
	};

	function Select_DataSet(){
	 try {
	 	
	 	$scope.User = eflowDTS.Session.ID;
	 	
        var JsonData = {
            'Method_Name': 'Select_DataSet',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            }
        };
		var onSuccess = function(JsonData){		
		   $scope.ArrayDataSet = JsonData;		
		};		
		var onError = function(JsonData){		
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);        
    } catch (err) {
        console.log(err);
    }	
   };
   
   $scope.Charge_DataSet = function(DataSet){
   	
   	$("#Charge_New_Modal").modal('hide');   	
   
   	$scope.Refresh_Pivot_Table(DataSet);   	
   	
   };
   
   function Create_Pivot_Table(){
   	
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
   	   	
   };
   
   $scope.New_DataSet = function(){
   	
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
   	
   };
   
   $scope.Refresh_Pivot_Table = function(Filter){
   	
   	var JsonData = {
            'Method_Name': 'Select_Summary_'+Filter.Type,
             'Data': {
             	"Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime(),
                        "$lte": new Date(Filter.End_Date).getTime()
                		},
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            }
        };
		var onSuccess = function(ArrData){
		
		if($scope.DataSet.Name === ""){
			eflowDTS.Session.Flag_DataSet = "New";
		}else{
			eflowDTS.Session.Flag_DataSet = "Old";
		}
		$scope.PivotData = ArrData;
		$scope.DataSet.Type = Filter.Type;
		$scope.DataSet.Start_Date = new Date(Filter.Start_Date).getTime();
		$scope.DataSet.End_Date = new Date(Filter.End_Date).getTime();
		$scope.$apply();	
		Create_Pivot_Table();	
		
		};		
		var onError = function(JsonData){		
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
   	
   	
   };
   
   $scope.Confirm_DataSet = function(){
   	
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
   };
   
   $scope.Save_DataSet = function(Name){
   	$scope.DataSet.Name = Name;
   	$scope.DataSet.Company = eflowDTS.Session.Company;
  	$scope.DataSet.User = eflowDTS.Session.ID;
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
		console.log(JsonData);		
		};	
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
   };
   
   
   
   
   

});