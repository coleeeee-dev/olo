// script.js

let map, marker, cameraStream, capturedPhotoData;

// Arranca al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  bindUI();
  setDate();
  getCurrentLocation();
});

// 1) Inicializa mapa Leaflet
function initMap() {
  const lat0 = -12.0464, lng0 = -77.0428;
  map = L.map('map').setView([lat0, lng0], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  marker = L.marker([lat0, lng0], { draggable: true }).addTo(map);
  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    reverseGeocode(pos.lat, pos.lng);
    map.panTo(pos);
  });

  map.on('click', e => {
    marker.setLatLng(e.latlng);
    reverseGeocode(e.latlng.lat, e.latlng.lng);
  });
}

// 2) Enlaza botones y eventos
function bindUI() {
  document.getElementById('btnCamera').addEventListener('click', openCamera);
  document.getElementById('captureBtn').addEventListener('click', capturePhoto);
  document.getElementById('closeCamera').addEventListener('click', closeCamera);

  document.getElementById('btnUpload').addEventListener('click', () =>
    document.getElementById('fileInput').click()
  );
  document.getElementById('fileInput').addEventListener('change', uploadPhoto);

  document.getElementById('btnRemove').addEventListener('click', () => {
    capturedPhotoData = null;
    document.getElementById('photoPreview').style.display = 'none';
  });

  document.getElementById('btnSubmit').addEventListener('click', submitReport);
}

// 3) Pone la fecha de hoy
function setDate() {
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

// 4) Geolocaliza al usuario y pone su calle
function getCurrentLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      marker.setLatLng([lat, lng]);
      map.setView([lat, lng], 13);
      reverseGeocode(lat, lng);
    },
    () => {
      // en caso de error, al menos mostramos la default
      reverseGeocode(-12.0464, -77.0428);
    }
  );
}

// 5) Llama a Nominatim para geocodificación inversa
function reverseGeocode(lat, lng) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(res => res.json())
    .then(data => {
      const addr = data.address;
      // intentamos varias propiedades en orden de preferencia
      const line = addr.road
        || addr.pedestrian
        || addr.cycleway
        || addr.neighbourhood
        || addr.suburb
        || addr.city_district
        || addr.city
        || data.display_name;
      document.getElementById('address').value = line;
    })
    .catch(() => {
      document.getElementById('address').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    });
}

// 6) Cámara: abrir modal
function openCamera() {
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('cameraVideo');
  modal.style.display = 'flex';
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      cameraStream = stream;
      video.srcObject = stream;
    })
    .catch(() => {
      modal.style.display = 'none';
      alert('No se pudo acceder a la cámara');
    });
}

// 7) Capturar foto
function capturePhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  capturedPhotoData = canvas.toDataURL('image/jpeg');
  showPreview(capturedPhotoData);
  closeCamera();
}

// 8) Cerrar modal y detener cámara
function closeCamera() {
  document.getElementById('cameraModal').style.display = 'none';
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

// 9) Subir imagen desde archivo
function uploadPhoto(e) {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => showPreview(reader.result);
  reader.readAsDataURL(file);
}

// 10) Mostrar vista previa
function showPreview(data) {
  capturedPhotoData = data;
  const img = document.getElementById('previewImg');
  img.src = data;
  document.getElementById('photoPreview').style.display = 'block';
}

// 11) Enviar reporte (simulado)
function submitReport() {
  const desc = document.getElementById('description').value.trim();
  const addr = document.getElementById('address').value.trim();
  const date = document.getElementById('date').value;
  if (!desc || !addr || !date || !capturedPhotoData) {
    alert('Completa todos los campos y añade una foto');
    return;
  }
  const { lat, lng } = marker.getLatLng();
  console.log({ desc, addr, date, lat, lng, photo: capturedPhotoData });
  alert('Reporte enviado correctamente');
}

// 12) Funciones de navegación footer
function navigateToHome()    { window.location.href = 'inicio-plataforma.html'; }
function navigateToReports() { window.location.href = 'reportes.html'; }
function navigateToHistory() { window.location.href = 'historial.html'; }
function navigateToAccount() { window.location.href = 'cuenta.html'; }
