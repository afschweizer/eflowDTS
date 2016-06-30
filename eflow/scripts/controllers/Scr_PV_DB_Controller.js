DTS_APP.controller('Scr_PV_DB_Controller',function($scope) {
	
	
$scope.currentPage = 1;
$scope.pageSize = 10;
$scope.Check = false;

$scope.init = function() {
	
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
$scope.Headers = [{"es":"GERENTE","value":"VisitPoint.Manager"},{"es":"NOMBRE","value":"VisitPoint.Name"},
		{"es":"DIRECCION","value":"VisitPoint.Address"},{"es":"TELEFONO","value":"VisitPoint.Telephone_Number"},
		{"es":"VEHICULO","value":"VisitPoint.ID_Truck"},
		{"es":"USUARIO","value":"User"},{"es":"CORREO","value":"VisitPoint.Mail"}];
$scope.Select_PV();

};

$scope.Select_PV = function(){
	try {
		
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
            }
        }; 
        
		var onSuccess = function(JsonData){
			
		$scope.ArrayJobs = [];
		
		for(var i=0; i<JsonData.length;i++){
			
			JsonData[i].Estimated_Date = new Date(JsonData[i].Estimated_Date);	
			
			$scope.ArrayJobs.push(JsonData[i]);
			
			$scope.$apply($scope.ArrayJobs);
		}
		$scope.ArrayJobs = JsonData;
		
		};
		
		var onError = function(JsonData){
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        
    } catch (err) {
        onError(err);
    }
};

$scope.Order = function(Order_Type){
	if ($scope.orderList === Order_Type) {
    var Reverse = Order_Type.charAt(0);
    if (Reverse === '-') {
        $scope.orderList = Order_Type.substr(1);
    } else {
        $scope.orderList = '-' + Order_Type;
    }
	} else {
	    $scope.orderList = Order_Type;
	}
};

   
$scope.Add_Task_In_New_Array = function(Task_Obj){
		
		var obj = {};
		obj.JobID = (new Date().getTime()).toString();
		obj.JobType = Task_Obj.Type;
		obj.JobName = Task_Obj.Name;
		obj.JobDescription = Task_Obj.Description;
		obj.UOM = Task_Obj.UoM;
		obj.Quantity = Task_Obj.Quantity;
		obj.Quantity_Register = 0;
		obj.JobState = "Uninitiated";
		obj.JobInstructions = Task_Obj.Instruction;
		obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
		obj.JobImage = "Funcion de Photos('Task.Photo')";
		obj.JobActions = [];
		if($scope.Array_New_Task){
			$scope.Array_New_Task.push(obj);			
		}else{
			$scope.Array_New_Task = [];
			$scope.Array_New_Task.push(obj);	    
			$scope.$apply($scope.Array_New_Task);
		}
		$scope.Task = {};
};

$scope.Add_In_Array = function(Obj,Array	){
	Array.push(Obj);
};
	
$scope.Save_Edit_Job = function(Obj){
		
		Obj.Jobs = $scope.Array_Task_Edit;
		
		delete Obj.$$hashKey;

		var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': Obj
        };
        
		var onSuccess = function(JsonData){
		$scope.Select_PV();
		};
		var onError = function(JsonData){
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
};
	
$scope.Remove_Task = function(Task){
	
		Array_Remove($scope.ArrayTask,Task);
		$scope.$apply($scope.ArrayTask);
		
};
	
$scope.Remove_In_Array = function(Obj,Array){
	
	Array_Remove(Array,Obj);
	$scope.$apply(Array);
	
};

$scope.Checking_Checkboxes = function(){
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	
	if($scope.Check === false){
	for ( i = 0; i < CheckBoxes_Array.length ; i++ ){
	CheckBoxes_Array[i].checked = true;
	}
	$scope.Check = true;
	}else{
	for ( i = 0; i < CheckBoxes_Array.length ; i++ ){
	CheckBoxes_Array[i].checked = false;
	}
	$scope.Check = false;
	}
};

$scope.Remove_Job = function(){
	
	if(confirm("¿Realmente desea borrar los elementos seleccionados?") == true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked == true){
			Array_Delete_ID.push(CheckBoxes_Array[i].value);
			}
	}
		var JsonData = {
            'Method_Name': 'Delete_Task',
            'Data': array
        };
        
	var onSuccess = function(JsonData){
		$scope.Select_PV();
		};
	
	var onError = function(JsonData){
		console.log(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
};
	
$scope.Visualize_VisitPoint_Import = function(Obj){
   //var x = document.getElementById('Import_Jobs');
     
                $scope.PV = Obj;
                $scope.Array_PV_Task = Obj.Jobs;
              //  x.style.display = 'block';
                $("#Modal_Edit_PV").modal("show"); 
};	
	
$scope.See_Job = function(obj){
		    $scope.Obj_Edit = obj;
             $scope.Array_Task_Edit = obj.Jobs;
             $("#myModal_Db_Edit").modal("show"); 
};
	
$scope.verificar = function(){	
   var x = document.getElementById('Import_Jobs');
   var y = document.getElementById('All_Jobs');
   var z = document.getElementById('myModal_Db_Edit');
            if (x.style.display === 'block') {
                $scope.ArrayExcel = {};
             //   alert("b"+$scope.ArrayExcel);
                y.style.display = 'block';
                x.style.display = 'none';
                z.style.display = 'none';
                }else if(x.style.display === 'none') {
             //   	alert("a");
                y.style.display = 'none';
                x.style.display = 'block';
                z.style.display = 'none';
                }
};

$scope.Add_New_Job = function(New_Job){
		var obj_Job = {};
		obj_Job.VisitPoint = {};
		obj_Job.VisitPoint.IDDelivery_Location = New_Job.IDDelivery_Location;
		obj_Job.VisitPoint.Manager = New_Job.Manager;
		obj_Job.VisitPoint.Name = New_Job.Name;
		obj_Job.VisitPoint.Address = New_Job.Address;
		obj_Job.VisitPoint.TelephoneNumber = New_Job.TelephoneNumber;
		obj_Job.VisitPoint.Mail = New_Job.Mail;
		obj_Job.VisitPoint.State_Visit = "Incompleted";
		obj_Job.VisitPoint.Geolocation = {};
		obj_Job.VisitPoint.Geolocation.Latitude = New_Job.Latitude;
		obj_Job.VisitPoint.Geolocation.Longitude = New_Job.Longitude;
		obj_Job.Collection_Info = {};
		obj_Job.Collection_Info.COLLECTION_NAME = "Store_Jobs";
		obj_Job.Collection_Info.COLLECTION_SCHEMA = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
		obj_Job.Visit_Point_Incidents = [];
		obj_Job.Visit_Point_Incidents_Type = [{"text":"Problemas con la mercaderia.","value":"Mercaderia"},
											  {"text":"Problemas con la ubicación.","value":"Ubicacion"},
											  {"text":"Problemas con el vehículo.","value":"Vehiculo"},
											  {"text":"Problema con Encargado.","value":"Encargado"},
											  {"text":"No Visita.","value":"NoVisito"},
											  {"text":"Otros.","value":"Otros"}];
		obj_Job.Visit_Point_States = [{"name":"Pendiente"},
									  {"name":"En Proceso"},
									  {"name":"Finalizado"},
									  {"name":"Abortado"}];
		obj_Job.Visit_Point_Abort = " var incident = {}; incident.Date = new Date();incident.Description = \"Visita_Abortada\";incident.Detail = \"Visita_Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Geolocation = {};incident.Geolocation.latitude = pos.coords.latitude;incident.Geolocation.longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.VisitPoint.State_Visit = \"Abortado\";return obj;";
		obj_Job.Visit_Point_Confirm = " var incident = {}; incident.Date = new Date();incident.Description = \"Visita_Confirmada\";incident.Detail = \"Visita_Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Geolocation = {};incident.Geolocation.latitude = pos.coords.latitude;incident.Geolocation.longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.VisitPoint.State_Visit = \"Finalizado\";return obj;";
		obj_Job.Sequence = New_Job.Sequence;
		obj_Job.EstimatedDate =New_Job.EstimatedDate;
		obj_Job.EstimatedDeliveryTime = New_Job.EstimatedDeliveryTime;
		obj_Job.User = New_Job.User;
		obj_Job.Transferring_State = "Pending_To_Mobile";
		obj_Job.DeliveryPeriod = {};
		obj_Job.DeliveryPeriod.Start = New_Job.DeliveryPeriod_Start; 
		obj_Job.DeliveryPeriod.End = New_Job.DeliveryPeriod_End;
		obj_Job.Jobs = $scope.Array_New_Task;
		var JsonData = 
				{
					'Method_Name': 'Insert_Job',
					'Data': obj_Job
				};
				var onSuccess = function(JsonData){
				$scope.Select();
				};
				var onError = function(JsonData){
				console.log(JsonData);
				};
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
					
};
	
$scope.Save_Job_Edit = function(Obj){
		var Json = Obj;
		delete Json['$$hashKey'];
		Json.Jobs = $scope.Array_Task_Edit;
		
		var JsonData = 
				{
					'Method_Name': 'Update_Jobs',
					'Data': Json
				};
				var onSuccess = function(JsonData){

				$scope.Select();
				};
				var onError = function(JsonData){
console.log(JsonData);
				};
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
								
};

/*************Exportar de json a excel******************/

$scope.Generar =function(){
	console.log( JSON.stringify($scope.ArrayJobs.Jobs));
	var data = ($scope.ArrayJobs);
        if(data === '')
            return;
        JSONToCSVConvertor(data, "Task Report", true);
};

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
    CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
         //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
             //Now convert each value to string and comma-seprated
            row += index + ',';
        } 
        row = row.slice(0, -1);
         //append Label row with line break
        CSV += row + '\r\n';
    } 
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
       //add a line break after each row
        CSV += row + '\r\n';
    } 
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }  
    //Generate a file name
    var fileName = "Eflow_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/*************Importar de Excel to Json******************/

