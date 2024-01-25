<?php
include_once('../../../php/connection.php');
include_once('../../../php/request/getDataToken.php');
$data = getDataToken();
$data = json_decode($data, true);
if ($data['success']) {
    $sql = "SELECT * FROM UTENTI WHERE username = '" . $data['username'] . "'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $nome = $row['nome'];
    $cognome = $row['cognome'];
    $cittaGruppo = $row['cittaGruppo'];
    $username = $row['username'];
    header('Content-type: application/json');
    echo json_encode(array("success" => true, "nome" => $nome, "cognome" => $cognome, "cittaGruppo" => $cittaGruppo, "username" => $username));
} else {
    echo json_encode(array("success" => false, "message" => $data['message']));
}
?>