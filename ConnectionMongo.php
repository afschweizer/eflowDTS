<?php

try{ 

//Google Mongo Cluster string connection
  
  
  ini_set("mongo.native_long", 0);
ini_set("mongo.long_as_object", 1);
$uri = "mongodb://104.197.248.93:27017";
  
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
//$db = $conn->selectDB("eflowdtsProduction");
//$db = $conn->selectDB("eflowdtsTesting");
$db = $conn->selectDB("eflowdtsDevelopment");
//$db = $conn->selectDB("eflowdtsPresentation");
  
  
}
catch(MongoConnectionException $e) {
  
die("No es posible conectarnos a la base de datos:".$e->getMessage());
  
}

?>
