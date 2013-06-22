<?php

error_reporting(E_ALL);
/* error_reporting(E_ERROR | E_PARSE); */
ini_set('display_errors', true);
ini_set('html_errors', false);


require_once('UserManager.php');

UserManager::logoutUser($_POST["username"]);
//UserManager::logoutUser("avram");

?>



