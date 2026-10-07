#!/usr/bin/env python3
# ============================================================
# 🚀 ENRICHISSEMENT ESA — 2273 mots
# © gunout · Ajoute définitions, sources, normes
# ============================================================

import json
import os
from datetime import datetime

# ============================================================
# 1. CHARGER LA BASE
# ============================================================
if not os.path.exists('ariane6-db.json'):
    print("❌ ariane6-db.json introuvable")
    exit(1)

with open('ariane6-db.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

mots = data.get('mots', {})
print(f"✅ {len(mots)} mots chargés")

# ============================================================
# 2. BASES DE DONNÉES ESA
# ============================================================

# Normes ECSS par domaine
NORMES_ECSS = {
    'propulsion': ['ECSS-E-ST-35C', 'ECSS-E-ST-35-01C', 'ECSS-E-ST-35-02C'],
    'moteur': ['ECSS-E-ST-35C', 'ECSS-E-ST-35-03C'],
    'orbite': ['ECSS-E-ST-60C', 'ECSS-E-ST-60-30C'],
    'lanceur': ['ECSS-E-ST-32C', 'ECSS-E-ST-32-01C'],
    'telecom': ['ECSS-E-ST-50C', 'ECSS-E-ST-50-01C', 'ECSS-E-ST-50-05C'],
    'instrument': ['ECSS-E-ST-60-20C', 'ECSS-E-ST-60-30C'],
    'satellite': ['ECSS-E-ST-31C', 'ECSS-E-ST-31-02C'],
    'station': ['ECSS-E-ST-31C', 'ECSS-E-ST-70C'],
    'medecine': ['ECSS-E-ST-10-24C', 'ECSS-E-ST-70-01C'],
    'droit': ['ECSS-M-ST-10C', 'ECSS-M-ST-80C'],
    'economie': ['ECSS-M-ST-60C', 'ECSS-M-ST-40C'],
    'informatique': ['ECSS-E-ST-40C', 'ECSS-E-ST-40-07C'],
    'robotique': ['ECSS-E-ST-60-10C'],
    'optique': ['ECSS-E-ST-60-20C'],
    'physique': ['ECSS-E-ST-10C', 'ECSS-E-ST-10-04C'],
    'chimie': ['ECSS-Q-ST-70C', 'ECSS-Q-ST-70-02C'],
    'biologie': ['ECSS-Q-ST-70-55C'],
    'materiau': ['ECSS-Q-ST-70C', 'ECSS-Q-ST-70-71C'],
    'astronomie': ['ECSS-E-ST-60C'],
    'eva': ['ECSS-E-ST-10-24C'],
    'sciences-terre': ['ECSS-E-ST-60C'],
    'avionique': ['ECSS-E-ST-50C', 'ECSS-E-ST-20C'],
    'programme': ['ECSS-M-ST-10C', 'ECSS-M-ST-80C'],
    'mission': ['ECSS-M-ST-10C', 'ECSS-M-ST-80C'],
    'agence': ['ECSS-M-ST-10C'],
    'scientifique': ['ECSS-M-ST-10C'],
    'site': ['ECSS-E-ST-32C'],
    'booster': ['ECSS-E-ST-35C'],
    'concept': ['ECSS-E-ST-10C'],
}

# Standards CCSDS par domaine
CCSDS_STANDARDS = {
    'telecom': ['CCSDS 131.0-B', 'CCSDS 132.0-B', 'CCSDS 133.0-B'],
    'informatique': ['CCSDS 301.0-B', 'CCSDS 302.0-B'],
    'avionique': ['CCSDS 850.0-G', 'CCSDS 860.0-G'],
    'instrument': ['CCSDS 660.0-G'],
    'orbite': ['CCSDS 500.0-G', 'CCSDS 502.0-B'],
    'satellite': ['CCSDS 500.0-G'],
}

# Sources par catégorie
SOURCES_PAR_CATEGORIE = {
    'propulsion': [
        {'titre': 'ESA Propulsion', 'url': 'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Propulsion', 'type': 'site_officiel'},
        {'titre': 'Ariane 6 User Manual', 'url': 'https://www.arianespace.com', 'type': 'specification'},
    ],
    'moteur': [
        {'titre': 'ESA Propulsion', 'url': 'https://www.esa.int', 'type': 'site_officiel'},
        {'titre': 'ArianeGroup', 'url': 'https://www.ariane.group', 'type': 'industriel'},
    ],
    'telecom': [
        {'titre': 'ESA Telecom', 'url': 'https://www.esa.int/Applications/Connectivity_and_Secure_Communications', 'type': 'site_officiel'},
        {'titre': 'ITU-R', 'url': 'https://www.itu.int', 'type': 'standard'},
    ],
    'orbite': [
        {'titre': 'ESA Space Debris', 'url': 'https://www.esa.int/Space_Safety/Space_Debris', 'type': 'site_officiel'},
        {'titre': 'IADC Guidelines', 'url': 'https://www.iadc-home.org', 'type': 'standard'},
    ],
    'lanceur': [
        {'titre': 'Ariane 6', 'url': 'https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_6', 'type': 'site_officiel'},
        {'titre': 'Arianespace', 'url': 'https://www.arianespace.com', 'type': 'industriel'},
    ],
    'satellite': [
        {'titre': 'ESA Space Safety', 'url': 'https://www.esa.int/Space_Safety', 'type': 'site_officiel'},
    ],
    'station': [
        {'titre': 'ISS', 'url': 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station', 'type': 'site_officiel'},
    ],
    'medecine': [
        {'titre': 'ESA Space Medicine', 'url': 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration', 'type': 'site_officiel'},
    ],
    'astronomie': [
        {'titre': 'ESA Science', 'url': 'https://www.esa.int/Science_Exploration/Space_Science', 'type': 'site_officiel'},
        {'titre': 'NASA ADS', 'url': 'https://ui.adsabs.harvard.edu', 'type': 'publication'},
    ],
    'droit': [
        {'titre': 'UNOOSA', 'url': 'https://www.unoosa.org', 'type': 'standard'},
        {'titre': 'ESA Legal', 'url': 'https://www.esa.int/About_Us/Law_at_ESA', 'type': 'site_officiel'},
    ],
    'economie': [
        {'titre': 'ESA Budget', 'url': 'https://www.esa.int/About_Us/ESA_Publications', 'type': 'site_officiel'},
    ],
    'informatique': [
        {'titre': 'ESA Software', 'url': 'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Software_Systems', 'type': 'site_officiel'},
    ],
    'robotique': [
        {'titre': 'ESA Robotics', 'url': 'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Robotics', 'type': 'site_officiel'},
    ],
}

# Définitions ESA par mot-clé
DEFINITIONS_ESA = {
    'vulcain': "Moteur cryogénique LH2/LOX de l'étage principal (EPC) d'Ariane 6, développé par ArianeGroup.",
    'vinci': "Moteur cryogénique LH2/LOX réallumable de l'étage supérieur (ESC) d'Ariane 6.",
    'p160c': "Propulseur d'appoint à propergol solide d'Ariane 6 Block 2, version allongée du P120C.",
    'p120c': "Propulseur d'appoint à propergol solide commun à Ariane 6 et Vega-C.",
    'ariane6': "Lanceur européen lourd de nouvelle génération, successeur d'Ariane 5.",
    'ariane5': "Lanceur européen lourd (1996-2023), référence mondiale pour les lancements GTO.",
    'vega': "Lanceur léger européen pour charges utiles en orbite basse.",
    'kourou': "Centre spatial guyanais (CSG), port spatial de l'Europe en Guyane française.",
    'geo': "Orbite géostationnaire à 35 786 km d'altitude, période de 24 h.",
    'leo': "Orbite terrestre basse (Low Earth Orbit), entre 200 et 2 000 km.",
    'gto': "Orbite de transfert géostationnaire, orbite elliptique intermédiaire.",
    'aah': "Allocation aux Adultes Handicapés.",
    'iss': "Station spatiale internationale en orbite basse.",
    'starlink': "Constellation de satellites de télécommunications de SpaceX.",
    'galileo': "Système européen de navigation par satellite (GNSS).",
    'copernicus': "Programme européen d'observation de la Terre.",
}

# ============================================================
# 3. ENRICHISSEMENT
# ============================================================
def enrichir_mot(mot, info):
    """Enrichit un mot avec les données ESA."""
    categorie = info.get('type', 'concept')
    
    # Définition
    if mot in DEFINITIONS_ESA:
        info['definition'] = DEFINITIONS_ESA[mot]
    elif 'definition' not in info:
        info['definition'] = info.get('application', 'Terme technique spatial')
    
    # Normes ECSS
    info['normes_ecss'] = NORMES_ECSS.get(categorie, [])
    
    # Standards CCSDS
    if categorie in CCSDS_STANDARDS:
        info['normes_ccsds'] = CCSDS_STANDARDS[categorie]
    
    # Sources
    info['sources'] = SOURCES_PAR_CATEGORIE.get(categorie, [
        {'titre': 'ESA', 'url': 'https://www.esa.int', 'type': 'site_officiel'}
    ])
    
    # Multilingue (templates)
    mot_clean = mot.replace('-', ' ')
    info['multilingue'] = {
        'fr': mot_clean.capitalize(),
        'en': mot_clean.capitalize(),
        'de': mot_clean.capitalize(),
        'it': mot_clean.capitalize(),
    }
    
    # Métadonnées ESA
    info['esa'] = {
        'categorie': categorie,
        'domaine': 'spatial',
        'niveau': 'technique',
        'verifie': False,
    }
    
    return info

# Appliquer à tous les mots
enrichis = 0
for mot, info in mots.items():
    if 'definition' not in info or 'sources' not in info:
        mots[mot] = enrichir_mot(mot, info)
        enrichis += 1

# ============================================================
# 4. SAUVEGARDER
# ============================================================
data['mots'] = mots
data['meta'] = {
    'titre': 'Encyclopédie Ariane 6 — ESA Ready',
    'version': '4.0',
    'auteur': 'gunout',
    'date': datetime.now().isoformat(),
    'total': len(mots),
    'normes': ['ECSS', 'CCSDS', 'ISO 24113'],
    'langues': ['fr', 'en', 'de', 'it'],
}

with open('ariane6-db.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ {enrichis} mots enrichis")
print(f"📊 Total : {len(mots)} mots")
print(f"📅 {datetime.now().strftime('%d/%m/%Y %H:%M')}")