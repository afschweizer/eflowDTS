DTS_APP.controller('Scr_Dashboard_Controller',function($scope){
	
	
	$scope.Inyect = function(){
		
		var Select = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-list-ul" data-toggle="tooltip" title="Usuario"></i></span><select required ng-model="DataSet" ng-options="DataSet.Name for DataSet in ArrayDataSet" class="form-control"><option value="">Selección del DataSet</option></select></div>';
	var Dashboard = document.getElementById("Dashboard");
			Dashboard.innerHTML = Select;
		
	};
	 
	$scope.init = function(){
		$scope.Select_DataSet();	
		$("#Charge_New_Dashboard").modal('show');			
	};
	
	$scope.Create_Dashboard = function(num_fil, num_col){
		$('#Charge_New_Dashboard').on('hidden.bs.modal', function (e) {
  				$scope.Select_DataSet();	
    		});
    		
			$("#Charge_New_Dashboard").modal('hide');
			
			var Dashboard = document.getElementById("Dashboard");
			Dashboard.innerHTML = "";
			for(var i = 0; i < num_fil; i++){
			
			 var row = document.createElement("DIV");
			    //row.style.backgroundColor  = "lavender"; 
			    row.className= "row";
			
			    for(var j = 0; j < num_col; j++){
			       var col = document.createElement("DIV");
			       col.style.backgroundColor = "lavender"; 
			       col.className = "well text-center col-sm-"+(12/num_col);
			       
			       var pivot = document.createElement("DIV");			       
			       pivot.id = "Pivot_"+i+"-"+j;			       
			       pivot.innerHTML = Select;
			       
			       col.appendChild(pivot);
			       row.appendChild(col);
			       
			    }
			
			    Dashboard.appendChild(row);
			}
			
			$scope.Select_DataSet();
			
	};
	
	
	
	$scope.Select_DataSet = function(){
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
		var onSuccess = function(Response){		
		  setTimeout(function(){
   			$scope.$apply( function(){
   				$scope.ArrayDataSet = Response;	
   				});},0); 	
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}); 