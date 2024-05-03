<?php
/**
 * This file is used to include all the files that are needed in every request
 * It is included in every request
 * It includes the db driver, the cors file and the autoload file
 * It also sets the domain variable that is used to set the domain in the cookies
 */
require_once("./../dbdriver.php");
require_once("./../../vendor/autoload.php");
require_once("./../cors.php");

$driver = new DBDriver("localhost", "root", "", "inscout");
$driver->connect();
try {
    $driver->connect();
} catch (Exception $e) {
    throw new Exception("Error while connecting to the database: " . $e->getMessage());
}

$domain = $_SERVER['HTTP_HOST'];
if ($domain == "localhost")
    $domain = "http://localhost";
else {
    $domain = "https://partylinker.live";
}
?>