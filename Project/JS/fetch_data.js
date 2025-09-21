function loadAlleStationen() {
    // Überprüfe, ob die Marker-Gruppe bereits geladen ist
    if (alleBuchungenMarkers.getLayers().length > 0) {
        map.addLayer(alleBuchungenMarkers);
        return;
    }

    // Lade die Stationen-Daten vom Server
    fetch('PHP/get_buchungen.php?type=allestationen')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(marker => {
                // Nur Marker mit gültigen Koordinaten hinzufügen
                if (marker.Latitude && marker.Longitude) {
                    const m = L.marker([marker.Longitude, marker.Latitude], { icon: orangeIcon })
                        .bindPopup(
                            `<b>${marker.StationName}</b><br>Latitude: ${marker.Latitude}<br>Longitude: ${marker.Longitude}`
                        );
                    alleBuchungenMarkers.addLayer(m);
                }
            });

            // Füge die Marker-Gruppe zur Karte hinzu
            map.addLayer(alleBuchungenMarkers);
        })
        .catch(error => console.error('Fehler beim Laden der Stationen:', error));
}

//erste dropdown-Liste
// Funktion zum Laden aller Stationen
function loadAlleBuchungen() {
    // Überprüfe, ob die Marker-Gruppe bereits geladen ist
    if (allMarkers.getLayers().length > 0) {
        map.addLayer(allMarkers);
        return;
    }

    // Lade die Stationen-Daten vom Server
    fetch('PHP/get_buchungen.php?type=all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(marker => {
                // Nur Marker mit gültigen Koordinaten hinzufügen
                if (marker.latitude && marker.longitude) {
                    const m = L.marker([marker.longitude, marker.latitude], { icon: greenIcon })
                        .bindPopup(
                            `<b>${marker.titel}</b><br>Latitude: ${marker.latitude}<br>Longitude: ${marker.longitude}`
                        );
                    allMarkers.addLayer(m);
                }
            });

            // Füge die Marker-Gruppe zur Karte hinzu
            map.addLayer(allMarkers);
        })
        .catch(error => console.error('Fehler beim Laden der Stationen:', error));
}

// Funktion zum Laden von Start-Stationen
function loadStartStations() {
    // Überprüfe, ob die Marker-Gruppe bereits geladen ist
    if (startMarkers.getLayers().length > 0) {
        map.addLayer(startMarkers);
        return;
    }

    // Lade die Start-Stationen-Daten vom Server
    fetch('PHP/get_buchungen.php?type=start')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(marker => {
                // Nur Marker mit gültigen Koordinaten hinzufügen
                if (marker.longitude && marker.latitude) {
                    const m = L.marker([marker.latitude, marker.longitude], { icon: blueIcon })
                        .bindPopup(`<b>${marker.titel}</b>`);
                    startMarkers.addLayer(m);
                }
            });

            // Füge die Marker-Gruppe zur Karte hinzu
            map.addLayer(startMarkers);
        })
        .catch(error => console.error('Fehler beim Laden der Start-Stationen:', error));
}

// Funktion zum Laden von End-Stationen
function loadEndStations() {
    // Überprüfe, ob die Marker-Gruppe bereits geladen ist
    if (endMarkers.getLayers().length > 0) {
        map.addLayer(endMarkers);
        return;
    }

    // Lade die End-Stationen-Daten vom Server
    fetch('PHP/get_buchungen.php?type=end')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(marker => {
                // Nur Marker mit gültigen Koordinaten hinzufügen
                if (marker.longitude && marker.latitude) {
                    const m = L.marker([marker.latitude, marker.longitude], { icon: blackIcon })
                        .bindPopup(`<b>${marker.titel}</b>`);
                    endMarkers.addLayer(m);
                }
            });

            // Füge die Marker-Gruppe zur Karte hinzu
            map.addLayer(endMarkers);
        })
        .catch(error => console.error('Fehler beim Laden der End-Stationen:', error));
}

