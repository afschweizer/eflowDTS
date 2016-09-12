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
              case 'Store_Trip':
                {
                  require 'Insert_Summary_Trip.php';
                  break;
                }  
              case 'Store_VisitPoint':
                {
                  require 'Insert_Summary_VisitPoint.php';
                  break;
                } 
              case 'Store_Item':
                {
                  require 'Insert_Summary_Item.php';
                  break;
                } 
        
             case 'Store_Notification':
                {
                  require 'Update_Notification.php';
                  break;
                } 
              default:
                {
                  require 'Insert_Default.php';
                  break;
                } 
      } 
     
   
?>