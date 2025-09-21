// Karte initialisieren
const map = L.map('map').setView([50.1109, 8.6821], 12); // Standardposition (z. B. Frankfurt)

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// Cluster-Gruppen für Startstationen
const endMarkers = L.markerClusterGroup();
const addedEndStations = new Set();

// Cluster-Gruppen für Endstationen
const startMarkers = L.markerClusterGroup();
const addedStartStations = new Set();


// Cluster-Gruppe für alle Stationen
const allMarkers = L.markerClusterGroup();
const addedAllStations = new Set();

// Cluster-Gruppen für alle Buchungen
const alleBuchungenMarkers = L.markerClusterGroup();
const addedAlleBuchungen = new Set();

// Portale-Cluster-Gruppen
// Cluster-Gruppe für IVR-Portal
const IVRMarkers = L.markerClusterGroup();
const iPhoneCABMarkers = L.markerClusterGroup();
const androidCABMarkers = L.markerClusterGroup();
const windowsMarkers = L.markerClusterGroup();
const lidlMarkers = L.markerClusterGroup();
const technikerMarkers = L.markerClusterGroup();
const iPhoneSHRMarkers = L.markerClusterGroup();
const androidSHRMarkers = L.markerClusterGroup();
const iPhoneKONMarkers = L.markerClusterGroup();

//Wochentag-Cluster-Gruppen
// Cluster-Gruppen für Samstag-Wochentag
const samstagMarkers = L.markerClusterGroup();
const sonntagMarkers = L.markerClusterGroup();
const montagMarkers = L.markerClusterGroup();
const dienstagMarkers = L.markerClusterGroup();
const mittwochMarkers = L.markerClusterGroup();
const donnerstagMarkers = L.markerClusterGroup();
const freitagMarkers = L.markerClusterGroup();


function searchAddress() {
    const address = document.getElementById('address-input').value; // Eingabe lesen

    if (!address) {
        alert('Bitte geben Sie eine Adresse ein.');
        return;
    }

    // API-Endpunkt von OpenStreetMap Nominatim
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(geocodingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert('Keine Ergebnisse gefunden. Bitte versuchen Sie eine andere Adresse.');
                return;
            }

            // Ersten Treffer verwenden
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            // Karte auf die Koordinaten zentrieren
            map.setView([lat, lon], 15); // 15 ist die Zoomstufe

            // Marker hinzufügen
            const marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(`<b>Gefundene Adresse:</b><br>${data[0].display_name}`).openPopup();
        })
        .catch(error => {
            console.error('Fehler beim Geocoding:', error);
            alert('Es gab ein Problem bei der Adresssuche. Bitte versuchen Sie es später erneut.');
        });
}

