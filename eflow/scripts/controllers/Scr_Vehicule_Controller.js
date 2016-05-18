
DTS_APP.controller('Scr_Vehicule_Controller',function($scope){


$scope.init = function() {
		To_Reload_Eflow_Config();
var Headers= 
[{"es":"PLACA","value":"ID_Truck"},
{"es":"MARCA","value":"Brand"},
{"es":"AÑO","value":"Year"},
{"es":"PESO","value":"Weight"},{"es":"VOLUMEN","value":"Cubics"}] ;

	
$scope.ArrayHeaders = Headers;
$scope.Select();
    
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

$scope.Action_Option= function(Option){
	if(Option === "Eliminar"){
		$scope.Delete_Vehicule_DB();
	}
};


$scope.Delete_Vehicule_DB = function(){
	
	if(confirm("¿Realmente desea borrar los elementos seleccionados?") == true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked == true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
	}
		
	
	
	var JsonData = {
            'Method_Name': 'Delete_Vehicule',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		};
	
	var onError = function(JsonData){
		alert(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
};

$scope.Save_Vehicule_Edit = function(Obj){
		var Json = Obj;
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Vehicules',
					'Data': Json
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError = function(JsonData){
			alert(JsonData);
			};
				
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
								
};
	


$scope.Visualize_Vehicule = function(Obj){
	   
   $scope.Vehicule = Obj;
   
   $("#Modal_Edit_Vehicule").modal("show"); 
   
};	
	
$scope.Open_Modal_Add_VisitPoint = function(){
	
	$scope.Vehicule = {};

	$("#Modal_Agregar_Vehicule").modal("show");	
	
};
$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicule',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayVehicule = JsonData;
		$scope.$apply($scope.ArrayVehicule);

		};
		
		var onError = function(JsonData){
		
		alert(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
	
   };
   
  
   

$scope.Delete = function(id){
	try {
    if (confirm("¿Est"+'\u00e1'+" seguro que desea borrar el Vehicule del sistema?") == true) {
       
      var JsonData = {
            'Method_Name': 'Delete_Vehicule',
            'Data':  id.$id
            
        };
		
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
		
		alert(JsonData);
		
		};
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    
	}
   };



$scope.Add_New_Vehicule = function(New_Vehicule){

		var JsonData = 
				{
					'Method_Name': 'Insert_Vehicule',
					'Data': { 
				        	"Company": eflowDTS.Session.Company,
				            "Id_Vehicle": New_Vehicule.Id_Vehicle,
						    "Brand": New_Vehicule.Brand,
						    "Model": New_Vehicule.Model,
						    "Year": New_Vehicule.Year,
						    "Fuel":New_Vehicule.Fuel,
						    "Cylinder_Capacity": New_Vehicule.Cylinder_Capacity,
						    "Transferring_State": "PEND",
						    "ID_Truck": New_Vehicule.ID_Truck,
						    "Weight":New_Vehicule.Weight,
						    "Cubics": New_Vehicule.Cubics,
						    "Description": New_Vehicule.Description
					    }
				};
				var onSuccess = function(JsonData){
				$scope.Select();
				};
				var onError = function(JsonData){
				alert(JsonData);
				};
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
					
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





$scope.Export_File = function(Export_Type,Array_Vehicules){
	
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Vehicules);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Vehicules);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Vehicules);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Vehicules);
			
			break;
		}
	}
	
	
};

function Delete_Attributes(arr){
	
	var Json_Array = arr;
	
	for(var i = 0; i < Json_Array.length; i++){
		
		var Obj = Json_Array[i];
		
		delete Obj._id;
		delete Obj.Company;
		delete Obj.$$hashKey;
		
	}	
	
	return Json_Array;
	
};

