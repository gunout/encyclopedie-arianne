// ============================================================
// 🗺️ CARTE 3D DES SATELLITES — Encyclopédie ESA
// © gunout · Utilise Three.js
// ============================================================

async function chargerThreeJS() {
  if (window.THREE) return;
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  document.head.appendChild(script);
  await new Promise(r => script.onload = r);
}

async function openCarte3D() {
  await chargerThreeJS();

  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>🗺️ Carte 3D des satellites ESA</h2>
      <div class="dashboard-actions">
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div id="canvas-3d" style="width:100%; height:600px; background:#000; border-radius:12px; overflow:hidden;"></div>
  `;

  const container = document.getElementById('canvas-3d');

  // Scène
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Terre
  const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
  const sphereMat = new THREE.MeshPhongMaterial({
    color: 0x000091,
    emissive: 0x000033,
    shininess: 10,
    wireframe: false
  });
  const terre = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(terre);

  // Grille (orbites)
  for (let i = 0; i < 5; i++) {
    const ringGeo = new THREE.TorusGeometry(1 + i * 0.3, 0.005, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.2, transparent: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
  }

  // Satellites
  const satellites = [
    { nom: 'ISS', orbite: 1.2, inclinaison: 51.6, couleur: 0xff0000 },
    { nom: 'Hubble', orbite: 1.1, inclinaison: 28.5, couleur: 0x00ff00 },
    { nom: 'Sentinel-2', orbite: 1.15, inclinaison: 98, couleur: 0x00aaff },
    { nom: 'Galileo', orbite: 2.0, inclinaison: 56, couleur: 0xffff00 },
    { nom: 'Meteosat', orbite: 2.6, inclinaison: 0, couleur: 0xff00ff }
  ];

  satellites.forEach(sat => {
    const satGeo = new THREE.SphereGeometry(0.03, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: sat.couleur });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    const angle = Math.random() * Math.PI * 2;
    satMesh.position.x = sat.orbite * Math.cos(angle);
    satMesh.position.z = sat.orbite * Math.sin(angle);
    satMesh.position.y = sat.orbite * Math.sin(sat.inclinaison * Math.PI / 180) * 0.5;
    scene.add(satMesh);
  });

  // Lumières
  scene.add(new THREE.AmbientLight(0x404060));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    terre.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();

  // Responsive
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

window.openCarte3D = openCarte3D;