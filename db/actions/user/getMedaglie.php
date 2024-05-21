<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');

use entities\Achievement;


if(isset($_GET["user"])) {
    $user = $_GET["user"];
} else {
    $user = $username;
}


// selezione le medaglie dell'utente
$sql = "SELECT CONQUISTE.*
FROM CONQUISTE
WHERE CONQUISTE.username = ?";
try {
    $result = $driver->executeQuery($sql, $user);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$medaglie = array();
if ($result->num_rows > 0) {
    for ($i = 0; $i < $result->num_rows; $i++) {
        $row = $result->fetch_array();
        $medaglia = new Achievement($row['username'], $row['titolo']);
        array_push($medaglie, $medaglia);
    }
}
echo json_encode(array("success" => true, "medaglie" => $medaglie));
