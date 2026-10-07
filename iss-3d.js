// ============================================================
// 🛰️ CARTE 3D ISS — Position temps réel
// © gunout
// ============================================================

async function fetchISSPosition() {
  try {
    const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (e) {
    console.error('❌ ISS:', e.message);
    return null;
  }
}

async function openISS3D() {
  if (!window.THREE) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    document.head.appendChild(script);
    await new Promise(r => script.onload = r);
  }

  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>🛰️ ISS — Position temps réel</h2>
      <div class="dashboard-actions">
        <button onclick="openISS3D()">🔄 Actualiser</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div class="card">
      <div id="iss-info"></div>
    </div>
    <div id="iss-3d" style="width:100%;height:500px;background:#000;border-radius:12px;overflow:hidden;"></div>
  `;
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const pos = await fetchISSPosition();
  if (!pos) {
    document.getElementById('iss-info').innerHTML = '❌ Position ISS indisponible';
    return;
  }

  document.getElementById('iss-info').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="label">Latitude</div><div class="value bleu">${pos.latitude.toFixed(4)}°</div></div>
      <div class="stat-card"><div class="label">Longitude</div><div class="value bleu">${pos.longitude.toFixed(4)}°</div></div>
      <div class="stat-card"><div class="label">Altitude</div><div class="value vert">${pos.altitude.toFixed(1)} km</div></div>
      <div class="stat-card"><div class="label">Vitesse</div><div class="value rouge">${pos.velocity.toFixed(0)} km/h</div></div>
    </div>
  `;

  // Three.js
  const container = document.getElementById('iss-3d');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 3);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Terre
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x1a4d8f, emissive: 0x001133, shininess: 5 })
  );
  scene.add(earth);

  // Orbite ISS
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.005, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
  );
  orbitRing.rotation.x = Math.PI / 2;
  scene.add(orbitRing);

  // ISS
  const iss = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff3333 })
  );
  scene.add(iss);

  // Position ISS sur l'orbite
  const lat = pos.latitude * Math.PI / 180;
  const lon = pos.longitude * Math.PI / 180;
  iss.position.x = 1.1 * Math.cos(lat) * Math.cos(lon);
  iss.position.y = 1.1 * Math.sin(lat);
  iss.position.z = 1.1 * Math.cos(lat) * Math.sin(lon);

  // Lumières
  scene.add(new THREE.AmbientLight(0x404060));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();
}

window.openISS3D = openISS3D;
console.log('🛰️ ISS 3D chargé');
