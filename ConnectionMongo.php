<?php
try{

  
$uri = "mongodb://Eprac_Production:eprac123@ds031223.mlab.com:31223/eflowdts_production"; 
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
$db = $conn->selectDB("eflowdts_production");
  
  
}
catch(MongoConnectionException $e) {
die("No es posible conectarnos a la base de datos:".$e->getMessage());
}

?>
