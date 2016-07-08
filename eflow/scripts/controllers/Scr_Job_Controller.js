DTS_APP.controller('Scr_Job_Controller',function($scope) {


$scope.init = function() {
	
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
var HeadersEs = ["Identificación Lugar De Entrega","Gerente","Nombre","Dirección","Número De Teléfono",
"Correo","Latitud","Longitud","Secuencia","Fecha Estimada","Tiempo Estimado De Entrega",
"Ventana de entrega Inicio","Ventana de entrega finalicacion","Usuario"] ;
$scope.ArrayHeadersEs = HeadersEs;

var Headers = ["IDDelivery_Location","Manager","Name","Address","Telephone_Number","Mail",
"Latitude","Longitude", "Sequence","Estimated_Date","Estimated_Delivery_Time","Start","End","User"];
$scope.ArrayHeaders = Headers;

};	

	$scope.Add_Task = function(Task_Obj){
		
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
		
		if($scope.ArrayTask){
			$scope.ArrayTask.push(obj);			
		}else{
			$scope.ArrayTask = [];
			$scope.ArrayTask.push(obj);	
			$scope.$apply($scope.ArrayTask);
		}
		
		$scope.Task = {};
		
	};


	$scope.Remove_Task = function(Task){
		
		Array_Remove($scope.ArrayTask,Task);
		
		$scope.$apply($scope.ArrayTask);
	};


	$scope.Remove_Job = function(obj){
		
		Array_Remove($scope.ArrayExcel,obj);
		
		$scope.$apply($scope.ArrayExcel);
	};

	$scope.Add_Job = function(Job_Form){
		
		
		var obj_Job = {};
		
		obj_Job.VisitPoint = {};
		obj_Job.VisitPoint.IDDelivery_Location = "";
		obj_Job.VisitPoint.Manager = Job_Form.Manager;
		obj_Job.VisitPoint.Name = Job_Form.Name;
		obj_Job.VisitPoint.Address = Job_Form.Address;
		obj_Job.VisitPoint.TelephoneNumber = Job_Form.TelephoneNumber;
		obj_Job.VisitPoint.Mail = Job_Form.Mail;
		obj_Job.VisitPoint.State_Visit = "Incompleted";
		obj_Job.VisitPoint.Geolocation = {};
		obj_Job.VisitPoint.Geolocation.Latitude = Job_Form.Latitude;
		obj_Job.VisitPoint.Geolocation.Longitude = Job_Form.Longitude;
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
		obj_Job.Sequence = Job_Form.Sequence;
		obj_Job.EstimatedDate = Job_Form.EstimatedDate;
		obj_Job.User = Job_Form.User;
		obj_Job.Transferring_State = "Sync_With_Mobile";
		obj_Job.DeliveryPeriod = {};
		obj_Job.DeliveryPeriod.Start = Job_Form.DeliveryPeriod_Start; 
		obj_Job.DeliveryPeriod.End = Job_Form.DeliveryPeriod_End;
		obj_Job.Jobs = $scope.ArrayTask;
		
		
		
	};














/*************Importar de Excel to Json******************/


 $scope.Jalar = function(){
var file=document.getElementById("myfile").files[0]; 	
if( file.type.match(/text\/csv/) || file.type.match(/vnd\.ms-excel/) ){
        //if(file.type.match(/text\/csv/)){
	    	oFReader = new FileReader();
	        oFReader.onloadend = function() {
	        	//console.log(csvJSON(this.result));
	        	var json = csvJSON(this.result);
			$scope.ArrayExcel = JSON.parse(json);
  //document.write(json[0]);
	         // var blob = new Blob([json], {type: 'application/json'});
	          // var url = URL.createObjectURL(blob);
	        	//$scope.Jalar(json);
	        	//output.innerHTML = '<a href="'+url+'">JSON file</a>';
		   };
	        oFReader.readAsText(file);
        } else {
        	alert("This file does not seem to be a CSV.");
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

