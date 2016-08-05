<?php     

include 'ConnectionMongo.php'; 

$coll = $db->Store_Company;
 
$document = $dataObject->Data;

$id = '$id';

$coll->remove(array('_id' => new MongoId($document->_id->$id)));

 $document->_id = new MongoId($document->_id->$id);

 $coll->insert($document);

echo json_encode($dataObject->Data);
  


?>