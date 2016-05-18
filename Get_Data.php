<?php

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Jobs_Send;

//$coll = $db->Store_Jobs_Send;

$result = $coll->find($dataObject->Data);

$arrayResult = Array();

foreach($result as $doc){
 
 array_push($arrayResult, $doc);
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State" => "Sync_With_Mobile")));

}

$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data);

foreach($result as $doc){
 
 array_push($arrayResult, $doc);
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State" => "Sync_With_Mobile")));

}

echo json_encode($arrayResult);

?>