<?php
/**
 * This file is used to include all the files and global variables that are needed in every request.
 * It is included in every request
 * It includes the db driver, the cors file and the autoload file
 * It also sets the domain variable that is used to set the domain in the cookies
 */

$DB_ROOT_PATH = __DIR__ . DIRECTORY_SEPARATOR;

require_once($DB_ROOT_PATH . 'utils.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'dbDriver.php');
require_once($DB_ROOT_PATH . '..' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php');
require_once($DB_ROOT_PATH . 'cors.php');
require_once($DB_ROOT_PATH . 'actions' . DIRECTORY_SEPARATOR . 'auth' . DIRECTORY_SEPARATOR . 'getDataToken.php');
loadEnv();
$driver = new DBDriver(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASSWORD'), getenv('DB_NAME'));
try {
    $driver->connect();
} catch (Exception $e) {
    throw new Exception("Error while connecting to the database: " . $e->getMessage());
}
/*
$data = getDataToken();
$data = json_decode($data);
if($data->success){
    $username = $data->username;
}   
else {
    $username = null;
} */

$username = $_COOKIE['loggedUsername'] ?? null;
 
global $DB_ROOT_PATH;
global $driver;
global $username;






?>