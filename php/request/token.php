<?php

include_once('vendor/autoload.php');
$token = array(
    'username' => $user['username']
);
//$token = \Firebase\JWT\JWT::encode($token, getenv('JWT_SECRET'));
echo json_encode(array('token' => $token));

?>