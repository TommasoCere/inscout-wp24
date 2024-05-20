<?php

require_once("./../bootstrap.php");
require_once("./../entities.php");
use entities\User;

global $driver;
global $username;

$sql = "SELECT UTENTI.* FROM UTENTI";
try {
    $result = $driver->executeQuery($sql, $username);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$users = array();
if ($result->num_rows > 0) {
    for ($i = 0; $i < $result->num_rows; $i++) {
        $row = $result->fetch_array();
        $user = new User(
            $row['username'],
            $row["profilePicturePath"],
            $row["name"],
            $row["surname"],
            $row["email"],
            $row["password"],
            $row["section"],
            $row["groupCity"],
            $row["groupNumber"]
        );
        array_push($users, $user);
    }
}