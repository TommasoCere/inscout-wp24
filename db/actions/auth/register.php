<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$nome = $_POST['nome'];
$cognome = $_POST['cognome'];
$branca = $_POST['branca'];
$cittaGruppo = $_POST['cittaGruppo'];
$numeroGruppo = $_POST['numeroGruppo'];

$fotoProfilo = "";

// controllo se l'utente esiste già
$sql = "SELECT * FROM UTENTI WHERE username = '$username'";
$result = $driver->executeQuery($sql);
$num_row = mysqli_num_rows($result);
if ($num_row >= 1) {
    echo json_encode(array('success' => false, 'message' => 'Username già in uso'));
} else {
    // controllo se l'email esiste già
    $sql = "SELECT * FROM UTENTI WHERE email = '$email'";
    $result = $driver->executeQuery($sql);
    
    $num_row = mysqli_num_rows($result);
    // controllo se l'username esiste già
    $sql = "SELECT * FROM UTENTI WHERE username = '$username'";
    $result = $driver->executeQuery($sql);
    
    $num_row += mysqli_num_rows($result);
    if ($num_row >= 1) {
        if ($num_row >= 2) {
            echo json_encode(array('success' => false, 'message' => 'Username già in uso'));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Email già in uso'));
        }
    } else {
        try {
            $sql = "INSERT INTO UTENTI (username, password, email, nome, cognome, branca, cittaGruppo, numeroGruppo, fotoProfilo) VALUES ('$username', '$password', '$email', '$nome', '$cognome', '$branca', '$cittaGruppo', '$numeroGruppo', '$fotoProfilo')";
            $result = $driver->executeQuery($sql);
            echo json_encode(array('success' => true, 'message' => 'Registrazione avvenuta con successo'));
        } catch (\Exception $e) {
            echo json_encode(array('success' => false, 'message' => $e->getMessage()));
        }
    }
}
?>