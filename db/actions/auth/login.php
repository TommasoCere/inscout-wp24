<?php
    $user = $_POST['username'] ?? '';
    $pw = $_POST['password'] ?? '';
    
    require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
    
    // Usa istruzioni preparate per prevenire SQL injection
    $stmt = $driver->getConn()->prepare("SELECT * FROM UTENTI WHERE username = ? AND password = ?");
    $stmt->bind_param('ss', $user, $pw);
    $stmt->execute();
    $result = $stmt->get_result();


    // Controlla se l'utente esiste
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cittaGruppo = $row['cittaGruppo'];
        $username = $row['username'];
        include_once($DB_ROOT_PATH . 'actions' . DIRECTORY_SEPARATOR . 'auth' . DIRECTORY_SEPARATOR . 'token.php');
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
