<?php
include_once('../../../php/connection.php');
$query = "SELECT * FROM GRUPPI";
$result = mysqli_query($conn, $query);
$gruppi = array();
// Ottieni i dati e aggiungili all'array $gruppi
while ($row = mysqli_fetch_assoc($result)) {
    $gruppi[] = $row;
}

// Converte l'array in JSON
$json = json_encode($gruppi);
echo $json;

$conn->close();
?>