// js/mapa.js - Inicialización del mapa Leaflet
// Ubicación: Parroquia San Agustín, Playa, La Habana
// Avenida 35 #4208, entre 42 y 44, CP 11300

document.addEventListener('DOMContentLoaded', function() {
  const mapElement = document.getElementById('contact-map');
  if (!mapElement) return;

  // Coordenadas de la Parroquia San Agustín (Playa, La Habana)
  // Latitud: 23.1136, Longitud: -82.4292 (aproximación precisa)
  const parroquiaSanAgustin = [23.1136, -82.4292];
  
  // Inicializar mapa
  const map = L.map('contact-map').setView(parroquiaSanAgustin, 16);

  // Capa de tiles (OpenStreetMap + CartoDB para mejor estética)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 12
  }).addTo(map);

  // Icono personalizado (opcional: usar icono predeterminado con color)
  const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Marcador
  const marker = L.marker(parroquiaSanAgustin, { icon: customIcon }).addTo(map);
  
  // Popup con información detallada
  marker.bindPopup(`
    <b>Parroquia San Agustín</b><br>
  `).openPopup();

  // Círculo de área de cobertura (radio 500m)
  L.circle(parroquiaSanAgustin, {
    color: '#C17A4D',
    fillColor: '#C17A4D',
    fillOpacity: 0.1,
    radius: 500,
    weight: 2,
    opacity: 0.6
  }).addTo(map);

  // Agregar un control de escala
  L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(map);
  
  console.log('🗺️ Mapa de Gavy Montez inicializado - Parroquia San Agustín, Playa, La Habana');
});