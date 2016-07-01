  <?php

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Vehicle;

$result = $coll->find();

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

?>