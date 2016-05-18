<?php

      switch($dataObject->Collection_Name){
    
             case 'Store_Error':
                {
                  require 'Insert_Error.php';
                  break;
                }  
              case 'Store_Geolocation':
                {
                  require 'Insert_Geolocation.php';
                  break;
                } 
              case 'Store_Jobs':
                {
                  require 'Update_Jobs_Ap.php';
                  break;
                } 
              default:
                {
                  require 'Insert_Default.php';
                  break;
                } 
      } 
     
   
?>