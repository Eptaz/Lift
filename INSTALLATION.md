# Lift — installer l'appli sur ton téléphone

Une appli de suivi de muscu : catalogue des 1 324 exercices avec leur **GIF d'exécution**, l'exécution **étape par étape**, et un formulaire pour noter **poids + séries × reps + note** à chaque séance. Tout est enregistré **en local sur ton téléphone** (rien ne part sur un serveur). C'est une **PWA** : une page web qui s'installe comme une vraie appli, sans passer par un store.

---

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli (tout est dedans : interface + logique) |
| `manifest.webmanifest` | Décrit l'appli (nom, icône, plein écran) |
| `sw.js` | Service worker : cache pour le lancement instantané + hors-ligne |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Icônes de l'appli |

Ces fichiers doivent **rester ensemble dans le même dossier**.

---

## Pourquoi il faut les mettre « en ligne »

Une PWA doit être servie en **HTTPS** pour s'installer sur le téléphone (c'est une règle de sécurité des navigateurs). Ouvrir le fichier en double-cliquant (`file://`) **ne suffit pas** : ni l'installation, ni le mode hors-ligne ne marcheront.

Il faut donc héberger le dossier quelque part en HTTPS. Le plus simple et **gratuit** : **GitHub Pages**. (Tu as déjà un compte GitHub puisque tu m'as envoyé un dépôt.)

---

## Méthode recommandée — GitHub Pages (gratuit, ~5 min, aucun serveur)

1. Va sur https://github.com/new et crée un dépôt, par ex. `lift`. Coche **Public**, puis **Create repository**.
2. Sur la page du dépôt vide, clique **uploading an existing file**.
3. Glisse-dépose les 6 fichiers : `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`. Clique **Commit changes**.
4. Onglet **Settings** → menu de gauche **Pages**.
5. Sous « Build and deployment », **Source = Deploy from a branch**, **Branch = main**, dossier **/ (root)**, puis **Save**.
6. Attends ~1 minute, recharge : GitHub affiche l'adresse, du type
   `https://TON-PSEUDO.github.io/lift/`
7. Ouvre cette adresse **depuis le navigateur de ton téléphone** → passe à l'installation ci-dessous.

> Le dépôt peut être public sans souci : tes données de séances (poids, notes) ne sont **pas** dans le code, elles restent uniquement sur ton téléphone.

---

## Installer sur l'écran d'accueil

### Sur iPhone (Safari — obligatoire, pas Chrome)
1. Ouvre l'adresse `https://…github.io/lift/` dans **Safari**.
2. Touche le bouton **Partager** (le carré avec la flèche vers le haut, en bas).
3. Fais défiler et touche **« Sur l'écran d'accueil »**.
4. Touche **Ajouter** en haut à droite.
5. L'icône « Lift » apparaît sur ton écran d'accueil. Ouvre-la : elle se lance en plein écran, comme une vraie appli.

### Sur Android (Chrome)
1. Ouvre l'adresse dans **Chrome**.
2. Un bandeau **« Installer l'application »** peut apparaître en bas → touche-le.
3. Sinon : menu **⋮** (trois points en haut à droite) → **« Ajouter à l'écran d'accueil »** ou **« Installer l'application »**.
4. Confirme. L'icône « Lift » arrive sur l'écran d'accueil.

---

## Comment ça marche au quotidien

- **Parcourir** : la grille montre tous les exercices. Barre de recherche en haut (par nom, muscle, équipement) et pastilles de catégorie (chest, back, legs…).
- **Voir l'exécution** : touche une carte → le GIF animé joue et les étapes s'affichent numérotées.
- **Noter une série** : dans la fiche, renseigne le poids, ajuste séries/reps avec les boutons − / +, ajoute une note si tu veux, puis **Enregistrer**.
- **Suivre la progression** : chaque exercice garde son **historique daté**. Un badge vert **✓** sur la carte indique les exercices déjà travaillés.
- **Glisser vers le bas** ou toucher **✕** pour fermer une fiche.

## Connexion internet

- Les **images et GIFs** viennent de GitHub (via le CDN jsDelivr). La **première fois** que tu ouvres un exercice, il faut du réseau ; ensuite il est mis en cache et s'affiche même hors-ligne.
- Tes **données de séances** sont 100 % locales : elles fonctionnent toujours, même sans réseau.

## Bon à savoir

- Les données sont liées à **ce téléphone et ce navigateur**. Changer de téléphone ou vider les données du navigateur les efface. (Si un jour tu veux une sauvegarde/synchro, c'est faisable — dis-le-moi.)
- Pour **mettre à jour** l'appli plus tard : remplace les fichiers sur GitHub, puis rouvre l'appli (le service worker récupère la nouvelle version au lancement suivant).

---

## Alternative : ton propre serveur

Si tu préfères héberger toi-même plutôt que GitHub Pages, n'importe quel hébergement statique en HTTPS convient. Sur ta machine, il suffit de servir le dossier :

```
# dans le dossier contenant index.html
python3 -m http.server 8080
```

…mais pour l'installation PWA sur le téléphone il te faudra du **HTTPS** (via un reverse proxy type Caddy/Nginx, ou un tunnel type Cloudflare Tunnel). GitHub Pages évite toute cette plomberie — c'est pour ça que je le recommande vu que tu veux du léger.
