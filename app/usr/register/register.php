<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $branca = $_POST['branca'];
    $cittaGruppo = $_POST['cittaGruppo'];
    $numeroGruppo = $_POST['numeroGruppo'];

    // Includi il file di configurazione
    include_once('../../../php/connection.php');
    // Query
    $sql = "INSERT INTO UTENTI (username, password, email, nome, cognome, branca, cittàGruppo, numeroGruppo) VALUES ('$username', '$password', '$email', '$nome', '$cognome', '$branca', '$cittaGruppo', '$numeroGruppo')";
    //echo $sql;
    $result = mysqli_query($conn, $sql);
    $conn->close();
    // Controlla se è andato a buon fine
    if ($result) {
        // Imposta la sessione
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        echo json_encode(['success' => true]);
    } else {
        // Redirect al login
        echo json_encode(['success' => false, 'error' => 'Errore nella registrazione']);
    }
?>