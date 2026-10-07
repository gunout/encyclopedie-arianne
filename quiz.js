// ============================================================
// 🎯 MODE QUIZ — Encyclopédie ESA
// © gunout
// ============================================================

let quizState = { score: 0, total: 0, question: null, repondu: false };

function genererQuestion() {
  const mots = Object.keys(ARIANE6_DB);
  const bonMot = mots[Math.floor(Math.random() * mots.length)];
  const bonneReponse = ARIANE6_DB[bonMot].definition || ARIANE6_DB[bonMot].application;

  // Trouver 3 mauvaises réponses
  const mauvaises = [];
  while (mauvaises.length < 3) {
    const autre = mots[Math.floor(Math.random() * mots.length)];
    if (autre !== bonMot && ARIANE6_DB[autre].definition) {
      const rep = ARIANE6_DB[autre].definition;
      if (!mauvaises.includes(rep) && rep !== bonneReponse) {
        mauvaises.push(rep);
      }
    }
  }

  const options = [bonneReponse, ...mauvaises].sort(() => Math.random() - 0.5);
  return { mot: bonMot, bonneReponse, options };
}

function renderQuiz() {
  if (!quizState.question) quizState.question = genererQuestion();
  const q = quizState.question;

  return `
    <div class="dashboard-header">
      <h2>🎯 Quiz ESA — Score : ${quizState.score} / ${quizState.total}</h2>
      <div class="dashboard-actions">
        <button onclick="resetQuiz()">🔄 Recommencer</button>
        <button onclick="clearResults()">✖ Fermer</button>
      </div>
    </div>
    <div class="card" style="border-left-color:var(--or);">
      <h3>Quel mot correspond à cette définition ?</h3>
      <p style="font-size:1rem; color:var(--gris-700); margin:16px 0;">"${q.bonneReponse}"</p>
      <div style="display:grid; gap:10px; margin-top:16px;">
        ${q.options.map((opt, i) => `
          <button class="btn" style="background:${quizState.repondu && opt === q.bonneReponse ? 'var(--vert)' : quizState.repondu ? 'var(--gris-100)' : 'var(--panel)'}; color:${quizState.repondu ? (opt === q.bonneReponse ? '#fff' : 'var(--gris-700)') : 'var(--text)'}; border:1px solid var(--border); text-align:left; padding:14px;" onclick="repondre('${opt.replace(/'/g, "\\'")}')">
            ${String.fromCharCode(65 + i)}. ${opt}
          </button>
        `).join('')}
      </div>
      ${quizState.repondu ? `
        <div style="margin-top:16px; text-align:center;">
          <button class="btn-primary" onclick="suivant()">➡️ Question suivante</button>
        </div>
      ` : ''}
    </div>
  `;
}

function repondre(choix) {
  if (quizState.repondu) return;
  const q = quizState.question;
  quizState.repondu = true;
  quizState.total++;
  if (choix === q.bonneReponse) {
    quizState.score++;
    showToast('✅ Bonne réponse !');
  } else {
    showToast('❌ Mauvaise réponse');
  }
  const r = document.getElementById('results');
  r.innerHTML = renderQuiz();
}

function suivant() {
  quizState.question = genererQuestion();
  quizState.repondu = false;
  const r = document.getElementById('results');
  r.innerHTML = renderQuiz();
}

function resetQuiz() {
  quizState = { score: 0, total: 0, question: genererQuestion(), repondu: false };
  const r = document.getElementById('results');
  r.innerHTML = renderQuiz();
}

function openQuiz() {
  quizState.question = genererQuestion();
  const r = document.getElementById('results');
  r.innerHTML = renderQuiz();
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.openQuiz = openQuiz;
window.repondre = repondre;
window.suivant = suivant;
window.resetQuiz = resetQuiz;