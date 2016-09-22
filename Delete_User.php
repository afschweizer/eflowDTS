<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_User_Access;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll->remove(array('_id' => new MongoId($dataObject->Data[$i])));
  
}



$coll_Audit = $db->Store_Audit_User;
 
$document = $dataObject->DataAudit;

$id = '$id';

$coll_Audit->remove(array('User_ID' => new MongoId($document->Identification)));

 $document->_id = new MongoId($document->_id->$id);

 $coll_Audit->insert($document);

echo json_encode($dataObject->DataAudit);
  





echo json_encode(array("Message"=>"Eliminado"));

?>