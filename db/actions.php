<?php

class Actions {

    public static function getPost(DBDriver $db, $id) {
        $sql = "SELECT * FROM post WHERE id = ?";
        try {
            $result = $db->executeQuery($sql, $id); 
        } catch (Exception $e) {
            return new Exception ("Error in query: " . $e->getMessage());
        }
        if ($result->num_rows == 0) {
            return new Exception ("Post not found");
        }
        $row = $result->fetch_assoc();
        return new Post($row['id'], $row['immagine'], $row['dataPubblicazione'], $row['testo'], $row['nLikes'], $row['usernameAutore']);
    }
}

?>