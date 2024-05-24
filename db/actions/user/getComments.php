<?php

    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
    use entities\Comment;

    $post =  $_GET["postId"];
    $sql = "SELECT u.fotoProfilo, c.usernameAutore, c.idPost, c.id, c.testo
    FROM COMMENTI c, UTENTI u
    WHERE c.usernameAutore = u.username AND c.idPost = ?";

    try {
        $result = $driver->executeQuery($sql, $post);
    } catch (\Exception $e) {
        throw new \Exception("Error while querying the database: " . $e->getMessage());
    }

    $comments = array();
        if ($result->num_rows > 0) {
            for ($i = 0; $i < $result->num_rows; $i++) {
                $row = $result->fetch_array();
                $comment = new Comment(
                    $row['usernameAutore'],
                    $row['fotoProfilo'],
                    $row['idPost'],
                    $row['id'],
                    $row['testo']
                );
                array_push($comments, $comment);
            }
        }
        echo json_encode($comments, JSON_PRETTY_PRINT);
?>