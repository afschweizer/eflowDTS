DTS_APP.controller('Scr_General_Detail_Controller',function($scope){

$scope.init = function(){
	$scope.ArrayRoute=[];
	$scope.ArrayPVRoute=[];
	$scope.Select_VisitPoint();
    $scope.Show_Detail=false;
    $scope.Show_VisitPoint_Route=false;
		// $("#Charge_New_Modal").modal('show');
 //$scope.Generate_Charts ();
       
 };
$scope.Generate_Data= function(data){
	var Response = $scope.ArrayJobs ;
		for(var i=0; i<Response.length;i++){
			if(Response[i].Route.ID_Route===data.ID_Route){
				var Flag = false;
				for(var j=0; j<$scope.ArrayPVRoute.length;j++){
					if(Response[i].ID_Location===$scope.ArrayPVRoute[j].ID_Location){
						$scope.ArrayPVRoute[j].Quantity=$scope.ArrayPVRoute[j].Quantity+1;
					    $scope.ArrayPVRoute.push($scope.ArrayPVRoute[j]);
						Flag = true;
	      		        break;					
					}
				}
				if(Flag === false){
					var obj={}; 
					 obj.ID_Location = Response[i].ID_Location;
					 obj.Name = Response[i].Name;
					 obj.Quantity = 1;
					$scope.ArrayPVRoute.push(obj);
				}
			}
		}
	google.charts.load("current", {packages:["corechart" , "bar"]}); 
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
      	var arrayPV=[];
      	for(var k=0; k<$scope.ArrayPVRoute.length;k++){
          	 arrayPV[k]=$scope.ArrayPVRoute[k];
          }         
  		var arrpvr=[];
		arrpvr[0]= [{label: 'Rutas', type: 'string'} ,{label: 'Numero de puntos de visita', type: 'number'}];
		for(var l=0; l<$scope.ArrayPVRoute.length;l++){
			arrpvr[l+1]=[$scope.ArrayPVRoute[l].Name, $scope.ArrayPVRoute[l].Quantity];
		}
        var data2 = google.visualization.arrayToDataTable(arrpvr);
	    var options2= {
          title: 'Numero de puntos de visita '+$scope.ArrayJobs.length, 
		  is3D: true,
        };
         var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data2, options2);
        }
	$scope.Show_VisitPoint_Route = true;
};
$scope.Generate_Charts = function(){
     $(".knob").knob({
      draw: function () {
        if (this.$.data('skin') === 'tron') {
          var a = this.angle(this.cv)  
              , sa = this.startAngle         
              , sat = this.startAngle        
              , ea                            
              , eat = sat + a                 
              , r = true;
          this.g.lineWidth = this.lineWidth;
          this.o.cursor
          && (sat = eat - 0.3)
          && (eat = eat + 0.3);
          if (this.o.displayPrevious) {
            ea = this.startAngle + this.angle(this.value);
            this.o.cursor
            && (sa = ea - 0.3)
            && (ea = ea + 0.3);
            this.g.beginPath();
            this.g.strokeStyle = this.previousColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
            this.g.stroke();
          }
          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
          this.g.stroke();
          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();
          return false;
        }
      }
    });
    $scope.Show_Detail=true;
};
$scope.Select_VisitPoint = function(){
try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Estimated_Date":  new Date().format("yyyy-mm-dd") 
            },
            'Fields':{
            }
        };
		var onSuccess = function(Response){
		$scope.ArrayJobs = Response;
		for(var i=0; i<Response.length;i++){
			var Flag = false;
			for(var j=0; j<$scope.ArrayRoute.length;j++){
				if(Response[i].Route.ID_Route===$scope.ArrayRoute[j].ID_Route){
					Flag = true;
      		        break;					
				}
			}
			if(Flag === false){
				var obj = Response[i].Route;
				$scope.ArrayRoute.push(obj);
			}
		}
		 setTimeout(function(){
		 	$scope.$apply();
		 	$scope.Generate_Charts();
		 	}, 2);
		};
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
            Description: "onError",
           		User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
	    Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);	    
        } catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
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