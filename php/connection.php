<?php
// Includi il file di configurazione
include_once('utils.php');
loadEnv();

// console log
$conn = mysqli_connect(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASSWORD'), getenv('DB_NAME'), getenv('DB_PORT'));

// Verifica della connessione
if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}
?>
