// Event-Listener für das Laden der Karte
document.addEventListener('DOMContentLoaded', () => {
    // Setze alle Dropdowns auf den Standardwert
    document.getElementById('stationDropdown').selectedIndex = 0;
    document.getElementById('portalDropdown').selectedIndex = 0;
    document.getElementById('wochentagDropdown').selectedIndex = 0;
    document.getElementById('alleStationensCheckbox').checked = 0;
});

// Event-Listener für das Dropdown-Menü
document.getElementById('stationDropdown').addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    // Entferne alle Marker von der Karte
    map.removeLayer(allMarkers);
    map.removeLayer(startMarkers);
    map.removeLayer(endMarkers);

    // Lade die Marker entsprechend der Auswahl
    if (selectedValue === 'all') {
        loadAlleBuchungen();
    } else if (selectedValue === 'start') {
        loadStartStations();
    } else if (selectedValue === 'end') {
        loadEndStations();
    }
});

document.getElementById('portalDropdown').addEventListener('change', (event) => {
    const selectedPortal = event.target.value;

    // Entferne vorherige Marker für alle Portale
    const markerGroups = [
        { group: iPhoneCABMarkers, name: "iPhoneCABMarkers" },
        { group: IVRMarkers, name: "IVRMarkers" },
        { group: androidCABMarkers, name: "androidCABMarkers" },
        { group: windowsMarkers, name: "windowsMarkers" },
        { group: lidlMarkers, name: "lidlMarkers" },
        { group: technikerMarkers, name: "technikerMarkers" },
        { group: iPhoneSHRMarkers, name: "iPhoneSHRMarkers" },
        { group: androidSHRMarkers, name: "androidSHRMarkers" },
        { group: iPhoneKONMarkers, name: "iPhoneKONMarkers" },
    ];

    markerGroups.forEach(({ group, name }) => {
        if (map.hasLayer(group)) {
            group.clearLayers();
            map.removeLayer(group);
            console.log(`${name} entfernt.`);
        }
    });

    // Lade die Daten für das ausgewählte Portal
    if (selectedPortal) {
        loadPortalData(selectedPortal);
    } else {
        console.log("Kein Portal ausgewählt.");
    }
});

// Entferne vorherige Marker für alle Wochentage
document.getElementById('wochentagDropdown').addEventListener('change', (event) => {
    const selectedWochentag = event.target.value;

    const wochentagGroups = [
        { group: samstagMarkers, name: "samstagMarkers" },
        { group: sonntagMarkers, name: "sonntagMarkers" },
        { group: montagMarkers, name: "montagMarkers" },
        { group: dienstagMarkers, name: "dienstagMarkers" },
        { group: mittwochMarkers, name: "mittwochMarkers" },
        { group: donnerstagMarkers, name: "donnerstagMarkers" },
        { group: freitagMarkers, name: "freitagMarkers" },
    ];

    wochentagGroups.forEach(({ group, name }) => {
        if (map.hasLayer(group)) {
            group.clearLayers();
            map.removeLayer(group);
            console.log(`${name} entfernt.`);
        }
    });

    // Lade die Daten für den ausgewählten Wochentag
    if (selectedWochentag) {
        loadWochentagData(selectedWochentag);
    } else {
        console.log("Kein Wochentag ausgewählt.");
    }
});

// Event-Listener für die Checkbox "Alle Stationen"
document.getElementById('alleStationensCheckbox').addEventListener('change', (event) => {
    if (event.target.checked) {
        // Checkbox ist aktiviert: Lade und zeige alle Stationen
        loadAlleStationen();
    } else {
        // Checkbox ist deaktiviert: Entferne alle Stationen von der Karte
        map.removeLayer(alleBuchungenMarkers);
    }
});

