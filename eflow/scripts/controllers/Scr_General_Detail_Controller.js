DTS_APP.controller('Scr_General_Detail_Controller',function($scope){ 

$scope.init = function(){
	$scope.Show_Route=false;
	$('#Charging').modal('show');
	
	$scope.Array_Trip = [];
	$scope.Array_Visit_Point = [];
	$scope.Array_Item = [];
	$scope.Array_Vehicle = [];
			
	//Select_Trip({},{});
    //Select_Visit_Point({},{});
    //Select_Item({},{});
    
	 Select_Data();

 };
 
/*Code To Select Info*/

function Select_Trip(Data_Request,Fields_Request){
	 
	var Request = {
		'Method_Name':'Select_Summary_Trip',
		'Data':Data_Request,
		'Fields':Fields_Request
	};	 

	var onSuccess = function(Response){
		$scope.Array_Trip = Response;
		 	$scope.Graf1 = ($scope.Array_Trip[0].Total_Weight / 500)*100;
	                	$scope.Graf2 = ($scope.Array_Trip[0].Total_Units_Damaged / $scope.Array_Trip[0].Total_Units)*100;
	                	$scope.Graf3 = ($scope.Array_Trip[0].Total_Units_Rejected / $scope.Array_Trip[0].Total_Units)*100;
	                	$scope.Graf4 = ($scope.Array_Trip[0].Total_Jobs_Confirmed / $scope.Array_Trip[0].Total_Jobs)*100;
	                	$scope.Graf5 = ($scope.Array_Trip[0].Total_VisitPoint_In_Time / $scope.Array_Trip[0].Total_VisitPoint)*100;
	                	$scope.Graf6 = ($scope.Array_Trip[0].Total_Units_Confirmed / $scope.Array_Trip[0].Total_Units)*100;
	                	
	};
	
	var onError = function(Error_Response){
		alert(Error_Response);		
	};	
	
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);
};

function Select_Visit_Point(Data_Request,Fields_Request){
	
	var Request = {
		'Method_Name':'Select_Summary_Visit_Point',
		'Data':Data_Request,
		'Fields':Fields_Request
	};
	
	var onSuccess = function(Response){
		$scope.Arra_Visit_Point = Response;
	};
	
	var onError = function(Error_Response){
		alert(Error_Response);
	};

	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);

};

function Select_Item(Data_Request,Fields_Request){
	
	var Request = {
		'Method_Name':'Select_Summary_Item',
		'Data_Trip':Data_Request,
		'Fields_Trip':Fields_Request
	};
	
	var onSuccess = function(Response){
		$scope.Array_Item = Response;
	};
	
	var onError = function(Error_Response){
		alert(Error_Response);
	};
	
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);

};

/* Gráficos */ 

//Unique_Select_Info
function Select_Data(){
	var Request = {
		'Method_Name':'Select_Data_Graph',
		'Data_Trip':{
			
		},
		'Fields_Trip':{
			
		},
		'Data_Visit_Point':{
			
		},
		'Fields_Visit_Point':{
			
		},
		'Data_Item':{
			
		},
		'Fields_Item':{
			
		},
		'Data_Vehicle':{
			
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
	
	$scope.Gra1 = (Get_Total_Weigth_Charge(Data.Trip)/Get_Total_Weigth_Vehicle(Data.Vehicle,Get_Vehicles_ID(Data.Trip)))*100;
	
	$scope.Gra2 = (Get_Total_Order_With_Unit_Damaged(Data.Visit_Point)/Data.Visit_Point.length)*100;
	
	$scope.Gra3 = (Get_Total_Unit_Rejected(Data.Trip)/Get_Total_Unit(Data.Trip))*100;
	
	$scope.Gra6 = (Get_Total_Visit_Point_First_Pass(Data.Trip)/Get_Total_Visit_Point(Data.Trip))*100;
	
	$scope.Gra8 = (Get_Total_Visit_Point_In_Time(Data.Trip)/Get_Total_Visit_Point(Data.Trip))*100;
	
	$scope.Gra9 = (Get_Total_Unit_Confirmed(Data.Trip)/Get_Total_Unit(Data.Trip))*100;
	
	$scope.Gra10 = (Get_Total_Unit_Damaged(Data.Trip)/Get_Total_Unit(Data.Trip))*100;

	
	
};

//#1
function Get_Total_Weigth_Charge(Arr){
	var Total_Weigth = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Weigth += Arr[i].Total_Weigth;
	}
	
	return Total_Weigth;
};

function Get_Total_Weigth_Vehicle(Arr_Vehicles,Arr_IDS){
	var Total_Weigth = 0;
	
	for(var i = 0; i < Arr_Vehicles.length; i++){
		var Vehi = Arr_Vehicles[i];
		for(var x = 0; x < Arr_IDS.length; x++){
			var ID = Arr_IDS[x];
			if(Vehi.ID_Truck === ID){
				Total_Weigth += Vehi.Weight;
				break;
			}
		}
	}
	
	return Total_Weigth;
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
		Total_Unit += Arr[i].Total_Unit_Rejected;
	}
	
	return Total_Unit;
};

function Get_Total_Unit(Arr){
	var Total_Unit;
	
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

function Get_Total_Visit_Point_Off_Time(Arr){
	var Visit_Point_Off_Time = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Visit_Point_Off_Time += Arr[i].Total_VisitPoint_Off_Time;
	}
	
	return Visit_Point_Off_Time;
};

//#9
// Get_Total_Unit(Parameter); Parameter = Array Trip;
function Get_Total_Unit_Confirmed(Arr){
	var Total_Unit = 0;
	
	for(var i = 0; i < Arr.length; i++){
		Total_Unit += Arr[i].Total_Units_Confirmed;
	}
	
	return Total_Unit;
}

//#10
//Get_Total_Unit(Parameter); Parameter = Array Trip;
function Get_Total_Unit_Damaged(Arr){
   	var Total_Unit = 0;
   	
   	for(var i = 0; i < Arr.length; i++){
   		Total_Unit += Arr[i].Total_Units_Damaged;
   	}
   	
   	return Total_Unit;
};



});