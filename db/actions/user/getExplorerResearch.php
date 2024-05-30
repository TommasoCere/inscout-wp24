<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
use entities\User;

global $driver;

$ricerca =  $_REQUEST["stringaRicerca"];
//cosa devo scrivere nella barra di ricerca per passare il parametro stringaRicerca?

$sql="SELECT * FROM UTENTI WHERE UTENTI.username LIKE '".$ricerca."%'";
try {
    $result = $driver->executeQuery($sql);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
    echo $e;
}

$users = array();

if ($result->num_rows > 0) {
    for ($i = 0; $i < $result->num_rows; $i++) {
        $row = $result->fetch_array();
        $user = new User(
            $row['username'],
            $row['fotoProfilo'],
            $row['nome'],
            $row['cognome'],
            $row['email'],
            $row['password'],
            $row['branca'],
            $row['cittaGruppo'],
            $row['numeroGruppo'],
        );
        array_push($users, $user);
    }
    echo json_encode($users, JSON_PRETTY_PRINT);
}else{
    echo json_encode("Nessun utente trovato", JSON_PRETTY_PRINT);
}

?>