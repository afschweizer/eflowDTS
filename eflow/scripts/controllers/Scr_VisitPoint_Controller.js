var map;
DTS_APP.controller('Scr_VisitPoint_Controller',function($scope) {

	$scope.init = function(){
       	Set_Current_Page();
		
		//$scope.Polygon = {}; 
		$('#Charging').modal('show');
		$scope.Show_Components.VisitPoint_Form = true;
		//To_Reload_Eflow_Config();
		Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");		
		Load_Map_Init();
		$scope.ArrayRoute = [];
		var Headers= [{"es":"NOMBRE","value":"Name"},{"es":"CEDULA JURIDICA","value":"Legal_Cedula"},
		{"es":"SECTOR","value":"Route"},{"es":"DIRECCION","value":"Address"},
		{"es":"ENCARGADO","value":"Manager"},{"es":"CORREO","value":"Mail"}] ;
		$scope.ArrayHeaders = Headers;		
		$scope.Select();				
		$scope.Show_Components.VisitPoint_Table = false;
		$scope.Show_Components.VisitPoint_Add = true;
		$scope.Show_Components.Export = true;
		Select_Routes();
	};
	
	function Load_Map_Init(){
		var div = document.getElementById('Map_Dashboard_VisitPoint');
		if(div){
		map = new GMaps({
			div:div,
			lat:eflowDTS.Geolocation.Latitude,
			lng:eflowDTS.Geolocation.Longitude,
			zoom :14,
			click:function(e){
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Estas coordenadas no pertenecen a la ruta especificada",
					buttons:{
						main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
					}
				});
			},
			tilesloaded: function(e){
			  $scope.Show_Components.VisitPoint_Form = false;
			  $scope.Show_Components.VisitPoint_Table = true;
			  GMaps.off('tilesloaded',map);
			  setTimeout(function(){
	                	$('#Charging').modal('hide');
	                	}, 3000);
		    }
    	});
    }
	};	

   $scope.Print_Zone = function(Obj){   	
   		map.removePolygons();
		map.drawPolygon({
		   paths: Obj.Route_Path, // pre-defined polygon shape
		   strokeColor: '#BBD8E9',
		   strokeOpacity: 1,
		   strokeWeight: 3,
		   fillColor: '#BBD8E9',
		   fillOpacity: 0.4,
		   click: function(e) {
              $scope.VisitPoint.Latitude = e.latLng.lat();
			  $scope.VisitPoint.Longitude = e.latLng.lng();
			  GMaps.geocode({'latLng': {lat: e.latLng.lat(), lng: e.latLng.lng()},'callback':function(results, status) {
    if (status === "OK") {
	$scope.VisitPoint.Country = results[results.length-1].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.Province = results[results.length-2].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.Canton = results[results.length-3].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.District= results[results.length-4].formatted_address.split(',', 1)[0];
      }
  }});
  
			  map.removeMarkers();
			  map.addMarker({
			  lat: e.latLng.lat(),
			  lng: e.latLng.lng()			 
              });
            }
		});
		map.setCenter(Obj.Route_Path[0][0],Obj.Route_Path[0][1]);
   };

function Select_Routes(){
	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Route',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            }
        };
		var onSuccess = function(JsonData){		
		$scope.ArrayRoute = JsonData;		
		};		
		var onError = function(JsonData){		
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);        
    } catch (err) {
        alert(err);
    }	
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

$scope.Load_New_Visit_Point = function(){
	$scope.VisitPoint = {};
	map.removePolygons();
	map.removeMarkers();	
};

$scope.Save_Visit_Point = function(VP){
if(VP.Latitude === "" || typeof VP.Latitude === 'undefined' || VP.Longitude === "" || typeof VP.Longitude === 'undefined'){
   		bootbox.dialog({
   			title : "¡Alerta!",
   			message : "Debe ingresar todos los campos",
   			buttons :{
	   				main:{
	   					label:'¡OK!',
	   					className:'btn-primary'
	   					}
   			    }
   		  });
   	}else{
		if(typeof VP._id === 'undefined'){
			VP.Route = {};
			VP.Route.Route_Name = $scope.Route.Route_Name;
			VP.Route.ID_Route = $scope.Route.ID_Route;
			VP.Company = eflowDTS.Session.Company;
			var JsonData = {
				'Method_Name': 'Insert_Visit_Point',
				'Data': [VP]
			};//Insert
			var onSuccess = function(e){								
				$scope.Show_Components.VisitPoint_Form = false;
				$scope.Show_Components.VisitPoint_Table = true;
				$scope.Show_Components.VisitPoint_Add = true;
				$scope.Show_Components.Export = true;
				$scope.Select();
				bootbox.dialog({
   				title:"¡Alerta!",
   				message:"El establecimiento ha sido creado",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			    });
				};
		}else{
			VP.Route.Route_Name = $scope.Route.Route_Name;
			VP.Route.ID_Route = $scope.Route.ID_Route;
			delete VP.Pais;		
			delete VP.Provincia;		
			delete VP.Distrito;
			var JsonData = {
				'Method_Name': 'Update_Visit_Point',
				'Data': VP
			};//Insert
			var onSuccess = function(e){								
				$scope.Show_Components.VisitPoint_Form = false;
				$scope.Show_Components.VisitPoint_Table = true;
				$scope.Show_Components.VisitPoint_Add = true;
				$scope.Show_Components.Export = true;
				$scope.Select();
				bootbox.dialog({
   				title:"¡Alerta!",
   				message:"El establecimiento ha sido modificado",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			    });
				};//Update
		}
			var onError = function(JsonData){
			};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
		}	
};

