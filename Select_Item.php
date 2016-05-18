<?php
  
include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Item;

$result = $coll->find();

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>