<?php

include_once('../../../php/connection.php');

$query = "SELECT * FROM GRUPPI";
echo $query;
$result = mysqli_query($conn, $query);
$gruppi = array();
echo json_encode($gruppi);