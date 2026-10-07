// ============================================================
// 🎠 CARROUSEL APOD — 30 derniers jours
// © gunout
// ============================================================

const APOD_API = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';

async function fetchAPOD30() {
  try {
    const res = await fetch(APOD_API);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.slice(0, 30).map(item => ({
      date: item.date,
      title: (item.title || '').replace(/<[^>]*>/g, '').trim(),
      url: item.hdurl || item.url,
      explanation: (item.explanation || '').replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...',
      credit: (item.credit || '').replace(/<[^>]*>/g, '').trim(),
      permalink: item.permalink
    }));
  } catch (e) {
    console.error('❌ APOD Carrousel:', e.message);
    return [];
  }
}

async function openAPODCarousel() {
  const r = document.getElementById('results');
  r.innerHTML = '<div class="dashboard-header"><h2>🎠 Carrousel APOD</h2><div class="dashboard-actions"><button onclick="clearResults()">✖ Fermer</button></div></div>' +
    '<div class="card" style="text-align:center;padding:60px;"><div style="font-size:4rem;">🎠</div><div style="font-size:1.2rem;margin-top:16px;">Chargement des 30 derniers APOD...</div></div>';
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const items = await fetchAPOD30();
  if (!items.length) {
    r.innerHTML = '<div class="dashboard-header"><h2>🎠 Carrousel</h2></div><div class="card">❌ Aucune image disponible</div>';
    return;
  }

  let currentIndex = 0;

  function renderSlide() {
    const item = items[currentIndex];
    return `
      <div class="card" style="padding:0;overflow:hidden;">
        <img src="${item.url}" style="width:100%;max-height:500px;object-fit:cover;background:#000;" alt="${item.title}" onerror="this.style.display='none'">
        <div style="padding:20px;">
          <h3 style="color:var(--bleu);font-size:1.3rem;margin-bottom:8px;">${item.title}</h3>
          <div class="meta" style="margin-bottom:12px;">
            <span class="tag bleu">${item.date}</span>
            ${item.credit ? `<span class="tag or">${item.credit.substring(0, 50)}</span>` : ''}
          </div>
          <p style="font-size:0.85rem;color:var(--gris-700);line-height:1.6;">${item.explanation}</p>
          ${item.permalink ? `<a href="${item.permalink}" target="_blank" style="display:inline-block;margin-top:12px;color:#4A90E2;text-decoration:none;font-size:0.85rem;">🔗 Voir la page APOD</a>` : ''}
        </div>
      </div>
    `;
  }

  function renderControls() {
    return `
      <div style="display:flex;justify-content:center;align-items:center;gap:16px;margin:20px 0;flex-wrap:wrap;">
        <button class="btn-primary" onclick="carouselPrev()" style="padding:10px 20px;border-radius:8px;">← Précédent</button>
        <span style="font-family:var(--mono);font-weight:700;color:var(--bleu);font-size:1rem;">${currentIndex + 1} / ${items.length}</span>
        <button class="btn-primary" onclick="carouselNext()" style="padding:10px 20px;border-radius:8px;">Suivant →</button>
      </div>
    `;
  }

  window.carouselPrev = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  };
  window.carouselNext = () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  };

  function updateCarousel() {
    const slide = document.getElementById('carousel-slide');
    const controls = document.getElementById('carousel-controls');
    const thumbnails = document.getElementById('carousel-thumbs');
    if (slide) slide.innerHTML = renderSlide();
    if (controls) controls.innerHTML = renderControls();
    if (thumbnails) {
      thumbnails.innerHTML = items.map((it, i) => `
        <div onclick="carouselGoTo(${i})" style="cursor:pointer;border:2px solid ${i === currentIndex ? 'var(--bleu)' : 'transparent'};border-radius:8px;overflow:hidden;transition:all 0.2s;">
          <img src="${it.url}" style="width:100%;height:60px;object-fit:cover;display:block;" onerror="this.style.background='#333'">
        </div>
      `).join('');
    }
  }

  window.carouselGoTo = (i) => {
    currentIndex = i;
    updateCarousel();
  };

  r.innerHTML = `
    <div class="dashboard-header">
      <h2>🎠 Carrousel APOD — ${items.length} images</h2>
      <div class="dashboard-actions">
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div id="carousel-slide">${renderSlide()}</div>
    <div id="carousel-controls">${renderControls()}</div>
    <div class="card">
      <h3 style="margin-bottom:12px;">📸 Miniatures</h3>
      <div id="carousel-thumbs" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;">
        ${items.map((it, i) => `
          <div onclick="carouselGoTo(${i})" style="cursor:pointer;border:2px solid ${i === 0 ? 'var(--bleu)' : 'transparent'};border-radius:8px;overflow:hidden;">
            <img src="${it.url}" style="width:100%;height:60px;object-fit:cover;display:block;" onerror="this.style.background='#333'">
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.openAPODCarousel = openAPODCarousel;
console.log('🎠 Carrousel APOD chargé');
