<?php




    require_once ("./../bootstrap.php");
    require_once ("./../entities.php");
    use entities\Post;
    include_once('../php/request/getDataToken.php');
    $data = getDataToken();
    $data = json_decode($data, true);

    global $driver;

    $username = $data['username'];

    $max_posts = 20;

    $sql = "SELECT *
    FROM post
    WHERE usernameAutore IN (
        SELECT usernameSeguito
        FROM follow
        WHERE usernameSeguace = ?)
    ORDER BY dataPubblicazione DESC
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