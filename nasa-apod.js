// ============================================================
// 🌌 NASA APOD — v14 FINAL (hdurl)
// © gunout
// ============================================================

const APOD_NEW_API = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';

const APOD_FALLBACK = {
  date: new Date().toISOString().split('T')[0],
  title: '🌌 NASA APOD',
  explanation: 'Chargement...',
  url: 'https://apod.nasa.gov/apod/image/2401/Orion_Hubble_960.jpg',
  media_type: 'image',
  fallback: true
};

async function fetchAPOD() {
  try {
    console.log('🔄 APOD: appel API...');
    const res = await fetch(APOD_NEW_API);
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();
    const item = data[0];
    console.log('📋 Titre:', item.title);
    console.log('🖼️ hdurl:', item.hdurl);

    // ✅ UTILISER hdurl DIRECTEMENT
    const imageUrl = item.hdurl || item.url || '';

    if (!imageUrl) {
      console.warn('❌ Pas d\'image');
      return APOD_FALLBACK;
    }

    // Nettoyer le HTML
    const cleanHtml = (str) => (str || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

    return {
      date: item.date || new Date().toISOString().split('T')[0],
      title: cleanHtml(item.title) || 'NASA APOD',
      explanation: cleanHtml(item.explanation) || 'Consultez la page APOD.',
      url: imageUrl,
      hdurl: imageUrl,
      alt: cleanHtml(item.alt) || '',
      credit: cleanHtml(item.credit) || 'NASA',
      copyright: cleanHtml(item.copyright) || 'NASA',
      permalink: item.permalink || '',
      media_type: item.media_type || 'image',
      source: 'live'
    };

  } catch (e) {
    console.error('❌ APOD erreur:', e.message);
    return APOD_FALLBACK;
  }
}

async function renderAPOD() {
  const apod = await fetchAPOD();

  return `
    <div class="dashboard-header">
      <h2>🌌 NASA APOD — ${apod.date}</h2>
      <div class="dashboard-actions">
        <button onclick="openAPOD()">🔄 Réessayer</button>
        <button onclick="window.open('https://science.nasa.gov/apod/', '_blank')">🔗 APOD officiel</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    ${apod.fallback ? '<div style="background:rgba(251,191,36,.15);border:1px solid #fbbf24;padding:12px;border-radius:8px;margin-bottom:16px;color:#8a5e00;">⚠️ API NASA indisponible</div>' : ''}
    <div class="card">
      <h3 style="font-size:1.3rem;color:var(--bleu);margin-bottom:16px;">${apod.title}</h3>
      <img src="${apod.url}" 
           style="width:100%;border-radius:12px;margin:16px 0;max-height:600px;object-fit:contain;background:#000;" 
           alt="${apod.alt || apod.title}"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <div style="display:none; padding:40px; text-align:center; background:var(--gris-50); border-radius:12px; margin:16px 0;">
        <div style="font-size:3rem;">🖼️</div>
        <div style="color:var(--gris-500); margin-top:8px;">Image non disponible</div>
        <a href="${apod.url}" target="_blank" style="color:#4A90E2; display:inline-block; margin-top:12px;">Ouvrir l'image</a>
      </div>
      <p style="font-size:0.9rem;color:var(--gris-700);line-height:1.6;margin-bottom:16px;">${apod.explanation}</p>
      ${apod.credit ? `<p style="font-size:0.75rem;color:var(--gris-500);margin-bottom:16px;"><strong>Crédit :</strong> ${apod.credit}</p>` : ''}
      <div class="meta">
        <span class="tag bleu">${apod.date}</span>
        <span class="tag">${apod.media_type}</span>
        <span class="tag vert">live</span>
      </div>
    </div>
    <div class="card">
      <h3>🔗 Liens</h3>
      <div class="stats-grid">
        <div class="stat-card"><div class="label">APOD officiel</div><div class="value bleu"><a href="https://science.nasa.gov/apod/" target="_blank" style="color:#4A90E2;text-decoration:none;">science.nasa.gov/apod</a></div></div>
        ${apod.permalink ? `<div class="stat-card"><div class="label">Page du jour</div><div class="value bleu"><a href="${apod.permalink}" target="_blank" style="color:#4A90E2;text-decoration:none;">Voir</a></div></div>` : ''}
        <div class="stat-card"><div class="label">Image HD</div><div class="value bleu"><a href="${apod.url}" target="_blank" style="color:#4A90E2;text-decoration:none;">Ouvrir</a></div></div>
      </div>
    </div>
  `;
}

async function openAPOD() {
  const r = document.getElementById('results');
  r.innerHTML = '<div class="dashboard-header"><h2>🌌 Chargement...</h2></div><div class="card" style="text-align:center;padding:60px 20px;"><div style="font-size:4rem;">🌌</div><div style="font-size:1.2rem;color:var(--gris-700);margin-top:16px;">Connexion science.nasa.gov...</div></div>';
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  r.innerHTML = await renderAPOD();
}

window.openAPOD = openAPOD;
window.fetchAPOD = fetchAPOD;

console.log('🌌 NASA APOD v14 chargé — hdurl utilisé');
