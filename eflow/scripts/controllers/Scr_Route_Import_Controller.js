DTS_APP.controller('Scr_Route_Import_Controller',function($scope) {
 
$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayRoutes_Import = [];
	$scope.Headers= [{"es":"NOMBRE","value":"Route_Name"},{"es":"IDENTIFICADOR","value":"ID_Route"},
	{"es":"DESCRIPCION","value":"Route_Description"}] ;


};
 
$scope.Action_Option= function(Option){
	if(Option === "Asignar"){
		$scope.Assign_Route_In_DB();
	}
	
};

$scope.Checking_Checkboxes_Check = function(){
	
	$scope.Show_Actions = false;
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
};

$scope.Checking_Checkboxes_Check_Master = function(master){
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
};

$scope.Assign_Route_In_DB = function(){
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Route_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Route_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Route',
            'Data': 
            Array_Route_To_Assign,
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayRoutes_Import = [];
		
		};
		
		var onError = function(JsonData){
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);

};

$scope.Open_Modal_Add_Route_Import = function(){
	
	$scope.Route_Import_Add = {};
	$scope.Route_Import_Add_Array_Task = [];
	$("#Modal_Edit_Routes_Import").modal("show");	
	
};

$scope.To_Order_By = function(Order_Type){
	
	if ($scope.OrderList === Order_Type) {
		
    var Reverse = Order_Type.charAt(0);
    if (Reverse === '-') {
        $scope.OrderList = Order_Type.substr(1);
    } else {
        $scope.OrderList = '-' + Order_Type;
    }
	} else {
	    $scope.OrderList = Order_Type;
	}
};

$scope.Import_Files = function(){
	
	var file = document.getElementById('Route_File_Import').files[0];
	
	if(file){
	
	var ext = file.name.split('.');
     ext = ext[ext.length -1].toLowerCase();
      
      switch(ext){
      
     case'json':{ 	
      	
      	Import_Json(file);
      	
      	break;
  	   }
  	 case'csv':{ 	
      	
      	Import_CSV(file);
      	
      	break;
  	   }
      }	
	}else{
		
		 bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Debe elegir un archivo.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
		
	}
		
};

$scope.Checking_Checkboxes = function(){
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked = true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
};

$scope.Visualize_Route_Import = function(Obj){
  
  		$scope.Route_Import = Obj;
        $scope.Array_Route_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_Routes_Import").modal("show"); 
                
};

function Import_Json(file){
		
	oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 			
	//Asigno a una variable el nuevo Json
	//$scope.ArrayJobs_Import1 = Complete_Json(JSON.parse(this.result));
		var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){

		arr[i].Company = eflowDTS.Session.Company;
		$scope.ArrayRoutes_Import.push(arr[i]);		
		$scope.$apply($scope.ArrayRoutes_Import);
		
	}
//	insertarI($scope.ArrayRoutes_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
	
};/*
function insertarI(ArrayRoutes_Import,ArrayRoutes_Import1){
	
	for(var i = 0; i < ArrayRoutes_Import1.length; i++){
		$scope.ArrayRoutes_Import.push(ArrayRoutes_Import1[i]);
		
	}
}*/
function Complete_Json(Json_Array){
	

	
		
};


function Complete_Json_CSV(arr){
 
 for (var i=0;i<arr.length;i++){
	  
  var RouteExcel = arr[i];
   
  var ro = {};
  ro.Route_Name = RouteExcel.Route_Name;
  ro.ID_Route = RouteExcel.ID_Route;
  ro.Route_Description = RouteExcel.Route_Description;
  ro.Route_Path = RouteExcel.Route_Path;
  ro.Company = eflowDTS.Session.Company;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayRoutes_Import,ObtenerArray(obj));
	
};
 
 
function ObtenerArray(obj){
	  
	  var array = [];
	  var keys = Object.keys(obj);

for (var i = 0; i < keys.length; i++) {
    array.push(obj[keys[i]]);
    
}
	  return array;
	  
  };
  
function Import_CSV(file){
		
		oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	        
	/*	$scope.ArrayRoutes_Import = CSV_To_JSON(this.result);
		$scope.$apply($scope.ArrayRoutes_Import);*/
			        
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){

		$scope.ArrayRoutes_Import.push(arr[i]);
		$scope.$apply($scope.ArrayRoutes_Import);
		
		
		
		
	    }		
			
		};
			
	    oFReader.readAsText(file,'ISO-8859-1');
		
    };
		
			
$scope.Remove_In_Array = function(Obj,Array){
	
	Array_Remove(Array,Obj);
	
};

function CSV_To_JSON(csv){
		
		  var Lines = csv.split("\n");
		  var ArrayJson = [];
		  var Headers = Lines[0].replace(/"/g,'').split(",");
		  
		  for(var i = 1; i < (Lines.length)-1; i++){
			  
			 var Obj = {};
			 var CurrentLine = Lines[i].replace(/"/g,'').split(",");
			
			 Obj.Company = eflowDTS.Session.Company;
			 
				 for(var j = 0; j < Headers.length; j++){
					/*
					 var String = Lines[i].split("|");
						var Arr = String.split("|");
						var Path = [];
						for(var i = 0; i < Arr.length; i = i+2){
						
						var Coor = [];
						Coor.push(parseFloat(Arr[i]));
						Coor.push(parseFloat(Arr[i+1]));
						Path.push(Coor);
						}
						console.log(Path);*/
					if (Headers[j] === "Route_Path"){
						 var Arr = CurrentLine[j].split("|");
						var Path = [];
						for(var i = 0; i < Arr.length; i = i+2){
						
						var Coor = [];
						Coor.push(parseFloat(Arr[i]));
						Coor.push(parseFloat(Arr[i+1]));
						Path.push(Coor);}
					Obj[Headers[j]] = Path;
						}else{
					Obj[Headers[j]] = CurrentLine[j];
					}
				 }
				 
				 ArrayJson.push(Obj);
		  }
		  
     return ArrayJson; 
	 
	};

}); 