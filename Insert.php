<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  
$coll = $db-> Store_Company;

$Array_Company_Length = count($dataObject->Company_Data);

for($i = 0; $i < $Array_Company_Length; $i++){

  $result = $coll->insert($dataObject->Company_Data[$i]);

}
echo json_encode(array("Message"=>"Insertado Company_Data"));

 
$coll1 = $db-> Store_User_Access ;

$Array_User_Length = count($dataObject->User_Data);

for($i = 0; $i < $Array_User_Length; $i++){

  $result = $coll1->insert($dataObject->User_Data[$i]);

}
echo json_encode(array("Message"=>"Insertado User_Data"));

?>