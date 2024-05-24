<?php

    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
    use entities\Post;

    if(isset($_GET["user"])) {
        $user = $_GET["user"];
    } else {
        $user = $username;
    }

    $sql = "SELECT *
    FROM POST
    WHERE usernameAutore = ?
    ORDER BY dataPubblicazione DESC";
    try {
        $result = $driver->executeQuery($sql, $user);
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