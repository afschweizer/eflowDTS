<?php

try{

  //MongoLab string connection
//$uri = "mongodb://Eprac_Testing:eprac123@ds047812.mlab.com:47812/eflowdts_testing"; 
//$uri = "mongodb://Eprac_Production:eprac123@ds031223.mlab.com:31223/eflowdts_production"; 
//$uri = "mongodb://Eprac_Development:eprac123@ds053658.mlab.com:53658/eflowdts_development"; 

  //Google Mongo Cluster string connection
$uri = "mongodb://104.197.248.93:27017";
  
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
//$db = $conn->selectDB("eflowdtsProduction");
$db = $conn->selectDB("eflowdtsTesting");
//$db = $conn->selectDB("eflowdts_production");
//$db = $conn->selectDB("eflowdts_development");
  
  
}
catch(MongoConnectionException $e) {
  
die("No es posible conectarnos a la base de datos:".$e->getMessage());
  
}

?>
