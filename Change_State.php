<?php

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Jobs_Send;

$result = $coll->find();

foreach($result as $doc){
 
$colle = $db->Store_Jobs_Send;

$colle ->update(array("_id"=> new MongoId($doc["_id"].$id)), array('$set' => 
        array("Transferring_State" => "Pending_To_Mobile")));

}


?>

  