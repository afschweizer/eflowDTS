var map;
DTS_APP.controller('Scr_Vehicules_Online_Controller',function($scope){


			$scope.init = function(){	
			$scope.Show_Components = {};
			$scope.Show_Components.Map_Online_User = true;
		    To_Reload_Eflow_Config();	
			Select_User_Online();
			Select_Jobs();	
	        Load_Init_Map();					
			$scope.Show_Components.Show_User_Online = true;	
			$scope.Show_Components.Show_List = false;				
			};
	
	function Load_Init_Map(){
		
		var div = document.getElementById('Map_Online_User');
   			
   			if(div){
	   		    map = new GMaps({
				div: div,
			    lat: eflowDTS.Geolocation.Latitude, 
				lng: eflowDTS.Geolocation.Longitude,
			    zoom: 12,
			    tilesloaded: function(e){
			    	$scope.Show_Components.Map_Online_User = false;			    	
			    	}
			    }); 
			 }
			 
		//$scope.Show_Components.Map_Online_User = false;
	};
	
	$scope.refresh = function(){
		Select_User_Online();
		Select_Jobs();
	};
	
	$scope.See_Info = function(User){
		eflowDTS.Session.UserControl = User;
		
		To_Save_Eflow_Config();
		location.href="#/detail";
	};
	
    function Select_User_Online(){		
		var JsonData = {
			'Method_Name': 'Select_User_Online',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }		
		};
	
		var onSuccess = function(Json){
			$scope.ArrayUser = [];
			if(Json.length > 0){
			  var Today = $scope.Watch;
			  for(var i = 0; i < Json.length; i++){
				if((Today - new Date(Json[i].Date)) < 300000){
					$scope.ArrayUser.push(Json[i]);
					$scope.$apply($scope.ArrayUser);	
					$scope.Show_Components.Show_User_Online = false;
					$scope.Show_Components.Show_List = true;
				}
				
					
				}
								
			}else{
				$scope.Show_User_Online = true;			
				
			}
			
		};
		
		var onError = function(Error){
			
			alert(Error);
			
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,JsonData,onSuccess,onError);
		
		
	};
	
	$scope.Create_Map = function(User){
		
		if($scope.Show_Components.Map_Online_User === false){
			$scope.Show_Components.Map_Online_User = true;
			Load_Map(User);
		}else{			
			if(typeof User === 'undefined'){
			$scope.Show_Components.Map_Online_User = false;	
		    }else{
			Load_Map(User);
		    }
		}
	};
	
	Load_Map = function(User){
   	  
   	 	    if(typeof User === 'undefined'){
	   		   map.setCenter(eflowDTS.Geolocation.Latitude,eflowDTS.Geolocation.Longitude);			    
	        }else{
		       map.setCenter(User.Geolocation.Latitude,User.Geolocation.Longitude);		      	
	        }
			map.removeMarkers();
			if($scope.ArrayUser.length > 0){
		   
			for(var i = 0; i < $scope.ArrayUser.length; i++){				
		
			var x = $scope.ArrayUser[i];
  			map.addMarker({
			  lat: x.Geolocation.Latitude, 
			  lng: x.Geolocation.Longitude,
			  icon: 'images/truck.png',
			  infoWindow: {
			  content: 
			'<div class="small-box">'+
                '<div class="inner">'+
                  '<h5>'+x.Geolocation.Address+'      </h5> '+
                  '<h5>Placa: '+x.ID_Truck+'    </h5> '+
                  '<h5>'+x.UserName+'  </h5> '+
                  '</div>'+
                '<div class="icon">'+
                 '   <i class="fa fa-truck"></i>'+
                '</div>'+                
              '</div>'
			  },
			  value: x			  
			  });			  	
				
			}
		}

				   		
   };
	
	function Select_Jobs(){
		
		var Query = {
			'Method_Name':'Select_Jobs',
			'Data':{
				'Company':eflowDTS.Session.Company,
				"Estimated_Date": new Date(new Date().format('yyyy-mm-dd')).getTime()+eflowDTS.Time.Difference
                
			},
			'Fields':{
				'Visit_State':true,
				'User':true,
				'Name':true,
				'ID_Truck':true				
			}
		};
		
		var Success = function(json){
			$scope.ArrayJobs = json;	
		};
		
		var onError = function(e){
		alert(e);				
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Query,Success,onError);
		
	};
	


});