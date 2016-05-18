<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Routes;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll->remove(array('_id' => new MongoId($dataObject->Data[$i])));
  
}

echo json_encode(array("Message"=>"Eliminado"));

?>