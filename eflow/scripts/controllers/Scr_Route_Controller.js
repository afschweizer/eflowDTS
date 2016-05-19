DTS_APP.controller('Scr_Route_Controller',function($scope) {


$scope.init = function(){
	Load_Map();
	$scope.Show_Components.Route_Form = false;
	$scope.Show_Components.Route_Table = true;
	$scope.Show_Components.Route_Add = true;
	$scope.Route = {};
	$scope.Check = false;
    To_Reload_Eflow_Config();
    
    var Headers= [{"es":"NOMBRE","value":"Route_Name"},{"es":"IDENTIFICADOR","value":"ID_Route"},
	{"es":"DESCRIPCION","value":"Route_Description"}] ;
	$scope.ArrayHeaders = Headers;
	$scope.Array_Route = [];
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

$scope.Load = function(){
	
	Load_Map();	
	$scope.Route = {};
	
};

$scope.Visualize_Route = function(Obj){
	
	$scope.Show_Components.Route_Form = true;
	$scope.Show_Components.Route_Table = false;
	$scope.Show_Components.Route_Add = false;
	Load_Map();
	$scope.Route = Obj;
	$scope.Array_Route = Obj.Route_Path;
		
	$scope.Print_Zone();
	
	
	
};

$scope.Select = function(){

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
		$scope.$apply($scope.ArrayRoute);

		};
		
		var onError = function(JsonData){
		
		alert(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        
    } catch (err) {
        onError(err);
    }
	
   };
   
     function Load_Map(){
   	
      //if(navigator.geolocation){
   		
   		//var onSuccess = function(pos){
   		
   		var map = document.getElementById('Map_Dashboard_Route');
   			map.style.height = 100;
   			map.style.width = 100;
   		if(map){

   			eflowDTS.Map_Dashboard = new GMaps({
			div: map,
		    lat: eflowDTS.Geolocation.Latitude, 
			lng: eflowDTS.Geolocation.Longitude,
		    zoom: 12
		    });
		    
		   	eflowDTS.Map_Dashboard.setContextMenu({
				  control: 'map',
				  options: [{
				    title: 'Agregar Vértice',
				    name: 'Add_Vertex',
				    action: function(e) {				    	
				    var coor = [];				    
				    coor.push(e.latLng.lat());
				    coor.push(e.latLng.lng());					    
				    $scope.Array_Route.push(coor);				    
				      this.addMarker({
				        lat: e.latLng.lat(),
				        lng: e.latLng.lng(),
				        title: 'Vértice',
				        icon: 'images/Point_Blue.png'
				      });
				    }
				  }, {
				    title: 'Centrar aquí',
				    name: 'Center_here',
				    action: function(e) {
				      this.setCenter(e.latLng.lat(), e.latLng.lng());
				    }
				  }]
				});
		   			
   		}
   		
   		/*};
   		
   		
   		var onError = function(err) {
  			alert('ERROR(' + err.code + '): ' + err.message);
        };

 		navigator.geolocation.getCurrentPosition(onSuccess,onError);
   		
   	}else{  		 		
   		
   		bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Su navegador no soporta Geolocalization",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
     	}*/
   	
   };
   
   $scope.Action_Option= function(Option){
	if(Option === "Eliminar"){
		$scope.Delete_Route_DB();
	}
};
   
   $scope.Delete_Route_DB = function(){
	
		
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
            'Method_Name': 'Delete_Route',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		$scope.Show_Actions = false;
		};
	
	var onError = function(JsonData){
		alert(JsonData);
		};
		
	 Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess);
	 
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
		
		alert(JsonData);
		
		};
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    };
    
    bootbox.confirm("¿Est"+'\u00e1'+" seguro que desea borrar el Punto de Visita del sistema?",onSuccess);
    
    
    } catch (err) {
            onError(err);
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

   $scope.Print_Zone = function(){   	
   	
   var path = $scope.Array_Route;

   eflowDTS.Map_Dashboard.drawPolygon({
   paths: path, // pre-defined polygon shape
   strokeColor: '#BBD8E9',
   strokeOpacity: 1,
   strokeWeight: 3,
   fillColor: '#BBD8E9',
   fillOpacity: 0.6
   });
   	
   };
   
   $scope.Delete_Zone = function(){
   	
     $scope.Array_Route = [];	
     Load_Map();
   	 
   };
   
   $scope.Save_Route = function(Route){
   	
   	if(Route.Name === "" || Route.ID === "" || Route.Description === "" || $scope.Array_Route.length === 0){
   		
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
   		
   if(typeof Route._id === 'undefined'){
   	
     	var Obj = {};
   		Obj.Route_Name = Route.Route_Name;
   		Obj.ID_Route = Route.ID_Route;
   		Obj.Route_Description = Route.Route_Description;
   		Obj.Company = eflowDTS.Session.Company;
   		Obj.Route_Path = $scope.Array_Route;
   		
   		var JsonData = {
   			'Method_Name':'Insert_Route',
   			'Data':[Obj]			
   		};
   		
   		var OnError = function(e){};
   		
   		var OnSuccess = function(json){
   			
   			$scope.Route = {};
   			$scope.Array_Route = [];
   			$scope.Show_Components.Route_Form = false;
   			$scope.Select();
   			$scope.Show_Components.Route_Add = true;
   			$scope.Show_Components.Route_Table = true ;
   			bootbox.dialog({
   				title:"¡Alerta!",
   				message:"La ruta ha sido creada",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			});
   			
   		};
   		
   		}else{
   			
   		var Obj = Route;
		Obj.Route_Path = $scope.Array_Route;
   		
   		delete Obj['$$hashKey'];
   		
   		var JsonData = {
   			'Method_Name':'Update_Route',
   			'Data':Obj   			
   		};
   		
   		var OnError = function(e){
   			
   		};
   		
   		var OnSuccess = function(json){
   			
   			$scope.Route = {};
   			$scope.Array_Route = [];
   			bootbox.dialog({
   				title:"¡Alerta!",
   				message:"La ruta ha sido modificada",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			});
   			
   			$scope.Show_Components.Route_Form = false;
   			$scope.Select();
   			$scope.Show_Components.Route_Table = true ;
   			$scope.Show_Components.Route_Add = true;
   			
   		};	
   			
   		}
   		
   		Send_JSON(eflowDTS.Configuration.URLs.eflow_Post,JsonData,OnSuccess,OnError);
   		
   		
   	}
   	
   };
   

$scope.Export_File = function(Export_Type,Array_Routes){
	
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Routes);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Routes);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Routes);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Routes);
			
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
		texto.push('<Rutas>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<Route_Name>' + datos[i].Route_Name + '</Route_Name>\n');
		texto.push('\t<ID_Route>' + datos[i].ID_Route + '</ID_Route>\n');
		texto.push('\t<Route_Description>' + datos[i].Route_Description + '</Route_Description>\n');
		texto.push('\t<Route_Path>' + datos[i].Route_Path + '</Route_Path>\n');
		
		
		texto.push('</Rutas>\n');
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
	
	
    Download_File(file, 'Rutas.json');

	
};

