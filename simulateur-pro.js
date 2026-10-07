// ============================================================
// 🧪 SIMULATEUR ESA — Design Marianne Pro
// © gunout
// ============================================================

function openSimulateur() {
  const r = document.getElementById('results');
  r.innerHTML = `
    <div class="dashboard-header" style="background:linear-gradient(135deg,#000091 0%,#1a1a6e 100%);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🧪</div>
        <div>
          <h2 style="font-size:1.4rem;color:#fff;margin:0;">Simulateur ESA</h2>
          <p style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin:0;">Optimisez cadence et budget</p>
        </div>
      </div>
      <div class="dashboard-actions">
        <button onclick="openSimulateur()" style="background:rgba(255,255,255,0.15);color:#fff;padding:8px 16px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">🔄 Réinitialiser</button>
        <button onclick="clearResults()" style="background:rgba(255,255,255,0.15);color:#fff;padding:8px 16px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">✖ Fermer</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">

      <!-- PARAMÈTRES -->
      <div class="card" style="border-left:4px solid var(--bleu);">
        <h3 style="color:var(--bleu);font-size:1rem;margin-bottom:20px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.2rem;">⚙️</span> Paramètres
        </h3>

        <div style="display:flex;flex-direction:column;gap:20px;">

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <label style="font-size:0.85rem;font-weight:600;color:var(--gris-700);">Cadence annuelle</label>
              <span id="simCadVal" style="font-family:monospace;font-weight:700;color:var(--bleu);background:var(--bleu-soft);padding:2px 10px;border-radius:6px;font-size:0.8rem;">10 vols/an</span>
            </div>
            <input type="range" id="simCad" min="1" max="50" value="10" oninput="runSim()" 
                   style="width:100%;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--bleu) 0%,var(--bleu) 20%,var(--gris-200) 20%);-webkit-appearance:none;outline:none;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--gris-500);margin-top:4px;">
              <span>1</span><span>25</span><span>50</span>
            </div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <label style="font-size:0.85rem;font-weight:600;color:var(--gris-700);">Budget annuel</label>
              <span id="simBudgetVal" style="font-family:monospace;font-weight:700;color:var(--bleu);background:var(--bleu-soft);padding:2px 10px;border-radius:6px;font-size:0.8rem;">7 500 M€</span>
            </div>
            <input type="range" id="simBudget" min="500" max="15000" value="7500" step="100" oninput="runSim()" 
                   style="width:100%;height:6px;border-radius:3px;background:var(--gris-200);-webkit-appearance:none;outline:none;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--gris-500);margin-top:4px;">
              <span>500 M€</span><span>15 000 M€</span>
            </div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <label style="font-size:0.85rem;font-weight:600;color:var(--gris-700);">Coût par vol</label>
              <span id="simCoutVal" style="font-family:monospace;font-weight:700;color:var(--bleu);background:var(--bleu-soft);padding:2px 10px;border-radius:6px;font-size:0.8rem;">70 M€</span>
            </div>
            <input type="range" id="simCout" min="30" max="200" value="70" oninput="runSim()" 
                   style="width:100%;height:6px;border-radius:3px;background:var(--gris-200);-webkit-appearance:none;outline:none;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--gris-500);margin-top:4px;">
              <span>30 M€</span><span>200 M€</span>
            </div>
          </div>

        </div>
      </div>

      <!-- RÉSULTATS -->
      <div class="card" style="border-left:4px solid var(--or);">
        <h3 style="color:var(--bleu);font-size:1rem;margin-bottom:20px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.2rem;">📊</span> Résultats
        </h3>
        <div id="simResults"></div>
      </div>

    </div>

    <!-- COMPARAISON -->
    <div class="card" style="border-left:4px solid var(--violet);margin-top:20px;">
      <h3 style="color:var(--bleu);font-size:1rem;margin-bottom:20px;display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.2rem;">🏆</span> Comparaison agences spatiales
      </h3>
      <div id="simComparaison"></div>
    </div>

    <style>
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #000091;
        cursor: pointer;
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,145,0.3);
      }
      input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #000091;
        cursor: pointer;
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,145,0.3);
      }
    </style>
  `;
  r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  runSim();
}

