// ============================================================
// 🌐 INTÉGRATION API ESA/NASA — Encyclopédie Ariane 6
// © gunout
// ============================================================

// ============================================================
// 1. API ESA (Space Situational Awareness)
// ============================================================
async function fetchESASSA() {
  try {
    const res = await fetch('https://sdup.esoc.esa.int/discosweb/rest/objects', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('❌ ESA SSA:', e);
    return null;
  }
}

// ============================================================
// 2. API NASA (Images, APOD, NeoWs)
// ============================================================
async function fetchNASAImages(query) {
  const API_KEY = 'DEMO_KEY'; // Remplacer par ta clé
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
    const data = await res.json();
    return data.collection.items.slice(0, 5);
  } catch (e) {
    console.error('❌ NASA Images:', e);
    return [];
  }
}

async function fetchNASAAPOD() {
  const API_KEY = 'DEMO_KEY';
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    return await res.json();
  } catch (e) {
    console.error('❌ NASA APOD:', e);
    return null;
  }
}

// ============================================================
// 3. API Space-Track (TLE orbital)
// ============================================================
async function fetchSpaceTrackTLE(noradId) {
  const user = 'TON_USER';
  const pass = 'TON_PASS';
  try {
    const res = await fetch('https://www.space-track.org/ajaxauth/login', {
      method: 'POST',
      body: `identity=${user}&password=${pass}`
    });
    const tle = await fetch(`https://www.space-track.org/basicspacedata/query/class/tle_latest/NORAD_CAT_ID/${noradId}/format/json`);
    return await tle.json();
  } catch (e) {
    console.error('❌ Space-Track:', e);
    return null;
  }
}

// ============================================================
// 4. API Celestrak (satellites actifs)
// ============================================================
async function fetchCelestrak(group = 'stations') {
  try {
    const res = await fetch(`https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=json`);
    return await res.json();
  } catch (e) {
    console.error('❌ Celestrak:', e);
    return [];
  }
}

// ============================================================
// 5. API Copernicus (Sentinel)
// ============================================================
async function fetchCopernicus(query) {
  try {
    const res = await fetch(`https://catalogue.dataspace.copernicus.eu/odata/v1/Products?$filter=contains(Name,'${query}')&$top=10`);
    return await res.json();
  } catch (e) {
    console.error('❌ Copernicus:', e);
    return null;
  }
}

// ============================================================
// 6. UI : Ajouter les données dans la fiche d'un mot
// ============================================================
async function enrichirAvecAPIs(mot) {
  const résultats = {
    nasaImages: [],
    celestrak: [],
    copernicus: null
  };
  
  // NASA Images
  try {
    résultats.nasaImages = await fetchNASAImages(mot);
  } catch (e) {}
  
  // Celestrak (si satellite)
  if (['iss', 'starlink', 'galileo', 'sentinel'].includes(mot.toLowerCase())) {
    try {
      résultats.celestrak = await fetchCelestrak(mot.toLowerCase() === 'iss' ? 'stations' : 'active');
      résultats.celestrak = résultats.celestrak.slice(0, 5);
    } catch (e) {}
  }
  
  // Copernicus
  if (['sentinel', 'copernicus'].includes(mot.toLowerCase())) {
    try {
      résultats.copernicus = await fetchCopernicus(mot);
    } catch (e) {}
  }
  
  return résultats;
}

// ============================================================
// 7. Rendu HTML des données API
// ============================================================
function renderDonneesAPI(donnees) {
  let html = '';
  
  // NASA Images
  if (donnees.nasaImages && donnees.nasaImages.length) {
    html += `<div class="section-title">🖼️ Images NASA</div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">`;
    for (const img of donnees.nasaImages) {
      const thumb = img.links?.[0]?.href || '';
      const titre = img.data?.[0]?.title || 'Image NASA';
      html += `<div class="stat-card"><img src="${thumb}" style="width:100%;border-radius:8px;" alt="${titre}"><div class="label" style="margin-top:8px;">${titre}</div></div>`;
    }
    html += `</div>`;
  }
  
  // Celestrak
  if (donnees.celestrak && donnees.celestrak.length) {
    html += `<div class="section-title">🛰️ Satellites (Celestrak)</div>`;
    html += `<table class="hash-table"><thead><tr><th>Nom</th><th>NORAD</th><th>Inclinaison</th></tr></thead><tbody>`;
    for (const sat of donnees.celestrak) {
      html += `<tr><td>${sat.OBJECT_NAME}</td><td>${sat.NORAD_CAT_ID}</td><td>${sat.INCLINATION}°</td></tr>`;
    }
    html += `</tbody></table>`;
  }
  
  // Copernicus
  if (donnees.copernicus) {
    html += `<div class="section-title">🌍 Copernicus</div>`;
    html += `<div class="stat-card">${donnees.copernicus.value?.length || 0} produits trouvés</div>`;
  }
  
  return html;
}

// ============================================================
// 8. Exposer les fonctions
// ============================================================
window.fetchESASSA = fetchESASSA;
window.fetchNASAImages = fetchNASAImages;
window.fetchNASAAPOD = fetchNASAAPOD;
window.fetchCelestrak = fetchCelestrak;
window.fetchCopernicus = fetchCopernicus;
window.enrichirAvecAPIs = enrichirAvecAPIs;
window.renderDonneesAPI = renderDonneesAPI;

console.log('🌐 Intégration API ESA/NASA chargée');