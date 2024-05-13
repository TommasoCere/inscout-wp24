<?php
    use entities\Like;

    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');

    try {
        $request = json_decode(file_get_contents('php://input'), true);
        $idPost = $request["postId"];

        $like = new Like($username, $idPost);
        $like->update($driver);

        // mandare notifica

    } catch (\Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Error while liking post: " . $e->getMessage()));
        exit();
    }

?>