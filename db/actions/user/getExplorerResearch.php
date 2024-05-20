<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
use entities\User;

echo "ciao";

global $driver;

$sql="SELECT * FROM UTENTI";

echo "ciao1";

try {
    $result = $driver->executeQuery($sql);
    echo "ciao1.1";
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
    echo $e;
}

$users = array();

echo "ciao2";

if ($result->num_rows > 0) {
    echo "ciao2.1";
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
        echo "ciao2.2";
    }
    echo json_encode($users, JSON_PRETTY_PRINT);
}

echo "ciao3";

?>