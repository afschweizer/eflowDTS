  <?php

include 'ConnectionMongo.php'; 
  
$coll = $db->Store_Vehicle;

$result = $coll->findOne($dataObject->Data,$dataObject->Fields);

if(gettype($result) === 'object'){
echo json_encode(array("Result"=> true, "Data"=>$result));
}else{
echo json_encode(array("Result"=> false));
}

?>