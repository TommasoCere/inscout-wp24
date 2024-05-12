<?php
/**
 * This file is used to include all the files that are needed in every request
 * It is included in every request
 * It includes the db driver, the cors file and the autoload file
 * It also sets the domain variable that is used to set the domain in the cookies
 */
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'php' . DIRECTORY_SEPARATOR . 'utils.php');
require_once(__DIR__ . DIRECTORY_SEPARATOR . 'dbDriver.php');
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php');
require_once(__DIR__ . DIRECTORY_SEPARATOR . 'cors.php');

loadEnv();

$driver = new DBDriver(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASSWORD'), getenv('DB_NAME'));
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