<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Subscription_Types;

$result = $coll->find($dataObject->Data);

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>