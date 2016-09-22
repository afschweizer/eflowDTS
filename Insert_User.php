<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  /*
$coll = $db-> Store_User_Access ;


$ArrayLength = count($dataObject->Data);

for($i = 0; $i < $ArrayLength; $i++){

  $result = $coll->insert($dataObject->Data[$i]);

}
echo json_encode(array("Message"=>"Insertado"));

*/
$coll_User = $db->Store_User_Access;
$coll_Audit = $db->Store_Audit_User;

$ArrayDataLength = count($dataObject->Data);


for($i = 0; $i < $ArrayDataLength; $i++){
  
  
  $Mongo = new MongoId();  
  $User = $dataObject->Data[$i]->User;
  $Audit = $dataObject->Data[$i]->Audit;
  
  $User->_id = $Mongo;  
  $Audit->Mongo_User_ID = $Mongo; 

   $coll_User->insert($User);
   $coll_Audit->insert($Audit);
  
}


echo json_encode(array("Message"=>"Insertado"));

?>