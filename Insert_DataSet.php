<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_DataSet;

$ArrayLength = count($dataObject->Data);

for($i = 0; $i < $ArrayLength; $i++){
	
if(isset($dataObject->Data[$i]->_id)){
  
    $id = '$id';

    $coll->remove(array('_id' => new MongoId($dataObject->Data[$i]->_id->$id)));

    $dataObject->Data[$i]->_id = new MongoId($dataObject->Data[$i]->_id->$id);

    $coll->insert($document);
   
   }else{
     
     $result = $coll->insert($dataObject->Data[$i]);
     
   }
  

}
echo json_encode(array("Message"=>"Insertado"));

?>