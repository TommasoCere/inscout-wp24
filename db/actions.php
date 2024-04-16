<?php

class Actions {

    /**
     * get a post from the database
     * @param DBDriver $db
     * @param int $id
     * @return Post
     * @throws Exception
     */
    public static function getPost(DBDriver $db, $id) {
        $sql = "SELECT * FROM post WHERE id = ?";
        try {
            $result = $db->executeQuery($sql, $id); 
        } catch (Exception $e) {
            throw new Exception ("Error in query: " . $e->getMessage());
        }
        if ($result->num_rows == 0) {
            throw new Exception("Post not found");
        }
        $row = $result->fetch_assoc();
        return new Post($row['id'], $row['immagine'], $row['dataPubblicazione'], $row['testo'], $row['nLikes'], $row['usernameAutore']);
    }

    /**
     * get posts by author
     * @param DBDriver $db
     * @param string $username
     * @return array
     * @throws Exception
     */
    public static function getPostsByAuthor(DBDriver $db, $username) {
        $sql = "SELECT * FROM post WHERE usernameAutore = ?";
        try {
            $result = $db->executeQuery($sql, $username); 
        } catch (Exception $e) {
            throw new Exception ("Error in query: " . $e->getMessage());
        }
        if ($result->num_rows == 0) {
            throw new Exception("No posts found");
        }
        $posts = array();
        while ($row = $result->fetch_assoc()) {
            $posts[] = new Post($row['id'], $row['immagine'], $row['dataPubblicazione'], $row['testo'], $row['nLikes'], $row['usernameAutore']);
        }
        return $posts;
    }
}

?>