<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  
$coll = $db-> Store_Jobs_Send;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {

  $result = $coll->insert($dataObject->Data[$i]);

}
echo json_encode(array("Message"=>"Insertado"));

?>