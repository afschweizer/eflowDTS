DTS_APP.controller('Scr_Calendar_Controller',function($scope) {

	$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
	
		$scope.Select_VisitPoint();		
		
	};

	$scope.Select_VisitPoint = function(){
		
		 var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			'Company': eflowDTS.Session.Company
            },
            'Fields':{
            	'Estimated_Date':true,
            	'Name': true
            }
        };
		var onSuccess = function(JsonData){
		
		var obj = {};
		
		for(var i = 0; i < JsonData.length; i++){
			  
     var puntoVisita = JsonData[i];
  
  if (! obj.hasOwnProperty((new Date(puntoVisita.Estimated_Date)).format("yyyy-mm-dd"))){
	  
      obj[(new Date(puntoVisita.Estimated_Date)).format("yyyy-mm-dd")]= { "number": 1 };
      
  }else{
  	
  	  obj[(new Date(puntoVisita.Estimated_Date)).format("yyyy-mm-dd")].number++;

  }
  	
			
		}
		
		
		var date = new Date();
	       
	       $("#calendar").responsiveCalendar({
			
	          time: date.getFullYear() + "-" + (date.getMonth() + 1),
			  
	          events: obj,
	          
		      onDayClick : function(){
		      	
		      	 eflowDTS.Session.Calendar_Date = (new Date(this.title).getTime());
		      	 //To_Save_Eflow_Config();
		      	 Set_Cookie("EflowCookie",eflowDTS);
		      	 location.href = "#/PV_DB";}
	      });	
		
		};
		
		var onError = function(JsonData){
			console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        
        
	};

});