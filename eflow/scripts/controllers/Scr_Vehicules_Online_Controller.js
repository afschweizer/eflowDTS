DTS_APP.controller('Scr_Vehicules_Online_Controller',function($scope){



	$scope.init = function(){	
	$scope.Show_Components = {};
	$scope.Show_Components.Map_Online_User = false;
		To_Reload_Eflow_Config();	
			Select_User_Online();
			Select_Jobs();			
			$scope.Show_Components.Show_User_Online = true;	
			$scope.Show_Components.Show_List = false;				
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
   	
   	//if(navigator.geolocation){
   		
   		//var onSuccess = function(pos){
   		
   		var map = document.getElementById('Map_Online_User');
   			
   		if(map){

   			if(typeof User === 'undefined'){
	   		    eflowDTS.Map_Dashboard = new GMaps({
				div: map,
			    lat: eflowDTS.Geolocation.Latitude, 
				lng: eflowDTS.Geolocation.Longitude,
			    zoom: 12
			    });
	        }else{
		        eflowDTS.Map_Dashboard = new GMaps({
				div: map,
			    lat: User.Geolocation.Latitude, 
				lng: User.Geolocation.Longitude,
			    zoom: 16
			    });	        	
	        }

			if($scope.ArrayUser.length > 0){
		   
			for(var i = 0; i < $scope.ArrayUser.length; i++){
				
		
			var x = $scope.ArrayUser[i];
  			eflowDTS.Map_Dashboard.addMarker({
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
		   			
   		}
   		
   		/*};
   		
   		
   		var onError = function(err) {
  			alert('ERROR(' + err.code + '): ' + err.message);
        };
    
 		navigator.geolocation.getCurrentPosition(onSuccess,onError);
   		
    	}else{  		 		
   		
   		bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Su navegador no soporta Geolocalization",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
     	}*/
   	
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