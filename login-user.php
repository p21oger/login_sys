<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('html_errors', false);

require_once('UserManager.php');

if(empty($_POST)  ||  !UserManager::checkCredentials($_POST["username"], $_POST["password"]))
  exit (json_encode("false"));



$ipaddress = $_SERVER['REMOTE_ADDR'];  
    $date = date('d/m/Y');  
    $time = date('H:i:s');  


exit (json_encode("true"));



?>