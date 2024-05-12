<?php 
use entities\User;

require_once("./../bootstrap.php");
require_once("./../entities.php");
include_once('./../../php/request/getDataToken.php');

global $driver;
global $username;

$data = getDataToken();
$data = json_decode($data, true);

$username = $data['username'];

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