<?php
include_once(__DIR__ . '/../utils.php');
loadEnvSecretKey();

use Firebase\JWT\JWT;
require __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

function getToken() {
    $cittaGruppo = $_SESSION['cittaGruppo'];
    $username = $_SESSION['username'];
    $secretKey = getenv('JWT_SECRET_TOKEN');
    // scadenza dopo un anno
    $expTime = time() + 31536000;

    $tokenPayload = array(
        "cittaGruppo" => $cittaGruppo,
        "username" => $username,
        "exp" => $expTime
    );
    $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
    return $jwt;
}