function Export_XML(arr){
	
	Download_File(Generate_XML(arr), 'Rutas.xml');
	
};


function Export_CSV(arr) {
	
    
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
        
        
      // row += '"Company",';
	   row += '"Route_Name",';
	   row += '"ID_Route",';
	   row += '"Route_Description",';
	   row += '"Route_Path",';
	  
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].Route_Name + '",';
		row += '"' + arrData[i].ID_Route + '",';
		row += '"' + arrData[i].Route_Description + '",';
		row += '"' + arrData[i].Route_Path+ '",';
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
    link.download = "Rutas.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function Export_PDF (Arr){
	
 var logo ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0kAAADVCAYAAACCNbvlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGN0NBRTQzODI2MDUxMUU0OERDREExM0FDQTlEREYzQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkVBNUMwRURBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkVBNUMwRERBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQ0VFOTQ5MUFDQ0U0MTFBOTA5RTk1REJGNUE1NEFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3Q0FFNDM4MjYwNTExRTQ4RENEQTEzQUNBOURERjNDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VfLbVwAAUolJREFUeNrsnQd8FMUXx2cvjdCbgNQAUcAGYgORoiLSxN5RAfGPgmJBsWIBFbH3ioIIiqiIBex0BEQRaYIECL33ENJu9//e3dxl73JbrueS39fPeOF2b8vs7Mz8Zt68p2iaJgAAAAAAAAAAuHEgCwAAAAAAAAAAIgkAAAAAAAAAIJIAAAAAAAAAACIJAAAAAAAAACCSAAAAAAAAAAAiCQAAAAAAAAAgkgAAAAAAAAAAIgkAAAAAAAAAIJIAAAAAAAAAACIJAAAAAAAAACCSAAAAAAAAAAAiCQAAAAAAAAAgkgAAAAAAAAAAIgkAAAAAAAAAIJIAAAAAAAAAACIJAAAAAAAAACCSAAAAAAAAAAAiCQAAAAAAAAAgkgAAAAAAAAAAIgkAAAAAAAAAIJIAAAAAAAAAACIJAAAAAAAAACCSAAAAAAAAAAAiCQAAAAAAAAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAABEEgAAAAAAAABAJAEAAAAAAAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAABEEgAAAAAAAABAJAEAAAAAAAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAABEEgAAAAAAAABAJAEAAAAAAAAARBIAAAAAAAAAQCQBAAAAAAAAAEQSAAAAAAAAAEAkAQAAAAAAAABEEgAAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAACIJAAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAAIgkAAAAAAAAAIBIAgAAAAAAAACIJAAAAAAAAACASAIAAAAAAAAAiCQAAAAAAAAAgEgCAAAAAAAAgNJLMrLAF0VRkAkAgJBo3iSjCn20ptSMUg1KRZQOUtpEac36Tdl7I3y+evTRhlIDSnzuY5T2Udogz5dr5zhpD55TLXVv4WChiPPon0mOAu1vLVl57fBHS3fiqfrS7O4JdcSxQ0NFSoUz6J+qcBYtEjUbvrHh2UsOIncAAHbRNA2ZUNo1AR4SRBIAIGyx0oU+RlI6l0WGya4HKM2jNI3SzyRitoVwLh7c6kvpAUonmeyqUtpF6RdKUyn9Suc76r9TpTvOfLKoWvIINUXxsSxwFGpa2q788YfH/T0AT1gKpMHvvy3qnXC7SEn3bSgKj6liz8bnN7wx4GHkEgAAIgkiCSIJAFDexVFV+hhL6eoQfv4NiZbLgjxfS/qYQunUEM7Xn843Xv9FxTvPerOwRvIQsx9V2J7/45EPl/Yo9wLp7vFfiXotrzDdade6Dze8etNAvBkAAIikxAdrkgAAIDSBxOZtc0MUSEUhnK8tffxO6ZRIXH/ag+3OsBJITF79tO7VbmpzXbkWSHeO7W0pkJi6mbc2e+CLc/F2AABA4oM1SQAAEBo8g9Q6RoKsGn18RYk/IzLdnZTnHKOm2msCnJWSRtHH5HL7pFMrPmtvR3o0qvMF+qMDXg8AgGltkSCWS11mXMIXWlOmWpTYgiJrVo9vN0AkAQAA8Bct7ODgmhiechiljEgeUE11nGl338KqyU3K9QOvXPtE2/tWqnEq3hAAQKJAIogH3zIpnSDbmYbC7QyoPqXGlOqIkpZnTwj3OlyIJAAAAD70p8QG5VEfCiRBxufoR4mdLlSKmEhKVirY3VdLVsp3W5GanmK/VU1Lw+sBAChtnD/9Ep4BYusH9ojaWlNEK/rkAaDaQR5qFaXR5SHPIJIAACB4etgQSE5KG6W4YVfddT2aQ5h7wPOHG7JGNvZjd9+b5HkzKFXWna/EtToKtQPOZKWenQtw5Kt55fpp5x89KipWr2Jr34Lcw3g9AADxpMv03jzzc4oiFLZ66EjpbOEOTeFF0fmN0OwP9/GvBs7u+V2hKAd+JyCSAAAgCJo3yWC77OMtdnuG0vPrN2Uf1v2OTRcupnQ9pa5BnNJq3RPHRrqN0mQ6n1Oei5u8kyn1onSzCOAqXHFq0+njVlsNRY5zSbl+6Dn7FpBI6m5PUOX8jLcEABBrzv++dwZ99BQ8iKe5Yt5V13RKSDEZ1/PsZkMsfUgCaVF5yVOIJAAACI4Mi+0TSKw85v8lfbedPsZxIhHDx2hr83yNLbbfTsee5HcubvJWyjSGztdBiikvRZWTHiOhdJOWpKSaHZz2UbVkpXy7ta5W7w7hLFwvklLMPcIW5ReKmo2H4RUBAMREGH3Xm4Na8/pYHhA72Uz8aHLqJwyxxHH+ylUsOIgkAAAIjjoW2y1nXUjEZNNHts3zHWexfZGN8y3w/65w1MKdaQ+ecxW1l19rDiWg+Z+iCi11X+HgnPf+WleeH/iGJy/Mbnb/lAGiRoNxwpEUuPvgLFTFsSPXb3i28068IgCAaNHl295N6eMG0jN9VU1w7Dzh4FrJM2mkGIsftwCyL5b8BNMjs3t+t7c85TXiJAEAQHBYOTyIdCe5Omsak+27Qz1w/pjF3wlVnJV81LnGf1vyEeeWlEOFF5JAeg+PnITSi9d8LHIPdBJHdpcUt0d2rxOFeWdveLb3V8gpAE