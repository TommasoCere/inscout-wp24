<?php
include_once('../php/connection.php');
$query = "SELECT * FROM GRUPPI";
$result = mysqli_query($conn, $query);
$gruppi = array();
// Ottieni i dati e aggiungili all'array $gruppi
while ($row = mysqli_fetch_assoc($result)) {
    $gruppi[] = $row;
}
$conn->close();
header('Content-Type: application/json');
echo json_encode($gruppi);
?>