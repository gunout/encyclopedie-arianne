// ============================================================
// 📄 GÉNÉRATEUR PDF — Encyclopédie ESA
// © gunout · Utilise jsPDF
// ============================================================

async function genererPDF() {
  // Charger jsPDF
  if (!window.jspdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(script);
    await new Promise(r => script.onload = r);
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page de garde
  doc.setFillColor(0, 0, 145);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.text('ENCYCLOPÉDIE', 105, 100, { align: 'center' });
  doc.setFontSize(24);
  doc.text('ARIANE 6', 105, 120, { align: 'center' });
  doc.setFontSize(14);
  doc.text('ESA Ready — 2287 mots', 105, 140, { align: 'center' });
  doc.setFontSize(10);
  doc.text('© gunout · 2026', 105, 260, { align: 'center' });

  // Statistiques
  doc.addPage();
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text('Statistiques', 20, 30);
  doc.setFontSize(12);
  doc.text(`Total de mots : ${Object.keys(ARIANE6_DB).length}`, 20, 50);
  const types = {};
  Object.values(ARIANE6_DB).forEach(i => types[i.type] = (types[i.type] || 0) + 1);
  let y = 60;
  Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => {
    doc.text(`${t} : ${n}`, 20, y);
    y += 8;
  });

  // Liste des mots ESA-ready
  doc.addPage();
  doc.setFontSize(20);
  doc.text('Mots ESA-ready', 20, 30);
  doc.setFontSize(10);
  y = 45;
  Object.entries(ARIANE6_DB).forEach(([mot, info]) => {
    if (!info.definition || !info.normes_ecss?.length) return;
    if (y > 280) { doc.addPage(); y = 20; }
    doc.setFont(undefined, 'bold');
    doc.text(mot.toUpperCase(), 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(info.definition.substring(0, 80), 20, y + 5);
    y += 12;
  });

  doc.save(`encyclopedie-ariane6-esa-${Date.now()}.pdf`);
  showToast('📄 PDF généré');
}

window.genererPDF = genererPDF;