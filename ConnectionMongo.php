<?php
try{

  
$uri = "mongodb://adminEprac:wolfe@ds015953.mlab.com:15953/eflow_testing"; 
$options = array("connectTimeoutMS" => 30000);

$conn = new MongoClient($uri,$options);
  
$db = $conn->selectDB("eflow");
  
  
}
catch(MongoConnectionException $e) {
die("No es posible conectarnos a la base de datos:".$e->getMessage());
}

?>
