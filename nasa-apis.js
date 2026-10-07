// ============================================================
// 🌌 NASA APIs — NeoWs (Astéroïdes), EPIC, DONKI
// © gunout
// ============================================================

const NASA_API_KEY = (window.NASA_CONFIG && window.NASA_CONFIG.API_KEY) || 'DEMO_KEY';

// ============================================================
// NeoWs — Near Earth Objects (Astéroïdes)
// ============================================================
async function fetchNeoWs() {
  const today = new Date().toISOString().split('T')[0];
  const end = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${end}&api_key=${NASA_API_KEY}`;
  
  try {
    console.log('🔄 NeoWs: appel API...');
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    console.log('✅ NeoWs chargé:', data.element_count, 'astéroïdes');
    return data;
  } catch (e) {
    console.error('❌ NeoWs erreur:', e.message);
    return null;
  }
}

async function openNeoWs() {
  const r = document.getElementById('results');
  r.innerHTML = '<div class="dashboard-header"><h2>☄️ NeoWs — Astéroïdes</h2><div class="dashboard-actions"><button onclick="clearResults()">✖ Fermer</button></div></div>' +
    '<div class="card" style="text-align:center;padding:40px;">⏳ Chargement...</div>';
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  const data = await fetchNeoWs();
  if (!data) {
    r.innerHTML = '<div class="dashboard-header"><h2>☄️ NeoWs</h2></div><div class="card">❌ API indisponible</div>';
    return;
  }
  
  const asteroids = Object.values(data.near_earth_objects).flat().slice(0, 20);
  
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>☄️ NeoWs — ${data.element_count} astéroïdes (7 jours)</h2>
      <div class="dashboard-actions">
        <button onclick="openNeoWs()">🔄 Réessayer</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div class="card">
      <table class="hash-table">
        <thead><tr><th>Nom</th><th>Date</th><th>Diamètre (km)</th><th>Dangereux</th><th>Vitesse (km/h)</th></tr></thead>
        <tbody>
          ${asteroids.map(a => `
            <tr>
              <td><strong>${a.name}</strong></td>
              <td>${a.close_approach_data[0]?.close_approach_date || '—'}</td>
              <td>${(a.estimated_diameter.kilometers.estimated_diameter_min).toFixed(2)} - ${(a.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)}</td>
              <td>${a.is_potentially_hazardous_asteroid ? '⚠️ Oui' : '✅ Non'}</td>
              <td>${parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_hour || 0).toFixed(0)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
window.openNeoWs = openNeoWs;

console.log('🌌 NASA APIs (NeoWs) chargées');
