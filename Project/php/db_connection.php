<?php
$conn = new mysqli('localhost', 'root', '', 'dashboard');
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}
?>
