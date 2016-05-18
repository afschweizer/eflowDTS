<?php

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Company;

$result = $coll->find($dataObject->Data,$dataObject->Fields);

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>