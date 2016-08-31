DTS_APP.controller('Scr_Prueba_Controller',function($scope){

$scope.init = function(){
	$scope.ArrayRoute=[];
	$scope.ArrayPVRoute=[];
	$scope.Select_VisitPoint();
    $scope.Show_Detail=false;
    $scope.Show_VisitPoint_Route=false;
		// $("#Charge_New_Modal").modal('show');
 //$scope.Generate_Charts ();
       
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