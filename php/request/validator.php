<?php
include_once(__DIR__ . '/../utils.php');
loadEnvSecretKey();
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (isset($_COOKIE['token'])) {
    $token = $_COOKIE['token'];
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
?>