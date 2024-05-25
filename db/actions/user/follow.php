<?php

require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');

$follower =  $username;

$sql = "INSERT INTO FOLLOW (usernameSeguace, usernameSeguito) VALUES (?, ?)";
try {
    $request = json_decode(file_get_contents('php://input'), true);
    $followed = $request["followed"];
    $driver->executeQuery($sql, $follower, $followed);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error while following: " . $e->getMessage()));
    exit();
}

?>