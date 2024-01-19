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
        $cittaGruppo = $result->fetch_assoc()['cittaGruppo'];
        include_once('../../../php/request/token.php');
        $token = getToken($username, $cittaGruppo);
        setcookie('token', $token, time() + (31536000), "/", "", false, true);
        header('Content-type: application/json');
        echo json_encode(['success' => true, 'message' => 'Accesso consentito']);
    } else {
        // Utente non trovato
        header('Content-type: application/json');
        echo json_encode(['success' => false, 'message' => 'Password o username errati']);
    }
?>
