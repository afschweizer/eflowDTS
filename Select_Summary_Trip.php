<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Summary_Trip;

$result = $coll->find();

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>