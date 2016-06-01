<?php

try{

//Header access
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);
  
switch($dataObject->Method_Name){
    
  case 'Login_Appery':
    {
      require'Login_Appery.php';
      break;
    }
   case 'Login_Admin':
    {
      require'Login_Admin.php';
      break;
    }
   case 'Select_All_Vehicle':
    {
      require'Select_All_Vehicle.php';
      break;
    }
   case 'Select_All_Route':
    {
      require'Select_All_Route.php';
      break;
    }
   case 'Select_All_User':
    {
      require'Select_All_User.php';
      break;
    }
   case 'Select_All_Visit_Point':
    {
      require'Select_All_Visit_Point1.php';
      break;
    }
   case 'Select_Company':
    {
      require'Select_Company.php';
      break;
    }
   case 'Select_Jobs':
    {
      require'Select_Jobs.php';
      break;
    }
   case 'Select_Notification':
    {
      require'Select_Notification.php';
      break;
    }
   case 'Select_User_Online':
    {
      require'Select_User_Online.php';
      break;
    }
   case 'Select_Item':
    {
      require'Select_Item.php';
      break;
    }
   case 'Get_Data':
    {
      require'Get_Data.php';
      break;
    }
   case 'Select_Geolocation':
    {
      require'Select_Geolocation.php';
      break;
    }
   default:
    {
    	echo json_encode( array('Error' => 'Metodo_Incorrecto'));
      break;
    }
}
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}

?>