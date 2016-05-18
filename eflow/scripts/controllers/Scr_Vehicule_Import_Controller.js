DTS_APP.controller('Scr_Vehicule_Import_Controller',function($scope) {

$scope.init = function(){
		To_Reload_Eflow_Config();
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayVehicules_Import = [];
	$scope.Headers= 
[{"es":"PLACA","value":"ID_Truck"},{"es":"MARCA","value":"Brand"},{"es":"AÑO","value":"Year"},{"es":"PESO","value":"Weight"},{"es":"VOLUMEN","value":"Cubics"}] ;


};

$scope.Action_Option= function(Option){
	if(Option === "Asignar"){
		$scope.Assign_Vehicule_In_DB();
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

$scope.Assign_Vehicule_In_DB = function(){
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Vehicule_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Vehicule_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Vehicule',
            'Data': 
            Array_Vehicule_To_Assign,
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayVehicules_Import = [];
		
		};
		
		var onError = function(JsonData){
		alert(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);

};

$scope.Open_Modal_Add_Vehicule_Import = function(){
	
	$scope.Vehicule_Import_Add = {};
	$scope.Vehicule_Import_Add_Array_Task = [];
	$("#Modal_Add_Vehicule_Import").modal("show");	
	
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
	
	var file = document.getElementById('Vehicule_File_Import').files[0];
	
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

$scope.Visualize_Vehicule_Import = function(Obj){
  
  		$scope.Vehicule_Import = Obj;
        $scope.Array_Vehicule_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_Vehicule_Import").modal("show"); 
                
};

function Import_Json(file){
		
	oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){
        arr[i].Company = eflowDTS.Session.Company;
		$scope.ArrayVehicules_Import.push(arr[i]);		
		$scope.$apply($scope.ArrayVehicules_Import);
		
	}
	};
			
	oFReader.readAsText(file);
				
	/*//Asigno a una variable el nuevo Json
	//$scope.ArrayJobs_Import1 = Complete_Json(JSON.parse(this.result));
	insertarI($scope.ArrayVehicules_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
*/		
};/*
function insertarI(ArrayVehicules_Import,ArrayVehicules_Import1){
	
	for(var i = 0; i < ArrayVehicules_Import1.length; i++){
		$scope.ArrayVehicules_Import.push(ArrayVehicules_Import1[i]);
		
	}
}*/

function ObtenerArray(obj){
	  
	  var array = [];
	  var keys = Object.keys(obj);

for (var i = 0; i < keys.length; i++) {
    array.push(obj[keys[i]]);
    
}
	  return array;
	  
  };
  
function Complete_Json(Json_Array){
	

	
		
};


function Complete_Json_CSV(arr){
 
 for (var i=0;i<arr.length;i++){
	  
  var VehiculeExcel = arr[i];
   
  var ve = {};
  ve.Id_Vehicle = VehiculeExcel.Id_Vehicle;
  ve.Brand = VehiculeExcel.Brand;
  ve.Model = VehiculeExcel.Model;
  ve.Year = VehiculeExcel.Year;
  ve.Fuel = VehiculeExcel.Fuel;
  ve.Cylinder_Capacity = VehiculeExcel.Cylinder_Capacity;
  ve.Transferring_State = VehiculeExcel.Transferring_State;
  ve.ID_Truck = VehiculeExcel.ID_Truck;
  ve.Weight = VehiculeExcel.Weight;
  ve.Cubics = VehiculeExcel.Cubics;
  ve.Description = VehiculeExcel.Description;
  ve.Company = eflowDTS.Session.Company;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayVehicules_Import,ObtenerArray(obj));
	
};
 
 
function Import_CSV(file){
		
		oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	         
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){  
		//$scope.ArrayVehicules_Import = CSV_To_JSON(this.result);
		$scope.ArrayVehicules_Import.push(arr[i]);
		$scope.$apply($scope.ArrayVehicules_Import);
		
	    }
		//$scope.$apply($scope.ArrayVehicules_Import);
			
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
			 
			 
				 for(var j = 0; j < Headers.length; j++){
					
					
					Obj[Headers[j]] = CurrentLine[j];
					
				 }
				 Obj.Company = eflowDTS.Session.Company;
				 Obj.Year = parseInt(Obj.Year);
				 Obj.Weight = parseInt(Obj.Weight);
				 Obj.Cubics = parseInt(Obj.Cubics);
				 
				 ArrayJson.push(Obj);
		  }
		  
     return ArrayJson; 
	 
	};

}); 