<?php
include_once('../utils.php');
loadEnvSecretKey();
use Firebase\JWT\JWT;

$userId = $_SESSION['userId'];
$username = $_SESSION['username'];
$secretKey = getenv('JWT_SECRET_TOKEN');

$tokenPayload = array(
    "userId" => $userId,
    "username" => $username
);

$jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
echo json_encode(array("token" => $jwt));

?>