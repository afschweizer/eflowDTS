DTS_APP.controller('Scr_Vehicules_Detail_Controller',function($scope) {


$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		eflowDTS = Get_Cookie("EflowCookie");
	Load_Map();
	$scope.Load_Visit_Point();
	$scope.Load_Route();
	$scope.User = eflowDTS.Session.UserControl;
    $scope.Company = eflowDTS.Session.Company;
};

	
	$scope.See_Info = function(jobs){
		eflowDTS.Session.Current_Incidents=jobs;
		location.href="#/dashboard";
	};


	$scope.Download_Certificate = function(PV){		
		window.open(PV.Certificate.PDF);				
	};
	
	
	$scope.Message = function(TextAsunto,TextMessage) {
	if(TextAsunto == null || TextMessage == null || TextAsunto === "" || TextMessage === "" ){
		
		bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Es necesario que digite el mensaje y el asunto para guardar la notificación.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });

	}
	  var JsonData = {
            'Method_Name': 'Insert_Notification',
            'Data': {
				"Collection_Info": 
				{
					"Collection_Name": "Store_Notification",
					"Collection_Schema": "'_id.$id,User,Date,State,Matter,Details,Transferring_State'"
    
				},
    			"Company": eflowDTS.Session.Company,
                "User": eflowDTS.Session.UserControl.User,
    			"ID_Truck": eflowDTS.Session.UserControl.ID_Truck,
                "Estimated_Date": new Date(new Date().format('yyyy-mm-dd')).getTime()+eflowDTS.Time.Difference,
				"State": "Unread",
				"Matter": TextAsunto,
				"Detail": TextMessage,
				"Transferring_State": "Pending_To_Mobile"
			 }
			 };
				var onSuccess = function(JsonData){
				
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Notificación Enviada",
					buttons:{
						main:{
							label:'Ok',
							className:'btn-primary'
						}}				
				});
				$scope.TextAsunto="";
				$scope.TextMessage="";
				};
				var onError = function(JsonData){
				alert(JsonData);
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
	
};

	

  function Load_Map(){
   	
   	//if(navigator.geolocation){
   		
   		//var onSuccess = function(pos){
   		
   		var map = document.getElementById('Map_Dashboard');
   			
   		if(map){

   			eflowDTS.Map_Dashboard = new GMaps({
			div: map,
		    lat: eflowDTS.Geolocation.Latitude, 
			lng: eflowDTS.Geolocation.Longitude,
		    zoom: 12
		    });
		   			
   		}
   		
   		/*};
   		
   		navigator.geolocation.getCurrentPosition(onSuccess);
   		
   	}else{   		 		
   		
   			bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"¡Notificación enviada!",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
     	}*/
   	
   };
   
	$scope.Open_Modal_Add_VisitPoint = function(jobs){
	

	$scope.Incidents =jobs;
	$("#Modal_Add_VisitPoint").modal("show");	
	
};

	$scope.Open_Modal_VisitPoint = function(jobs){
	

	$scope.Details =jobs;
	$("#Modal_VisitPoint").modal("show");	
	
};
  function Data_Charge(JsonArray){
  	
  	if(JsonArray.length > 0){
  		
	
  		$scope.ArrayJobs = JsonArray;
  		$scope.Show_Summary = true;
  		
  		if(!eflowDTS.Map_Dashboard){
  			
  		var map = document.getElementById('Map_Dashboard');
   			
   		if(map){

   			eflowDTS.Map_Dashboard = new GMaps({
			div: map,
		    lat: JsonArray[0].Latitude, 
			lng: JsonArray[0].Latitude,
		    zoom: 12
		    });
		   			
   		}
  			
  		}
  		
  		
  		for(var i = 0; i < JsonArray.length; i++){
  			
  			var x = JsonArray[i];
  					      eflowDTS.Map_Dashboard.addMarker({
			  lat: JsonArray[i].Latitude, 
			  lng: JsonArray[i].Longitude,
			  icon: 'images/'+JsonArray[i].Visit_State+'.png',
			  infoWindow: {
			  content: '<h5>'+JsonArray[i].Name+'<h5>'+
					   '<h5>'+JsonArray[i].Address+'<h5>'
			  },
			  value:JsonArray[i],
			  click: function(e) {
			  	PV_Info(e.value);
			  	$scope.Show_PV = true;
			  	if(e.value.Certificate){
			  		$scope.Show_Certificate = true;			  		
			  	}else{
			  		$scope.Show_Certificate = false;
			  	}
			  	
			  }
			  });
			  
			    			
  		}
  		
  		}
  	
  	
  	
  };
  
  function PV_Info(obj){
   	$scope.PV = obj;
		$scope.Show_Detail_Prod=false;
        $scope.Show_Incidentes=false;
		$scope.Show_Punto_Visita=true;
    
    
   	if (obj.Visit_Point_Incidents.length===0){
    	$scope.Show_Incidentes=false;
   	}
   	else{
		$scope.Show_Incidentes=true;
		$scope.Show_Inc = true;	
		$scope.Notes_Incidentes=obj.Visit_Point_Incidents;
		for(var i=0;i<$scope.Notes_Incidentes.length;i++){
		if($scope.Notes_Incidentes[i].Notes==="No hay notas"){
		//	$scope.Show_Note=true;
		//	$scope.Show_Button=false;
		}else{
		//	$scope.Show_Note=false;
		//	$scope.Show_Button=true;
		}
}		
   	}
  };
  
  $scope.PV_Info_Prod = function(obj){
	$scope.Prod = obj;
		$scope.Show_Detail_Prod=true;
		$scope.Show_Detail = true;
		$scope.Notes=obj.JobActions;
		for(var i=0;i<$scope.Notes.length;i++){
		if(!$scope.Notes[i].Notes ==="No hay notas"){
		//	$scope.Show_Notes=true;
			//$scope.Show_Buttons=false;
		}else{
			//$scope.Show_Notes=false;
			//$scope.Show_Buttons=true;
		}
}	
  };
  
  
  function Draw_Route(JsonArray){
  	
  	if(JsonArray.length > 0){
  		  		
  		   		
   		var path = [];
   		
  		for(var i = 1; i < JsonArray.length; i++){
  			
		 var Position = [];
		  Position.push(JsonArray[i].Geolocation.Latitude);
		  Position.push(JsonArray[i].Geolocation.Longitude);
		  path.push(Position);
		  
		  eflowDTS.Map_Dashboard.drawRoute({
		  	origin:[JsonArray[i-1].Geolocation.Latitude,JsonArray[i-1].Geolocation.Longitude],
		  	destination:[JsonArray[i].Geolocation.Latitude,JsonArray[i].Geolocation.Longitude],
		  	travelMode: 'driving',
		  	strokeColor:'#131540',
		  	strokeOpacity:0.6,
		  	strokeWeight: 6		  	
		  });
		  		  	  
  		}
  		
  		if(!eflowDTS.Map_Dashboard){
  			
  		var map = document.getElementById('Map_Dashboard');
   			
   		if(map){

   			eflowDTS.Map_Dashboard = new GMaps({
			div: map,
		    lat: JsonArray[0].Geolocation.Latitude, 
			lng: JsonArray[0].Geolocation.Latitude,
		    zoom: 12
		    });
		   			
   		}
  			
  		}
  		
   eflowDTS.Map_Dashboard.drawPolyline({
		  path: path,
		  strokeColor: '#101010',
		  strokeOpacity: 0.6,
		  strokeWeight: 6
		  });
		
		
		 
  				
  		
  		}
  	
  	
  };
 
 $scope.Load_Visit_Point = function(){
 	
 	var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company,
                "User": eflowDTS.Session.UserControl.User,
    			"ID_Truck": eflowDTS.Session.UserControl.ID_Truck,
                "Estimated_Date": new Date(new Date().format('yyyy-mm-dd')).getTime()+eflowDTS.Time.Difference
                },
            'Fields':{
            	
            }
	};
	
	var onError = function(e){
		
		
	};
	
	var onSuccess = function(JsonArray){
		
		Data_Charge(JsonArray);		
		
	};
 	
 	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
 	
 };
 
 
 $scope.Load_Route = function(){
 	
 	var JsonData = {
            'Method_Name': 'Select_Geolocation',
            'Data': {
    			"Company": eflowDTS.Session.Company,
                "User": eflowDTS.Session.UserControl.User,
    			"ID_Truck": eflowDTS.Session.UserControl.ID_Truck
                }
	};
	
	var onError = function(e){
		
		
	};
	
	var onSuccess = function(JsonArray){
		
		Draw_Route(JsonArray);		
		
	};
 	
 	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError); 		
 	
 };
 
 
});


