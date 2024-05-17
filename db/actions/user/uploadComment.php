<?php

require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'connection' . DIRECTORY_SEPARATOR . 'entities.php');
use entities\Comment;

try {
    $request = json_decode(file_get_contents('php://input'), true);
    $post = $request["post_id"];
    $content = $request["content"];

    $comment = new Comment($username, null, $post, null, $content);
    $comment->update($driver);
    

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error while commenting post: " . $e->getMessage()));
    exit();
}

?>