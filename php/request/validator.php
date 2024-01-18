<?php
include_once('utils.php');
loadEnvSecretKey();
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$authHeader = apache_request_headers()['Authorization'];
if (isset($authHeader)) {
    $token = explode(' ', $authHeader)[1];
    if (count($tokenArray) == 2 && $tokenArray[0] == 'Bearer') {
        $token = $tokenArray[1];
    }
    try{
        $secretKey = getenv('JWT_SECRET_TOKEN');
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        if ($decoded->exp > time()) {
            $userId = $decoded->userId;
            $cittaGruppo = $decoded->cittaGruppo;
            echo json_encode(array("message" => "Accesso consentito"));
        } else {
            echo json_encode(array("message" => "Token scaduto"));
        }
    } catch (Exception $e) {
        echo json_encode(array("message" => "Accesso negato"));
    }
} else {
    echo json_encode(array("message" => "Token non trovato"));
}