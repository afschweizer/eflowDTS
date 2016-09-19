<?php

include 'ConnectionMongo.php'; 
 
$coll = $db->Store_Summary_Trip;
 
$result = $coll->find($dataObject->Data_Trip,$dataObject->Fields_Trip);

$Array_Trip = Array();

foreach($result as $doc){
 
 array_push($Array_Trip , $doc);  

}

$coll = $db->Store_Summary_Visit_Point;
 
$result = $coll->find($dataObject->Data_Visit_Point,$dataObject->Fields_Visit_Point);

$Array_Visit_Point = Array();

foreach($result as $doc){
 
 array_push($Array_Visit_Point , $doc);  

}

$coll = $db->Store_Summary_Item;
 
$result = $coll->find($dataObject->Data_Item,$dataObject->Fields_Item);

$Array_Item = Array();

foreach($result as $doc){
 
 array_push($Array_Item , $doc);  

}

$coll = $db->Store_Vehicle;
 
$result = $coll->find($dataObject->Data_Vehicle,$dataObject->Fields_Vehicle);

$Array_Vehicle = Array();

foreach($result as $doc){
 
 array_push($Array_Vehicle , $doc);  

}

echo json_encode(array("Trip"=>$Array_Trip,"Visit_Point"=>$Array_Visit_Point,"Item"=>$Array_Item,"Vehicle"=>$Array_Vehicle));

?>