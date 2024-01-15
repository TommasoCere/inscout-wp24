<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $branca = $_POST['branca'];
    $gruppo = $_POST['gruppo'];

    // Includi il file di configurazione
    include_once('../../../php/connection.php');
    // Query
    $sql = "INSERT INTO UTENTI (username, password, email, nome, cognome, branca, gruppoDiAppartenenza) VALUES ('$username', '$password', '$email', '$nome', '$cognome', '$branca', '$gruppo')";
    //echo $sql;
    $result = mysqli_query($conn, $sql);
    $conn->close();
    // Controlla se è andato a buon fine
    if ($result) {
        // Imposta la sessione
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        // Redirect alla dashboard
        header("Location: ../login/index.php");
    } else {
        // Redirect al login
        echo "Errore nella registrazione";
    }
?>