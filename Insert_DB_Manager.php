<?php

include 'ConnectionMongo.php'; 
  
$coll = $db-> Store_DB_Manager;

 $coll->insert($dataObject->Data);

echo json_encode(array("Message"=>"Insertado"));

?>