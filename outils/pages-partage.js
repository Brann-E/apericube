// Fabrique les 32 pages de partage (site/r/<saveur>/index.html) à partir de site/contenu.js.
// Chaque page : l'aperçu pour les messageries (titre, description, image) et ce qu'on voit en cliquant.
// Usage : node outils/pages-partage.js
const fs = require('fs'), path = require('path');
const RACINE = path.resolve(__dirname, '..');
const SITE = 'https://apericube.netlify.app';
const C = JSON.parse(fs.readFileSync(path.join(RACINE, 'site/contenu.js'), 'utf8').replace(/^window\.CONTENT = /, '').replace(/;\s*$/, ''));

// même nom que dans outils/cartes-partage.html et site/app.js
const slug = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const echapper = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const majuscule = t => t ? t[0].toUpperCase() + t.slice(1) : t;
const sansRepetition = t => majuscule(t.replace(/^[^:]+ : /, ''));
// couleurs de la page : fond éclairci de la saveur, encre sombre ou claire selon la luminosité
const rvb = hex => { const n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const melange = (a, b, t) => a.map((v, k) => Math.round(v + (b[k] - v) * t));
const hexa = c => '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
const luminance = c => { const l = c.map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; };

function page(p, sphere) {
  const nom = slug(p.sav), fond = melange(rvb(p.col), [255, 255, 255], 0.4), clair = luminance(fond) < 0.18;
  const encre = clair ? 'rgba(255,255,255,.96)' : 'rgba(18,12,10,.92)', encre2 = clair ? 'rgba(255,255,255,.72)' : 'rgba(18,12,10,.6)', filet = clair ? 'rgba(255,255,255,.35)' : 'rgba(18,12,10,.2)';
  const titre = `Je suis l’apéricube ${p.sav}, ${p.fig.charAt(0).toLowerCase() + p.fig.slice(1)}`;
  const description = 'Et toi, quel Apéricube es-tu ? Trois scènes de vie, quelques minutes, et ta saveur au bout.';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="${hexa(fond)}">
<title>${echapper(titre)}</title>
<meta name="description" content="${echapper(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Quel Apéricube es-tu ?">
<meta property="og:title" content="${echapper(titre)}">
<meta property="og:description" content="${echapper(description)}">
<meta property="og:url" content="${SITE}/r/${nom}/">
<meta property="og:image" content="${SITE}/partage/${nom}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${echapper('Tu es l’apéricube ' + p.sav + ', ' + p.fig)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300..700&display=swap">
<link rel="stylesheet" href="/partage/page.css">
<style>:root{--fond:${hexa(fond)};--encre:${encre};--encre2:${encre2};--filet:${filet}}</style>
</head>
<body>
<main class="page">
<p class="fil">${echapper(sphere)}   ·   Résultat partagé</p>
<div class="carte">
<canvas class="cube" data-couleur="${p.col}" aria-hidden="true"></canvas>
<p class="surtitre">Je suis l’apéricube</p>
<h1>${echapper(p.sav)}</h1>
<p class="figure">${echapper(p.fig)}</p>
<p class="phrase">${echapper(sansRepetition(p.sline || ''))}</p>
</div>
<section class="portrait">
${p.paras.map(x => '<p>' + echapper(x) + '</p>').join('\n')}
</section>
<section class="appel">
<h2>Et toi, quel Apéricube es‑tu&nbsp;?</h2>
<a class="bouton" href="/">Faire le test</a>
</section>
</main>
<script src="https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js"></script>
<script src="/partage/cube.js"></script>
</body>
</html>
`;
}

const seule = process.argv[2]; // option : une seule saveur, pour essayer
let n = 0;
for (const [cle, sphere] of [['chez_les_autres', 'Chez les autres'], ['chez_nous', 'Chez nous']]) {
  for (const p of Object.values(C.profiles[cle])) {
    if (seule && p.sav !== seule) continue;
    const dossier = path.join(RACINE, 'site', 'r', slug(p.sav));
    fs.mkdirSync(dossier, { recursive: true });
    fs.writeFileSync(path.join(dossier, 'index.html'), page(p, sphere));
    n++;
  }
}
console.log(n + ' page(s) de partage écrite(s) dans site/r/');
