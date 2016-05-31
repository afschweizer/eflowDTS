DTS_APP.controller('Scr_User_Import_Controller',function($scope) {

$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		eflowDTS = Get_Cookie("EflowCookie");
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayUsers_Import = [];
	$scope.Headers= [{"es":"NOMBRE","value":"Name"},{"es":"PRIMER APELLIDO","value":"Lastname"},
	{"es":"SEGUNDO APELLIDO","value":"Lastname2"},{"es":"CEDULA","value":"Identification"},{"es":"TIPO","value":"Type"}] ;

var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
var Type =[{"es":"Administrador","value":"Administrador"},{"es":"Conductor","value":"Conductor"}] ;
$scope.ArrayGenders = Gender;
$scope.ArrayTypes = Type;

};

$scope.Action_Option= function(Option){
	if(Option === "Asignar"){
		$scope.Assign_User_In_DB();
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

$scope.Assign_User_In_DB = function(){
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_User_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_User_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_User',
            'Data': 
            Array_User_To_Assign,
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayUsers_Import = [];
		
		};
		
		var onError = function(JsonData){
		alert(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);

};

$scope.Open_Modal_Add_User_Import = function(){
	
	$scope.User_Import_Add = {};
	$scope.User_Import_Add_Array_Task = [];
	$("#Modal_Add_User_Import").modal("show");	
	
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
	
	var file = document.getElementById('User_File_Import').files[0];
	
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

$scope.Visualize_User_Import = function(Obj){
  
  		$scope.User_Import = Obj;
        $scope.Array_User_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_User_Import").modal("show"); 
                
};

function Import_Json(file){
		
	oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 			
	var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){

		arr[i].Company = eflowDTS.Session.Company;
		$scope.ArrayUsers_Import.push(arr[i]);		
		$scope.$apply($scope.ArrayUsers_Import);
		
	}
	};
			
	oFReader.readAsText(file);
		
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
	        
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){

		$scope.ArrayUsers_Import.push(arr[i]);
		$scope.$apply($scope.ArrayUsers_Import);
		
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
					
					Obj[Headers[j]] = CurrentLine[j];
					
				 }
				 
				 Obj.Age = parseInt(Obj.Age);
				 Obj.Identification = parseInt(Obj.Identification);
				 Obj.Company = eflowDTS.Session.Company;
				 
				 ArrayJson.push(Obj);
		  }
		  
     return ArrayJson; 
	 
	};

}); 