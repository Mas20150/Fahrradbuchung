<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verbindung zur Datenbank herstellen
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'dashboard';

$conn = new mysqli($host, $user, $password, $dbname);

// Prüfen, ob die Verbindung erfolgreich ist
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage, um spezifische Spalten aus der Tabelle auszuwählen
$sql = "SELECT StationName AS titel, Latitude AS longitude, Longitude AS latitude FROM Fahrradstationen";
$result = $conn->query($sql);

$markers = [];

// Daten in ein Array umwandeln
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $markers[] = $row;
    }
}

// JSON-Antwort senden
header('Content-Type: application/json');
echo json_encode($markers);

$conn->close();
?>