DTS_APP.controller('Scr_VisitPoint_DB_Controller',function($scope) {
 
$scope.init = function(){
	try{
       	Set_Current_Page();
	 
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
	//$scope.Show_Quantity=true;
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
           $scope.Show_Select_Vehicule = false;
	    $scope.Array_Serials =  [];
        $scope.Check = false;
        $scope.Date = new Date(eflowDTS.Session.Calendar_Date);
		$scope.Headers = [{"es":"NOMBRE","value":"Name"},
		{"es":"VEHICULO","value":"ID_Truck"},{"es":"USUARIO","value":"User"},
		{"es":"SECTOR","value":"Route"},{"es":"SECUENCIA","value":"Sequence"},
		{"es":"DURACION","value":"Estimated_Delivery_Time"}];
		$scope.ArrayStatus =[{"ID":"Partial","Name":"Parcialmente Finalizado"},{"ID":"In_Process","Name":"En Proceso"},
		{"ID":"Aborted","Name":"Abortado"},{"ID":"Finalized","Name":"Finalizado"},{"ID":"Unassigned","Name":"No Asignado"}];
		var Unity= [{"es":"Unidad","value":"Unidad"},{"es":"Caja","value":"Caja"},
		{"es":"Paquete","value":"Paquete"},{"es":"Bulto","value":"Bulto"}] ;
		$scope.ArrayUnidads = Unity;	
		$scope.Select_VisitPoint();
		$scope.Select_Local();
		$scope.Select_User();
		$scope.Select_Vehicle();
		clearInterval(myVar);
    
   var myVar = setInterval(function() {   	
       $scope.Select_VisitPoint();
    }, 120000);
    
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
	
	
	
	$scope.Add_Serial =function(value){try{
	    if(value===""||value===undefined){
	    	alert("Debe de ingresar una serie");	
	    	
	    	}
		else{
			existe=false;
			for (var i=0; i<  $scope.Array_Serials.length;i++){
				if( $scope.Array_Serials[i].Serial===value)	{
					existe=true;
					break;
				}			
			}	
			if(existe===true){
				alert("La serie que ha ingresado ya fue ingresada");
			}
			else{
			   var obj_serials={};
			   obj_serials.Serial = value;
				$scope.Array_Serials.push(obj_serials);
				document.getElementById("Input_Serial").value="";
			}
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_Serial",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
			
 $scope.Show_Serial = function(Value) {try{
      if (Value.Serial ==="SP"){
           $scope.Show_Serie=true;
		   $scope.Show_Quantity=false;
      }else{
           $scope.Show_Serie=false;
      } 
      if (Value.Serial ==="SS"){
           $scope.Show_Code=true;
           $scope.Show_Quantity=true;
      }else{
           $scope.Show_Code=false;
      } 
      if (Value.Serial ==="SU"){
           $scope.Show_Quantity=true;
      }

		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Show_Serial",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
	$scope.Select_Local= function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Visit_Point',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayVisitPoint = JsonData;
		$scope.$apply($scope.ArrayVisitPoint);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Filter_License = function(ID){
try{
for(var j = 0; j <$scope.ArrayUser.length; j++){
	if($scope.ArrayUser[j].ID === ID){
		var User = $scope.ArrayUser[j];
		break;
	}
}
$scope.Show_Select_Vehicule = true;
$scope.ArrayVehicle_Filter = [];

for(var x = 0; x < $scope.ArrayVehicle.length; x++){
    for(var y = 0; y < $scope.ArrayVehicle[x].License.length; y++){
         for(var z = 0; z < User.License.length; z++){
                    if($scope.ArrayVehicle[x].License[y] === User.License[z]){
                        if($scope.ArrayVehicle_Filter.indexOf($scope.ArrayVehicle[x]) === -1){
                            $scope.ArrayVehicle_Filter.push($scope.ArrayVehicle[x]);
                           }
                        break;
                    }         
         }
     }

}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Filter_License",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

	
 $scope.See_Status=function(status){
 	try{
	$scope.Status_Filter=status;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "See_Status",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Checking_Checkboxes_Check = function(){
	try{
	$scope.Show_Actions = false;
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Checking_Checkboxes_Check_Master = function(master){
	try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check_Master",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};


$scope.Action_Option= function(Option){try{
	if(Option === "Cambiar"){
		$scope.Open_Modal_Change();
	}	
	if(Option === "Eliminar"){
		$scope.Delete_Job_DB();
	}
	if(Option === "Estados"){
		$scope.Open_Modal_Change_Status();
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Action_Option",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
 $scope.Info_Vehicle = function(Vehicle,ArrayVehicle){
	try{for ( i = 0; i < ArrayVehicle.length ; i++ ){
      if(Vehicle === ArrayVehicle[i].ID_Truck){
		$scope.ObjVeh = {};
		$scope.ObjVeh.Description = ArrayVehicle[i].Description;
		$scope.ObjVeh.Weight = ArrayVehicle[i].Weight;
		$scope.ObjVeh.Cubics = ArrayVehicle[i].Cubics;
      }     
   } 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Info_Vehicle",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Select_User = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company,
    			"Type": "Conductor"
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);
		}
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};



$scope.Select_Vehicle = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayVehicle = JsonData;
		$scope.$apply($scope.ArrayVehicle);
		}
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

function Change_Structure(arr){
	try{
	var NewArray = [];
	
	for(var i = 0; i < arr.length; i++){
	
	var obj = {};
	var y = arr[i];

	obj.Order_Number = 1455667200000+i;
	obj.ID_Location = y.VisitPoint.IDDelivery_Location;
	obj.Name = y.VisitPoint.Name;
	obj.Address = y.VisitPoint.Address;
	obj.Manager = y.VisitPoint.Manager;
	obj.Telephone_Number = y.VisitPoint.TelephoneNumber;
	obj.Mail = y.VisitPoint.Mail;
	obj.Latitude = y.VisitPoint.Geolocation.Latitude;
	obj.Longitude = y.VisitPoint.Geolocation.Longitude;
	obj.Estimated_Date = (new Date("2016-02-01").getTime()) + eflowDTS.Time.Difference;
	obj.Control.Creation_Date = new Date().getTime();
	obj.Control.Created_User = eflowDTS.Session.UserName;
	obj.Delivery_Period_Start = y.DeliveryPeriod.Start;
	obj.Delivery_Period_End = y.DeliveryPeriod.End;
	obj.Estimated_Delivery_Time = y.EstimatedDeliveryTime;
	obj.Sequence = y.Sequence;
	obj.User = y.User;
	obj.ID_Truck = new Date().getTime();
	obj.Visit_State = y.VisitPoint.State_Visit;
	obj.Transferring_State = "Pending_To_Mobile";
	obj.Invoice = new Date().getTime();
	obj.Collection_Info = {};
	obj.Collection_Info.Collection_Name = "Store_Jobs";
	obj.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
	obj.Visit_Point_Incidents = [];
	obj.Visit_Point_Incidents_Type = y.Visit_Point_Incidents_Type;
	obj.Visit_Point_States =  [
        {
            "name": "Pendiente", "value":"Pending"
        },
        {
            "name": "En Proceso", "value":"In_Process"
        },
        {
            "name": "Finalizado",
			"value":"Finalized"
        },
        {
            "name": "Abortado", "value":"Aborted"
        }
    ];
	obj.Visit_Point_Abort = " var incident = {}; incident.Date = eflowDTS_lib.GetServerTime().toString(); incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
	obj.Visit_Point_Confirm = " var incident = {}; incident.Date = eflowDTS_lib.GetServerTime().toString(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
	
	obj.Company	= eflowDTS.Session.Company;	
	obj.Jobs = [];
	for(var j = 0; j < arr[i].Jobs.length; j++){
		
		var x = {};
		var w = arr[i].Jobs[j];
		x.JobID = new Date().getTime()+j*2/i;
		x.JobType = w.JobType;
		x.JobName = w.JobName;
		x.JobDescription= w.JobDescription;
		x.JobInstructions = w.JobInstructions;
		x.BarCode = new Date().getTime();
		x.UOM = w.UOM;
		x.Quantity = w.Quantity;
		x.JobWeight = 10-j+i;
		x.JobCubics = 150+i-j;
		x.Quantity_Register = 0;
		x.JobState = w.JobState;
		x.JobValidator = w.JobValidator;
		x.JobActions = [];	
		obj.Jobs.push(x);
	
	}
	NewArray.push(obj);
	
	}
  var JsonData = {
            'Method_Name': 'Insert_Job',
            'Data': NewArray
        };
		var onSuccess = function(JsonData){
		
				alert("Hecho");
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Change_Structure",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		console.log(JsonData);
		};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Change_Structure",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
	
$scope.Select_VisitPoint = function(){
	try {
		
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company,
            	"Estimated_Date":  eflowDTS.Session.Calendar_Date
            },
            'Fields':{
            	
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayJobs = JsonData;
		//Change_Structure(JsonData);
		};
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		console.log(JsonData);
		};
	    Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Export_File = function(Export_Type,Array_Jobs){
	try{
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Jobs);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Jobs);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Jobs);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Jobs);
			
			break;
		}
	}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_File",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

function Export_PDF (Arr){
	/*
var pdf = new jsPDF('p', 'pt', 'letter');
var source = $('#Table_VisitPoint_DB')[0];

var margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
  	source // HTML string or DOM elem ref.
  	, margins.left // x coord
  	, margins.top // y coord
  	, {
  		'width': margins.width // max width of content on PDF
  	},
  	function (dispose) {
  	  // dispose: object with X, Y of the last line add to the PDF
  	  //          this allow the insertion of new lines after html
        pdf.save('Punto_de_visita.pdf');
      }
  )	*/
	try{
	
	var onSucces_Img1 = function(img1){

var logo = img1;

var onSucces_Img2 = function(img2){

var ima = img2;

var Compania = eflowDTS.Session.DataCompany;
var columns = [
    {/*title: "Gerente", dataKey: "Manager"},
    {title: "Nombre", dataKey: "Name"}, 
    {title: "Dirección", dataKey: "Address"},
    {title: "Telefono", dataKey: "Telephone_Number"},
    {title: "Vehiculo", dataKey: "ID_Truck"},
    {title: "Usuario", dataKey: "User"}, 
    {title: "Correo", dataKey: "Mail"}
];*/
title:"NOMBRE",dataKey:"Name"},
		{title:"VEHICULO",dataKey:"ID_Truck"},
		{title:"USUARIO",dataKey:"User"},
		{title:"SECUENCIA",dataKey:"Sequence"},
		{title:"DURACION",dataKey:"Estimated_Delivery_Time"}];
var rows = [];

for(var i = 0; i < Arr.length; i++){
		/*if($scope.ArrayJobs[i].Visit_State==="Partial"){
			doc.setTextColor(0,255,0);			
		}if($scope.ArrayJobs[i].Visit_State==="In_Process"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Aborted"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Finalized"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Unassigned"){
			doc.setTextColor(255,0,0);			
		}*/
		rows.push(Arr[i]);
		}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
       
  doc.setFontSize(18);	
  doc.text(420, 160, 'Puntos de Visita');

  doc.setFontSize(13);
doc.setFontType("normal");

doc.text(420, 50, 'Fecha: '+new Date($scope.Date).format('dd/mm/yyyy'));

  doc.setFontSize(10);

doc.setTextColor(100);

doc.setFontType("bold");

doc.addImage(ima, 'JPEG', 20, 20, 150, 90);
    
doc.text(420, 70, 'Nombre de la Compañia: '+ Compania.Name);
    
doc.text(420, 80, 'Teléfono: '+ Compania.Phone);
    
doc.text(420, 90, 'Fax: '+ Compania.Fax);
      
doc.text(420, 100, 'Correo Electrónico: '+ Compania.Mail);
    
doc.text(420, 110, 'País: '+ Compania.Country);
      
doc.text(420, 120, 'Ubicación: '+ Compania.Location);

doc.setLineWidth(1);
doc.line(20, 130, 800, 130); 
    };   
    var footer = function (data) {
        var str = "Pag " + data.pageCount;
				doc.addImage(logo, 'JPEG', 420, 550, 90, 30);
        // Total page number plugin only available in jspdf v1.0+
       
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
    };

    var options = {
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 80}
    };

    doc.autoTable(columns, rows, {startY: 170,
	margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
        bodyStyles: {valign: 'top'},
        columnStyles: {email: {columnWidth: 'wrap'}},
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 180}
    });

doc.save('Puntos_de_Visita.pdf');
  

};
Image_To_Base64("images/ima.png",onSucces_Img2);

};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_PDF",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};


$scope.To_Order_By = function(Order_Type){
	try{
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

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "To_Order_By",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Visualize_VisitPoint = function(Obj){
	try{
		for(var i = 0; i < Obj.Jobs.length; i++){
			if(Obj.Jobs[i].JobType === "delivery"){
				Obj.Jobs[i].JobTypeEs = "Entrega";
			}else{
			  Obj.Jobs[i].JobTypeEs = "Recolección";
			}
		}
		
   $scope.Show_Select_Vehicule = true;
   $scope.VisitPoint = Obj;
   $scope.VisitPoint.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
   $scope.Array_VisitPoint_Task_Edit = Obj.Jobs;
   $scope.VisitPoint_Add_Task_Edit = {};
   $("#Modal_Edit_VisitPoint").modal("show"); 
   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Visualize_VisitPoint",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Save_Job_Edit = function(Obj){
		try{
		var Json = Obj;
		
	
Json.Control.Modification_Date = new Date().getTime();
Json.Control.Modify_User= eflowDTS.Session.UserName;
		Json.Estimated_Date = new Date(Obj.Estimated_Date).getTime() + eflowDTS.Time.Difference;
		
			if(Json.Visit_State === "Unassigned"){	
				if(Json.ID_Truck==null || Json.ID_Truck==undefined||Json.User==null || Json.User==undefined)
			    {
				    Json.Visit_State = "Unassigned";
				}
				else{
					Json.Visit_State = "In_Process";
				}
		   }
		   
		 if(Json.Visit_State === "Aborted"){
		 	
		   	Json.Visit_State = "In_Process";
		 }
		 
		   if(Json.ID_Truck==null || Json.ID_Truck==undefined||Json.User==null || Json.User==undefined)
			    {
				    Json.Visit_State = "Unassigned";
				}
		
		delete Json['$$hashKey'];
		
		Json.Jobs = $scope.Array_VisitPoint_Task_Edit;
		delete Json.Jobs ['$$hashKey'];
		
		var JsonData = 
				{
					'Method_Name': 'Update_Jobs',
					'Data': Json
				};
				
		var onSuccess = function(JsonData){
			$scope.Select_VisitPoint();
			};
				
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Save_Job_Edit",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
			console.log(JsonData);
			};
				
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
								

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Save_Job_Edit",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
	
$scope.Remove_In_Array = function(Obj,Array){
	try{
	Array_Remove(Array,Obj);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Remove_In_Array",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Checking_Checkboxes = function(){
	try{
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

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};

$scope.Delete_Job_DB = function(){
	try{
	var Success = function(result){
	
	if(result === true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked == true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			