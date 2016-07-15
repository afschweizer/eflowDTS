<?php

try{

$uri = "mongodb://104.155.74.199:27017"; 
//$uri = "mongodb://Eprac_Production:eprac123@ds031223.mlab.com:31223/eflowdts_production"; 
//$uri = "mongodb://Eprac_Development:eprac123@ds053658.mlab.com:53658/eflowdts_development"; 

$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
$db = $conn->selectDB("TestingDB");
//$db = $conn->selectDB("eflowdts_production");
//$db = $conn->selectDB("eflowdts_development");
  
$coll = $db->Store_Test;

$result = $coll->find();

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

  
}
catch(MongoConnectionException $e) {
die("No es posible conectarnos a la base de datos:   ".$e->getMessage());
}

?>
