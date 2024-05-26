<?php
session_start();

// Cancella il cookie di sessione
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Distrugge la sessione
session_destroy();

// Cancella il cookie "token"
setcookie('token', '', time() - 31536000, "/");

// Cancella il cookie "loggedUsername"
setcookie('loggedUsername', '', time() - 31536000, "/");

// Cancella il cookie PHPSESSID
setcookie('PHPSESSID', '', time() - 3600, '/');

// Invia una risposta JSON
echo json_encode(['success' => true, 'message' => 'Logout effettuato']);
?>
