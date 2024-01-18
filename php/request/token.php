<?php
include_once(__DIR__ . '/../utils.php');
loadEnvSecretKey();

use Firebase\JWT\JWT;

function getToken() {
    $userId = $_SESSION['userId'];
    $username = $_SESSION['username'];
    $secretKey = getenv('JWT_SECRET_TOKEN');

    $tokenPayload = array(
        "userId" => $userId,
        "username" => $username
    );
    $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
    return $jwt;
}
