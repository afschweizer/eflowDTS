<?php
try{

  
$uri = "mongodb://Eprac_Testing:eprac123@ds047812.mlab.com:47812/eflowdts_testing"; 
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
$db = $conn->selectDB("eflowdts_testing");
  
  
}
catch(MongoConnectionException $e) {
die("No es posible conectarnos a la base de datos:".$e->getMessage());
}

?>
