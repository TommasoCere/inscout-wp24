<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');

loadEnvSecretKey();

use Firebase\JWT\JWT;


function getToken($username, $cittaGruppo)
{
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
