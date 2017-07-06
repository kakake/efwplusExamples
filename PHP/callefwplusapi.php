<?php
echo "started...<br>";
$data_string="{\"sysright\": {\"token\": \"\"},\"plugin\": \"Books.Service\",\"controller\": \"bookWcfController\",\"method\": \"GetBooks\"}";      
$ch = curl_init('http://36.111.200.233:7711/httpservice/');      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");                            
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                   
    'Content-Type: application/json',  
    'Content-Length: ' . strlen($data_string))           
);                                                                                                                     
$result = curl_exec($ch);
echo $result;
?>
