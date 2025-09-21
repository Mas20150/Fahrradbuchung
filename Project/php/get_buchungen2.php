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

$type = $_GET['type'] ?? 'IVR';

// SQL-Query basierend auf dem Typ erstellen
$sql = '';
switch ($type) {
    case 'IVR':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'IVR'";

        break;
    case 'iPhoneCAB':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'iPhone CAB'";
        break;
    case 'AndroidCAB':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'Android CAB'";
        break;
    case 'Windows':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'Windows'";
        break;
    case 'LIDL-BIKE':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'LIDL-BIKE'";
        break;
    case 'TechnikerF_5(-67212-)':
            $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                    FROM Fahrradbuchungen 
                    WHERE Buchungsportal = 'Techniker F_5 (-67212-)'";
    break;
        
    case 'iPhoneSRH':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'iPhone SRH'";
        break;
    case 'AndroidSRH':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'Android SRH'";
        break;
    case 'iPhoneKON':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Buchungsportal = 'iPhone KON'";
        break;
    case 'Montag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Mo'";
        break;
    case 'Dienstag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Di'";
        break;
    case 'Mittwoch':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Mi'";
        break;
    case 'Donnerstag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Do'";
        break;
    case 'Freitag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Fr'";
        break;
    case 'Samstag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'Sa'";
        break;
    case 'Sonntag':
        $sql = "SELECT Start_Station AS titel, Ende_Station, Start_Lat AS longitude, Start_Long AS latitude, Ende_Lat, Ende_Long, Buchung_Start, Buchung_Ende, Buchungs_ID, Nutzer_ID, Fahrrad_ID, Buchungsportal, Wochentag
                FROM Fahrradbuchungen 
                WHERE Wochentag = 'So'";
        break;
    default:
        die("Ungültiger Typ: $type");
} 

// SQL-Query ausführen
$result = $conn->query($sql);
if (!$result) {
    die("Fehler bei der SQL-Abfrage: " . $conn->error);
}

// Ergebnisse verarbeiten
$markers = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $markers[] = $row;
    }
} else {
    die("Keine Ergebnisse gefunden!");
}

// JSON-Ausgabe
header('Content-Type: application/json');
echo json_encode($markers, JSON_PRETTY_PRINT);

// Verbindung schließen
$conn->close();
?>
