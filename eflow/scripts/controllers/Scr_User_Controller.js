       
DTS_APP.controller('Scr_User_Controller',function($scope){

$scope.Type = "password";  
$scope.init = function() {
	try{
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
var Headers= [{"es":"NOMBRE","value":"Name"},{"es":"PRIMER APELLIDO","value":"Lastname"},
{"es":"SEGUNDO APELLIDO","value":"Lastname2"},{"es":"CEDULA","value":"Identification"},{"es":"TIPO","value":"Type"}] ;
$scope.ArrayHeaders = Headers;
var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
var Type =[{"es":"Administrador","value":"Administrador"},{"es":"Conductor","value":"Conductor"}] ;
var License=[{"es":"A1","value":"A1"},{"es":"A2","value":"A2"},{"es":"A3","value":"A3"},{"es":"B1","value":"B1"},
{"es":"B2","value":"B2"},{"es":"B3","value":"B3"},{"es":"B4","value":"B4"},{"es":"C1","value":"C1"},{"es":"C2","value":"C2"},
{"es":"D1","value":"D1"},{"es":"D2","value":"D2"},{"es":"D3","value":"D3"},{"es":"E1","value":"E1"},{"es":"E2","value":"E2"}];
$scope.ArrayLicense = License;
$scope.ArrayGenders = Gender;
$scope.Domain = eflowDTS.Session.DataCompany.Domain;
$scope.ArrayTypes = Type;
$scope.Select();

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
$scope.Password = function(x){
	try{

if(x === true){
$scope.Type = "text";
}else{
$scope.Type = "password";
}

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Password",
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
                Page: "Scr_User_Controller",
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
                Page: "Scr_User_Controller",
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

$scope.Action_Option= function(Option){
	try{
	if(Option === "Eliminar"){
		$scope.Delete_User_DB();
	}

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
$scope.Verify_License=function(Type){
	try{
	if (Type === "Conductor"){
		
		$scope.Show_Components.Type_License=true;
	}else{
		
		delete $scope.User.License;
	    
	    delete $scope.User.DueDate;		
	    
		$scope.Show_Components.Type_License = false;

		$scope.Show_Components.License = false;
	}
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Verify_License",
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
$scope.See_License=function(){
	try{
		$scope.Show_Components.License=true;
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "See_License",
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
	

$scope.Delete_User_DB = function(){
	
	try{
		
	var onSuccess = function(result){
	
	if(result === true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked === true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
	}
		
	
	
	var JsonData = {
            'Method_Name': 'Delete_User',
            'Data': Array_Delete_ID
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		};
	
	var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Delete_User_DB",
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
	 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess);
	 

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Delete_User_DB",
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

$scope.Save_User_Edit = function(Obj){
	try{
		var Json = Obj;
		Json.Control.Modification_date = new Date().getTime();
		Json.Control.Modify_User = eflowDTS.Session.UserName;
		Json.Mail = Obj.Mail.toLowerCase();
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Users',
					'Data': Json
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Save_User_Edit",
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
                Page: "Scr_User_Controller",
                Method: "Save_User_Edit",
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
	
 

$scope.Visualize_User = function(Obj){
	try{
	
   $scope.User = Obj;
   if($scope.User.Type==="Conductor"){
	$scope.Show_Components.License=true;
   $scope.Show_Components.Type_License=true;
   }else{
	$scope.Show_Components.License=false;
   $scope.Show_Components.Type_License=false;
   }
   
   $("#Modal_Edit_User").modal("show"); 
   

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Visualize_User",
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
	
$scope.Open_Modal_Add_VisitPoint = function(){
	try{
	$scope.Show_Components.License=false;
$scope.Show_Components.Type_License=false;
	$scope.User = {};

	$("#Modal_Agregar_User").modal("show");	
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Open_Modal_Add_VisitPoint",
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
$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_User',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Select",
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
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Select",
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
   
  
  
  /*
$scope.Select_Company = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_Company',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(JsonData){
		eflowDTS.Session.DataCompany=JsonData;

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Select_Company",
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
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Select_Company",
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
   
  
   
  
  */
   

$scope.Delete = function(id){
	try {
	
		var onSuccess = function(result){
    
    if (result === true) {
       
      var JsonData = {
            'Method_Name': 'Delete_User',
            'Data':  id.$id
            
        };
		
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Delete",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;		
		console.log(JsonData);
		
		};
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    };
    
    bootbox.confirm("¿Est"+'\u00e1'+" seguro que desea borrar el usuario del sistema?",onSuccess);
    
    
    } catch (e) {
            onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Delete",
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


$scope.Generar =function(){
	try{
	var data = $scope.ArrayUser;
        if(data === '')
            return;
        
        JSONToCSVConvertor(data, "User Report", true);

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Generar",
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


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
	try{
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
    var fileName = "MyReport_";
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

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "JSONToCSVConvertor",
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


$scope.Add_New_User = function(New_User){

	try{
		var JsonData = 	{
					'Method_Name': 'Insert_User',
					 'Data': [{
					 	"Control":{
					 	"Creation_Date": new Date().getTime(),
					 	"Created_User" : eflowDTS.Session.UserName
					 	},
		    			"Company": eflowDTS.Session.Company,
		    			"UserName": New_User.UserName,
					    "Password": New_User.Password,
					    "ID": New_User.ID,
					    "Name":New_User.Name,
					    "Lastname": New_User.Lastname,
					    "Lastname2": New_User.Lastname2,
					    "Identification": New_User.Identification,
					    "Mail": New_User.Mail.toLowerCase()+ eflowDTS.Session.DataCompany.Domain.toLowerCase(),
					    "Gender": New_User.Gender,
					    "Birthdate": New_User.Birthdate,
					    "DueDate": New_User.DueDate,
					    "License": New_User.License,
					    "Type": New_User.Type,
					    "Address": New_User.Address
					    }]
				};
				var onSuccess = function(JsonData){
				$scope.Select();
				};
				var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Add_New_User",
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
                Page: "Scr_User_Controller",
                Method: "Add_New_User",
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
                Page: "Scr_User_Controller",
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



$scope.Export_File = function(Export_Type,Array_Users){
	try{
	
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Users);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Users);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Users);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Users);
			
			break;
		}
	}
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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

function Delete_Attributes(arr){
	try{
	
	var Json_Array = arr;
	
	for(var i = 0; i < Json_Array.length; i++){
		
		var Obj = Json_Array[i];
		
		delete Obj._id;
		delete Obj.Company;
		delete Obj.Password;
		delete Obj.$$hashKey;
		
	}	
	
	return Json_Array;

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Delete_Attributes",
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

function Download_File(contenidoEnBlob, nombreArchivo) {
	try{
   
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

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Download_File",
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
function Generate_XML(arr) {
	try{
	
	var datos = arr ; 
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
	texto.push('<Data>\n');
	for(var i = 0; i < datos.length; i++){
		texto.push('<Usuarios>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<UserName>' + datos[i].UserName + '</UserName>\n');
		//texto.push('\t<Password>' + datos[i].Password + '</Password>\n');
		texto.push('\t<ID>' + datos[i].ID + '</ID>\n');
		texto.push('\t<Name>' + datos[i].Name + '</Name>\n');
		texto.push('\t<Lastname>' + datos[i].Lastname + '</Lastname>\n');
		texto.push('\t<Lastname2>' + datos[i].Lastname2 + '</Lastname2>\n');
		texto.push('\t<Identification>' + datos[i].Identification + '</Identification>\n');
		texto.push('\t<Mail>' + datos[i].Mail + '</Mail>\n');
		texto.push('\t<Gender>' + datos[i].Gender + '</Gender>\n');
		texto.push('\t<Birthdate>' + datos[i].Birthdate + '</Birthdate>\n');
		texto.push('\t<DueDate>' + datos[i].DueDate+ '</DueDate>\n');
		texto.push('\t<License>' + datos[i].License+ '</DueDate>\n');
		texto.push('\t<Type>' + datos[i].Type + '</Type>\n');
		texto.push('\t<Address>' + datos[i].Address + '</Address>\n');
					    
		
		texto.push('</Usuarios>\n');
	}
	texto.push('</Data>\n');
    
    return new Blob(texto, {
        type: 'application/xml'
    });

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Generate_XML",
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


function Export_JSON(arr){
	try{
	
	var text = [];
	
	text.push(JSON.stringify(Delete_Attributes(arr)));
    
    var file = new Blob(text, {
        type: 'application/json'
    });
	
	
    Download_File(file, 'Usuarios.json');


   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Export_JSON",
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

function Export_XML(arr){
	try{
	
	Download_File(Generate_XML(arr), 'Usuarios.xml');
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Export_XML",
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


function Export_CSV(arr) {
	try{
	
    
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
        
        
      // row += '"Company",';
	   row += '"UserName",';
	   //row += '"Password",';
	   row += '"ID",';
	   row += '"Name",';
	   row += '"Lastname",';
	   row += '"Lastname2",';
	   row += '"Identification",';
	   row += '"Mail",';
	   row += '"Gender",';
	   row += '"Birthdate",';
	   row += '"DueDate",';
	   row += '"License",';
	   row += '"Address",';
	   row += '"Type",'; 
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].UserName + '",';
		//row += '"' + arrData[i].Password + '",';
		row += '"' + arrData[i].ID + '",';
		row += '"' + arrData[i].Name + '",';
		row += '"' + arrData[i].Lastname + '",';
		row += '"' + arrData[i].Lastname2 + '",';
		row += '"' + arrData[i].Identification + '",';
		row += '"' + arrData[i].Mail+ '",';
		row += '"' + arrData[i].Gender + '",';
		row += '"' + arrData[i].Birthdate + '",';
		row += '"' + arrData[i].DueDate + '",';
		row += '"' + arrData[i].License + '",';
		row += '"' + arrData[i].Address + '",';
		row += '"' + arrData[i].Type + '",';
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
    link.download = "Usuarios.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Export_CSV",
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
	try{
	
 var logo ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0kAAADVCAYAAACCNbvlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGN0NBRTQzODI2MDUxMUU0OERDREExM0FDQTlEREYzQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkVBNUMwRURBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkVBNUMwRERBNjAxMUU0QUNEQkE3QUIwQkYxNTQ2NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQ0VFOTQ5MUFDQ0U0MTFBOTA5RTk1REJGNUE1NEFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3Q0FFNDM4MjYwNTExRTQ4RENEQTEzQUNBOURERjNDIi8+IDwvcmRmOkRlc2NyaXB0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