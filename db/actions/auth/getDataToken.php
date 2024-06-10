<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function getDataToken()
{
    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    loadEnvSecretKey();

    if (isset($_COOKIE['token'])) {
        $token = $_COOKIE['token'];
        try {
            $secretKey = getenv('JWT_SECRET_TOKEN');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            if ($decoded->exp > time()) {
                $username = $decoded->username;
                $cittaGruppo = $decoded->cittaGruppo;
                return json_encode(array("success" => true, "username" => $username, "cittaGruppo" => $cittaGruppo));
            } else {
                return json_encode(array("success" => false, "message" => "Token scaduto"));
            }
        } catch (Exception $e) {
            return json_encode(array("success" => false, "message" => "Accesso negato"));
        }
    } else {
        return json_encode(array("success" => false, "message" => "Token non trovato"));
    }
}
