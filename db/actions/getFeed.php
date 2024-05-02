<?php

require_once ("/db/dbEntity.php");
require_once ("/db/dbDriver.php");

global $driver;
$driver = new DBDriver("Localhost", "root", "", "inscout");
global $username;

$max_posts = 20;

$sql = "SELECT P.*, U.fotoProfilo
FROM post P, user U
WHERE P.usernameAutore IN (
    SELECT usernameSeguito
    FROM follow
    WHERE usernameSeguace = ?)
AND P.usernameAutore = U.username
ORDER BY P.dataPubblicazione DESC
LIMIT ?";
try {
    $result = $driver->executeQuery($sql, $username, $max_posts);
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
$posts = array();
if ($result->num_rows > 0) {
    for ($i = 0; $i < $result->num_rows; $i++) {
        $row = $result->fetch_array();
        $post = new Post(
            $row['id'],
            $row["immagine"],
            $row["dataPubblicazione"],
            $row["testo"],
            $row["nLikes"],
            $row["usernameAutore"]
        );
        array_push($posts, $post);
    }
}

echo json_encode($posts, JSON_PRETTY_PRINT);

?>