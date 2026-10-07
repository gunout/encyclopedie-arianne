// ============================================================
// 📈 GRAPHIQUES MASTER — A → T
// © gunout · 20 graphiques pour l'Encyclopédie Ariane 6
// ============================================================

// Palette Marianne
const PALETTE = ['#000091', '#E1000F', '#fbbf24', '#16a34a', '#7c3aed', '#0891b2', '#db2777', '#f59e0b', '#10b981', '#6366f1', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#14b8a6', '#a855f7', '#eab308', '#3b82f6'];

// ============================================================
// A — Barres horizontales (catégories)
// ============================================================
function renderA() {
  const types = {};
  Object.entries(ARIANE6_DB).forEach(([m, i]) => { types[i.type] = (types[i.type] || 0) + 1; });
  const sorted = Object.entries(types).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;
  const total = Object.values(types).reduce((a, b) => a + b, 0);
  const barH = 28, gap = 6, lW = 160, cW = 900;
  const tH = sorted.length * (barH + gap) + 40;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📊 A — Répartition par catégorie (${total} mots)</h3>
    <svg viewBox="0 0 ${cW} ${tH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${sorted.map(([t, n], i) => {
        const y = i * (barH + gap);
        const w = (n / max) * (cW - lW - 80);
        const c = PALETTE[i % PALETTE.length];
        return `<g transform="translate(0, ${y})">
          <text x="${lW - 10}" y="${barH / 2 + 4}" text-anchor="end" fill="var(--bleu)" font-size="11" font-weight="700" font-family="monospace">${t}</text>
          <rect x="${lW}" y="2" width="${w}" height="${barH - 4}" fill="${c}" rx="3" opacity="0.9"/>
          <text x="${lW + w + 8}" y="${barH / 2 + 4}" fill="${c}" font-size="11" font-weight="700" font-family="monospace">${n}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// B — Histogramme (distribution longueurs)
// ============================================================
function renderB() {
  const parLen = {};
  Object.keys(ARIANE6_DB).forEach(m => { parLen[m.length] = (parLen[m.length] || 0) + 1; });
  const lens = Object.keys(parLen).map(Number).sort((a, b) => a - b);
  const max = Math.max(...Object.values(parLen));
  const cW = 900, cH = 350, PAD = 50;
  const barW = (cW - 2 * PAD) / lens.length - 4;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📅 B — Distribution par longueur</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${lens.map((l, i) => {
        const h = (parLen[l] / max) * (cH - 2 * PAD);
        const x = PAD + i * ((cW - 2 * PAD) / lens.length) + 2;
        const y = cH - PAD - h;
        const c = `hsl(${(l * 25) % 360}, 65%, 50%)`;
        return `<g>
          <rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${c}" rx="3"/>
          <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" fill="var(--bleu)" font-size="10" font-weight="700" font-family="monospace">${parLen[l]}</text>
          <text x="${x + barW / 2}" y="${cH - PAD + 18}" text-anchor="middle" fill="var(--gris-500)" font-size="10" font-weight="700">${l}</text>
        </g>`;
      }).join('')}
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
    </svg>
  </div>`;
}

// ============================================================
// C — Radar multi-critères
// ============================================================
function renderC() {
  const cats = ['moteur', 'physique', 'chimie', 'biologie', 'informatique', 'astronomie', 'telecom', 'robotique'];
  const cx = 300, cy = 300, r = 200;
  const n = cats.length;
  const metrics = cats.map(cat => {
    const mots = Object.entries(ARIANE6_DB).filter(([m, i]) => i.type === cat);
    const nb = mots.length;
    const lenMoy = mots.length ? mots.reduce((s, [m]) => s + m.length, 0) / mots.length : 0;
    const a1z26Moy = mots.length ? mots.reduce((s, [m]) => s + m.toUpperCase().split('').reduce((a, c) => a + (c.charCodeAt(0) - 64), 0), 0) / mots.length : 0;
    return { cat, nb, lenMoy, a1z26Moy };
  });
  const maxNb = Math.max(...metrics.map(m => m.nb), 1);
  const maxLen = Math.max(...metrics.map(m => m.lenMoy), 1);
  const maxA1 = Math.max(...metrics.map(m => m.a1z26Moy), 1);
  const axes = [
    { nom: 'Nb', get: m => m.nb / maxNb },
    { nom: 'Long', get: m => m.lenMoy / maxLen },
    { nom: 'A1Z26', get: m => m.a1z26Moy / maxA1 }
  ];
  const grid = [0.25, 0.5, 0.75, 1].map(lv => {
    const pts = axes.map((_, i) => {
      const a = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * lv * Math.cos(a)},${cy + r * lv * Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1"/>`;
  }).join('');
  const axLines = axes.map((ax, i) => {
    const a = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
    return `<g>
      <line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="var(--border)"/>
      <text x="${cx + (r + 25) * Math.cos(a)}" y="${cy + (r + 25) * Math.sin(a)}" text-anchor="middle" fill="var(--bleu)" font-size="13" font-weight="700">${ax.nom}</text>
    </g>`;
  }).join('');
  const polys = metrics.map((m, idx) => {
    const pts = axes.map((ax, i) => {
      const a = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
      const v = ax.get(m);
      return `${cx + r * v * Math.cos(a)},${cy + r * v * Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="${PALETTE[idx % PALETTE.length]}" fill-opacity="0.15" stroke="${PALETTE[idx % PALETTE.length]}" stroke-width="2"/>`;
  }).join('');
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🎯 C — Radar multi-critères</h3>
    <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:center; justify-content:center;">
      <svg viewBox="0 0 600 600" style="width:100%; max-width:450px;">
        ${grid}${axLines}${polys}
      </svg>
      <div>${metrics.map((m, i) => `<div class="legend-item"><span class="dot" style="background:${PALETTE[i % PALETTE.length]}"></span>${m.cat} (${m.nb})</div>`).join('')}</div>
    </div>
  </div>`;
}

// ============================================================
// D — Benchmark agences
// ============================================================
function renderD() {
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
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🏆 D — Benchmark agences</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${agences.map((a, i) => {
        const x = PAD + i * ((cW - 2 * PAD) / agences.length) + 4;
        const hB = (a.budget / maxB) * (cH - 2 * PAD) * 0.6;
        const hL = (a.lancements / maxL) * (cH - 2 * PAD) * 0.4;
        const yB = cH - PAD - hB;
        const yL = cH - PAD - hL;
        return `<g>
          <rect x="${x}" y="${yB}" width="${barW / 2 - 2}" height="${hB}" fill="${a.c}" rx="3"/>
          <rect x="${x + barW / 2 + 2}" y="${yL}" width="${barW / 2 - 2}" height="${hL}" fill="${a.c}" opacity="0.5" rx="3"/>
          <text x="${x + barW / 2}" y="${cH - PAD + 20}" text-anchor="middle" fill="var(--bleu)" font-size="10" font-weight="700">${a.nom}</text>
        </g>`;
      }).join('')}
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
    </svg>
  </div>`;
}

// ============================================================
// E — 3D isométrique
// ============================================================
function renderE() {
  const pts = [
    { n: 'NASA', x: 90, y: 73000, z: 30, c: '#0b3d91' },
    { n: 'SpaceX', x: 95, y: 10000, z: 25, c: '#16a34a' },
    { n: 'CNSA', x: 65, y: 19000, z: 20, c: '#db2777' },
    { n: 'ESA', x: 5, y: 7500, z: 15, c: '#000091' },
    { n: 'Roscosmos', x: 20, y: 3500, z: 10, c: '#7c3aed' },
    { n: 'ISRO', x: 7, y: 1800, z: 8, c: '#0891b2' }
  ];
  const cW = 900, cH = 500;
  const angle = Math.PI / 6;
  const isoX = (x, y, z) => 80 + (x * 6 + y * 0.001 * 300) * Math.cos(angle) - z * 3 * Math.cos(angle);
  const isoY = (x, y, z) => cH - 80 - (x * 6 + y * 0.001 * 300) * Math.sin(angle) - z * 3;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🎲 E — Graphique 3D isométrique</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:linear-gradient(135deg, var(--gris-50), var(--panel)); border-radius:12px; padding:16px;">
      ${pts.map(p => {
        const px = isoX(p.x, p.y, p.z), py = isoY(p.x, p.y, p.z);
        const r = 8 + (p.y / 73000) * 15;
        return `<g>
          <circle cx="${px}" cy="${py}" r="${r}" fill="${p.c}" opacity="0.85" stroke="#fff" stroke-width="2"/>
          <text x="${px}" y="${py - r - 8}" text-anchor="middle" fill="${p.c}" font-size="11" font-weight="800">${p.n}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// F — Animation barres
// ============================================================
let _anim = false;
function animateBars() {
  if (_anim) return;
  _anim = true;
  document.querySelectorAll('.bar-anim').forEach((bar, i) => {
    const fw = bar.dataset.width;
    bar.style.width = '0%';
    setTimeout(() => bar.style.width = fw, i * 60);
  });
  setTimeout(() => { _anim = false; }, 1500);
}
function renderF() {
  const types = {};
  Object.entries(ARIANE6_DB).forEach(([m, i]) => { types[i.type] = (types[i.type] || 0) + 1; });
  const sorted = Object.entries(types).sort((a, b) => b[1] - a[1]).slice(0, 15);
  const max = sorted[0]?.[1] || 1;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">✨ F — Animation des barres</h3>
    <button class="btn-primary" style="margin-bottom:16px; padding:8px 16px; border-radius:6px; font-size:13px;" onclick="animateBars()">▶ Relancer</button>
    ${sorted.map(([t, n], i) => {
      const pct = (n / max) * 100;
      const c = PALETTE[i % PALETTE.length];
      return `<div style="display:grid; grid-template-columns:140px 1fr 50px; gap:10px; align-items:center; margin-bottom:8px; font-size:12px;">
        <div style="font-family:var(--mono); font-weight:700; color:var(--gris-700); text-align:right;">${t}</div>
        <div style="background:var(--gris-100); height:22px; border-radius:3px; overflow:hidden;">
          <div class="bar-anim" data-width="${pct}%" style="width:${pct}%; height:100%; background:${c}; border-radius:3px; transition:width .8s;"></div>
        </div>
        <div style="font-family:var(--mono); font-weight:700; color:${c};">${n}</div>
      </div>`;
    }).join('')}
  </div>`;
}

// ============================================================
// G — Export PNG
// ============================================================
function exportPNG(id, name) {
  const el = document.getElementById(id);
  if (!el) return;
  const svg = el.querySelector('svg');
  if (!svg) return;
  const data = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([data], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const cv = document.createElement('canvas');
    cv.width = 1200;
    cv.height = 800;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(img, 0, 0, cv.width, cv.height);
    cv.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = `${name}-${Date.now()}.png`;
      a.click();
      showToast('📥 PNG exporté');
    });
  };
  img.src = url;
}
window.exportPNG = exportPNG;

function renderG() {
  return `<div class="chart-container" style="background:var(--bleu-soft);">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📥 G — Exporter en PNG</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:8px;">
      ${['A','B','C','D','E','F'].map(id => `<button onclick="exportPNG('chart-${id}','graphique-${id}')" style="padding:10px; border-radius:6px; border:1px solid var(--bleu); background:var(--panel); color:var(--bleu); font-weight:700; cursor:pointer; font-size:12px;">📥 ${id}</button>`).join('')}
    </div>
  </div>`;
}

// ============================================================
// H — Comparaison avant/après
// ============================================================
function renderH() {
  const comp = [
    { crit: 'Mots', avant: 12, apres: Object.keys(ARIANE6_DB).length },
    { crit: 'Catégories', avant: 5, apres: new Set(Object.values(ARIANE6_DB).map(d => d.type)).size },
    { crit: 'Lanceurs', avant: 1, apres: 17 },
    { crit: 'Sites', avant: 2, apres: 12 },
    { crit: 'Hashs', avant: 1, apres: 4 },
    { crit: 'Score', avant: 40, apres: 95 }
  ];
  const max = Math.max(...comp.flatMap(c => [c.avant, c.apres]));
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📊 H — Comparaison avant / après</h3>
    ${comp.map(c => {
      const pA = (c.avant / max) * 100, pB = (c.apres / max) * 100;
      const cr = c.avant > 0 ? ((c.apres - c.avant) / c.avant * 100).toFixed(0) : '∞';
      return `<div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong style="color:var(--bleu); font-size:13px;">${c.crit}</strong>
          <span style="font-family:var(--mono); font-weight:700; color:var(--vert);">+${cr}%</span>
        </div>
        <div style="display:grid; grid-template-columns:60px 1fr 50px; gap:8px; align-items:center; font-size:12px; margin-bottom:4px;">
          <div style="color:var(--rouge); font-weight:700;">Avant</div>
          <div style="background:var(--gris-100); height:18px; border-radius:3px; overflow:hidden;"><div style="width:${pA}%; height:100%; background:var(--rouge);"></div></div>
          <div style="font-family:var(--mono); font-weight:700; color:var(--rouge);">${c.avant}</div>
        </div>
        <div style="display:grid; grid-template-columns:60px 1fr 50px; gap:8px; align-items:center; font-size:12px;">
          <div style="color:var(--vert); font-weight:700;">Après</div>
          <div style="background:var(--gris-100); height:18px; border-radius:3px; overflow:hidden;"><div style="width:${pB}%; height:100%; background:var(--vert);"></div></div>
          <div style="font-family:var(--mono); font-weight:700; color:var(--vert);">${c.apres}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ============================================================
// I — Aires empilées
// ============================================================
function renderI() {
  const annees = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const cats = [
    { nom: 'Propulsion', c: '#000091', base: 20 },
    { nom: 'Satellites', c: '#E1000F', base: 35 },
    { nom: 'Informatique', c: '#fbbf24', base: 15 },
    { nom: 'Astronomie', c: '#16a34a', base: 25 },
    { nom: 'Biologie', c: '#7c3aed', base: 10 }
  ];
  const data = cats.map(c => ({ ...c, vals: annees.map((a, i) => Math.round(c.base * (1 + i * 0.15))) }));
  const cW = 900, cH = 400, PAD = 60;
  const maxY = Math.max(...annees.map((_, i) => data.reduce((s, d) => s + d.vals[i], 0)));
  const xStep = (cW - 2 * PAD) / (annees.length - 1);
  const yScale = (cH - 2 * PAD) / maxY;
  let cumul = annees.map(() => 0);
  const areas = data.map(d => {
    const bas = [...cumul];
    cumul = cumul.map((v, i) => v + d.vals[i]);
    const top = cumul.map((v, i) => `${PAD + i * xStep},${cH - PAD - v * yScale}`).join(' ');
    const bot = bas.map((v, i) => `${PAD + i * xStep},${cH - PAD - v * yScale}`).reverse().join(' ');
    return `<polygon points="${top} ${bot}" fill="${d.c}" opacity="0.7" stroke="${d.c}" stroke-width="2"/>`;
  }).join('');
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📈 I — Aires empilées (2015-2025)</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${areas}
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
      ${annees.map((a, i) => `<text x="${PAD + i * xStep}" y="${cH - PAD + 20}" text-anchor="middle" fill="var(--gris-500)" font-size="10" font-weight="700">${a}</text>`).join('')}
    </svg>
    <div class="chart-legend" style="margin-top:12px;">${data.map(d => `<span><span class="dot" style="background:${d.c}"></span>${d.nom}</span>`).join('')}</div>
  </div>`;
}

// ============================================================
// J — Sankey
// ============================================================
function renderJ() {
  const flux = [
    { s: 'Propulsion', c: 'Moteur', v: 45, col: '#000091' },
    { s: 'Propulsion', c: 'Propergol', v: 30, col: '#000091' },
    { s: 'Satellites', c: 'Station', v: 25, col: '#E1000F' },
    { s: 'Satellites', c: 'Orbite', v: 35, col: '#E1000F' },
    { s: 'Informatique', c: 'Telecom', v: 30, col: '#fbbf24' },
    { s: 'Astronomie', c: 'Mission', v: 40, col: '#16a34a' },
    { s: 'Biologie', c: 'Médecine', v: 25, col: '#7c3aed' }
  ];
  const sources = [...new Set(flux.map(f => f.s))];
  const cibles = [...new Set(flux.map(f => f.c))];
  const cW = 900, cH = 400, PAD = 60, colW = 30;
  const maxTot = Math.max(
    ...[...sources].map(s => flux.filter(f => f.s === s).reduce((a, b) => a + b.v, 0)),
    ...[...cibles].map(c => flux.filter(f => f.c === c).reduce((a, b) => a + b.v, 0))
  );
  const scale = (cH - 2 * PAD) / maxTot;
  let yS = PAD; const sPos = {};
  sources.forEach(s => { const h = flux.filter(f => f.s === s).reduce((a, b) => a + b.v, 0) * scale; sPos[s] = { y: yS, h, col: flux.find(f => f.s === s).col }; yS += h + 8; });
  let yC = PAD; const cPos = {};
  cibles.forEach(c => { const h = flux.filter(f => f.c === c).reduce((a, b) => a + b.v, 0) * scale; cPos[c] = { y: yC, h }; yC += h + 8; });
  const sCur = {}; Object.keys(sPos).forEach(s => sCur[s] = sPos[s].y);
  const cCur = {}; Object.keys(cPos).forEach(c => cCur[c] = cPos[c].y);
  const paths = flux.map(f => {
    const sh = f.v * scale;
    const sy = sCur[f.s]; sCur[f.s] += sh;
    const cy = cCur[f.c]; cCur[f.c] += sh;
    const x1 = PAD + 50 + colW, x2 = cW - PAD - 50 - colW, mx = (x1 + x2) / 2;
    return `<path d="M ${x1} ${sy} C ${mx} ${sy}, ${mx} ${cy}, ${x2} ${cy} L ${x2} ${cy + sh} C ${mx} ${cy + sh}, ${mx} ${sy + sh}, ${x1} ${sy + sh} Z" fill="${f.col}" opacity="0.5"/>`;
  }).join('');
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🔀 J — Diagramme de Sankey</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${paths}
      ${sources.map(s => `<g>
        <rect x="${PAD + 50}" y="${sPos[s].y}" width="${colW}" height="${sPos[s].h}" fill="${sPos[s].col}" rx="3"/>
        <text x="${PAD + 40}" y="${sPos[s].y + sPos[s].h / 2 + 4}" text-anchor="end" fill="${sPos[s].col}" font-size="11" font-weight="700">${s}</text>
      </g>`).join('')}
      ${cibles.map(c => `<g>
        <rect x="${cW - PAD - 50 - colW}" y="${cPos[c].y}" width="${colW}" height="${cPos[c].h}" fill="var(--bleu)" rx="3"/>
        <text x="${cW - PAD - 40}" y="${cPos[c].y + cPos[c].h / 2 + 4}" fill="var(--bleu)" font-size="11" font-weight="700">${c}</text>
      </g>`).join('')}
    </svg>
  </div>`;
}

// ============================================================
// K — Heatmap
// ============================================================
function renderK() {
  const cats = ['moteur', 'physique', 'chimie', 'biologie', 'informatique', 'astronomie', 'telecom', 'robotique'];
  const lens = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const cellW = 60, cellH = 40, labelW = 130, labelH = 50;
  const cW = lens.length * cellW + labelW + 40;
  const cH = cats.length * cellH + labelH + 40;
  let maxV = 0;
  const m = {};
  cats.forEach(c => { m[c] = {}; lens.forEach(l => {
    const v = Object.entries(ARIANE6_DB).filter(([w, i]) => i.type === c && w.length === l).length;
    m[c][l] = v; if (v > maxV) maxV = v;
  }); });
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🔥 K — Heatmap (catégories × longueur)</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${lens.map((l, j) => `<text x="${labelW + j * cellW + cellW / 2}" y="${labelH - 15}" text-anchor="middle" fill="var(--bleu)" font-size="11" font-weight="700">${l}</text>`).join('')}
      ${cats.map((c, i) => {
        const rows = lens.map((l, j) => {
          const v = m[c][l];
          const int = maxV ? v / maxV : 0;
          const x = labelW + j * cellW, y = labelH + i * cellH;
          let col = 'var(--gris-100)';
          if (int > 0) col = `rgba(0, 0, 145, ${0.15 + int * 0.85})`;
          const txt = int > 0.5 ? '#fff' : 'var(--bleu)';
          return `<g>
            <rect x="${x}" y="${y}" width="${cellW - 2}" height="${cellH - 2}" fill="${col}" rx="2"/>
            <text x="${x + cellW / 2}" y="${y + cellH / 2 + 4}" text-anchor="middle" fill="${txt}" font-size="11" font-weight="700">${v || ''}</text>
          </g>`;
        }).join('');
        return `<text x="${labelW - 10}" y="${labelH + i * cellH + cellH / 2 + 4}" text-anchor="end" fill="var(--bleu)" font-size="11" font-weight="700">${c}</text>${rows}`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// L — Chandeliers
// ============================================================
function renderL() {
  const data = [];
  let p = 100;
  for (let i = 0; i < 20; i++) {
    const o = p, c = o + (Math.random() - 0.5) * 30;
    const h = Math.max(o, c) + Math.random() * 10;
    const l = Math.min(o, c) - Math.random() * 10;
    data.push({ o, c, h, l });
    p = c;
  }
  const cW = 900, cH = 400, PAD = 60;
  const maxP = Math.max(...data.map(d => d.h));
  const minP = Math.min(...data.map(d => d.l));
  const range = maxP - minP;
  const xStep = (cW - 2 * PAD) / data.length;
  const yScale = (cH - 2 * PAD) / range;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📈 L — Chandeliers (OHLC)</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
      ${data.map((d, i) => {
        const x = PAD + i * xStep + xStep / 2;
        const up = d.c > d.o;
        const col = up ? '#16a34a' : '#E1000F';
        const yH = cH - PAD - (d.h - minP) * yScale;
        const yL = cH - PAD - (d.l - minP) * yScale;
        const yO = cH - PAD - (d.o - minP) * yScale;
        const yC = cH - PAD - (d.c - minP) * yScale;
        const yT = Math.min(yO, yC), yB = Math.max(yO, yC);
        return `<g>
          <line x1="${x}" y1="${yH}" x2="${x}" y2="${yL}" stroke="${col}" stroke-width="2"/>
          <rect x="${x - xStep * 0.35}" y="${yT}" width="${xStep * 0.7}" height="${Math.max(2, yB - yT)}" fill="${col}" rx="1"/>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// M — Violon
// ============================================================
function renderM() {
  const cats = ['moteur', 'physique', 'chimie', 'biologie', 'informatique', 'astronomie'];
  const cW = 900, cH = 400, PAD = 60;
  const colW = (cW - 2 * PAD) / cats.length;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🎻 M — Graphique en violon</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
      ${cats.map((c, i) => {
        const lens = Object.entries(ARIANE6_DB).filter(([m, info]) => info.type === c).map(([m]) => m.length);
        if (!lens.length) return '';
        const x = PAD + i * colW + colW / 2;
        const col = PALETTE[i % PALETTE.length];
        const sorted = [...lens].sort((a, b) => a - b);
        const min = sorted[0], max = sorted[sorted.length - 1];
        const bins = 30;
        const hist = new Array(bins).fill(0);
        sorted.forEach(l => { hist[Math.min(bins - 1, Math.floor((l - min) / (max - min + 1) * bins))]++; });
        const maxH = Math.max(...hist, 1);
        const halfW = colW * 0.35;
        const left = hist.map((v, j) => `${x - (v / maxH) * halfW},${cH - PAD - (j / bins) * (cH - 2 * PAD)}`).join(' ');
        const right = hist.map((v, j) => `${x + (v / maxH) * halfW},${cH - PAD - (j / bins) * (cH - 2 * PAD)}`).reverse().join(' ');
        const med = sorted[Math.floor(sorted.length / 2)];
        const yMed = cH - PAD - ((med - min) / (max - min + 1)) * (cH - 2 * PAD);
        return `<g>
          <polygon points="${left} ${right}" fill="${col}" opacity="0.4" stroke="${col}" stroke-width="2"/>
          <line x1="${x - 10}" y1="${yMed}" x2="${x + 10}" y2="${yMed}" stroke="#fff" stroke-width="3"/>
          <text x="${x}" y="${cH - PAD + 20}" text-anchor="middle" fill="${col}" font-size="11" font-weight="700">${c}</text>
          <text x="${x}" y="${cH - PAD + 34}" text-anchor="middle" fill="var(--gris-500)" font-size="9">n=${lens.length}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// N — Réseau
// ============================================================
function renderN() {
  const noeuds = [
    { id: 'moteur', col: '#000091' },
    { id: 'physique', col: '#E1000F' },
    { id: 'chimie', col: '#fbbf24' },
    { id: 'biologie', col: '#16a34a' },
    { id: 'informatique', col: '#7c3aed' },
    { id: 'astronomie', col: '#0891b2' },
    { id: 'telecom', col: '#db2777' },
    { id: 'robotique', col: '#f59e0b' },
    { id: 'orbite', col: '#10b981' },
    { id: 'propulsion', col: '#6366f1' }
  ];
  const liens = [
    ['moteur', 'propulsion'], ['moteur', 'chimie'], ['propulsion', 'physique'],
    ['physique', 'astronomie'], ['biologie', 'chimie'], ['informatique', 'telecom'],
    ['informatique', 'robotique'], ['astronomie', 'orbite'], ['telecom', 'orbite']
  ];
  const cW = 900, cH = 600, cx = cW / 2, cy = cH / 2, r = 220;
  const pos = {};
  noeuds.forEach((n, i) => {
    const a = (i / noeuds.length) * 2 * Math.PI - Math.PI / 2;
    pos[n.id] = { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), col: n.col };
  });
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🕸️ N — Réseau de catégories</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      ${liens.map(([s, c]) => pos[s] && pos[c] ? `<line x1="${pos[s].x}" y1="${pos[s].y}" x2="${pos[c].x}" y2="${pos[c].y}" stroke="var(--bleu)" stroke-width="2" opacity="0.3"/>` : '').join('')}
      ${noeuds.map(n => {
        const p = pos[n.id];
        return `<g>
          <circle cx="${p.x}" cy="${p.y}" r="30" fill="${p.col}" opacity="0.9" stroke="#fff" stroke-width="3"/>
          <text x="${p.x}" y="${p.y + 5}" text-anchor="middle" fill="#fff" font-size="10" font-weight="800">${n.id.slice(0, 6)}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// O — Carte mondiale
// ============================================================
function renderO() {
  const sites = [
    { n: 'Kourou', x: 250, y: 350, l: 60, c: '#000091' },
    { n: 'Cap Canaveral', x: 200, y: 280, l: 120, c: '#E1000F' },
    { n: 'Starbase', x: 180, y: 300, l: 25, c: '#16a34a' },
    { n: 'Baïkonour', x: 520, y: 220, l: 80, c: '#fbbf24' },
    { n: 'Tanegashima', x: 720, y: 260, l: 15, c: '#7c3aed' },
    { n: 'Sriharikota', x: 640, y: 320, l: 20, c: '#0891b2' },
    { n: 'Jiuquan', x: 620, y: 220, l: 35, c: '#db2777' },
    { n: 'Vandenberg', x: 150, y: 280, l: 40, c: '#f59e0b' },
    { n: 'Alcântara', x: 300, y: 380, l: 10, c: '#10b981' },
    { n: 'Mahia', x: 850, y: 450, l: 30, c: '#ef4444' }
  ];
  const cW = 900, cH = 500;
  const maxL = Math.max(...sites.map(s => s.l));
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🗺️ O — Carte mondiale des sites</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <path d="M 100 200 Q 150 180 200 200 Q 220 250 200 320 Q 180 380 150 400 Q 120 380 100 320 Q 80 260 100 200 Z" fill="var(--gris-100)" stroke="var(--border)"/>
      <path d="M 220 350 Q 260 340 300 360 Q 320 400 300 450 Q 260 470 230 450 Q 210 400 220 350 Z" fill="var(--gris-100)" stroke="var(--border)"/>
      <path d="M 450 180 Q 520 160 600 180 Q 640 200 640 260 Q 600 320 550 340 Q 500 320 470 280 Q 440 230 450 180 Z" fill="var(--gris-100)" stroke="var(--border)"/>
      <path d="M 620 320 Q 660 310 700 330 Q 720 380 700 420 Q 660 440 630 420 Q 610 380 620 320 Z" fill="var(--gris-100)" stroke="var(--border)"/>
      <path d="M 680 180 Q 740 170 800 190 Q 820 230 800 270 Q 760 290 720 280 Q 690 240 680 180 Z" fill="var(--gris-100)" stroke="var(--border)"/>
      ${sites.map(s => {
        const r = 6 + (s.l / maxL) * 15;
        return `<g>
          <circle cx="${s.x}" cy="${s.y}" r="${r + 4}" fill="${s.c}" opacity="0.2"/>
          <circle cx="${s.x}" cy="${s.y}" r="${r}" fill="${s.c}" opacity="0.85" stroke="#fff" stroke-width="2"/>
          <text x="${s.x}" y="${s.y + r + 14}" text-anchor="middle" fill="var(--bleu)" font-size="9" font-weight="700">${s.n}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// P — Bulles
// ============================================================
function renderP() {
  const ag = [
    { n: 'NASA', x: 90, y: 73000, s: 90, c: '#0b3d91' },
    { n: 'SpaceX', x: 95, y: 10000, s: 70, c: '#16a34a' },
    { n: 'CNSA', x: 65, y: 19000, s: 60, c: '#db2777' },
    { n: 'ESA', x: 5, y: 7500, s: 40, c: '#000091' },
    { n: 'Roscosmos', x: 20, y: 3500, s: 35, c: '#7c3aed' },
    { n: 'ISRO', x: 7, y: 1800, s: 25, c: '#0891b2' },
    { n: 'JAXA', x: 3, y: 3500, s: 22, c: '#fbbf24' },
    { n: 'CNES', x: 3, y: 2500, s: 18, c: '#E1000F' }
  ];
  const cW = 900, cH = 500, PAD = 80;
  const maxX = Math.max(...ag.map(a => a.x)), maxY = Math.max(...ag.map(a => a.y));
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🫧 P — Graphique en bulles</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
      <line x1="${PAD}" y1="${cH - PAD}" x2="${PAD}" y2="${PAD}" stroke="#333" stroke-width="2"/>
      ${ag.map(a => {
        const x = PAD + (a.x / maxX) * (cW - 2 * PAD);
        const y = cH - PAD - (a.y / maxY) * (cH - 2 * PAD);
        return `<g>
          <circle cx="${x}" cy="${y}" r="${a.s}" fill="${a.c}" opacity="0.6" stroke="${a.c}" stroke-width="3"/>
          <text x="${x}" y="${y + 5}" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">${a.n}</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// Q — Cascade (Waterfall)
// ============================================================
function renderQ() {
  const data = [
    { n: 'Base', v: 500, t: 'base' },
    { n: '+ AAH', v: 200, t: 'plus' },
    { n: '+ RSA', v: 150, t: 'plus' },
    { n: '+ Famille', v: 100, t: 'plus' },
    { n: '- Fraude', v: -50, t: 'moins' },
    { n: '- Erreurs', v: -30, t: 'moins' },
    { n: 'Total', v: 870, t: 'total' }
  ];
  const cW = 900, cH = 400, PAD = 60;
  const maxV = 900;
  const colW = (cW - 2 * PAD) / data.length - 10;
  let cumul = 0;
  const bars = data.map((d, i) => {
    const x = PAD + i * ((cW - 2 * PAD) / data.length) + 5;
    let y, h, col, base;
    if (d.t === 'base' || d.t === 'total') {
      h = (d.v / maxV) * (cH - 2 * PAD);
      y = cH - PAD - h;
      col = d.t === 'total' ? '#000091' : '#929292';
      base = 0;
    } else {
      h = (Math.abs(d.v) / maxV) * (cH - 2 * PAD);
      y = d.v > 0 ? cH - PAD - ((cumul + d.v) / maxV) * (cH - 2 * PAD) : cH - PAD - (cumul / maxV) * (cH - 2 * PAD);
      col = d.v > 0 ? '#16a34a' : '#E1000F';
      base = cumul;
      cumul += d.v;
    }
    if (d.t === 'base') cumul = d.v;
    if (d.t === 'total') cumul = 0;
    return `<g>
      <rect x="${x}" y="${y}" width="${colW}" height="${h}" fill="${col}" opacity="0.85" rx="2"/>
      <text x="${x + colW / 2}" y="${cH - PAD + 20}" text-anchor="middle" fill="var(--bleu)" font-size="10" font-weight="700">${d.n}</text>
      <text x="${x + colW / 2}" y="${y - 5}" text-anchor="middle" fill="${col}" font-size="11" font-weight="700">${d.v > 0 ? '+' : ''}${d.v}</text>
    </g>`;
  }).join('');
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🌊 Q — Graphique en cascade</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <line x1="${PAD}" y1="${cH - PAD}" x2="${cW - PAD}" y2="${cH - PAD}" stroke="#333" stroke-width="2"/>
      ${bars}
    </svg>
  </div>`;
}

// ============================================================
// R — Gantt
// ============================================================
function renderR() {
  const taches = [
    { n: 'Conception', d: 0, dur: 6, c: '#000091' },
    { n: 'Développement', d: 4, dur: 8, c: '#E1000F' },
    { n: 'Tests', d: 10, dur: 5, c: '#fbbf24' },
    { n: 'Intégration', d: 13, dur: 4, c: '#16a34a' },
    { n: 'Qualification', d: 15, dur: 5, c: '#7c3aed' },
    { n: 'Lancement', d: 20, dur: 2, c: '#0891b2' }
  ];
  const cW = 900, cH = 400, PAD = 60, lW = 140;
  const maxT = 25;
  const rowH = 40;
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">📅 R — Diagramme de Gantt</h3>
    <svg viewBox="0 0 ${cW} ${cH}" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px;">
      <line x1="${lW}" y1="0" x2="${lW}" y2="${cH - PAD}" stroke="#333" stroke-width="1"/>
      ${[0, 5, 10, 15, 20, 25].map(t => {
        const x = lW + (t / maxT) * (cW - lW - PAD);
        return `<g>
          <line x1="${x}" y1="30" x2="${x}" y2="${cH - PAD}" stroke="var(--border)" stroke-dasharray="3,3"/>
          <text x="${x}" y="20" text-anchor="middle" fill="var(--gris-500)" font-size="10" font-weight="700">S${t}</text>
        </g>`;
      }).join('')}
      ${taches.map((t, i) => {
        const y = 40 + i * rowH;
        const x = lW + (t.d / maxT) * (cW - lW - PAD);
        const w = (t.dur / maxT) * (cW - lW - PAD);
        return `<g>
          <text x="${lW - 10}" y="${y + rowH / 2 - 6}" text-anchor="end" fill="var(--bleu)" font-size="11" font-weight="700">${t.n}</text>
          <rect x="${x}" y="${y + 5}" width="${w}" height="${rowH - 14}" fill="${t.c}" rx="4" opacity="0.85"/>
          <text x="${x + w / 2}" y="${y + rowH / 2 - 2}" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">${t.dur}s</text>
        </g>`;
      }).join('')}
    </svg>
  </div>`;
}

// ============================================================
// S — Toile d'araignée 3D
// ============================================================
function renderS() {
  const cats = ['Propulsion', 'Satellites', 'Informatique', 'Astronomie', 'Biologie'];
  const agences = [
    { n: 'ESA', v: [8, 7, 6, 9, 5], c: '#000091' },
    { n: 'NASA', v: [9, 8, 9, 10, 7], c: '#E1000F' },
    { n: 'SpaceX', v: [10, 9, 8, 6, 3], c: '#16a34a' }
  ];
  const cW = 900, cH = 600, cx = cW / 2, cy = cH / 2, r = 200;
  const n = cats.length;
  const grid = [0.2, 0.4, 0.6, 0.8, 1.0].map(lv => {
    const pts = cats.map((_, i) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * lv * Math.cos(a)},${cy + r * lv * Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1"/>`;
  }).join('');
  const axLines = cats.map((c, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return `<g>
      <line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="var(--border)"/>
      <text x="${cx + (r + 30) * Math.cos(a)}" y="${cy + (r + 30) * Math.sin(a)}" text-anchor="middle" fill="var(--bleu)" font-size="13" font-weight="700">${c}</text>
    </g>`;
  }).join('');
  const polys = agences.map(ag => {
    const pts = ag.v.map((v, i) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * (v / 10) * Math.cos(a)},${cy + r * (v / 10) * Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="${ag.c}" fill-opacity="0.2" stroke="${ag.c}" stroke-width="3"/>`;
  }).join('');
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🕷️ S — Toile d'araignée (comparaison agences)</h3>
    <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:center; justify-content:center;">
      <svg viewBox="0 0 900 600" style="width:100%; max-width:500px;">
        ${grid}${axLines}${polys}
      </svg>
      <div>${agences.map(a => `<div class="legend-item"><span class="dot" style="background:${a.c}"></span>${a.n}</div>`).join('')}</div>
    </div>
  </div>`;
}

// ============================================================
// T — Animation interactive (zoom/pan)
// ============================================================
let zoomLevel = 1;
let panX = 0, panY = 0;

function updateInteractiveChart() {
  const g = document.getElementById('interactive-g');
  if (g) g.setAttribute('transform', `translate(${panX}, ${panY}) scale(${zoomLevel})`);
}

function zoomIn() { zoomLevel = Math.min(5, zoomLevel + 0.2); updateInteractiveChart(); }
function zoomOut() { zoomLevel = Math.max(0.5, zoomLevel - 0.2); updateInteractiveChart(); }
function panLeft() { panX += 30; updateInteractiveChart(); }
function panRight() { panX -= 30; updateInteractiveChart(); }
function panUp() { panY += 30; updateInteractiveChart(); }
function panDown() { panY -= 30; updateInteractiveChart(); }
function resetZoom() { zoomLevel = 1; panX = 0; panY = 0; updateInteractiveChart(); }

window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.panLeft = panLeft;
window.panRight = panRight;
window.panUp = panUp;
window.panDown = panDown;
window.resetZoom = resetZoom;

function renderT() {
  const pts = Object.entries(ARIANE6_DB).slice(0, 100).map(([m, i], idx) => {
    const a = idx * 0.5;
    const r = 30 + idx * 1.5;
    return { x: 400 + r * Math.cos(a), y: 300 + r * Math.sin(a), c: PALETTE[idx % PALETTE.length], n: m };
  });
  return `<div class="chart-container">
    <h3 style="color:var(--bleu); margin-bottom:16px; font-size:16px;">🔍 T — Animation interactive (zoom/pan)</h3>
    <div style="display:flex; gap:6px; margin-bottom:12px; flex-wrap:wrap;">
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="zoomIn()">🔍+</button>
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="zoomOut()">🔍-</button>
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="panLeft()">←</button>
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="panRight()">→</button>
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="panUp()">↑</button>
      <button class="btn-primary" style="padding:6px 12px; border-radius:6px;" onclick="panDown()">↓</button>
      <button class="btn-random" style="padding:6px 12px; border-radius:6px;" onclick="resetZoom()">↺</button>
    </div>
    <svg viewBox="0 0 800 600" style="width:100%; height:auto; background:var(--gris-50); border-radius:12px; padding:16px; overflow:hidden;">
      <g id="interactive-g">
        ${pts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="8" fill="${p.c}" opacity="0.7"/>`).join('')}
      </g>
    </svg>
  </div>`;
}

// ============================================================
// PAGE GRAPHIQUES COMPLÈTE (A → T)
// ============================================================
async function openAriane6ChartsAll() {
  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header">
      <h2>📈 Graphiques A → T — Encyclopédie Ariane 6</h2>
      <div class="dashboard-actions">
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div id="chart-A">${renderA()}</div>
    <div id="chart-B">${renderB()}</div>
    <div id="chart-C">${renderC()}</div>
    <div id="chart-D">${renderD()}</div>
    <div id="chart-E">${renderE()}</div>
    <div id="chart-F">${renderF()}</div>
    <div id="chart-G">${renderG()}</div>
    <div id="chart-H">${renderH()}</div>
    <div id="chart-I">${renderI()}</div>
    <div id="chart-J">${renderJ()}</div>
    <div id="chart-K">${renderK()}</div>
    <div id="chart-L">${renderL()}</div>
    <div id="chart-M">${renderM()}</div>
    <div id="chart-N">${renderN()}</div>
    <div id="chart-O">${renderO()}</div>
    <div id="chart-P">${renderP()}</div>
    <div id="chart-Q">${renderQ()}</div>
    <div id="chart-R">${renderR()}</div>
    <div id="chart-S">${renderS()}</div>
    <div id="chart-T">${renderT()}</div>
  `;
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => animateBars(), 500);
}
window.openAriane6ChartsAll = openAriane6ChartsAll;
window.openAriane6Charts = openAriane6ChartsAll;
