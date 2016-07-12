<?php

try{

//Header access
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
 
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);

include 'ConnectionMongo.php'; 
  
$coll = $db-> Store_Jobs_Received;
  
$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  //FALTA
  isset($_GET['ID_Location']) && intval($_GET['user'])
  isset($_GET['Manager"']) && intval($_GET['user'])
  isset($_GET['Name']) && intval($_GET['user'])
  isset($_GET['Address']) && intval($_GET['user'])
  isset($_GET['Telephone_Number']) && intval($_GET['user'])
  isset($_GET['Mail']) && intval($_GET['user'])
  isset($_GET['Legal_Cedula']) && intval($_GET['user'])
  isset($_GET['User']) && intval($_GET['user'])
  isset($_GET['ID_Truck']) && intval($_GET['user'])
  isset($_GET['Order_Number']) && intval($_GET['user'])
  isset($_GET['Invoice']) && intval($_GET['user'])
  isset($_GET['Estimated_Date']) && intval($_GET['user'])
  isset($_GET['Sequence']) && intval($_GET['user'])
  isset($_GET['JobClass']) && intval($_GET['user'])
  isset($_GET['JobType']) && intval($_GET['user'])
  isset($_GET['JobName']) && intval($_GET['user'])
  isset($_GET['JobDescription']) && intval($_GET['user'])
  isset($_GET['UOM']) && intval($_GET['user'])
  isset($_GET['JobWeight']) && intval($_GET['user'])
  isset($_GET['JobCubics']) && intval($_GET['user'])
  isset($_GET['JobDescription']) && intval($_GET['user'])
  isset($_GET['Serial_List']) && intval($_GET['user'])
  isset($_GET['BarCode']) && intval($_GET['user'])
  isset($_GET['Quantity']) && intval($_GET['user'])
}

  
  
  
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}
