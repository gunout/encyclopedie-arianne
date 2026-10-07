// ============================================================
// 🔴 MARS ROVER PHOTOS
// © gunout
// ============================================================

const MARS_API_KEY = 'DEMO_KEY';

async function fetchMarsPhotos(rover = 'curiosity', sol = 1000) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${MARS_API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.photos || [];
  } catch (e) {
    console.error('❌ Mars Rover:', e.message);
    return [];
  }
}

async function openMarsRover() {
  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>🔴 Mars Rover Photos</h2>
      <div class="dashboard-actions">
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <select id="roverSelect" style="padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--panel);color:var(--text);">
          <option value="curiosity">Curiosity</option>
          <option value="perseverance">Perseverance</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
        <input type="number" id="solInput" value="1000" placeholder="Sol (jour)" style="padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--panel);color:var(--text);width:120px;">
        <button class="btn-primary" onclick="loadMarsPhotos()" style="padding:10px 20px;border-radius:8px;">🔍 Charger</button>
      </div>
    </div>
    <div id="marsResults"></div>
  `;
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.loadMarsPhotos();
}

window.loadMarsPhotos = async function() {
  const rover = document.getElementById('roverSelect')?.value || 'curiosity';
  const sol = document.getElementById('solInput')?.value || 1000;
  const res = document.getElementById('marsResults');
  res.innerHTML = '<div class="card" style="text-align:center;padding:40px;">⏳ Chargement...</div>';

  const photos = await fetchMarsPhotos(rover, sol);
  if (!photos.length) {
    res.innerHTML = '<div class="card">❌ Aucune photo pour ce rover/sol</div>';
    return;
  }

  res.innerHTML = `
    <div class="card"><h3>${photos.length} photos trouvées</h3></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
      ${photos.slice(0, 30).map(p => `
        <div class="card" style="padding:8px;">
          <img src="${p.img_src}" style="width:100%;border-radius:6px;background:#000;" alt="${p.camera.full_name}">
          <div style="padding:8px 4px 0;">
            <div style="font-size:0.75rem;font-weight:700;color:var(--bleu);">${p.camera.full_name}</div>
            <div style="font-size:0.65rem;color:var(--gris-500);font-family:monospace;">${p.earth_date}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

window.openMarsRover = openMarsRover;
console.log('🔴 Mars Rover chargé');
