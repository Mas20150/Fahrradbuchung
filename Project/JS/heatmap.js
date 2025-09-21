
// Funktion zum Erstellen der Heatmap
function drawHeatmap() {
  fetch('PHP/get_buchungen.php?type=routing') // Abrufen der Daten für Heatmap
      .then(response => response.json())
      .then(data => {
        console.log('Rohdaten aus Backend:', data); // Debugging
          console.log('Heatmap-Daten:', data); // Debugging
          
          // Sammeln aller Koordinaten (Start- und Endpunkte) mit Gewichtung
          const heatData = [];
          let maxIntensity = 0;

          data.forEach(marker => {
              const usageCount = parseInt(marker.usage_count) || 1;

              if (marker.start_latitude && marker.start_longitude) {
                  heatData.push([
                      parseFloat(marker.start_latitude),
                      parseFloat(marker.start_longitude),
                      usageCount // Gewichtung hinzufügen
                  ]);
                  maxIntensity = Math.max(maxIntensity, usageCount);
              }
              if (marker.end_latitude && marker.end_longitude) {
                  heatData.push([
                      parseFloat(marker.end_latitude),
                      parseFloat(marker.end_longitude),
                      usageCount // Gewichtung hinzufügen
                  ]);
                  maxIntensity = Math.max(maxIntensity, usageCount);
              }
          });

          console.log('Maximale Intensität:', maxIntensity);

          // Heatmap erstellen
          const heatLayer = L.heatLayer(heatData, {
              radius: 40,         // Größerer Radius für mehr Überlappung
              blur: 20,           // Weichzeichnung für sanftere Übergänge
              maxZoom: 15,        // Maximale Zoomstufe
              max: maxIntensity,  // Maximale Intensität auf Basis der Daten
              gradient: {         // Benutzerdefinierte Farbverläufe für feine Abstufungen
                  0.1: 'blue',
                  0.3: 'lime',
                  0.5: 'yellow',
                  0.7: 'orange',
                  1.0: 'red'
              }
          }).addTo(map);

          // Speichere den Layer, um ihn später entfernen zu können
          map.heatLayer = heatLayer;
      })
      .catch(error => console.error('Fehler beim Abrufen der Heatmap-Daten:', error));
}

document.getElementById('heatmapCheckbox').addEventListener('change', (event) => {
  if (event.target.checked) {
    drawHeatmap(); // Heatmap anzeigen
  } else {
    // Entfernt die Heatmap von der Karte
    if (map.heatLayer) {
      map.removeLayer(map.heatLayer);
      map.heatLayer = null; // Layer zurücksetzen
    }
  }
});
