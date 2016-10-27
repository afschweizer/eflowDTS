<?php     

include 'ConnectionMongo.php'; 

$coll = $db->Store_Jobs_Send;
$coll_Mails = $db->Store_Mail_Status;

$arrayResult = Array();

 foreach($dataObject->Data as $doc){ 

      $id = '$id';

      $coll->remove(array('_id' => new MongoId($doc->_id->$id)));

      $doc->_id = new MongoId($doc->_id->$id);

      $coll->insert($doc);
	
      array_push($arrayResult, $doc->_id->$id);
   
    }

	foreach($dataObject->Data_PDF as $doc){
  
      $coll_Mails->insert($doc);
   
    }

echo json_encode(array("Data"=>$arrayResult,"Collection_Name"=>$dataObject->Collection_Name));

?>