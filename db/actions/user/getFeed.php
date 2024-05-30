<?php

    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
    use entities\Post;


    $max_posts = 20;

    $sql = "SELECT p.*, u.fotoProfilo
            FROM POST p JOIN UTENTI u ON p.usernameAutore = u.username
            WHERE p.usernameAutore IN
            (SELECT f.usernameSeguito FROM FOLLOW f WHERE f.usernameSeguace = ?)
            OR p.usernameAutore = ?
            ORDER BY p.dataPubblicazione DESC
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
                $row["usernameAutore"],
                $row["fotoProfilo"]
            );
            array_push($posts, $post);
        }
    }
    echo json_encode($posts, JSON_PRETTY_PRINT);


?>