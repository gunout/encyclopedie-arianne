// ============================================================
// 🇪🇺 ESA DASHBOARD — KPI temps réel
// © gunout · Version corrigée (v2)
// ============================================================

const ESA_KPI = {
  budget: { valeur: 7500, unite: 'M€', annee: 2024, source: 'ESA' },
  etats_membres: { valeur: 22, unite: '', source: 'ESA' },
  employes: { valeur: 2200, unite: '', source: 'ESA' },
  lancements_2024: { valeur: 3, unite: '', source: 'Arianespace' },
  satellites_actifs: { valeur: 89, unite: '', source: 'ESA' },
  missions_actives: { valeur: 22, unite: '', source: 'ESA' },
  debris_suivis: { valeur: 36500, unite: '', source: 'ESA Space Debris' },
  budget_ariane6: { valeur: 4000, unite: 'M€', source: 'ESA' },
  cout_ariane6_vol: { valeur: 70, unite: 'M€', source: 'Arianespace' }
};

// ============================================================
// GRAPHIQUE AGENCES (défini localement pour éviter l'erreur)
// ============================================================
function renderAgencesChartLocal() {
  const agences = [
    { nom: 'NASA', budget: 73000, lancements: 90, c: '#0b3d91' },
    { nom: 'SpaceX', budget: 10000, lancements: 95, c: '#16a34a' },
    { nom: 'CNSA', budget: 19000, lancements: 65, c: '#db2777' },
    { nom: 'ESA', budget: 7500, lancements: 5, c: '#000091' },
    { nom: 'Roscosmos', budget: 3500, lancements: 20, c: '#7c3aed' },
    { nom: 'ISRO', budget: 1800, lancements: 7, c: '#0891b2' },
    { nom: 'JAXA', budget: 3500, lancements: 3, c: '#fbbf24' },
    { nom: 'CNES', budget: 2500, lancements: 3, c: '#E1000F' }
  ];
  const cW = 900, cH = 400, PAD = 60;
  const maxB = Math.max(...agences.map(a => a.budget));
  const maxL = Math.max(...agences.map(a => a.lancements));
  const barW = (cW - 2 * PAD) / agences.length - 8;

  return `<svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
    ${agences.map((a, i) => {
      const x = PAD + i * ((cW - 2 * PAD) / agences.length) + 4;
      const hB = (a.budget / maxB) * (cH - 2 * PAD) * 0.6;
      const hL = (a.lancements / maxL) * (cH - 2 * PAD) * 0.4;
      const yB = cH - PAD - hB;
      const yL = cH - PAD - hL;
      return `<g>
        <rect x="${x}" y="${yB}" width="${barW / 2 - 2}" height="${hB}" fill="${a.c}" rx="3"/>
        <rect x="${x + barW / 2 + 2}" y="${yL}" width="${barW / 2 - 2}" height="${hL}" fill="${a.c}" opacity="0.5" rx="3"/>
        <text x="${x + barW / 2}" y="${cH - PAD + 20}" text-anchor="middle" fill="#000091" font-size="10" font-weight="700">${a.nom}</text>
      </g>`;
    }).join('')}
    <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
  </svg>
  <div style="margin-top:12px; font-size:0.75rem; color:var(--gris-500);">
    <span style="display:inline-block;width:12px;height:12px;background:#000091;opacity:0.9;border-radius:50%;margin-right:6px;"></span>Budget (M€)
    <span style="display:inline-block;width:12px;height:12px;background:#000091;opacity:0.5;border-radius:50%;margin-left:16px;margin-right:6px;"></span>Lancements/an
  </div>`;
}

// ============================================================
// GRAPHIQUE LANCEMENTS ESA
// ============================================================
function renderLancementsESA() {
  const data = [
    { annee: 2019, lancements: 8 },
    { annee: 2020, lancements: 5 },
    { annee: 2021, lancements: 7 },
    { annee: 2022, lancements: 6 },
    { annee: 2023, lancements: 3 },
    { annee: 2024, lancements: 3 }
  ];
  const max = Math.max(...data.map(d => d.lancements));
  const cW = 800, cH = 300, PAD = 50;
  const barW = (cW - 2 * PAD) / data.length - 10;

  return `<svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
    ${data.map((d, i) => {
      const h = (d.lancements / max) * (cH - 2 * PAD);
      const x = PAD + i * ((cW - 2 * PAD) / data.length) + 5;
      const y = cH - PAD - h;
      return `<g>
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="#000091" rx="3"/>
        <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" fill="#000091" font-size="12" font-weight="700">${d.lancements}</text>
        <text x="${x + barW / 2}" y="${cH - PAD + 20}" text-anchor="middle" fill="var(--gris-500)" font-size="11" font-weight="700">${d.annee}</text>
      </g>`;
    }).join('')}
    <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
  </svg>`;
}

// ============================================================
// DASHBOARD ESA PRINCIPAL
// ============================================================
function renderESADashboard() {
  const kpis = Object.entries(ESA_KPI).map(([k, v]) => {
    const label = k.replace(/_/g, ' ').toUpperCase();
    const valeur = v.valeur.toLocaleString('fr-FR');
    const unite = v.unite || '';
    return `<div class="kpi">
      <div class="label">${label}</div>
      <div class="value">${valeur} ${unite}</div>
      <div class="sub">${v.source || ''}</div>
    </div>`;
  }).join('');

  return `
    <div class="dashboard-header">
      <h2>🇪🇺 Dashboard ESA — Indicateurs clés</h2>
      <div class="dashboard-actions">
        <button onclick="refreshESAKPI()">🔄 Actualiser</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div class="kpi-strip">${kpis}</div>
    <div class="chart-container">
      <h3 style="color:var(--bleu); margin-bottom:16px;">📊 Comparaison agences spatiales</h3>
      ${renderAgencesChartLocal()}
    </div>
    <div class="chart-container">
      <h3 style="color:var(--bleu); margin-bottom:16px;">🚀 Lancements ESA (2019-2024)</h3>
      ${renderLancementsESA()}
    </div>
    <div class="card">
      <h3>📋 Informations ESA</h3>
      <div class="stats-grid">
        ${renderCard('Fondation', '1975', 'bleu')}
        ${renderCard('Siège', 'Paris', 'bleu')}
        ${renderCard('États membres', '22', 'vert')}
        ${renderCard('Budget 2024', '7 500 M€', 'or')}
        ${renderCard('Employés', '2 200', 'violet')}
        ${renderCard('Missions actives', '22', 'cyan')}
      </div>
    </div>
  `;
}

async function refreshESAKPI() {
  showToast('🔄 Actualisation des KPI ESA...');
  try {
    const res = await fetch('https://api.esa.int/v1/kpi');
    if (res.ok) {
      const data = await res.json();
      Object.assign(ESA_KPI, data);
      showToast('✅ KPI actualisés');
    }
  } catch (e) {
    console.log('⚠️ API ESA non disponible, utilisation des données locales');
    showToast('ℹ️ Données locales utilisées');
  }
  const r = document.getElementById('results');
  r.innerHTML = renderESADashboard();
}

function openESADashboard() {
  const r = document.getElementById('results');
  r.innerHTML = renderESADashboard();
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.openESADashboard = openESADashboard;
window.refreshESAKPI = refreshESAKPI;
window.renderAgencesChartLocal = renderAgencesChartLocal;

console.log('🇪🇺 ESA Dashboard v2 chargé');
