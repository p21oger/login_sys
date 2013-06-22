<?php

error_reporting(E_ALL);
/* error_reporting(E_ERROR | E_PARSE); */
ini_set('display_errors', true);
ini_set('html_errors', false);




/*
return pattern example:
$userlist = array("user001" => array("uname" => "moshe", "utime" => "2013-06-22 14:41:21", "uupdate" => "what what", "uip" => "127.0.0.1"),
		  "user002" => array("uname" => "avram", "utime" => "2013-06-22 14:21:12", "uupdate" => "what what", "uip" => "127.0.0.2"),
		  );
echo json_encode($userlist);
*/


require_once('UserManager.php');


$users = UserManager::getLoggedUsers();

$userslist = array();
foreach($users as $userid => $userfields) {
  $userslist["user" . sprintf('%03d', $userid)] = array(
							"uname" => $userfields[0],
							"utime" => $userfields[1] . " " . $userfields[2],
							"uupdate" => "what what",
							"uip" => $userfields[3]
							);
}

//print_r($userslist);
echo json_encode($userslist);

?>