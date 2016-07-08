DTS_APP.controller('Scr_Vehicle_Import_Controller',function($scope) {

$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayVehicles_Import = [];
var License=[{"es":"A1","value":"A1"},{"es":"A2","value":"A2"},{"es":"A3","value":"A3"},{"es":"B1","value":"B1"},{"es":"B2","value":"B2"},{"es":"B3","value":"B3"},{"es":"B4","value":"B4"},{"es":"C1","value":"C1"},{"es":"C2","value":"C2"},{"es":"D1","value":"D1"},{"es":"D2","value":"D2"},{"es":"D3","value":"D3"},{"es":"E1","value":"E1"},{"es":"E2","value":"E2"}];
$scope.ArrayLicense =License;
	$scope.Headers= 
[{"es":"PLACA","value":"ID_Truck"},{"es":"MARCA","value":"Brand"},
{"es":"AÑO","value":"Year"},{"es":"PESO","value":"Weight"},{"es":"VOLUMEN","value":"Cubics"}] ;


};

$scope.Action_Option= function(Option){
	if(Option === "Asignar"){
		$scope.Assign_Vehicle_In_DB();
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

$scope.Assign_Vehicle_In_DB = function(){
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Vehicle_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
		json_obj.ID_Truck = json_obj.ID_Truck.replace(/\s/g, '').toUpperCase();
			Array_Vehicle_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Vehicle',
            'Data': 
            Array_Vehicle_To_Assign,
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayVehicles_Import = [];
		
		};
		
		var onError = function(JsonData){
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);

};

$scope.Open_Modal_Add_Vehicle_Import = function(){
	
	$scope.Vehicle_Import_Add = {};
	$scope.Vehicle_Import_Add_Array_Task = [];
	$("#Modal_Add_Vehicle_Import").modal("show");	
	
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
	
	var file = document.getElementById('Vehicle_File_Import').files[0];
	
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

$scope.Visualize_Vehicle_Import = function(Obj){
  
  		$scope.Vehicle_Import = Obj;
  		
        $scope.Array_Vehicle_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_Vehicle_Import").modal("show"); 
                
};

function Import_Json(file){
		
	oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){
        arr[i].Company = eflowDTS.Session.Company;
		arr[i].ID_Truck = arr[i].ID_Truck.replace(/\s/g, '').toUpperCase();
		$scope.ArrayVehicles_Import.push(arr[i]);	
		
		$scope.$apply($scope.ArrayVehicles_Import);
		
	}
	};
			
	oFReader.readAsText(file);
				
	/*//Asigno a una variable el nuevo Json
	//$scope.ArrayJobs_Import1 = Complete_Json(JSON.parse(this.result));
	insertarI($scope.ArrayVehicles_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
*/		
};/*
function insertarI(ArrayVehicles_Import,ArrayVehicles_Import1){
	
	for(var i = 0; i < ArrayVehicles_Import1.length; i++){
		$scope.ArrayVehicles_Import.push(ArrayVehicles_Import1[i]);
		
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
	  
  var VehicleExcel = arr[i];
   
  var ve = {};
  ve.Id_Vehicle = VehicleExcel.Id_Vehicle;
  ve.Brand = VehicleExcel.Brand;
  ve.Model = VehicleExcel.Model;
  ve.Year = VehicleExcel.Year;
  ve.Fuel = VehicleExcel.Fuel;
  ve.Type_Vehicle = VehicleExcel.Type_Vehicle;
  ve.Cylinder_Capacity = VehicleExcel.Cylinder_Capacity;
  ve.Transferring_State = VehicleExcel.Transferring_State;
  ve.ID_Truck = VehicleExcel.ID_Truck.replace(/\s/g, '').toUpperCase();
  ve.Weight = VehicleExcel.Weight;
  ve.Cubics = VehicleExcel.Cubics;
  ve.Description = VehicleExcel.Description;
  ve.Company = eflowDTS.Session.Company;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayVehicles_Import,ObtenerArray(obj));
	
};
 
 
function Import_CSV(file){
		
		oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	         
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){  
		//$scope.ArrayVehicles_Import = CSV_To_JSON(this.result);
		$scope.ArrayVehicles_Import.push(arr[i]);
		$scope.$apply($scope.ArrayVehicles_Import);
		
	    }
		//$scope.$apply($scope.ArrayVehicles_Import);
			
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
					
					if(Headers[j] === "License"){
						Obj[Headers[j]] = CurrentLine[j].split("|");
					}else{
					Obj[Headers[j]] = CurrentLine[j];
				    }

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