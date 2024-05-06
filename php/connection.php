<?php

require_once('./utils.php');
loadEnv();

$ip = getenv('DB_HOST');
$usr = getenv('DB_USER');
$pswd = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');

// Crea connessione
$conn = mysqli_connect($ip, $usr, $pswd, $dbname);

// Verifica della connessione
if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}
