<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php';   

$coll_Company = $db->Store_Company;

$result_Insert_Company = $coll_Company->insert($dataObject->Company_Data);
 
/*if ($result_Insert_Company->ok == 1){*/
  
$coll_User = $db->Store_User_Access;

  $result_Insert_User = $coll_User->insert($dataObject->User_Data);

if($result_Insert_User->ok == 1){
  
  echo json_encode(array("Message"=>"Insertado informacion de usuario y compañia","Error"=>false));
  
}else{
  
  echo json_encode(array("Message"=>"Usuario no insertado","Error"=>true));
  
} 
   
  /* 
}else{
  
 echo json_encode(array("Message"=>"Compañía no insertada","Error"=>true));
 
  }*/

?>