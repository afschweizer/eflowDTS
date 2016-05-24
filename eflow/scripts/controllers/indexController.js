DTS_APP.controller('indexController', function($scope) {
	

       $scope.init = function() {
       	
$scope.Show_Components = {};		
		$scope.Show_Components.Main_Menu = true;  
		$scope.Show_Components.SubMenu_Maintenance = false;
           setInterval(function() {
                    timers();
                }, 1000);
  
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

        function timers() {
        
		Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
		var x = JSON.parse(Text_Json);
		$scope.Watch = new Date(x.Time);
		$scope.$apply($scope.Watch);
		$scope.UserName = eflowDTS.Session.UserName;
		$scope.Company = eflowDTS.Session.Company;
		});
            
        };
		
	$scope.Sign_Out = function(){
		$("#Log_Out").modal('show');
		document.cookie = "";
		eflowDTS = JSON.parse(document.cookie); 		
		setTimeout(function(){
	         	$('#Log_Out').modal('hide');
	         	window.location.href = "#";
	    }, 3000);
	}	
	
    });
	
	
	
	