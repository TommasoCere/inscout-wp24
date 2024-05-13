<?php 
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
use entities\User;

$post =  $_GET["postId"];
$sql = "SELECT * 
FROM LIKES
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