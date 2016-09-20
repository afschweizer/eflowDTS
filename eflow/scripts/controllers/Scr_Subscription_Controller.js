
DTS_APP.controller('Scr_Subscription_Controller', function($scope) {
	
	$scope.init = function(){
			$scope.Select();
	
		
		
		/*$scope.subscription=[{"Subriction_ID":"01",
"Subscription_Name":"Demo", 
"Subscription_Type":"Free", 
  "Comments": "Comments bout subscription Type",
  "Features":["Gratis para App.",
  "Ilimitado de seguimiento de vehículos.",
  "Ilimitado prueba de entrega.",
  "Tiempo real.",
  "Notificaciones. ",
  "Creacion de 1 Vehiculo, Usuario, Establecimiento, Sector.",
  "Gratuito por un mes."],
  "Subscription_Period": "30",
  "Amount": "0",
  "Free_Users":"1"
},{"Subriction_ID":"02",
"Subscription_Name":"Mensual", 
"Subscription_Type":"Monthly", 
  "Comments": "Comments bout subscription Type",
  "Features":["Gratis para wimdows.",
  "Ilimitado de seguimiento de vehículos.",
  "Ilimitado prueba de entrega.",
  "Tiempo real.",
  "Notificaciones. ",
  "Creacion de 1 Vehiculo, Usuario, Establecimiento, Sector.",
  "Gratuito por un mes."],
  "Subscription_Period": "30",
  "Amount": "20",
  "Free_Users":"1"
},{"Subriction_ID":"03",
"Subscription_Name":"Anual", 
"Subscription_Type":"Annual", 
  "Comments": "Comments bout subscription Type",
  "Features":["Gratis para  Android App.",
  "Ilimitado de seguimiento de vehículos.",
  "Ilimitado prueba de entrega.",
  "Tiempo real.",
  "Notificaciones. ",
  "Creacion de 1 Vehiculo, Usuario, Establecimiento, Sector.",
  "Gratuito por un mes."],
  "Subscription_Period": "30",
  "Amount": "100",
  "Free_Users":"1"
}**





];
$scope.Features=$scope.subscription[0].Features;*/
	};
	
	
$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_Subscription',
             'Data': {
    			
            },
            'Fields':{
            	
            }
        };
		
		var onSuccess = function(onSuccess){
		
		$scope.Arraysubscription = onSuccess;
		$scope.$apply($scope.Arraysubscription);

		};
		
		var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Subscription_Controller",
                Method: "Select",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;		
		console.log(onError);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Subscription_Controller",
                Method: "Select",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
 
	$scope.Save_info = function(variable){
			eflowDTS.Session.Ram.Subscription={};
		switch (variable){
		case "Demo":
			eflowDTS.Session.Ram.Subscription.Type_subscription="Demo";
			eflowDTS.Session.Ram.Subscription.Ending_Date=new Date().getTime() + (30*24*60*60*1000);
			window.location.href='#Company';
        break;
   		case "Mensual":
			eflowDTS.Session.Ram.Subscription.Type_subscription="Mensual";
			eflowDTS.Session.Ram.Subscription.Ending_Date=new Date().getTime() + (30*24*60*60*1000);
			window.location.href='#Company';
        break;
   		case "Anual":
			eflowDTS.Session.Ram.Subscription.Type_subscription="Anual";
			eflowDTS.Session.Ram.Subscription.Ending_Date=new Date().getTime() + (365*24*60*60*1000);
			window.location.href='#Company';
        break;
  		}
	};
	
});