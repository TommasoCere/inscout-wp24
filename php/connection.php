<?php

$ip = "93.71.189.146";
$usr = "admin";
$pswd = "DatabaseInscout";
$dbname = "inscout";

// Crea connessione
$conn = mysqli_connect($ip, $usr, $pswd, $dbname);

// Verifica della connessione
if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}
