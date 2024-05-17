<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');

global $driver;
global $username;
$files_post = glob(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'static' . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'post' . DIRECTORY_SEPARATOR . 'post_' . $username . '_*');
$files_profile = glob(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'static' . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'profile' . DIRECTORY_SEPARATOR . 'profile_' . $username . '_*');
// elimino l'utente
$sql_delete_conquiste = "DELETE FROM CONQUISTE WHERE username = ?";
$sql_delete_like = "DELETE FROM LIKES WHERE username = ?";
$sql_delete_commenti = "DELETE FROM COMMENTI WHERE usernameAutore = ?";
$sql_delete_post = "DELETE FROM POST WHERE usernameAutore = ?";
$slq_delete_follow = "DELETE FROM FOLLOW WHERE usernameSeguito = ? OR usernameSeguace = ?";
$sql_delete_utente = "DELETE FROM UTENTI WHERE username = ?";
try {
    $result_delete_conquiste = $driver->executeQuery($sql_delete_conquiste, $username);
    $result_delete_like = $driver->executeQuery($sql_delete_like, $username);
    $result_delete_commenti = $driver->executeQuery($sql_delete_commenti, $username);
    $result_delete_post = $driver->executeQuery($sql_delete_post, $username);
    $result_delete_follow = $driver->executeQuery($slq_delete_follow, $username, $username);
    $result_delete_utente = $driver->executeQuery($sql_delete_utente, $username);
    try {
        // cancello i post dell'utente in locale
        foreach ($files_post as $file) {
            unlink($file);
        }
        // cancello l'immagine del profilo dell'utente in locale
        foreach ($files_profile as $file) {
            unlink($file);
        }
    } catch (\Exception $e) {
        throw new \Exception("Error while committing the transaction: " . $e->getMessage());
    }
} catch (\Exception $e) {
    throw new \Exception("Error while querying the database: " . $e->getMessage());
}
echo json_encode(array("success" => true, "message" => "Account eliminato con successo"));
?>