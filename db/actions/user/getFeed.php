<?php

    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
    use entities\Post;


    $max_posts = 20;

    $sql = "SELECT *
    FROM POST
    WHERE usernameAutore IN (
        SELECT usernameSeguito
        FROM FOLLOW
        WHERE usernameSeguace = ?)
    OR usernameAutore = ?
    ORDER BY dataPubblicazione DESC
    LIMIT ?";
    try {
        $result = $driver->executeQuery($sql, $username, $username, $max_posts);
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