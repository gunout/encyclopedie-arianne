// ============================================================
// 🪐 EXOPLANET ARCHIVE — Avec proxy CORS
// © gunout
// ============================================================

const EXO_API = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync'
const EXO_QUERY = 'select+top+50+pl_name,hostname,discoveryyear,pl_rade,pl_masse,pl_orbsmax+from+pscomppars+order+by+discoveryyear+desc&format=json';

// Proxies CORS (essayés dans l'ordre)
const EXO_PROXIES = [
  null, // 1. Essai direct (fonctionne sur HTTPS)
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url='
];

async function fetchExoplanets(limit = 50) {
  const targetUrl = `${EXO_API}?query=select+top+${limit}+pl_name,hostname,discoveryyear,pl_rade,pl_masse,pl_orbsmax+from+pscomppars+order+by+discoveryyear+desc&format=json`;

  for (let i = 0; i < EXO_PROXIES.length; i++) {
    const proxy = EXO_PROXIES[i];
    const url = proxy ? proxy + encodeURIComponent(targetUrl) : targetUrl;
    const label = proxy ? `proxy ${i}` : 'direct';

    try {
      console.log(`🪐 Exoplanet: essai ${label}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`⚠️ ${label}: HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log(`✅ Exoplanet chargé via ${label}: ${data.length} planètes`);
        return data;
      }
    } catch (e) {
      console.warn(`⚠️ ${label} échoué: ${e.message}`);
    }
  }

  console.error('❌ Exoplanet: toutes les sources ont échoué');
  return [];
}

async function openExoplanet() {
  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>🪐 Exoplanet Archive — Dernières découvertes</h2>
      <div class="dashboard-actions">
        <button onclick="openExoplanet()">🔄 Réessayer</button>
        <button onclick="window.open('https://exoplanetarchive.ipac.caltech.edu/', '_blank')">🔗 Site officiel</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div id="exoResults" class="card" style="text-align:center;padding:40px;">
      <div style="font-size:4rem;">🪐</div>
      <div style="font-size:1.1rem;margin-top:16px;">Chargement des exoplanètes...</div>
      <div style="font-size:0.8rem;color:var(--gris-500);margin-top:8px;">Essai de 3 sources (direct → proxy 1 → proxy 2)</div>
    </div>
  `;
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const planets = await fetchExoplanets(50);
  const res = document.getElementById('exoResults');

  if (!planets.length) {
    res.innerHTML = `
      <div style="text-align:center;padding:40px;">
        <div style="font-size:3rem;">🪐</div>
        <div style="font-weight:700;color:var(--rouge);margin-top:16px;">API Exoplanet indisponible</div>
        <div style="font-size:0.85rem;color:var(--gris-500);margin-top:8px;">
          L'API Caltech bloque les requêtes CORS.<br>
          Cliquez sur <strong>"Site officiel"</strong> pour y accéder directement.
        </div>
      </div>
    `;
    return;
  }

  res.outerHTML = `
    <div class="card">
      <h3>${planets.length} exoplanètes découvertes récemment</h3>
    </div>
    <div class="card">
      <table class="hash-table">
        <thead>
          <tr>
            <th>Planète</th>
            <th>Étoile hôte</th>
            <th>Année</th>
            <th>Rayon (Terre)</th>
            <th>Masse (Jupiter)</th>
            <th>Distance (UA)</th>
          </tr>
        </thead>
        <tbody>
          ${planets.map(p => `
            <tr>
              <td><strong>${p.pl_name || '—'}</strong></td>
              <td>${p.hostname || '—'}</td>
              <td>${p.discoveryyear || '—'}</td>
              <td>${p.pl_rade ? p.pl_rade.toFixed(2) : '—'}</td>
              <td>${p.pl_masse ? p.pl_masse.toFixed(2) : '—'}</td>
              <td>${p.pl_orbsmax ? p.pl_orbsmax.toFixed(3) : '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

window.openExoplanet = openExoplanet;
console.log('🪐 Exoplanet Archive chargé (avec proxy CORS)');
