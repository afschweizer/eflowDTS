<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Visit_Point;


$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll->remove(array('_id' => new MongoId($dataObject->Data[$i])));
  
}

$document->_id = new MongoId($document->_id->$id);

$coll->insert($document); 

echo json_encode(array("Message"=>"Eliminado"));

?>