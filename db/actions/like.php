<?php
    use entities\Like;

    require_once ("./../bootstrap.php");
    require_once ("./../entities.php");
    include_once('./../../php/request/getDataToken.php');


    global $driver;
    global $username;

    $data = getDataToken();
    $data = json_decode($data, true);

    $username = $data['username'];

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