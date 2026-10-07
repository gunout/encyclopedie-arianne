'use strict';
const API = 'https://gunout.github.io/encyclopedie-arianne/ariane6-db.json'\;

async function analyser(mot) {
  try {
    const res = await fetch(API);
    const data = await res.json();
    const info = data.mots[mot.toLowerCase()];
    if (!info) return '<div style="color:#E1000F;">❌ "' + mot + '" non trouvé</div>';
    return '<div class="label">Mot</div><div class="val">' + mot.toUpperCase() + '</div>' +
      '<div class="label">Type</div><div class="val">' + info.type + '</div>' +
      '<div class="label">Définition</div><div class="val">' + (info.definition || info.application) + '</div>' +
      (info.normes_ecss ? '<div class="label">Normes ECSS</div><div class="val">' + info.normes_ecss.join(', ') + '</div>' : '');
  } catch (e) {
    return '<div style="color:#E1000F;">❌ Erreur : ' + e.message + '</div>';
  }
}

document.getElementById('btn').addEventListener('click', async () => {
  const mot = document.getElementById('mot').value.trim();
  if (!mot) return;
  const r = document.getElementById('result');
  r.style.display = 'block';
  r.innerHTML = '⏳ Recherche...';
  r.innerHTML = await analyser(mot);
});

document.getElementById('mot').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn').click();
});

chrome.storage.local.get('mot', data => {
  if (data.mot) {
    document.getElementById('mot').value = data.mot;
    document.getElementById('btn').click();
  }
});