function runSim() {
  const cad = parseInt(document.getElementById('simCad')?.value || 10);
  const budget = parseInt(document.getElementById('simBudget')?.value || 7500);
  const coutVol = parseInt(document.getElementById('simCout')?.value || 70);

  // Mise à jour des labels
  document.getElementById('simCadVal').textContent = cad + ' vols/an';
  document.getElementById('simBudgetVal').textContent = budget.toLocaleString('fr-FR') + ' M€';
  document.getElementById('simCoutVal').textContent = coutVol + ' M€';

  const coutTotal = cad * coutVol;
  const reste = budget - coutTotal;
  const rentable = reste >= 0;
  const pourcentage = Math.min(100, (coutTotal / budget) * 100);

  // Cartes résultats
  const results = document.getElementById('simResults');
  results.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:linear-gradient(135deg,var(--bleu-soft),#fff);padding:16px;border-radius:12px;border:1px solid var(--bleu);">
        <div style="font-size:0.65rem;color:var(--bleu);text-transform:uppercase;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">Vols par an</div>
        <div style="font-size:1.8rem;font-weight:800;color:var(--bleu);font-family:monospace;line-height:1;">${cad}</div>
      </div>
      <div style="background:linear-gradient(135deg,var(--rouge-soft),#fff);padding:16px;border-radius:12px;border:1px solid var(--rouge);">
        <div style="font-size:0.65rem;color:var(--rouge);text-transform:uppercase;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">Coût total</div>
        <div style="font-size:1.8rem;font-weight:800;color:var(--rouge);font-family:monospace;line-height:1;">${coutTotal.toLocaleString('fr-FR')}<span style="font-size:1rem;"> M€</span></div>
      </div>
    </div>

    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.8rem;">
        <span style="color:var(--gris-700);font-weight:600;">Budget utilisé</span>
        <span style="color:var(--bleu);font-family:monospace;font-weight:700;">${pourcentage.toFixed(1)}%</span>
      </div>
      <div style="height:12px;background:var(--gris-100);border-radius:6px;overflow:hidden;">
        <div style="width:${pourcentage}%;height:100%;background:linear-gradient(90deg,var(--bleu),var(--or));transition:width 0.5s ease;"></div>
      </div>
    </div>

    <div style="background:${rentable ? 'var(--vert-soft)' : 'var(--rouge-soft)'};padding:16px;border-radius:12px;border:2px solid ${rentable ? 'var(--vert)' : 'var(--rouge)'};text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">${rentable ? '✅' : '❌'}</div>
      <div style="font-size:1.1rem;font-weight:800;color:${rentable ? 'var(--vert)' : 'var(--rouge)'};">
        ${rentable ? 'Rentable' : 'Déficit'}
      </div>
      <div style="font-size:0.85rem;color:var(--gris-700);margin-top:6px;">
        ${rentable ? '+' : ''}${reste.toLocaleString('fr-FR')} M€
      </div>
    </div>
  `;

  // Comparaison
  const agences = [
    { nom: 'ESA (simulé)', cadence: cad, couleur: '#000091', actuel: true },
    { nom: 'NASA', cadence: 90, couleur: '#0b3d91' },
    { nom: 'SpaceX', cadence: 95, couleur: '#16a34a' },
    { nom: 'CNSA', cadence: 65, couleur: '#db2777' },
    { nom: 'Roscosmos', cadence: 20, couleur: '#7c3aed' }
  ];
  const maxCad = Math.max(...agences.map(a => a.cadence));

  const comp = document.getElementById('simComparaison');
  comp.innerHTML = agences.map(a => `
    <div style="display:grid;grid-template-columns:140px 1fr 60px;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gris-100);">
      <div style="font-weight:${a.actuel ? '800' : '600'};font-family:monospace;font-size:0.85rem;color:${a.couleur};">
        ${a.actuel ? '⭐ ' : ''}${a.nom}
      </div>
      <div style="background:var(--gris-100);height:20px;border-radius:10px;overflow:hidden;position:relative;">
        <div style="width:${(a.cadence / maxCad) * 100}%;height:100%;background:linear-gradient(90deg,${a.couleur},${a.couleur}cc);border-radius:10px;transition:width 0.6s ease;"></div>
      </div>
      <div style="font-family:monospace;font-weight:700;color:${a.couleur};text-align:right;font-size:0.9rem;">${a.cadence}</div>
    </div>
  `).join('');
}

window.openSimulateur = openSimulateur;
window.runSim = runSim;

console.log('🧪 Simulateur ESA Pro chargé');
