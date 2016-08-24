<?php

include 'ConnectionMongo.php'; 


function getGUID(){
        mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
               .substr($charid, 8, 4).$hyphen
               .substr($charid,12, 4).$hyphen
               .substr($charid,16, 4).$hyphen
               .substr($charid,20,12);
        return $uuid; 
}

$GUID = getGUID();
  
$coll = $db->Store_Jobs_Send;
 
$result = $coll->find($dataObject->Data_Driver);

$arrayResult = Array();

foreach($result as $doc){
 
 $doc->Visibility_State = false;
 array_push($arrayResult, $doc);  

}

$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data_Assistant);

foreach($result as $doc){
  
 array_push($arrayResult, $doc);
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Token_Synch" => $GUID)));
  
}

echo json_encode(array("Data"=>$arrayResult,"Token_Synch"=>$GUID));

?>