//zweite dropdown-Liste
// Funktion zum Laden von Portal-Daten
function loadPortalData(portalType) {
    if (!portalType) {
        console.error("Kein Portal-Typ ausgewählt.");
        return;
    }

    const url = `PHP/get_buchungen2.php?type=${encodeURIComponent(portalType)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Die API gibt kein Array zurück!");
            }

            // Je nach Portal-Typ Marker hinzufügen
            switch (portalType) {
                case "iPhoneCAB":
                    addMarkersToMap(data, iPhoneCABMarkers, purpleIcon);
                    break;
                case "IVR":
                    addMarkersToMap(data, IVRMarkers, purpleIcon);
                    break;
                case "AndroidCAB":
                    addMarkersToMap(data, androidCABMarkers, purpleIcon);
                    break;
                case "Windows":
                    addMarkersToMap(data, windowsMarkers, purpleIcon);
                    break;
                case "LIDL-BIKE":
                    addMarkersToMap(data, lidlMarkers, purpleIcon);
                    break;
                case "TechnikerF_5(-67212-)":
                    addMarkersToMap(data, technikerMarkers, purpleIcon);
                    break;
                case "iPhoneSRH":
                    addMarkersToMap(data, iPhoneSHRMarkers, purpleIcon);
                    break;
                case "AndroidSRH":
                    addMarkersToMap(data, androidSHRMarkers, purpleIcon);
                    break;
                case "iPhoneKON":
                    addMarkersToMap(data, iPhoneKONMarkers, purpleIcon);
                    break;
                default:
                    console.error(`Unbekanntes Portal: ${portalType}`);
            }
        })
        .catch(error => console.error(`Fehler beim Laden der ${portalType}-Daten:`, error));
}

//dritte dropdown-Liste
// Funktion zum Laden von Wochentag-Daten
function loadWochentagData(wochentag) {
    if (!wochentag) {
        console.error("Kein Wochentag ausgewählt.");
        return;
    }

    const url = `PHP/get_buchungen2.php?type=${encodeURIComponent(wochentag)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Die API gibt kein Array zurück!");
            }

            // Je nach Wochentag Marker hinzufügen
            switch (wochentag) {
                case "Samstag":
                    addMarkersToMap(data, samstagMarkers, purpleIcon);
                    break;
                case "Sonntag":
                    addMarkersToMap(data, sonntagMarkers, purpleIcon);
                    break;
                case "Montag":
                    addMarkersToMap(data, montagMarkers, purpleIcon);
                    break;
                case "Dienstag":
                    addMarkersToMap(data, dienstagMarkers, purpleIcon);
                    break;
                case "Mittwoch":
                    addMarkersToMap(data, mittwochMarkers, purpleIcon);
                    break;
                case "Donnerstag":
                    addMarkersToMap(data, donnerstagMarkers, purpleIcon);
                    break;
                case "Freitag":
                    addMarkersToMap(data, freitagMarkers, purpleIcon);
                    break;
                default:
                    console.error(`Unbekannter Wochentag: ${wochentag}`);
            }
        })
        .catch(error => console.error(`Fehler beim Laden der ${wochentag}-Daten:`, error));
}

// Funktion zum Hinzufügen von Markern zur Karte
function addMarkersToMap(data, markerGroup, icon) {
    markerGroup.clearLayers();

    data.forEach(marker => {
        if (marker.latitude && marker.longitude) {
            const popupContent = `
    <b>Buchung ID:</b> ${marker.Buchungs_ID || "Nicht verfügbar"}<br>
    <b>Nutzer ID:</b> ${marker.Nutzer_ID || "Nicht verfügbar"}<br>
    <b>Fahrrad ID:</b> ${marker.Fahrrad_ID || "Nicht verfügbar"}<br>
    <b>Start Station:</b> ${marker.titel || "Nicht verfügbar"}<br>
    <b>Ende Station:</b> ${marker.Ende_Station || "Nicht verfügbar"}<br>
    <b>Start Latitude:</b> ${marker.latitude || "Nicht verfügbar"}<br>
    <b>Start Longitude:</b> ${marker.longitude || "Nicht verfügbar"}<br>
    <b>Ende Latitude:</b> ${marker.Ende_Lat || "Nicht verfügbar"}<br>
    <b>Ende Longitude:</b> ${marker.Ende_Long || "Nicht verfügbar"}<br>
    <b>Buchung Start:</b> ${marker.Buchung_Start || "Nicht verfügbar"}<br>
    <b>Buchung Ende:</b> ${marker.Buchung_Ende || "Nicht verfügbar"}<br>
    <b>Buchungsportal:</b> ${marker.Buchungsportal || "Nicht verfügbar"}<br>
    <b>Wochentag:</b> ${marker.Wochentag || "Nicht verfügbar"}<br>
`;


            const m = L.marker([marker.latitude, marker.longitude], { icon: purpleIcon }).bindPopup(popupContent);
            markerGroup.addLayer(m);
        } else {
            console.error(`Ungültige Koordinaten für: ${marker.titel}`);
        }
    });

    map.addLayer(markerGroup);
}





