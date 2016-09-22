DTS_APP.controller('Scr_General_Detail_Controller',function($scope){ 

$scope.init = function(){
	$scope.Show_Route=false;
	$('#Charging').modal('show');
	
	$scope.Array_Trip = [];
	$scope.Array_Visit_Point = [];
	$scope.Array_Item = [];
	$scope.Array_Vehicle = [];
    
	Select_Data();

 };
 

/* Gráficos */ 

//Unique_Select_Info
function Select_Data(){
	var Request = {
		'Method_Name':'Select_Data_Graph',
		'Data_Trip':{
			'Company':eflowDTS.Session.Company.Identifier
		},
		'Fields_Trip':{
			
		},
		'Data_Visit_Point':{
			'Company':eflowDTS.Session.Company.Identifier
		},
		'Fields_Visit_Point':{
			
		},
		'Data_Item':{
			'Company':eflowDTS.Session.Company.Identifier
		},
		'Fields_Item':{
			
		},
		'Data_Vehicle':{
			'Company':eflowDTS.Session.Company.Identifier
		},
		'Fields_Vehicle':{
			
		}
	};
	
	var onSuccess = function(Response){
		
		Generate_Graphs(Response);
		setTimeout(function(){
	                	$('#Charging').modal('hide');
	               
                	},3000);
                	
	}; 
	
	var onError = function(Error_Response){
		alert(Error_Response);
	};
	
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);
};
  
function Generate_Graphs(Data){
	
	$scope.Gra1 = (Get_Total_Weight_Charge(Data.Trip)/Get_Total_Weight_Vehicle(Data.Vehicle,Get_Vehicles_ID(Data.Trip)))*100;
	
	$scope.Gra2 = (Get_Total_Order_With_Unit_Damaged(Data.Visit_Point)/Data.Visit_Point.length)*100;
	
	$scope.Gra3 = (Get_Total_Unit_Rejected(Data.Trip)/Get_Total_Unit(Data.Trip))*100;
	
	$scope.Gra6 = (Get_Total_Visit_Point_First_Pass(Data.Trip)/Get_Total_Visit_Point(Data.Trip))*100;
	
	$scope.Gra8 = (Get_Total_Visit_Point_In_Time(Data.Trip)/Get_Total_Visit_Point(Data.Trip))*100;
	
	$scope.Gra9 = (Get_Total_Visit_Point_Off_Time(Data.Trip)/Get_Total_Visit_Point(Data.Trip))*100;
	
	$scope.Gra10 = (Get_Total_Unit_Confirmed(Data.Trip)/Get_Total_Unit(Data.Trip))*100;
	
	$scope.Gra11 = (Get_Total_Unit_Damaged(Data.Trip)/Get_Total_Unit(Data.Trip))*100;

	
	
	
};

//#1
function Get_Total_Weight_Charge(Arr){
	var Total_Weight = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Weight += Arr[i].Total_Weight;
	}
	
	return Total_Weight;
};

function Get_Total_Weight_Vehicle(Arr_Vehicles,Arr_IDS){
	var Total_Weight = 0;
	
	for(var i = 0; i < Arr_Vehicles.length; i++){
		var Vehi = Arr_Vehicles[i];
		for(var x = 0; x < Arr_IDS.length; x++){
			var ID = Arr_IDS[x];
			if(Vehi.ID_Truck === ID){
				Total_Weight += Vehi.Weight;
				break;
			}
		}
	}
	
	return Total_Weight;
};

function Get_Vehicles_ID(Arr){
	var IDs = [];
	
	for(var i = 0; i < Arr.length; i++){
		if(!Exist_In_Array(IDs,Arr[i].ID_Truck)){
			IDs.push(Arr[i].ID_Truck);
		}
	}
	
	return IDs;
};

//#2
// Total de Órdenes 
function Get_Total_Order_With_Unit_Damaged(Arr){
	var Total_Order = 0;
	
	for(var i = 0; i < Arr.length; i++){
		if(Arr[i].Total_Units_Damaged > 0){
		Total_Order += Arr[i].Total_Jobs_Damaged;
	    }
	}
	
	return Total_Order;
};


//#3
function Get_Total_Unit_Rejected(Arr){
	var Total_Unit = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Unit += Arr[i].Total_Units_Rejected;
	}
	
	return Total_Unit;
};

function Get_Total_Unit(Arr){
	var Total_Unit = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Unit += Arr[i].Total_Units;
	}
	
	return Total_Unit;
};

//#4
function Get_Time_In_Transit(Arr_Trip,Visit_Point){
	var Time_Transit = 0;
	var Trip = {};
	for(var i = 0; i < Arr_Trip.length; i++){
		if(Arr_Trip[i].Trip_ID === Visit_Point.Trip_ID){
			Trip = Arr_Trip[i];
    		break;
		}
    }
    Time_Transit = (((Visit_Point.Start_Date ? Visit_Point.Start_Date : 0) - (Trip.Start_Date ? Trip.Start_Date : 0))/1000)/60;
	return Time_Transit;
};

//#5
function Get_Time_Visit(Visit_Point){
	var Time_Visit = 0;
	
	Time_Visit = Visit_Point.Duration;
	
	return Time_Visit;
};

//#6 Hay que agregar los tipos de incidentes First Pass(No tenga incidentes relacionados al local, y esté 100% confirmado)
function Get_Total_Visit_Point_First_Pass(Arr){
	var Total_Order = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Order += Arr[i].Total_Doc_Perfect;
	}
	
	return Total_Order;
};

function Get_Total_Visit_Point(Arr){
	var Total_Visit_Point = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Visit_Point += Arr[i].Total_VisitPoint;
	}
	
	return Total_Visit_Point;
};

//#7
//Get_Total_Unit(Parameter); Parameter = Array VisitPoint Same Clients
// Total Unidades cliente / visitas al cliente

//#8
// Get_Total_Visit_Point(Parameter); Parameter = Array Trip;
function Get_Total_Visit_Point_In_Time(Arr){
	var Visit_Point_In_Time = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Visit_Point_In_Time += Arr[i].Total_VisitPoint_In_Time;		
	}
	
	return Visit_Point_In_Time;
};

//#9
//Get_Total_Visit_Point(Parameter); Parameter = Array Trip
function Get_Total_Visit_Point_Off_Time(Arr){
	var Visit_Point_Off_Time = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Visit_Point_Off_Time += Arr[i].Total_VisitPoint_Off_Time;
	}
	
	return Visit_Point_Off_Time;
};

//#10
// Get_Total_Unit(Parameter); Parameter = Array Trip;
function Get_Total_Unit_Confirmed(Arr){
	var Total_Unit = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Unit += Arr[i].Total_Units_Confirmed;
	}
	
	return Total_Unit;
}

//#11
//Get_Total_Unit(Parameter); Parameter = Array Trip;
function Get_Total_Unit_Damaged(Arr){
   	var Total_Unit = 0;
   	
   	for(var i = 0; i < Arr.length; i++){
   		Total_Unit += Arr[i].Total_Units_Damaged;
   	}
   	
   	return Total_Unit;
};



});