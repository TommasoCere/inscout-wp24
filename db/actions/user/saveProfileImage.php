<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once($DB_ROOT_PATH . 'actions' . DIRECTORY_SEPARATOR . 'auth' . DIRECTORY_SEPARATOR . 'getDataToken.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getDataToken();
    $data = json_decode($data, true);

    if (isset($_FILES["file"]) && $data['success']) {
        $target_dir = "../../../static/img/upload/profile/";
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            echo json_encode(array("success" => false, "message" => "Formato immagine non supportato"));
            exit();
        } else {
            $target_file = $target_dir . "avatar_" . $data['username'] . "." . $imageFileType;
            $sql = "SELECT fotoProfilo FROM UTENTI WHERE username = '" . $data['username'] . "'";
            $result = $driver->executeQuery($sql);
            $row = $result->fetch_assoc();
            $oldFile = $row['fotoProfilo'];
            if ($oldFile != "") {
                unlink($oldFile);
            }
        }
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            $sql = "UPDATE UTENTI SET fotoProfilo = '" . $target_file . "' WHERE username = '" . $data['username'] . "'";
            $driver->executeQuery($sql);
            echo json_encode(array("success" => true, "message" => "Immagine caricata con successo", "path" => $target_file));
        } else {
            echo json_encode(array("success" => false, "message" => "Errore durante il caricamento dell'immagine"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Errore durante il caricamento dell'immagine"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Metodo non supportato"));
}