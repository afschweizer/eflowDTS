
	var eflowDTS = {
		
		Geolocation:{
			"Latitude":9.935775, 
			"Longitude":-84.105073
		},
    Configuration: {
        "URLs": {
            "eflow_Get": "http://104.197.6.251/eflowDTS_Testing/eflowDTS/Eflow_Get.php",
            "eflow_Post": "http://104.197.6.251/eflowDTS_Testing/eflowDTS/Eflow_Post.php",
            "eflow_Date_Time" : "http://104.197.6.251/eflowDTS_Testing/eflowDTS/time.php"
        }
    },
    Session: {},
    Time : {    	
    	"Day" : 86400000,
    	"Hours" : 64800000,
    	"Difference": 21600000
    },
    LoggedIn: false,
    Save_Session : false,
    Ultimate_Page : ""
};

function Set_Current_Page(){
	
	eflowDTS.Ultimate_Page = window.location.hash;
	Set_Cookie("EflowCookie",eflowDTS);
	
};

function Set_Cookie(key,value) {
	
    document.cookie = key+"="+JSON.stringify(value);
    
};

function Exist_Cookie(key) {
    var cookie = Get_Cookie(key);
    if (cookie != "") {
		return true;
	} else {
       return false;     
    }
};

function Get_Cookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length,c.length));
        }
    }
    return "";
};

function Delete_Cookie(key){
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function To_Save_Eflow_Config() {
   document.cookie = JSON.stringify(eflowDTS);      
};

function To_Reload_Eflow_Config(){
	
	if(typeof eflowDTS === 'undefined'){
		 var eflowDTS = JSON.parse(document.cookie);
		}
	else{
		eflowDTS = JSON.parse(document.cookie);	
	    }
	  
		
};

 function Load_JSON(Url, Callback) {
    try {
        
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', Url, true);
        xobj.ontimeout = function(e) {
            alert("timeout");
        };
        xobj.onreadystatechange = function() {
            if (xobj.status === 404) {
                alert("Not found");
            } else {
                if (xobj.readyState === 4 && xobj.status === 200) {
                    Callback(xobj.responseText);
                }
            }
        };
        xobj.send(null);
    } catch (error) {
        
        Save_Error(error);
    }
}; 

function Load_Date (){
	
setInterval(function() {
        
		Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
	    var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		//$scope.user = "Afuentes";
	    //$scope.$apply($scope.user);
	});
                }, 1000);

	

}

function Get_Data_Geolocation(lat, long, polyX, polyY) {

      var i, j = polyX.length - 1;
      var oddNodes = false;

      for(i = 0; i < polyX.length; i++) {
          if((polyY[i] < long && polyY[j] >= long || polyY[j] < long && polyY[i] >= long) && (polyX[i] <= lat || polyX[j] <= lat)) {
              oddNodes ^= (polyX[i] + (long - polyY[i]) / (polyY[j] - polyY[i]) * (polyX[j] - polyX[i]) < lat);
          }
          j = i;
      }

      return oddNodes;

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
    if( key === "$$hashKey" ) {
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