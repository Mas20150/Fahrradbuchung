<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verbindung zur Datenbank herstellen
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'dashboard';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

$type = $_GET['type'] ?? 'start';

if ($type === 'start') {
    $sql = "SELECT Start_Station AS titel, Start_Lat AS longitude, Start_Long AS latitude FROM Fahrradbuchungen";
} elseif ($type === 'end') {
    $sql = "SELECT  Ende_Station AS titel, Ende_Lat AS longitude, Ende_Long AS latitude FROM Fahrradbuchungen";
} elseif ($type === 'all') {
    $sql = "SELECT DISTINCT Start_Station AS titel, Start_Lat AS latitude, Start_Long AS longitude 
        FROM Fahrradbuchungen
        UNION
        SELECT DISTINCT Ende_Station AS titel, Ende_Lat AS latitude, Ende_Long AS longitude 
        FROM Fahrradbuchungen";
}elseif ($type === 'allestationen'){
    $sql = "SELECT * FROM `Fahrradstationen`";
}elseif ($type === 'routing') {
    $sql = "SELECT 
        Start_Station AS start_titel, 
        Start_Long AS start_latitude, 
        Start_Lat AS start_longitude, 
        Ende_Station AS end_titel, 
        Ende_Long AS end_latitude, 
        Ende_Lat AS end_longitude, 
        COUNT(*) AS usage_count
    FROM Fahrradbuchungen
    WHERE Start_Lat IS NOT NULL AND Start_Long IS NOT NULL
      AND Ende_Lat IS NOT NULL AND Ende_Long IS NOT NULL
    GROUP BY Start_Station, Start_Lat, Start_Long, Ende_Station, Ende_Lat, Ende_Long
    ORDER BY usage_count DESC";
}



$result = $conn->query($sql);

$markers = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $markers[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($markers);

$conn->close();
?>