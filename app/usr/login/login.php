<?php
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Includi il file di configurazione
    include_once('../../../php/connection.php');
    
    // Usa istruzioni preparate per prevenire SQL injection
    $stmt = $conn->prepare("SELECT * FROM UTENTI WHERE username = ? AND password = ?");
    $stmt->bind_param('ss', $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    // Controlla se l'utente esiste
    if ($result->num_rows > 0) {
        // Imposta la sessione
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['userId'] = $result->fetch_assoc()['id'];
        include_once('../../../php/request/token.php');
        $token = getToken();
        echo json_encode(['success' => true, 'token' => $token]);
    } else {
        // Utente non trovato
        echo json_encode(['success' => false, 'message' => 'Password o username errati']);
    }
?>
