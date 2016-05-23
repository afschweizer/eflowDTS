var Compute_Engine = true;

if(Compute_Engine === true){
	var eflowDTS = {
	Geolocation:{
		"Latitude":9.935775, 
		"Longitude":-84.105073
	},
    Configuration: {
        "URLs": {
            "eflow_Get": "http://104.197.6.251/eflowDTS/Eflow_Get.php",
            "eflow_Post": "http://104.197.6.251/eflowDTS/Eflow_Post.php",
            "eflow_Date_Time" : "http://104.197.6.251/eflowDTS/time.php"
        }
    },
    Session: {},
    Time : {    	
    	"Day" : 86400000,
    	"Hours" : 64800000,
    	"Difference": 21600000
    },
    LoggedIn: false
};
}
else{
	
	var eflowDTS = {
	Geolocation:{
		"Latitude":9.935775, 
		"Longitude":-84.105073
	},
    Configuration: {
        "URLs": {
            "eflow_Get": "http://runnerp11.codenvycorp.com:52438/Eflow_Get.php",
            "eflow_Post": "http://runnerp11.codenvycorp.com:52438/Eflow_Post.php",
            "eflow_Date_Time" : "http://runnerp11.codenvycorp.com:52438/time.php"
        }
    },
    Session: {},
    Time : {    	
    	"Day" : 86400000,
    	"Hours" : 64800000,
    	"Difference": 21600000
    },
    LoggedIn: false
};
	
}
 var Cookie_EflowDTS ;
 
function To_Save_Eflow_Config() {

   Cookie_EflowDTS = JSON.stringify(eflowDTS);
   document.cookie= Cookie_EflowDTS;
      
};

function To_Reload_Eflow_Config(){
	
	if(typeof eflowDTS === 'undefined'){
		 eflowDTS = JSON.parse(document.cookie);
		}
	else{
		eflowDTS = JSON.parse(document.cookie);	
	}
		
};

function Load_Date (){
	
setInterval(function() {
        
		Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
	    var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		//$scope.user = "Afuentes";
	//	$scope.$apply($scope.user);
	});
                }, 1000);

	

}

//-----------------------------.:

function validate(UserName,Password){

Log_In_Online(UserName, Password, function(obj) {
            if (obj.Result === false) {
                alert("El usuario y contraseña no coinciden o usted aún no tiene una cuenta.");
            } else {
                alert("hola");
                
            };
            
        });
}

//-----------------------------.:

function onErrorGeolocating(error)
{
	switch(error.code)
	{
		case error.PERMISSION_DENIED:
			alert('Por favor active su GPS!');
		break;

		case error.POSITION_UNAVAILABLE:
			alert("No se puede obtener la posición en este momento");
		break;

		case error.TIMEOUT:
			alert("ERROR: No se puede obtener la posición en este momento!");
		break;

		default:
			alert("ERROR: Unknown problem!");
		break;
	}
}

//-----------------------------.:

function Log_In_Online(UserName, Password, Company,onSuccess, onError) {
    try {
        var JsonData = {
            'Method_Name': 'Login_Appery',
            'Data': {
                'UserName': UserName,
                'Password': Password,
                'Company': Company
            }
        };
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
};

//-----------------------------.:
function Send_JSON(Url, JsonData, onSucess, onError) {
    try {
        var json;
        var data = JSON.stringify(JsonData,function( key, value ) {
    if( key === "$hashKey" ) {
        return undefined;
    }

    return value;
});
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Url, !0);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    onSucess(JSON.parse(xhr.responseText));
                } else {
                    onError(xhr.statusText);
                }
            }
        };
    } catch (error) {
        Save_Error(error);
    }
};
//-----------------------------------
function Array_Remove(Array,Value){
	
	for ( var i = 0, j = Array.length ; i < j; i++ ) {
		
    if ( Array[ i ] == Value ) {
      Array.splice( i, 1 );
      i--;
    }
  }
    
return Array;
	
};