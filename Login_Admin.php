<?php
  
include 'ConnectionMongo.php'; 
  
//$coll = $db->Store_User_Employee;
$coll = $db->Store_User_Access;

$result = $coll->findOne($dataObject->Data);
if($result != null){
  echo json_encode($result);
}else{
  $js = array('Result'=>false);
 echo json_encode($js);  
}

  
?>

  