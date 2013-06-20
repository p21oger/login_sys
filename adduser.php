<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('html_errors', false);



/** Provides very simple common interface to supply login credentials for web app */

interface CredentialsProvider {
  /**
   * Check if the user is allowed to log in
   * @param string $userName user name
   * @param string $password password
   * @return boolean true if user name/password is accepted
   */
  public function checkCredentials($userName, $password);
}






//var_dump(get_users());
print_r(get_users());


function get_users() {
  $users = array();
  $usersfile = file('DBusers', FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
  foreach ($usersfile as $userline) {
    $userdata = explode(" ", $userline);
    if (empty($userdata[0])  ||  empty($userdata[1]))
      die("Fatal: Users data file is damaged.\n");
    $email = empty($userdata[2]) ? "-" : $userdata[2];
    $users[] = array($userdata[0], $userdata[1], $email);
  }
  return $users;
}


function add_user($username, $password, $email=NULL) {
  if (empty($username)  ||  empty($password))
    return;





}

/*

//Loop through our array, show HTML source as HTML source; and line numbers too.
foreach ($lines as $line_num => $line) {
    echo "Line #<b>{$line_num}</b> : " . htmlspecialchars($line) . "<br />\n";
}

// Another example, let's get a web page into a string.  See also file_get_contents().
$html = implode('', file('http://www.example.com/'));

// Using the optional flags parameter since PHP 5
$trimmed = file('somefile.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);


file_put_contents("file1.txt", "log message\n", FILE_APPEND | LOCK_EX);
}

$hashed_password = crypt('mypassword');
$user_input = 'mypassword';




if (crypt($user_input, $hashed_password) == $hashed_password) { 
  echo "Password verified!\n"; 
} 
*/









/* You should pass the entire results of crypt() as the salt for comparing a
   password, to avoid problems when different hashing algorithms are used. (As
   it says above, standard DES-based password hashing uses a 2-character salt,
   but MD5-based hashing uses 12.) 

 echo $hashed_password;




*/


?>