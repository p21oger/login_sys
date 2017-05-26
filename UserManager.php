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
    const DB_UPDATES = "DB/UPDATES"; /* timestamps of changes in USERS database-file */

    /**
     * Utility to get all lines from a text file, explode them to arrays of fields
     * Ignore lines with empty 1st || 2nd fields
     * @param $filename the file-name to fetch from
     * @return array lines-array of field-arrays, or NULL
     */
    public function getFileLines($filename) {
        $lines = array();
        if (!file_exists($filename)) {
            return $lines;
        }
        $all_lines = file($filename, FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
        if ($all_lines) {
            foreach ($all_lines as $one_line) {
                $fields = explode(" ", $one_line);
                if (!empty($fields[0]) && !empty($fields[1])) {
                    $lines[] = $fields;
                }
            }
        }
        return $lines;
    }

    /**
     * Get all users in DB_USERS and return them in array
     * @return array of user records, or NULL
     * @throws (doesn't throw for now) if file is corrupt
     */
    public function getUsersFromFile() {
        $users = self::getFileLines(self::DB_USERS);
        foreach ($users as $userkey => $userfields) {
            $users[$userkey][2] = empty($userfields[2]) ? "-" : $userfields[2];
        }
        return $users;
    }

    /**
     * Get users array and write them to DB_USERS
     * @param $users users array containing records of user data
     */
    public function writeUsersToFile($users) {
        file_put_contents(self::DB_USERS, "", LOCK_EX); // overwrite DB_USERS file
        foreach ($users as $ukey => $userdata) {
            file_put_contents(self::DB_USERS, implode(" ", $userdata) . "\n", FILE_APPEND | LOCK_EX);
        } // append user to DB_USERS file
    }

    /*
     * Definition of interface's virtual function
     */

    public function checkCredentials($username, $password) {
        if (empty($username) || empty($password)) {
            return false;
        }
        $users = self::getUsersFromFile();
        foreach ($users as $userdata) {
            if ($userdata[0] == $username && $userdata[1] == $password) /* crypt($password, $userdata[1]) == $userdata[1]) */ {
                return true;
            }
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
            if ($userdata[0] == $username) {
                return true;
            }
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
        file_put_contents(self::DB_LOGINS, $login . "\n", FILE_APPEND | LOCK_EX);
    }

    /*
     * Log the user into the system
     * @param $username
     * @param $password
     */

    public function loginUser($username, $password) {
        if (!self::checkCredentials($username, $password)) {
            exit(json_encode("false"));
        }

        if (self::isLoggedIn($username)) {
            exit(json_encode("logged"));
        }

        /* ok to log-in */
        self::addUserToLoginsFile($username);
        exit(json_encode("true"));
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
                foreach ($users as $key => $userdata) {
                    file_put_contents(self::DB_LOGINS, implode(" ", $userdata) . "\n", FILE_APPEND | LOCK_EX);
                } // append user to DB_LOGINS file
                exit(json_encode("true"));
            }
        }
        exit(json_encode("false")); // no login for $username was found
    }

    /**
     * Checks if user-name exists in the DB
     * @param string $username user-name
     * @return boolean true if user-name exists
     */
    public function username_exists($username) {
        if (empty($username)) {
            return false;
        }
        $users = self::getUsersFromFile();
        foreach ($users as $userdata) {
            if ($userdata[0] == $username) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if email-address exists in the DB
     * @param string $email email address
     * @return boolean true if email-address exists
     */
    public function email_exists($email) {
        if (empty($email)) {
            return false;
        }
        $users = self::getUsersFromFile();
        foreach ($users as $userdata) {
            if ($userdata[2] == $email) {
                return true;
            }
        }
        return false;
    }

    /*
     * Adds new user to DB, encrypts the password
     * @param $username string the new user-name
     * @param $password string then new password
     * @param $email string optional email for password recovery
     */

    function createUser($username, $password, $email = NULL) {
        if (empty($username) || empty($password)) {
            exit(json_encode("empty"));
        }

        if (self::username_exists($username)) {
            exit(json_encode("exists"));
        }

        if (self::email_exists($email)) {
            exit(json_encode("email-exists"));
        }

        file_put_contents(self::DB_USERS, $username . " " . $password . " " . $email . "\n", FILE_APPEND | LOCK_EX);
        self::writeUpdateTime($username);

        exit(json_encode("true"));
    }

    /**
     * Sends email message with a link to reset password
     * @param $email the email address to send the message to
     */
    function sendPasswordResetMail($email) {
        $users = self::getUsersFromFile();
        //print_r($users);

        foreach ($users as $userdata) {
            if ($userdata[2] == $email) {
                $headers = 'MIME-Version: 1.0' . "\r\n";
                $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                $subject = "Request to reset passwor from mini-site";
                $message = "<html><head><title>Request to reset password from mini-site</title></head>";
                $message .= "<body style=\"direction:rtl;\">על מנת לאפס את הסיסמה לחץ על הקישור:<br>";
                $message .= "<a href=\"http://";
                $message .= $_SERVER["HTTP_HOST"];
                $message .= "/mini-site/request-password-reset-final.php?username=";
                $message .= $userdata[0];
                $message .= "\">אפס סיסמה</a></body></html>";
                mail($email, $subject, $message, $headers);
            }
        }
        exit(json_encode("true"));
    }

    /**
     * Resets the password for a user to '1111'
     * @param $username the username who needs password resetting
     */
    function sendPasswordResetMailFinal($username) {
        $users = self::getUsersFromFile();
        foreach ($users as $ukey => $userdata) {
            if ($userdata[0] == $username) {
                $users[$ukey][1] = "1111"; // reset password to 1111
                self::writeUsersToFile($users);
                self::writeUpdateTime($username);
                $message = "<html><head><title>Request to reset password from mini-site</title></head>";
                $message .= "<body style=\"direction:rtl;\"><h1>הסיסמה אופסה בהצלחה !</h1>";
                $message .= "<p>הסיסמה כעת היא: 1111</p>";
                $message .= "</body></html>";
                exit($message);
            }
        }
        $message = "<html><head><title>Request to reset password from mini-site</title></head>";
        $message .= "<body style=\"direction:rtl;\"><h1>.תקלה בשרת: הסיסמה לא אופסה</h1>";
        $message .= "</body></html>";
        exit($message);
    }

    /**
     * Update email address for a user
     * @param $username which username
     * @param $email the new email
     */
    function updateMail($username, $email) {
        if (self::email_exists($email)) {
            exit(json_encode("email-exists"));
        }
        $users = self::getUsersFromFile();
        foreach ($users as $ukey => $userdata) {
            if ($userdata[0] == $username) {
                $users[$ukey][2] = $email;
                self::writeUsersToFile($users);
                self::writeUpdateTime($username);
                exit(json_encode("true"));
            }
        }
    }

    /**
     * Update password for a user
     * @param $username which username
     * @param $password the new password
     */
    function updatePassword($username, $password) {
        $users = self::getUsersFromFile();
        foreach ($users as $ukey => $userdata) {
            if ($userdata[0] == $username) {
                $users[$ukey][1] = $password;
                self::writeUsersToFile($users);
                self::writeUpdateTime($username);
                exit(json_encode("true"));
            }
        }
    }

    /**
     * Logout user and Delete account
     * @param $username which username
     */
    function deleteUser($username) {
        $users = self::getUsersFromFile();
        foreach ($users as $ukey => $userdata) {
            if ($userdata[0] == $username) {
                unset($users[$ukey]); // delete array member
                self::writeUsersToFile($users);
                self::deleteUpdateTime($username);
                self::logoutUser($username);
                exit(json_encode("true"));
            }
        }
    }

    /**
     * Deletes username record from DB_UPDATES
     * @param $username the username to delete
     */
    public function deleteUpdateTime($username) {
        $changes = self::getFileLines(self::DB_UPDATES);
        foreach ($changes as $ckey => $cval) {
            if ($cval[0] == $username) {
                unset($changes[$ckey]);
            }
        }
        file_put_contents(self::DB_UPDATES, "", LOCK_EX); // overwrite DB_UPDATES file
        foreach ($changes as $ckey => $cval) {
            file_put_contents(self::DB_UPDATES, implode(" ", $cval) . "\n", FILE_APPEND | LOCK_EX);
        } // append user to DB_USERS file
    }

    /**
     * Writes username and time it was created or updated to DB_UPDATES
     * @param $username the username for whom to write the time
     */
    public function writeUpdateTime($username) {
        /* If server's time-zone needs to be set: */
        /* date_default_timezone_set('Asia/Jerusalem'); */

        $changes = self::getFileLines(self::DB_UPDATES);

        foreach ($changes as $ckey => $cval) {
            if ($cval[0] == $username) {
                unset($changes[$ckey]);
            }
        }

        $timestring = date("Y-m-d H:i:s");

        $changes[] = array($username, $timestring);

        file_put_contents(self::DB_UPDATES, "", LOCK_EX); // overwrite DB_UPDATES file
        foreach ($changes as $ckey => $cval) {
            file_put_contents(self::DB_UPDATES, implode(" ", $cval) . "\n", FILE_APPEND | LOCK_EX);
        } // append user to DB_USERS file
    }

    /**
     * Return the time a user was created or updated
     * @param $username the username for whom to fetch the time
     * @return string of time formatted as: 'yyyy-mm-dd hh:mm:ss'
     */
    public function getUpdateTime($username) {
        $changes = self::getFileLines(self::DB_UPDATES);
        foreach ($changes as $ckey => $cval) {
            if ($cval[0] == $username) {
                return ($cval[1] . " " . $cval[2]);
            }
        }
        return null;
    }

}

/* class UserManager */

?>
