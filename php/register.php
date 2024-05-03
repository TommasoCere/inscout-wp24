<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $branca = $_POST['branca'];
    $cittaGruppo = $_POST['cittaGruppo'];
    $numeroGruppo = $_POST['numeroGruppo'];

    $fotoProfilo = "defaultPic.jpg";

    // Includi il file di configurazione
    include_once('../php/connection.php');
    
    // controllo se l'utente esiste già
    $sql = "SELECT * FROM UTENTI WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    $num_row = mysqli_num_rows($result);
    if( $num_row >= 1 ) {
        echo json_encode(array('success' => false, 'message' => 'Username già in uso'));
    } else {
        // controllo se l'email esiste già
        $sql = "SELECT * FROM UTENTI WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        $num_row = mysqli_num_rows($result);
        // controllo se l'username esiste già
        $sql = "SELECT * FROM UTENTI WHERE username = '$username'";
        $result = mysqli_query($conn, $sql);
        $num_row += mysqli_num_rows($result);
        if( $num_row >= 1 ) {
            if ($num_row >= 2) {
                echo json_encode(array('success' => false, 'message' => 'Username già in uso'));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Email già in uso'));
            }
        } else {
            
            $target_dir = "/var/www/inscout-wp24/static/img/";
            $source = "http://localhost/static/img/user.jpg";
            $target = $username . "_" . $fotoProfilo;

            // inserisco l'utente nel database
            $sql = "INSERT INTO UTENTI (username, password, email, nome, cognome, branca, cittaGruppo, numeroGruppo, fotoProfilo) VALUES ('$username', '$password', '$email', '$nome', '$cognome', '$branca', '$cittaGruppo', '$numeroGruppo', '$target')";
            $result = mysqli_query($conn, $sql);
            if($result) {

                copy($source, $target_dir);
                //move_uploaded_file($source, $target_dir);

                echo json_encode(array('success' => true, 'message' => 'Registrazione avvenuta con successo'));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Errore durante la registrazione'));
            }
        }
    }
?>