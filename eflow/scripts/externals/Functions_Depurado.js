google.load("visualization", "1", {packages:["corechart"/*, "charteditor"*/]});   

var eflowDTS = {
  Configuration: {
    "URLs": {
      "eflow_Get": "http://104.197.119.240/presentation/eflowDTS/Eflow_Get.php",
      "eflow_Post": "http://104.197.119.240/presentation/eflowDTS/Eflow_Post.php",
      "eflow_Date_Time": "http://104.197.119.240/presentation/eflowDTS/time.php"
    }
  },
  Session: {
    "Current_User": {},
    "Company": {}, 
    "Ram": {},
    "LoggedIn": false,
    "Save_Session": false,
    "Ultimate_Page": ""
  },
  Time : {    	
    	"Day" : 86400000,
    	"Hours" : 64800000,
    	"Difference": 21600000
    }
}; 

function RandomColor() {
	
try{
	
    var Colors = [
	{
		"Border":"#19bd9b",
		"BackGround":"#16a086"	
	},{
		"Border":"#f2c40f",
		"BackGround":"#f39c11"	
	},{
		"Border":"#2dcc70",
		"BackGround":"#27ae61"	
	},{
		"Border":"#e67f22",
		"BackGround":"#d45300"	
	},{
		"Border":"#3398dc",
		"BackGround":"#2a80b9"	
	},{
		"Border":"#e84c3d",
		"BackGround":"#c1392b"	
	},{
		"Border":"#9b58b7",
		"BackGround":"#8f44ad"	
	},{
		"Border":"#ecf0f1",
		"BackGround":"#bec3c7"	
	},{
		"Border":"#34495e",
		"BackGround":"#2c3f50"	
	},{
		"Border":"#96a6a6",
		"BackGround":"#7e8c8d"	
	}];
    
    return  Colors[Math.floor(Math.random() * Colors.length-1)];
    
    }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Random_Color",
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
}
 
function Set_Current_Page(){
	try{
		
	if(Exist_Cookie("EflowCookie") === true){
		Get_Cookie("EflowCookie");
     }
		eflowDTS.Session.Ultimate_Page = window.location.hash;
	    Set_Cookie("EflowCookie",eflowDTS);
        
        }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Set_Current_Page",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
}

function Set_Cookie(key,value) {
	
	try{
		
	localStorage.setItem(key,JSON.stringify(value));			
        
   }catch (e) {        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Set_Cookie",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }    
};

function Get_Cookie(key) {	
try{
	
	var obj = JSON.parse(localStorage.getItem(key));	
    eflowDTS = obj;
    
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Get_Cookie",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

function Exist_Cookie(key){
	
try{
	
	return (localStorage.getItem(key) != null);	
	
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Exist_Cookie",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
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
    }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Load_JSON",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

function Load_Date (){
	
	try{
		
setInterval(function() {        

Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
	    var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		//$scope.user = "Afuentes";
	    //$scope.$apply($scope.user);
	}); 
 }, 1000);

	

 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Load_Date",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

function Get_Data_Geolocation(lat, long, polyX, polyY) {
	
try{
      var i, j = polyX.length - 1;
      var oddNodes = false;

      for(i = 0; i < polyX.length; i++) {
          if((polyY[i] < long && polyY[j] >= long || polyY[j] < long && polyY[i] >= long) && (polyX[i] <= lat || polyX[j] <= lat)) {
              oddNodes ^= (polyX[i] + (long - polyY[i]) / (polyY[j] - polyY[i]) * (polyX[j] - polyX[i]) < lat);
          }
          j = i;
      }

      return oddNodes;

 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Get_Data_Geolocation",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};


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
    } catch (e ) {
        Save_Error(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Send_JSON",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
//-----------------------------------
function Array_Remove(Array,Value){
	try{
	for ( var i = 0, j = Array.length ; i < j; i++ ) {
		
    if ( Array[ i ] === Value ) {
      Array.splice( i, 1 );
      i--;
    }
  }
    
return Array;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Array_Remove",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};



function Save_Error(e) {
    
    try {
        
        if (typeof e === 'object') {
        	
            e.Company = eflowDTS.Session.Company.Identifier;
            
        } else {
            
            e = {
                Generated: true,
                Page: "Functions_Depurado",
                Method: "Save_Error",
                Description: "Error recibido no posee estructura de objeto",
                User: eflowDTS.Session.Current_UserUserName,
                Date: new Date().getTime(),
                Company: eflowDTS.Session.Company.Identifier,
                Error: e
            };
            
        }
        	var JsonData = {
            'Method_Name': 'Insert_Error_Back',
            'Data': e
        };
        
	var onSuccess = function(onSuccess){
		
		};
	
	var onError =  function(onError){
			var erro={
			Generated: true,
                Page: "Functions_Depurado",
                Method: "Save_Error",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;		
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
        
        
        
        
    } catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Array_Remove",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        console.log(err);
        } else {
            Save_Error(e);
        console.log(e);
        }
    }  
  
};

function Image_To_Base64(url, callback) {
 try{
   var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL();
    callback(dataURL);
    canvas = null;
  };
  img.src = url;

  } catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Functions_Depurado",
                Method: "Image_To_Base64",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        console.log(err);
        } else {
            Save_Error(e);
        console.log(e);
        }
    }  
}



