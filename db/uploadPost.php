<?php
include_once('../php/connection.php');
include_once('../php/request/getDataToken.php');

$data = getDataToken();
$data = json_decode($data, true);

if (isset($_FILES["image"]) && !empty($_FILES["image"]["tmp_name"] && $data['success'])) {

    $target_dir = "../static/img/upload/post/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower($_FILES["image"]["type"]);

    if ($imageFileType != "image/jpg" && $imageFileType != "image/png" && $imageFileType != "image/jpeg") {
        echo json_encode(array("success" => false, "message" => "Formato immagine non supportato: " . $imageFileType));
        exit();
    } else {
        $target_file = $target_dir . "post_" . $data['username'] . "_" . date("Y-m-d_H-i-s") . ".jpeg";
    }

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $commentText = $_POST["comment"];
        $sql = "INSERT INTO POST (usernameAutore, testo, immagine, dataPubblicazione, nLikes) VALUES ('" . $data['username'] . "', '" . $commentText . "', '" . $target_file . "', '" . date("Y-m-d H:i:s") . "', 0)";
        $conn->query($sql);
        echo json_encode(array("success" => true, "message" => "Post caricato con successo", "path" => $target_file));
    } else {
        echo json_encode(array("success" => false, "message" => "Errore durante il caricamento del post"));
    }
} else {

    echo json_encode(array("success" => false, "message" => "Errore durante il caricamento del post"));
}
