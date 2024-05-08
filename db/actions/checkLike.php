<?php 
use entities\User;

require_once("./../bootstrap.php");
require_once("./../entities.php");

global $driver;
global $username;
$username = "Francesco";
$post =  $_GET["postId"];

$sql = "SELECT * 
FROM likes
WHERE username = ? AND idPost = ?";

try {
    $result = $driver->executeQuery($sql, $username, $post);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$result = $result->fetch_array();

if (!($result == null)) {
    echo json_encode(array("message" => "Like exists"), JSON_PRETTY_PRINT);
} else {
    echo json_encode(array("message" => "Like does not exist"), JSON_PRETTY_PRINT);
}
?>