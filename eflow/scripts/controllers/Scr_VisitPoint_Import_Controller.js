 DTS_APP.controller('Scr_VisitPoint_Import_Controller',function($scope) {

$scope.init = function(){
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
		
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayVisitPoints_Import = [];
	$scope.Headers= [{"es":"NOMBRE","value":"Name"},{"es":"CEDULA JURIDICA","value":"Legal_Cedula"},
		{"es":"SECTOR","value":"Route"},{"es":"DIRECCION","value":"Address"},
		{"es":"ENCARGADO","value":"Manager"},{"es":"CORREO","value":"Mail"}] ;
 Select_Routes();

};

$scope.Action_Option= function(Option){
	if(Option === "Asignar"){
		$scope.Assign_VisitPoint_In_DB();
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

$scope.Assign_VisitPoint_In_DB = function(){
		
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_VisitPoint_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_VisitPoint_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Visit_Point',
            'Data':  Array_VisitPoint_To_Assign
            
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayVisitPoints_Import = [];
		
		};
		
		var onError = function(JsonData){
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);
};

$scope.Open_Modal_Add_VisitPoint_Import = function(){
	
	$scope.VisitPoint_Import_Add = {};
	$("#Modal_Add_VisitPoint_Import").modal("show");	
	
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
	
	var file = document.getElementById('VisitPoint_File_Import').files[0];
	
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

$scope.Visualize_VisitPoint_Import = function(Obj){
  
  		$scope.VisitPoint_Import = Obj;
  		$scope.Obj = Obj.Route;
        $("#Modal_Edit_VisitPoints_Import").modal("show"); 
                
};

function Import_Json(file){
	
	var oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 			
	var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){

		arr[i].Company = eflowDTS.Session.Company;
		$scope.ArrayVisitPoints_Import.push(arr[i]);		
		$scope.$apply($scope.ArrayVisitPoints_Import);
		
	}
	};
			
	oFReader.readAsText(file);
		
};	

function Complete_Json(Json_Array){
	

	
		
};


function Complete_Json_CSV(arr){
 
 for (var i=0;i<arr.length;i++){
	  
  var VisitPointExcel = arr[i];
   
  var vp = {};
  
  vp.Lastname = VisitPointExcel.Lastname;
  us.Company = eflowDTS.Session.Company;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayUsers_Import,ObtenerArray(obj));
	
};
 
 
function ObtenerArray(obj){
	  
	  var array = [];
	  var keys = Object.keys(obj);

for (var i = 0; i < keys.length; i++) {
    array.push(obj[keys[i]]);
    
}
	  return array;
	  
  };
  
  function Select_Routes(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Route',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	"ID_Route":true,
            	"Route_Name":true,
            	"_id":false
            	
            }
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayRoutes = JsonData;		

		};
		
		var onError = function(JsonData){
		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        
    } catch (err) {
        console.log(err);
    }
	
   };
  
function Import_CSV(file){
		
		
	    var oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	        
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){

		$scope.ArrayVisitPoints_Import.push(arr[i]);
		$scope.$apply($scope.ArrayVisitPoints_Import);
		
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
			 Obj.Route = {};
			 var CurrentLine = Lines[i].replace(/"/g,'').split(",");
			 			 
				 for(var j = 0; j < Headers.length; j++){					
					
					if(Headers[j] === "ID_Route" || Headers[j] === "Route_Name"){
						Obj.Route[Headers[j]] = CurrentLine[j];					
					}else{
						Obj[Headers[j]] = CurrentLine[j];
					}
					
				 }
				 Obj.Company = eflowDTS.Session.Company;
				 Obj.Legal_Cedula = parseInt(Obj.Legal_Cedula);
				 Obj.Telephone_Number = parseInt(Obj.Telephone_Number);
				 Obj.Latitude = parseFloat(Obj.Latitude);
				 Obj.Longitude = parseFloat(Obj.Longitude);
				 
				 ArrayJson.push(Obj);
		  }
		  
     return ArrayJson; 
	 
	};

}); 