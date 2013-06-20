<?php

$userlist = array("user01" => array("uname" => "name1", "utime" => "time1", "uupdate" => "update1", "uip" => "ip1"),
		  "user02" => array("uname" => "name2", "utime" => "time2", "uupdate" => "update2", "uip" => "ip2"),
		  "user03" => array("uname" => "name3", "utime" => "time3", "uupdate" => "update3", "uip" => "ip3"),
		  "user04" => array("uname" => "name4", "utime" => "time4", "uupdate" => "update4", "uip" => "ip4"),
		  "user05" => array("uname" => "name5", "utime" => "time5", "uupdate" => "update5", "uip" => "ip5"),
		  );

echo json_encode($userlist);


?>