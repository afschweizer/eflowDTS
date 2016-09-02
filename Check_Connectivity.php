<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
  
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_User_Online;

$result = $coll->find($dataObject->User_Info);
 
if($result->count() === 1){
 
  foreach($result as $doc){
    
	 $id = '$id';
    
    $coll->update($dataObject->User_Info,$dataObject->Data);
    
    echo json_encode(array("ID"=>$doc->_id->$id));
   
  }

  
}else{
  
  $coll->insert($dataObject->Data);
  
  echo json_encode(array("Message"=>"Insertado"));
  
}


?>