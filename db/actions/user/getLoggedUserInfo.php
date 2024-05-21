<?php 
use entities\User;

require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');

$data = getDataToken();
$data = json_decode($data, true);
if ($data['success']) {
    $sql = "SELECT * FROM UTENTI WHERE username = '" . $data['username'] . "'";
    $result = $driver->executeQuery($sql);
    $row = $result->fetch_assoc();
    $nome = $row['nome'];
    $cognome = $row['cognome'];
    $cittaGruppo = $row['cittaGruppo'];
    $numeroGruppo = $row['numeroGruppo'];
    $branca = $row['branca'];
    $username = $row['username'];
    $fotoProfilo = $row['fotoProfilo'];
    header('Content-type: application/json');
    echo json_encode(array("success" => true, "name" => $nome, "surname" => $cognome, "groupCity" => $cittaGruppo, "groupNumber" => $numeroGruppo, "username" => $username, "profilePicturePath" => $fotoProfilo, "section" => $branca));
} else {
    echo json_encode(array("success" => false, "message" => $data['message']));
}
?>