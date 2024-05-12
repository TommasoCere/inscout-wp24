<?php 
use entities\User;

require_once("./../bootstrap.php");
require_once("./../entities.php");

global $driver;

$user =  $_GET["user"];

$sql = "SELECT * 
FROM UTENTI
WHERE username = ?";
try {
    $result = $driver->executeQuery($sql, $user);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$result = $result->fetch_array();
$user = new User(
    $result['username'],
    $result['fotoProfilo'],
    $result['nome'],
    $result['cognome'],
    $result['email'],
    $result['password'],
    $result['branca'],
    $result['cittaGruppo'],
    $result['numeroGruppo']   
);

echo json_encode($user, JSON_PRETTY_PRINT);
?>

