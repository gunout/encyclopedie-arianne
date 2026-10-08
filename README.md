<div align="center">
# 🚀 Encyclopédie Ariane 6

![Version](https://img.shields.io/badge/version-4.0.0-339f82?style=flat-square)
![Mots](https://img.shields.io/badge/mots-2458-EF4135?style=flat-square)
![Catégories](https://img.shields.io/badge/catégories-30+-0055A4?style=flat-square)
![Licence](https://img.shields.io/badge/licence-MIT-ffffff?style=flat-square)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

![SHA-256](https://img.shields.io/badge/SHA--256-FIPS_180--4-339f82?style=flat-square)
![SHA-512](https://img.shields.io/badge/SHA--512-FIPS_180--4-339f82?style=flat-square)
![Base64](https://img.shields.io/badge/Base64-RFC_4648-0055A4?style=flat-square)

**Mots ↔ Nombres ↔ Hashs · Propulsion spatiale · © gunout**
</div>

---

## 📖 À propos

**Encyclopédie Ariane 6** est une base de connaissances interactive dédiée aux techniques spatiales, contenant **2458 mots-clés** répartis en **30+ catégories scientifiques**.

Chaque mot est analysé automatiquement pour générer :

- 🔢 Décodage Base 10 (A1Z26)
- 🔐 Hashs cryptographiques (SHA-256, SHA-384, SHA-512, Base64)
- 🎨 Couleur signature unique
- 📊 Fiche technique complète
- 📋 Normes ECSS et CCSDS
- 🌐 Multilingue FR/EN/DE/IT

---

## ✨ Fonctionnalités

- 🔍 Recherche de mots
- 🏷️ Filtre par catégorie (30+)
- 📊 Dashboard paginé (24 cartes/page)
- 📈 20 graphiques A→T
- 🔐 Hashs cryptographiques
- 🎨 Couleur signature
- 🔓 Décodage Base 10
- 📤 Export JSON
- 📄 Export CSV
- 🌌 APOD LIVE (NASA)
- 🎠 Carrousel APOD (25 images)
- ☄️ NeoWs (46 astéroïdes)
- 🛰️ ISS 3D (temps réel)
- 🇪🇺 ESA Dashboard
- 🎯 Quiz Solo + Multi
- 📄 Export PDF
- 🧪 Simulateur ESA
- ✓ Vérification RFC/NIST
- 🌐 API REST
- 🎲 Découverte aléatoire
- 🇫🇷 Design Marianne
- 📱 PWA (hors-ligne)

---

## 📊 Catégories

| Catégorie | Mots | Catégorie | Mots |
|---|---:|---|---:|
| Telecom | 485 | Optique | 85 |
| Mission | 119 | Physique | 84 |
| Astronomie | 107 | Matériau | 84 |
| Lanceur | 97 | Station | 85 |
| Économie | 97 | Droit | 80 |
| Mécanique | 95 | Instrument | 78 |
| Avionique | 92 | Médecine | 76 |
| Robotique | 92 | Biologie | 70 |
| Programme | 87 | Informatique | 67 |
| Orbite | 66 | Chimie | 58 |
| Agence | 26 | Moteur | 15 |
| Site | 8 | Concept | 6 |

**Total : 2458 mots**

---

## 🌐 APIs LIVE

| API | Description | Statut |
|---|---|---|
| APOD | Astronomy Picture of the Day | ✅ |
| Carrousel | 25 dernières images APOD | ✅ |
| NeoWs | Near Earth Objects (astéroïdes) | ✅ |
| ISS | Position temps réel | ✅ |
| Exoplanet | Archive des exoplanètes | ⏳ |

---

## 🎨 Design Marianne

| Couleur | Code | Usage |
|---|---|---|
| Bleu | #000091 | Couleur principale |
| Blanc | #ffffff | Fond / texte |
| Rouge | #E1000F | Accents |
| Or | #fbbf24 | Highlights |

**Liberté · Égalité · Fraternité**

---

## 📦 Fichiers

| Fichier | Description |
|---|---|
| index.html | Interface principale (GitHub Pages) |
| ariane6-complete.html | Interface locale |
| ariane6-db.json | Base 2458 mots enrichis |
| ariane6-db.js | Base JavaScript |
| ariane6-api.js | API REST Node.js |
| api-integration.js | Intégration ESA/NASA |
| nasa-apod.js | APOD LIVE |
| nasa-apis.js | NeoWs (astéroïdes) |
| apod-carousel.js | Carrousel APOD |
| iss-3d.js | ISS position temps réel |
| esa-dashboard.js | Dashboard ESA |
| simulateur-pro.js | Simulateur cadence/budget |
| quiz.js | Quiz solo |
| quiz-multi.js | Quiz multijoueur |
| pdf-generator.js | Export PDF |
| graphiques-master.js | 20 graphiques A→T |
| verification-simulateur.js | Tests RFC/NIST |
| manifest.json | PWA |
| sw.js | Service Worker |
| openapi.yaml | Schéma OpenAPI 3.0 |

---

## 🚀 Utilisation

### Interface HTML

Ouvrir directement le fichier index.html dans un navigateur.

### API Node.js

Installer les dépendances : npm install

Lancer l'API : npm start

Accès : http://localhost:3000/api/ariane6

### Docker

Lancer : docker-compose up

Interface : http://localhost:8080

API : http://localhost:3000/api/ariane6

### PWA

1. Ouvrir https://gunout.github.io/encyclopedie-arianne/
2. Cliquer sur "Installer" dans la barre d'adresse
3. L'application fonctionne hors-ligne

---

## 🌐 API REST

### Routes disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | /api/ariane6 | Liste des 2458 mots |
| GET | /api/ariane6/:mot | Détails d'un mot |
| GET | /api/ariane6/export/json | Export JSON |
| GET | /api/ariane6/export/csv | Export CSV |

### Exemples

Liste des mots : curl http://localhost:3000/api/ariane6

Détails de vulcain : curl http://localhost:3000/api/ariane6/vulcain

Export JSON : curl http://localhost:3000/api/ariane6/export/json

Export CSV : curl http://localhost:3000/api/ariane6/export/csv

### Réponse JSON

Chaque mot retourne :

- mot : le mot en majuscules
- number : somme A1Z26
- type : catégorie
- application : description
- definition : définition ESA
- specifications : specs techniques
- normes_ecss : normes ECSS
- sources : sources documentaires
- base10 : encodage et décodage
- couleur : hex et RGB
- base64 : encodage
- hashs : SHA-256, SHA-384, SHA-512

---

## 🔐 Cryptographie

| Algorithme | Standard |
|---|---|
| SHA-256 | FIPS 180-4 |
| SHA-384 | FIPS 180-4 |
| SHA-512 | FIPS 180-4 |
| Base64 | RFC 4648 |
| FNV-1a | Couleur signature |

Tous les hashs sont réels et vérifiables.

Exemple : SHA256("abc") = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad

---

## 🧪 Tests

Vérifier la syntaxe : node -c ariane6-api.js

Compter les mots : curl http://localhost:3000/api/ariane6

| Test | Action | Résultat attendu |
|---|---|---|
| Recherche | Tape vulcain | Fiche détaillée |
| Filtre | Clique sur astronomie | 107 mots |
| Dashboard | Clique sur 📊 | 103 pages |
| Graphiques | Clique sur 📈 | 20 graphiques |
| APOD | Clique sur 🌌 | Image NASA |
| ISS 3D | Clique sur 🛰️ | Position temps réel |

---

## 🤝 Contribution

Les contributions sont les bienvenues.

1. Fork le projet
2. Créer une branche : git checkout -b feature/ma-fonctionnalite
3. Commiter : git commit -m "feat: ajout de X"
4. Pusher : git push origin feature/ma-fonctionnalite
5. Ouvrir une Pull Request

### Conventions de commit

| Préfixe | Description |
|---|---|
| feat: | Nouvelle fonctionnalité |
| fix: | Correction de bug |
| docs: | Documentation |
| style: | Formatage |
| refactor: | Refactorisation |
| perf: | Performance |
| test: | Tests |

---

## 📜 Licence

MIT License

Copyright (c) 2026 gunout

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

## 👨‍💻 Auteur

© gunout

GitHub : https://github.com/gunout

"Liberté · Égalité · Fraternité"

---

## 🙏 Remerciements

- ESA — Agence spatiale européenne
- CNES — Centre national d'études spatiales
- NASA — National Aeronautics and Space Administration
- ArianeGroup — Constructeur d'Ariane 6
- Arianespace — Opérateur commercial

---
<div align="center">
## 📊 Statistiques

![GitHub stars](https://img.shields.io/github/stars/gunout/encyclopedie-arianne?style=social)
![GitHub forks](https://img.shields.io/github/forks/gunout/encyclopedie-arianne?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/gunout/encyclopedie-arianne?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/gunout/encyclopedie-arianne?style=flat-square)
</div>

---

< div align="center">
**🚀 Fait avec passion pour l'aérospatiale**

**© 2026 gunout · Tous droits réservés**
</div>
