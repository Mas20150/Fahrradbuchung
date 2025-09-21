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

function drawRouting() {
  fetch('PHP/get_buchungen.php?type=routing')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch routing data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Routing Data:', data);

      // Draw all routes with a single color
      data.forEach(route => {
        const startPoint = [parseFloat(route.end_latitude), parseFloat(route.end_longitude)];
        const endPoint = [parseFloat(route.start_latitude), parseFloat(route.start_longitude)];

        // Validate coordinates
        if (
          startPoint.some(coord => isNaN(coord)) ||
          endPoint.some(coord => isNaN(coord))
        ) {
          console.warn('Invalid route data, skipping:', route);
          return;
        }

        // Draw the polyline with a single color
        L.polyline([startPoint, endPoint], {
          color: 'blue', // Set your desired color here
          weight: 2,
          opacity: 0.7,
        }).addTo(map);
      });
    })
    .catch(error => console.error('Error fetching routing data:', error));
}



// Checkbox Event Listener
const routingCheckbox = document.getElementById('routingCheckbox');
if (routingCheckbox) {
  routingCheckbox.addEventListener('change', event => {
    if (event.target.checked) {
      drawRouting();
    } else {
      map.eachLayer(layer => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });
    }
  });
} else {
  console.error("Checkbox with ID 'routingCheckbox' not found in the DOM.");
}


