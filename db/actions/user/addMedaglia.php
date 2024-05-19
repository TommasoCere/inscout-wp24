<?php

require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');

global $driver;
global $username;

// aggiungo la medaglia all'utente
$sql = "INSERT INTO CONQUISTE (username, titolo) VALUES (?, ?)";
try {
    $result = $driver->executeQuery($sql, $username, $_POST['titolo']);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
echo json_encode(array("success" => true, "message" => "Medaglia aggiunta con successo"));
?>