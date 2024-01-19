<?php
session_start();
session_destroy();
setcookie('token', '', time() - 31536000, "/");
echo json_encode(['success' => true, 'message' => 'Logout effettuato']);
?>