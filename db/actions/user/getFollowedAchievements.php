<?php

require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
use entities\Achievement;

$sql = "SELECT u.fotoProfilo, c.titolo, c.username
FROM CONQUISTE c, UTENTI u
WHERE c.username = u.username and c.username in
        (SELECT usernameSeguito
        FROM FOLLOW
        WHERE usernameSeguace = ?)";

try {
    $result = $driver->executeQuery($sql, $username);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}

$achievements = array();
    if ($result->num_rows > 0) {
        for ($i = 0; $i < $result->num_rows; $i++) {
            $row = $result->fetch_array();
            $achievement = new Achievement(
                $row['username'],
                $row["titolo"],
                $row["fotoProfilo"]
            );
            array_push($achievements, $achievement);
        }
    }
    echo json_encode($achievements, JSON_PRETTY_PRINT);





?>