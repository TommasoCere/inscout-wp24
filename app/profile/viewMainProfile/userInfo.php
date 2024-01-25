<?php
include_once(__DIR__ . '/../../php/connection.php');
include_once(__DIR__ . '/../../php/request/getDataToken.php');
$data = getDataToken();
$data = json_decode($data, true);
if ($data['success']) {
    $sql = "SELECT * FROM UTENTI WHERE username = '" . $data['username'] . "'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $nome = $row['nome'];
    $cognome = $row['cognome'];
    $email = $row['email'];
    $cittaGruppo = $row['cittaGruppo'];
    header('Content-type: application/json');
    echo json_encode(array("success" => true, "nome" => $nome, "cognome" => $cognome, "email" => $email, "cittaGruppo" => $cittaGruppo));
} else {
    echo json_encode(array("success" => false, "message" => $data['message']));
}
?>