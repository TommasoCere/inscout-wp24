<?php
// Includi il file di configurazione
include_once('config.php');

// Creazione della connessione
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Verifica della connessione
if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}
?>
