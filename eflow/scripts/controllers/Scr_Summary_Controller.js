google.load("visualization", "1", {packages:["corechart", "charteditor"]});   
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
   		
   	}else{
   		
   	 	 
   	}
   	
   	Create_Pivot_Table(DataSet,[{"A":1,"B":1,"C":1},{"A":1,"B":1,"C":1},{"A":1,"B":1,"C":1},{"A":1,"B":1,"C":1}]);
   };
   
   function Create_Pivot_Table(DataSet,ArrData){
   	
   	var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
            $("#Pivot_Table").pivotUI(ArrData, {
                renderers: renderers,                
                rows: DataSet.Rows,
                cols: DataSet.Columns,
                rendererName: DataSet.Renderer_Name,
				onRefresh: function(config){
					$scope.DataSetColumns = config.cols;
					$scope.DataSetRows = config.rows;
					$scope.$apply();
				}
            });
   	   	
   };
   
   
   
   
   
   
   

});