<?php 
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');

$followed =  $_GET["followed"];
$sql = "SELECT * FROM FOLLOW WHERE usernameSeguace = ? AND usernameSeguito = ?";

try {
    $result = $driver->executeQuery($sql, $username, $followed);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$result = $result->fetch_array();

if (!($result == null)) {
    echo json_encode(array("message" => "follow exists"), JSON_PRETTY_PRINT);
} else {
    echo json_encode(array("message" => "follow does not exist"), JSON_PRETTY_PRINT);
}

?>