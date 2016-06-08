<?php     

include 'ConnectionMongo.php'; 

$coll = $db->Store_Summary_Trip;

 foreach($dataObject->Data as $doc){

      $coll->insert($doc);
	
    }

echo json_encode(array("Message"=>"Insertado"));

?>