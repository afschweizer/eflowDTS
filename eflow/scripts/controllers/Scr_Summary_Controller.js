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
   	$("#Collapse_Filter").collapse('show');
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
   
   function Create_Pivot_Table(DataSet,ArrData){
   	
   	var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);
   
     $("#Pivot_Table").pivotUI(ArrData, {
                renderers: renderers,
                aggregatorName:DataSet.Aggregator_Name,
                cols: DataSet.Columns,
                rows:DataSet.Rows,
                rendererName:DataSet.Renderer_Name
            });
   	   	
   };
   
   $scope.New_DataSet = function(){
   	
   	$scope.DataSet = {
   		Name
   	};
   	
   };
   
   $scope.Refresh_Pivot_Table = function(Filter){
   	
   	var JsonData = {
            'Method_Name': 'Select_Summary_'+Filter.DataSet,
             'Data': {
             	"Start_Date": new Date(Filter.Start_Date).getTime(),
             	"End_Date": new Date(Filter.End_Date).getTime(),
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            }
        };
		var onSuccess = function(ArrData){
		var DataSet = {
   			"Aggregator_Name":"Count",
   			"Rows":[],
   			"Columns":[],
   			"Renderer_Name":"Table"
   		};
		Create_Pivot_Table(DataSet,ArrData);	
		};		
		var onError = function(JsonData){		
		alert(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
   	
   	
   };
   
   
   
   
   
   

});