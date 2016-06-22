DTS_APP.controller('Scr_Summary_Controller',function($scope) {

	$scope.init = function(){
       
       $("#Charge_New_Modal").modal('show');
       Select_DataSet();
		
	};
	
	$scope.Close_Modal = function(Modal){
	  $(Modal).modal('hide');
	  window.location.href = "#Calendar";
	};

	function Select_DataSet(){
	 try {
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
		alert(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);        
    } catch (err) {
        alert(err);
    }	
   };
   
   $scope.Charge_DataSet = function(DataSet){
   	
   	$("#Charge_New_Modal").modal('hide');
   	if(DataSet === null){
   		var DataSet = {
   			"Aggregator_Name":"Count",
   			"Rows":[],
   			"Columns":[],
   			"Renderer_Name":"Table"
   		};
   		var Data = [];
   		
   	}else{
      	 	  
   	}
   	
   	Create_Pivot_Table(DataSet,Data);
   	
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
            'Method_Name': 'Select_Summary_'+Filter.DataSet,
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
		$scope.PivotData = ArrData;
		$scope.DataSet.Type = Filter.DataSet;
		$scope.DataSet.Start_Date = new Date(Filter.Start_Date).getTime();
		$scope.DataSet.End_Date = new Date(Filter.End_Date).getTime();
		$scope.$apply();	
		Create_Pivot_Table();	
		};		
		var onError = function(JsonData){		
		alert(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
   	
   	
   };
   
   $scope.Save_DataSet = function(Name){
   	
   	$scope.DataSet.Name = Name;
   	$scope.DataSet.Company = eflowDTS.Session.Company;
   	$scope.DataSet.User = eflowDTS.Session.ID;
   	$scope.DataSet.Date_Created = new Date().getTime();
   	$scope.DataSet.Date_Updated = new Date().getTime();
   	
   	var JsonData = {
            'Method_Name': 'Insert_DataSet',
             'Data': [$scope.DataSet]
        };
        
		var onSuccess = function(ArrData){
			bootbox.dialog({
			title:"¡Alerta!",
			message:"Se ha guardado el DataSet",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}
				
			});
		};	
		
		var onError = function(JsonData){		
		alert(JsonData);		
		};	
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
   	
   };
   
   
   
   
   

});