$scope.Delete = function(id){
	try {
		var onSuccess = function(result){
    if (result === true) {
      var JsonData = {
            'Method_Name': 'Delete_Visit_Point',
            'Data':  id.$id
        };
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
		
		console.log(JsonData);
		
		};
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    };
    
    bootbox.confirm("¿Est"+'\u00e1'+" seguro que desea borrar el Punto de Visita del sistema?",onSuccess);
    
    
    } catch (err) {
            onError(err);
    }
   };

$scope.Select = function(){

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
		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
	
   };
   
$scope.Visualize_Visit_Point = function(Obj){
	   
   $scope.VisitPoint = Obj;   
   $scope.Show_Components.VisitPoint_Form = true;
   $scope.Show_Components.VisitPoint_Table = false;
   $scope.Show_Components.VisitPoint_Add = false;
   $scope.Show_Components.Export = false;
   map.removePolygons();
   map.removeMarkers();
   map.addMarker({
	 lat: parseFloat(Obj.Latitude),
	 lng: parseFloat(Obj.Longitude)			 
   });
   Check_Route(Obj.Route); 
};	
 
 function Check_Route(Route){
 	
	 if($scope.ArrayRoute.length > 0){		
		for(var i = 0; i < $scope.ArrayRoute.length; i++){				
			if($scope.ArrayRoute[i].Route_Name === Route.Route_Name){										
					$scope.Route = $scope.ArrayRoute[i]; 
					$scope.Print_Zone($scope.ArrayRoute[i]);				
			}				
		}				 
	 }	 	 
 };


$scope.Save_Visit_Point_Edit = function(Obj){
		var Json = Obj;
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Visit_Point',
					'Data': [Json]
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError = function(JsonData){
			console.log(JsonData);
			};
				
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
								
};
	
   
$scope.Delete_Visit_Point_DB = function(){
	
		
	var onSuccess = function(result){
	
	if(result === true){
		
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
            'Method_Name': 'Delete_Visit_Point',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(JsonData){
		$scope.Show_Actions = false;
		$scope.Select();
		};
	
	var onError = function(JsonData){
		console.log(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError); 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess);
	 
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
		$scope.Delete_Visit_Point_DB();
	}
};




$scope.Export_File = function(Export_Type,Array_VisitPoints){
	
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_VisitPoints);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_VisitPoints);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_VisitPoints);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_VisitPoints);
			
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
		texto.push('<Establecimientos>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<ID_Location>' + datos[i].ID_Location + '</ID_Location>\n');
		texto.push('\t<Manager>' + datos[i].Manager + '</Manager>\n');
		texto.push('\t<Name>' + datos[i].Name + '</Name>\n');
		texto.push('\t<Legal_Cedula>' + datos[i].Legal_Cedula + '</Legal_Cedula>\n');
		texto.push('\t<Address>' + datos[i].Address + '</Address>\n');
		texto.push('\t<Telephone_Number>' + datos[i].Telephone_Number + '</Telephone_Number>\n');
		texto.push('\t<Mail>' + datos[i].Mail + '</Mail>\n');
		texto.push('\t<Latitude>' + datos[i].Latitude + '</Latitude>\n');
		texto.push('\t<Longitude>' + datos[i].Longitude + '</Longitude>\n');
		texto.push('\t<ID_Route>' + datos[i].Route.ID_Route + '</ID_Route>\n');
		texto.push('\t<Route_Name>' + datos[i].Route.Route_Name + '</Route_Name>\n');
		
		texto.push('</Establecimientos>\n');
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
	
	
    Download_File(file, 'Establecimientos.json');

	
};

function Export_XML(arr){
	
	Download_File(Generate_XML(arr), 'Establecimientos.xml');
	
};


function Export_CSV(arr) {
	
    
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
      // row += '"Company",';
	   row += '"ID_Location",';
	   row += '"Manager",';
	   row += '"Name",';
	   row += '"Legal_Cedula",';
	   row += '"Address",';
	   row += '"Telephone_Number",';
	   row += '"Mail",';
	   row += '"Latitude",';
	   row += '"Longitude",';
	   row += '"ID_Route",';
	   row += '"Route_Name",';
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].ID_Location + '",';
		row += '"' + arrData[i].Manager + '",';
		row += '"' + arrData[i].Name + '",';
		row += '"' + arrData[i].Legal_Cedula + '",';
		row += '"' + arrData[i].Address + '",';
		row += '"' + arrData[i].Telephone_Number + '",';
		row += '"' + arrData[i].Mail + '",';
		row += '"' + arrData[i].Latitude+ '",';
		row += '"' + arrData[i].Longitude + '",';
		row += '"' + arrData[i].Route.ID_Route + '",';
		row += '"' + arrData[i].Route.Route_Name + '",';
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
    link.download = "Establecimientos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function Export_PDF (Arr){
	
 var logo ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0kAAADVCAYAAACCNbvlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGN0NBRTQzODI2MDUxMUU0OERDREExM0FDQTlEREYzQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkVBNUMwRURBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkVBNUMwRERBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQ0VFOTQ5MUFDQ0U0MTFBOTA5RTk1REJGNUE1NEFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3Q0FFNDM4MjYwNTExRTQ4RENEQTEzQUNBOURERjNDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VfLbVwAAUolJREFUeNrsnQd8FMUXx2cvjdCbgNQAUcAGYgORoiLSxN5RAfGPgmJBsWIBFbH3ioIIiqiIBex0BEQRaYIECL33ENJu9//e3dxl73JbrueS39fPeOF2b8vs7Mz8Zt68p2