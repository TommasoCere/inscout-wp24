<?php
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php');
require_once(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'utils.php');
loadEnvSendGrid();

$userEmail = $_POST['userEmail'];
$username = $_POST['username'];
$subject = $_POST['subject'];
$text1 = $_POST['text1'];
$text2 = $_POST['text2'];
$textButton = $_POST['textButton'];
$linkButton = $_POST['linkButton'];
$color = $_POST['color'];
$color = "style= \"background-color: " . $color . "; width: 320px; padding: 40px 40px 40px 40px\" ";

$fileHtml = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'template' . DIRECTORY_SEPARATOR . 'email.html');
$fileHtml = str_replace('{{text1}}', $text1, $fileHtml);
$fileHtml = str_replace('{{text2}}', $text2, $fileHtml);
$fileHtml = str_replace('{{textButton}}', $textButton, $fileHtml);
$fileHtml = str_replace('{{linkButton}}', $linkButton, $fileHtml);
$fileHtml = str_replace('{{callColor}}', $color, $fileHtml);

$email = new \SendGrid\Mail\Mail();
$email->setFrom("info@inscout.me", "Inscout");
$email->setSubject($subject);
$email->addTo($userEmail, $username);
$email->addContent("text/html", $fileHtml);
$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
try {
    $response = $sendgrid->send($email);
    echo json_encode(array('success' => true, 'message' => 'Email inviata con successo. Email: ' . $userEmail));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Errore durante l\'invio dell\'email'));
}