$scope.Jalar = function(){
      $scope.verificar();
	  var file=document.getElementById("myfile").files[0]; 	
      if( file.type.match(/text\/csv/) || file.type.match(/vnd\.ms-excel/) ){
        //if(file.type.match(/text\/csv/)){
	    	oFReader = new FileReader();
	        oFReader.onloadend = function() {
	        	//console.log(csvJSON(this.result));
	        	var json = csvJSON(this.result);
			$scope.ArrayExcel = JSON.parse(json);
			//alert( JSON.stringify($scope.ArrayExcel) );
  //document.write(json[0]);
	         // var blob = new Blob([json], {type: 'application/json'});
	          // var url = URL.createObjectURL(blob);
	        	//$scope.Jalar(json);
	        	//output.innerHTML = '<a href="'+url+'">JSON file</a>';
		   };
	        oFReader.readAsText(file);
        } else {
        	console.log("This file does not seem to be a CSV.");
        } 
 };
   }); 
   
function csvJSON(csv){
	  var lines=csv.split("\n");
	  var result = [];
	  var headers=lines[0].split(",");
 	  for(var i=1;i<lines.length;i++){
		 var obj = {};
	  	 var currentline=lines[i].split(",");
  		 for(var j=0;j<headers.length;j++){
		  	obj[headers[j]] = currentline[j];
	  	 }
		 result.push(obj);
  	  }
     return JSON.stringify(result); //JSON
}

