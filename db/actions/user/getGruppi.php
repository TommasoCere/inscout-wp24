<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');

$query = "SELECT * FROM GRUPPI";
$result = $driver ->executeQuery($query);
$gruppi = array();
// Ottieni i dati e aggiungili all'array $gruppi
while ($row = mysqli_fetch_assoc($result)) {
    $gruppi[] = $row;
}
$conn->close();
header('Content-Type: application/json');
echo json_encode($gruppi);
?>