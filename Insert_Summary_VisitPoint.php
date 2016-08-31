<?php     

include 'ConnectionMongo.php'; 

$coll = $db->Store_Summary_Visit_Point;

$arrayResult = Array();

 foreach($dataObject->Data as $doc){

      $coll->insert($doc);
	
array_push($arrayResult, $doc->id);
  
    }

echo json_encode(array("Data"=>$arrayResult,"Collection_Name"=>$dataObject->Collection_Name));

?>