<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('html_errors', false);


/**
 * Provides very simple common interface to supply login credentials for web app
 */
interface CredentialsProvider {
  /**
   * Check if the user is allowed to log in
   * @param string $userName user name
   * @param string $password password
   * @return boolean true if user name/password is accepted
   */
  public function checkCredentials($userName, $password);
}


class UserManager implements CredentialsProvider {

  /**
   * Get all users in DBusers and return them in array
   * @return array of user records on success, or NULL
   * @throws (doesn't throw for now) if file has a record missing username or password
   */
  private function get_users_from_file() {
    $users = array();
    $usersfile = file('DBusers', FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
    if (!$usersfile)
      return NULL;
    foreach ($usersfile as $userline) {
      $userdata = explode(" ", $userline);
      if (!empty($userdata[0])  &&  !empty($userdata[1])) {
	$email = empty($userdata[2]) ? "-" : $userdata[2];
	$users[] = array($userdata[0], $userdata[1], $email);
      }
      /* else	throw new Exception("Fatal: Users data file is damaged.\n"); */
    }
    return $users;
  }


  public function checkCredentials($username, $password) {
    if (empty($username)  ||  empty($password))      return false;
    $users = self::get_users_from_file();
    foreach ($users as $userdata) {
      if ($userdata[0] == $username  &&  $userdata[1] == $password) /* crypt($password, $userdata[1]) == $userdata[1]) */
	return true;
    }
    return false;
  }


  /**
   * Checks if user-name exists in the DB
   * @param string $username user-name
   * @return boolean true if user-name exists
   */
  public function user_exists($username) {
    if (empty($username))      return false;
    $users = self::get_users_from_file();
    foreach ($users as $userdata) {
      if ($userdata[0] == $username)
	return true;
    }
    return false;
  }


  function update_user($username, $password, $email=NULL) {
    $users = self::get_users_from_file();

  }

  /*
   * Adds new user to DB, encrypts the password
   * @param $username string the new user-name
   * @param $password string then new password
   * @param $email string optional email for password recovery
   * @return boolean true:user added, false:user not added
   */
  function add_user($username, $password, $email=NULL) {
    if (empty($username)  ||  empty($password))
      return false;

  }



} /* class UserManager */




if (UserManager::checkCredentials("avram", "bbb"))
  echo "verified\n";
else
  echo "login error. try again\n";







/*
  echo "(" . $username . ", " . $password . ") == (" . $userdata[0] . ", " . $userdata[1] . ") ?\n";




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