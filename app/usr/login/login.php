<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Includi il file di configurazione
    include_once('../../../php/connection.php');
    echo "<script>console.log('Connessione al database riuscita');</script>";
    // Query
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    // Controlla se l'utente esiste
    if (mysqli_num_rows($result) > 0) {
        // Imposta la sessione
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        // Redirect alla dashboard
        header("Location: ../../dashboard.php");
    } else {
        // Redirect al login
        header("Location: ../../index.php");
    }
?>