function Download_File(contenidoEnBlob, nombreArchivo) {
   
   var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function Generate_XML(arr) {
	
	var datos = arr ; 
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
	texto.push('<Data>\n');
	for(var i = 0; i < datos.length; i++){
		texto.push('<Vehiculos>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		
		texto.push('\t<Id_Vehicle>' + datos[i].Id_Vehicle + '</Id_Vehicle>\n');
		texto.push('\t<Brand>' + datos[i].Brand + '</Brand>\n');
		texto.push('\t<Model>' + datos[i].Model + '</Model>\n');
		texto.push('\t<Year>' + datos[i].Year + '</Year>\n');
		texto.push('\t<Fuel>' + datos[i].Fuel + '</Fuel>\n');
		texto.push('\t<Cylinder_Capacity>' + datos[i].Cylinder_Capacity + '</Cylinder_Capacity>\n');
		texto.push('\t<ID_Truck>' + datos[i].ID_Truck + '</ID_Truck>\n');
		texto.push('\t<Weight>' + datos[i].Weight + '</Weight>\n');
		texto.push('\t<Cubics>' + datos[i].Cubics + '</Cubics>\n');
		texto.push('\t<Description>' + datos[i].Description + '</Description>\n');
		
		texto.push('</Vehiculos>\n');
	}
	texto.push('</Data>\n');
    
    return new Blob(texto, {
        type: 'application/xml'
    });
};


function Export_JSON(arr){
	
	var text = [];
	
	text.push(JSON.stringify(Delete_Attributes(arr)));
    
    var file = new Blob(text, {
        type: 'application/json'
    });
	
	
    Download_File(file, 'Vehiculos.json');

	
};

function Export_XML(arr){
	
	Download_File(Generate_XML(arr), 'Vehiculos.xml');
	
};


function Export_CSV(arr) {
	
    
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
		
      // row += '"Company",';
	   row += '"Id_Vehicle",';
	   row += '"Brand",';
	   row += '"Model",';
	   row += '"Year",';
	   row += '"Fuel",';
	   row += '"Cylinder_Capacity",';
	   row += '"ID_Truck",';
	   row += '"Weight",';
	   row += '"Cubics",';
	   row += '"Description",';
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].Id_Vehicle + '",';
		row += '"' + arrData[i].Brand + '",';
		row += '"' + arrData[i].Model + '",';
		row += '"' + arrData[i].Year + '",';
		row += '"' + arrData[i].Fuel + '",';
		row += '"' + arrData[i].Cylinder_Capacity + '",';
		row += '"' + arrData[i].ID_Truck+ '",';
		row += '"' + arrData[i].Weight + '",';
		row += '"' + arrData[i].Cubics + '",';
		row += '"' + arrData[i].Description + '",';
		row.slice(0, row.length - 1);
       
        CSV += row + '\r\n';
    } 
    
    if (CSV === '') {        
        alert("Invalid data");
        return;
    }  

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = "Vehiculos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function Export_PDF (Arr){
	
 var logo ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0kAAADVCAYAAACCNbvlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGN0NBRTQzODI2MDUxMUU0OERDREExM0FDQTlEREYzQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkVBNUMwRURBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkVBNUMwRERBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQ0VFOTQ5MUFDQ0U0MTFBOTA5RTk1REJGNUE1NEFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3Q0FFNDM4MjYwNTExRTQ4RENEQTEzQUNBOURERjNDIi8+IDwvcmRmOkRlc2NyaXB0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AAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAABEEgAAAAAAAABAJAEAAAAAAAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAACIJAAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAACIJAAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAACIJAAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAAAAkQQAAAAAAAAAEEkAAAAAAAAAAJEEAAAAAAAAABBJAAAAAAAAAACRBAAAAAAAAAAQSQAAAAAAAAAAkQQAAAAAAAAAEEkAAAAAAAAAAJEEAAAAAAAAABBJAAAAAAAAAACRBAAAAAAAAAAQSQAAAAAAAAAAkQQAAAAAAAAAEEkAAAAAAAAAAJEEAAAAAAAAABBJAAAAAAAAAACRBAAAAAAAAACJzP8FGABrtJrolusK6gAAAABJRU5ErkJggg==";
 var ima = "data:image/jpeg;base64,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";
var Compania = eflowDTS.Session.DataCompany;
var columns = [
   		//{title:"Compañia",dataKey:"Company"},
		{title:"Identificador",dataKey:"Id_Vehicle"},
		{title:"Marca",dataKey:"Brand"},
		{title:"Modelo",dataKey:"Model"},
		{title:"Año",dataKey:"Year"},
		{title:"Combustible",dataKey:"Fuel"},
		{title:"Cilindraje",dataKey:"Cylinder_Capacity"},
		{title:"Placa",dataKey:"ID_Truck"},
		{title:"Peso",dataKey:"Weight"},
		{title:"Volumen",dataKey:"Cubics"},
		{title:"Descripción",dataKey:"Description"}];
var rows = [];
for(var i = 0; i < Arr.length; i++){
	   rows.push(Arr[i]);
}	

var doc = new jsPDF('p', 'pt');
   var header = function (data) {
       
doc.setFontType("bold");

doc.addImage(ima, 'JPEG', 20, 20, 90, 90);
    
  
doc.text(320, 70, 'Nombre de la Compañia: '+ Compania.Name);
    
doc.text(320, 80, 'Teléfono: '+ Compania.Phone);
    
doc.text(320, 90, 'Fax: '+ Compania.Fax);
      
doc.text(320, 100, 'Correo Electrónico: '+ Compania.Mail);
    
doc.text(320, 110, 'País: '+ Compania.Country);
      
doc.text(320, 120, 'Ubicación: '+ Compania.Location);

doc.setLineWidth(1);
doc.line(20, 130, 570, 130); 
    };   
    var footer = function (data) {
        var str = "Pag " + data.pageCount;
				doc.addImage(logo, 'JPEG', 280, 800, 90, 30);
        // Total page number plugin only available in jspdf v1.0+
       
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
    };

    var options = {
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 80}
    };
  doc.setFontSize(18);	
  doc.text(230, 160, 'Vehiculos');

  doc.setFontSize(13);
doc.setFontType("normal");

doc.text(420, 50, 'Fecha: '+new Date($scope.Watch).format('dd/mm/yyyy'));

  doc.setFontSize(10);

doc.setTextColor(100);

    doc.autoTable(columns, rows, {startY: 170,
	margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
        bodyStyles: {valign: 'top'},
        columnStyles: {email: {columnWidth: 'wrap'}},
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 80}
    });

        


doc.save('Vehiculos.pdf');
  
};





});




