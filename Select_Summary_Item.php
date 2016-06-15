<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Summary_Item;

$result = $coll->find(array("Trip_ID"=>"3d9dc2b8-615f-c11c-3092-12e03da0060a"));

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>