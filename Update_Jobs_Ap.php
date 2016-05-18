<?php     

include 'ConnectionMongo.php'; 

$coll = $db->Store_Jobs_Send;

 foreach($dataObject->Data as $doc){

      $id = '$id';

      $coll->remove(array('_id' => new MongoId($doc->_id->$id)));

      $doc->_id = new MongoId($doc->_id->$id);

      $coll->insert($doc);
	
    }

?>