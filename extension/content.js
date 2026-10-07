'use strict';
const MOTS = ['vulcain', 'vinci', 'ariane6', 'galileo', 'copernicus', 'iss'];
document.addEventListener('mouseup', async () => {
  const sel = window.getSelection().toString().trim().toLowerCase();
  if (MOTS.includes(sel)) {
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const tip = document.createElement('div');
    tip.className = 'esa-tooltip';
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.bottom + 8) + 'px';
    tip.textContent = '🇪🇺 ' + sel.toUpperCase() + ' — Analysable avec ESA Encyclopedia';
    document.body.appendChild(tip);
    setTimeout(() => tip.remove(), 2500);
  }
});
