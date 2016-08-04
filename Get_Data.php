<?php

include 'ConnectionMongo.php'; 


function getGUID(){
        mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
               .substr($charid, 8, 4).$hyphen
               .substr($charid,12, 4).$hyphen
               .substr($charid,16, 4).$hyphen
               .substr($charid,20,12);
        return $uuid; 
}

$GUID = getGUID();
  
$coll = $db->Store_Jobs_Send;

//$coll = $db->Store_Jobs_Send;
 
$result = $coll->find($dataObject->Data);

$arrayResult = Array();

foreach($result as $doc){
 
 array_push($arrayResult, $doc);
 //$coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State" => "Sync_With_Mobile","Control.Syncroniced_Date"=>date_timestamp_get(date_create())*1000)));
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Token_Synch" => $GUID)));

}

$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data);

foreach($result as $doc){
  
 array_push($arrayResult, $doc);
 //$coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State"  => "Sync_With_Mobile","Control.Syncroniced_Date"=>date_timestamp_get(date_create())*1000)));
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Token_Synch" => $GUID)));
  
}


/*$coll = $db->Store_Vehicle;

$result = $coll->find($dataObject->Data->ID_Truck);

foreach($result as $doc){
 
 array_push($arrayResult, $doc);
 //$coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State"  => "Sync_With_Mobile","Control.Syncroniced_Date"=>date_timestamp_get(date_create())*1000)));

}
*/

echo json_encode(array("Data"=>$arrayResult,"Token_Synch"=>$GUID));

?>