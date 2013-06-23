<?php

error_reporting(E_ALL);
/* error_reporting(E_ERROR | E_PARSE); */
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

  const DB_USERS = "DB/USERS";   /* users database-file */
  const DB_LOGINS = "DB/LOGINS"; /* active logins database-file */

  /**
   * Utility to get all lines from a text file, explode them to arrays of fields
   * Ignore lines with empty 1st || 2nd fields
   * @param $filename the file-name to fetch from
   * @return array lines-array of field-arrays, or NULL
   */
  public function getFileLines($filename) {
    $lines = array();
    if (!file_exists($filename))
      return $lines;
    $all_lines = file($filename, FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
    if ($all_lines) {
      foreach ($all_lines as $one_line) {
	$fields = explode(" ", $one_line);
	if (!empty($fields[0])  &&  !empty($fields[1]))
	  $lines[] = $fields;
      }
    }
    return $lines;
  }


  /**
   * Get all users in DBusers and return them in array
   * @return array of user records, or NULL
   * @throws (doesn't throw for now) if file is corrupt
   */
  public function getUsersFromFile() {
    $users = self::getFileLines(self::DB_USERS);

    foreach ($users as $userkey => $userfields)
      $users[$userkey][2] = empty($userfields[2]) ? "-" : $userfields[2];

    return $users;
  }


  /*
   * Definition of interface's virtual function
   */
  public function checkCredentials($username, $password) {
    if (empty($username)  ||  empty($password))      return false;
    $users = self::getUsersFromFile();
    foreach ($users as $userdata) {
      if ($userdata[0] == $username  &&  $userdata[1] == $password) /* crypt($password, $userdata[1]) == $userdata[1]) */
	return true;
    }
    return false;
  }


  /**
   * Return array of all logged users from file DB_LOGINS
   * @return array of logged-user records, or NULL
   * @throws (doesn't throw for now) if file is corrupt
   */
  public function getLoggedUsers() {
    $users = self::getFileLines(self::DB_LOGINS);
    return $users;
  }


  /**
   * Check if user is already logged-in
   * @param $username user-name (unique identifier)
   * @return boolean true if logged-in, false if not
   */
  public function isLoggedIn($username) {
    $users = self::getLoggedUsers();
    foreach ($users as $userdata) {
      if ($userdata[0] == $username)
	return true;
    }
    return false;
  }


  /**
   * Collect information and write login line to file DB_LOGINS
   * details written: username, connction-time, ip-address
   * @param $username user-name (unique identifier)
   */
  public function addUserToLoginsFile($username) {
    /* If server's time-zone needs to be set: */
    /* date_default_timezone_set('Asia/Jerusalem'); */
    $login = $username . " ";
    $login .= date("Y-m-d H:i:s") . " ";
    $login .= $_SERVER['REMOTE_ADDR'] . "  ";
    file_put_contents(self::DB_LOGINS, $login. "\n", FILE_APPEND | LOCK_EX);
  }


  /*
   * Log the user into the system
   * @param $username
   * @param $password
   */
  public function loginUser($username, $password) {
    if (!self::checkCredentials($username, $password))
      exit (json_encode("false"));

    if (self::isLoggedIn($username))
      exit (json_encode("logged"));

    /* ok to log-in */
    self::addUserToLoginsFile($username);
    exit (json_encode("true"));
  }


  /*
   * Log the user out of the system
   * @param $username
   */
  public function logoutUser($username) {
    $users = self::getLoggedUsers(); //print_r($users);
    foreach ($users as $key => $userdata) {
      if ($userdata[0] == $username) {
	unset($users[$key]); // delete array member
	file_put_contents(self::DB_LOGINS, "", LOCK_EX); // overwrite DB_LOGINS file
	foreach ($users as $key => $userdata)
	  file_put_contents(self::DB_LOGINS, implode(" ", $userdata) . "\n", FILE_APPEND | LOCK_EX); // append user to DB_LOGINS file
	exit (json_encode("true"));
      }
    }
    exit (json_encode("false")); // no login for $username was found
  }




  /**
   * Checks if user-name exists in the DB
   * @param string $username user-name
   * @return boolean true if user-name exists
   */
  public function username_exists($username) {
    if (empty($username))      return false;
    $users = self::getUsersFromFile();
    foreach ($users as $userdata) {
      if ($userdata[0] == $username)
	return true;
    }
    return false;
  }


  /*
   * Adds new user to DB, encrypts the password
   * @param $username string the new user-name
   * @param $password string then new password
   * @param $email string optional email for password recovery
   */
  function createUser($username, $password, $email=NULL) {
    if (empty($username)  ||  empty($password))
      exit (json_encode("empty"));

    if (self::username_exists($username))
      exit (json_encode("exists"));

    file_put_contents(self::DB_USERS, $username . " " . $password . " " . $email . "\n", FILE_APPEND | LOCK_EX);
    exit (json_encode("true"));
  }

  function update_user($username, $password, $email=NULL) {
    $users = self::getUsersFromFile();

  }


} /* class UserManager */






/*
// Another example, let's get a web page into a string.  See also file_get_contents().
$html = implode('', file('http://www.example.com/'));

// Using the optional flags parameter since PHP 5
$trimmed = file('somefile.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);


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