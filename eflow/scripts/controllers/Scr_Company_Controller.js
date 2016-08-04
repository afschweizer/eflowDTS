 DTS_APP.controller('Scr_Company_Controller', function($scope) {
 	
$scope.Type = "password"; 
	$scope.init = function(){
		
		try{
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
		$scope.Show_Map = true;
		$scope.Class_Map = "fa fa-eye";
		$scope.Text_Map = "Mostar Mapa";
        $scope.Show_Company=true;
        $scope.Show_User=false;
        $scope.Show_Settings=false;
        $scope.Show_Settings_License= false;
        $scope.Show_Settings_User= false;
        $scope.Show_Settings_Fuel= false;
        $scope.Show_Settings_Vehicle= false;
        $scope.Show_Settings_Unity = false;
		$scope.Array_Unity = [];
		$scope.Array_Fuel = [];
		$scope.Array_User = [];
		$scope.Array_Vehicle = [];
		$scope.Array_License = [];
		$scope.Companys={};
      // 	Set_Current_Page();
       	var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
		$scope.ArrayGenders = Gender;
	Load_Map_Init();
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};
		



});