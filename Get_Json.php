<?php

try{

//Header access
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
  
$Json_String = file_get_contents('php://input'); 
  
$Json_Object = json_decode($Json_String);

include 'ConnectionMongo.php'; 

$coll = $db->Store_Jobs_Test;

for($i = 0; $i < count($Json_Object); $i++){
    
    $coll->insert($Json_Object[$i]);
    
}  
  
echo json_encode(array('Message'=> 'Insertados '.count($Json_Object). ' documentos.'));
  
}catch(Exception $e){
  
  echo json_encode( array('Error' => $e->getMessage()));
  
}
