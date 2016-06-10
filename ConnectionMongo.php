<?php
try{

  
<!--$uri = "mongodb://adminEprac:wolfe@ds061474.mlab.com:61474/eflow_testing";-->
  $uri = "mongodb://adminEprac:wolfe@ds053312.mongolab.com:53312/eflow"; 
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
<!--$db = $conn->selectDB("eflow_testing");-->
 
$db = $conn->selectDB("eflow"); 
  
}
catch(MongoConnectionException $e) {
die("No es posible conectarnos a la base de datos:".$e->getMessage());
}

?>
