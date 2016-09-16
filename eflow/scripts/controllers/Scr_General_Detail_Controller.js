DTS_APP.controller('Scr_General_Detail_Controller',function($scope){

$scope.init = function(){
	$scope.Show_Route=false;
	
	Select_Trip({},{});
    Select_Visit_Point({},{});
    Select_Item({},{});
		
 };
 
 
 //Gra. 1
 /* Metodos a utilizar:
 Select_Jobs
 Select_Vehicle
 
 */

 function Get_Total_Weight_Jobs(Arr){
 	var Total_Weight = 0;
 	for(var i = 0; i<Arr.length;i++){
 		Total_Weight += Arr[i].JobWeight;
 	}
 	return Total_Weight;
 }

 function Get_Total_Weight_Truck(Arr){
 	var Total_Weight = 0;
 	for(var i = 0; i < Arr.length; i++){
 		Total_Weight += Arr[i].Weight;
 	}
 	return Total_Weight;
 }

//Gra. 2
/* Metodos a utilizar:
Select_Jobs

*/   

function Get_Total_Order_Damaged(Orders){
	var Total_Order = 0;
	for(var i =0; i < Orders.length;i++){
		var Damaged = false;
		var Jobs = Orders[i].Jobs;
		for(var j = 0; j < Jobs.length;j++){
			var Actions = Jobs[j].JobActions;
			for(var x = 0; x < Actions.length;x++){
				if(Actions[x].Action_Type === "Mal_Estado"){
					Damaged = true;
					break;
				}
			}		
		}
		if(Damaged === true){
			Total_Order++;
		}
	}
	return Total_Order;
}

//Gra. 3

function Get_(){}


//Gra. 4
/* Metodos a utilizar:
Select_Jobs

*/   


//Gra. 5
/* Metodos a utilizar:
Select_Jobs

*/   



//Gra. 6
/* Metodos a utilizar:
Select_Jobs

*/   

  
  
//Gra.7
/* Metodos a utilizar:
Select_Summary_Trip

*/

function Get_Drop_Size(){
	
}

//Gra. 8
/* Metodos a utilizar:
Select_Summary_Trip

*/

function Get_On_Time_Delivery(trip){
	var Total_Order_Time = 0;
	var TotalJobs = 0;
	var TotalTime = 0;
	for(var i =0; i < trip.length;i++){
	 TotalJobs = TotalJobs + trip[i].Total_Jobs ;
	 TotalTime = TotalTime + trip[i].Total_Doc_In_Time ;
	}
	Total_Order_Time =(TotalTime/TotalJobs);
	return Total_Order_Time;
}

//Gra. 9
/* Metodos a utilizar:
Select_Summary_Trip

*/

function Get_Efficiency_Delivery(trip){
	var Total_Efficiency_Delivery = 0;
	var TotalUnits = 0;
	var TotalComplete = 0;
	for(var j =0; j < trip.length;j++){
	 TotalUnits = TotalUnits + trip[j].Total_Units ;
	 TotalComplete = TotalComplete + trip[j].Total_Complete_Units ;
	}
	Total_Efficiency_Delivery =(TotalComplete/TotalUnits);
	return Total_Efficiency_Delivery;
}

//Gra. 10
/* Metodos a utilizar:
Select_Jobs

*/ 


/*Code To Select Info*/

function Select_Trip(Data_Request,Fields_Request){
	 
	var Request = {
		'Method_Name':'Select_Summary_Trip',
		'Data':Data_Request,
		'Fields':Fields_Request
	};	 

	var onSuccess = function(Response){
		$scope.Array_Trip = Response;
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
		'Data':Data_Request,
		'Fields':Fields_Request
	};
	
	var onSuccess = function(Response){
		$scope.Array_Item = Response;
	};
	
	var onError = function(Error_Response){
		alert(Error_Response);
	};
	
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);

};








});