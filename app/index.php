<?php

require_once(__DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . 'db' . DIRECTORY_SEPARATOR . 'bootstrap.php');

if($username == null) {
    header("Location: ./auth/login/login.html");
    exit();
} else {
    header("Location: ./home/home.html");
    exit();
}


?>