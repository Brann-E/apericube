// Apéricube — test de conformité du site.
//
// Vérifie deux choses :
//   1. les données du site (site/contenu.js) sont identiques aux fichiers de
//      référence (data.json, profils.json) ;
//   2. le calcul du site (fonction compute de site/app.js, utilisée telle quelle)
//      donne exactement le même résultat que engine.py sur des parcours au hasard.
//
// Usage :  node outils/verifier.js [nombre de parcours par sphère] [graine]
// Sortie : code 0 si tout est conforme, 1 sinon.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const RACINE = process.env.APERICUBE_RACINE || path.resolve(__dirname, '..');
const N = parseInt(process.argv[2] || '1000', 10);
const GRAINE = parseInt(process.argv[3] || '12345', 10);
const lire = f => fs.readFileSync(path.join(RACINE, f), 'utf8');

const erreurs = [];
const ecart = m => erreurs.push(m);

// --- chargement ------------------------------------------------------------
const C = JSON.parse(lire('site/contenu.js').replace(/^window\.CONTENT = /, '').replace(/;\s*$/, ''));
const D = JSON.parse(lire('data.json'));
const P = JSON.parse(lire('profils.json'));
const SPHERES = [['autres', 'chez_les_autres'], ['nous', 'chez_nous']];

// --- 1. données du site = fichiers de référence ----------------------------
const egal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const poids = w => JSON.stringify(Object.keys(w).sort().map(k => [k, w[k]]));

if (!egal(C.meta.rec, D.meta.recentrage)) ecart('recentrage différent de data.json');
if (C.meta.aw !== D.meta['pondération_arbre']) ecart('pondération des arbres différente de data.json');
if (!egal(C.meta.confT, D.meta.teintes.chez_nous.seuils)) ecart('seuils de conformité différents de data.json');
if (!egal(C.meta.engT, D.meta.teintes.chez_les_autres.seuils_engagement_moyen)) ecart("seuils d'engagement différents de data.json");

for (const [cle, sphere] of SPHERES) {
  const scenes = D[sphere].scenes;
  if (C[cle].map(s => s.key).join() !== Object.keys(scenes).join()) ecart(`${sphere} : ordre des scènes différent`);
  for (const scn of C[cle]) {
    const ref = scenes[scn.key];
    if (!ref) { ecart(`${sphere} : scène ${scn.key} absente de data.json`); continue; }
    const moments = scn.items.filter(i => i.k === 'q' || i.k === 'tree');
    if (moments.length !== ref.length) ecart(`${scn.key} : ${moments.length} moments au lieu de ${ref.length}`);
    moments.forEach((it, j) => {
      const m = ref[j], lieu = `${scn.key} moment ${j + 1}`;
      if (!m) return;
      const arbre = m.type === 'arbre';
      if ((it.k === 'tree') !== arbre) ecart(`${lieu} : type différent`);
      if ((it.p ?? null) !== (m.pression ?? null)) ecart(`${lieu} : pression ${it.p} au lieu de ${m.pression}`);
      const opts = arbre ? m.etage1 : m.options;
      if (it.o.length !== opts.length) ecart(`${lieu} : ${it.o.length} options au lieu de ${opts.length}`);
      it.o.forEach((o, k) => {
        if (!opts[k]) return;
        if (poids(o.w) !== poids(opts[k].poids)) ecart(`${lieu} option ${k + 1} : poids différents`);
        if ((o.e ?? null) !== (opts[k].engagement ?? null)) ecart(`${lieu} option ${k + 1} : engagement différent`);
      });
      if (arbre) it.br.forEach((b, bi) => {
        const rb = m.branches[String(bi)];
        if (!rb || b.o.length !== rb.length) { ecart(`${lieu} branche ${bi + 1} : nombre d'options différent`); return; }
        b.o.forEach((o, k) => { if (poids(o.w) !== poids(rb[k].poids)) ecart(`${lieu} branche ${bi + 1} option ${k + 1} : poids différents`); });
      });
    });
  }
  for (const [code, v] of Object.entries(P[sphere])) {
    const q = C.profiles[sphere][code];
    if (!q) { ecart(`${sphere} ${code} : profil absent du site`); continue; }
    if (q.sav !== v.saveur || q.fig !== v.figure) ecart(`${sphere} ${code} : ${q.sav} / ${q.fig} au lieu de ${v.saveur} / ${v.figure}`);
    if (!Array.isArray(q.teintes) || q.teintes.length !== 4) ecart(`${sphere} ${code} : il faut 4 teintes`);
  }
}
const nbEcartsDonnees = erreurs.length;

// --- 2. calcul du site = engine.py -----------------------------------------
// On extrait de site/app.js le code réel (sceneItems, ONB, compute), sans le réécrire.
const app = lire('site/app.js');
const extraire = (debut, fin) => {
  const i = app.indexOf(debut), j = app.indexOf(fin, i);
  if (i < 0 || j < 0) throw new Error(`site/app.js : bloc « ${debut} » introuvable`);
  return app.slice(i, j + fin.length);
};
const code = [
  extraire('function sceneItems(', 'return out;}'),
  extraire('const ONB=[', "cta:'On y va'}];"),
  extraire('function compute(si){', 'teinte:prof.teintes[ti],tsrc};}'),
].join('\n');
const usine = new Function('C', 'SPH', 'cubes', code + '\nreturn {sceneItems, ONB, compute};');

const SPH = [], cubes = [];
const { sceneItems, ONB, compute } = usine(C, SPH, cubes);
SPH.push({ key: 'chez_les_autres', seq: sceneItems(C.autres, '') });
SPH.push({ key: 'chez_nous', seq: [...ONB, ...sceneItems(C.nous, '')] });

// hasard reproductible (même graine = mêmes parcours)
let g = GRAINE >>> 0;
const hasard = n => { g = (g + 0x6D2B79F5) >>> 0; let t = g; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * n); };

const parcours = [];
SPHERES.forEach(([cle, sphere], si) => {
  // index de chaque moment dans la séquence → nom de sa scène
  const sceneDe = [];
  C[cle].forEach(scn => { sceneDe.push(null); scn.items.forEach(() => sceneDe.push(scn.key)); });
  const decalage = si === 1 ? ONB.length : 0;
  for (let n = 0; n < N; n++) {
    const ans = {}, reponses = {};
    C[cle].forEach(scn => { reponses[scn.key] = []; });
    SPH[si].seq.forEach((it, idx) => {
      if (it.k === 'q') {
        ans[idx] = { o: hasard(it.o.length) };
        if (!it.trap) reponses[sceneDe[idx - decalage]].push(ans[idx].o);
      } else if (it.k === 'tree') {
        const e1 = hasard(it.o.length), b = hasard(it.br[e1].o.length);
        ans[idx] = { e1, b };
        reponses[sceneDe[idx - decalage]].push([e1, b]);
      }
    });
    cubes[si] = { ans };
    const r = compute(si);
    parcours.push({ sphere, reponses, site: { pos: r.pos, code: r.code, delta: r.delta, saveur: r.prof.sav, figure: r.prof.fig, teinte: r.prof.teintes.indexOf(r.teinte) } });
  }
});

// engine.py calcule les mêmes parcours
const pilote = path.join(__dirname, 'moteur_reference.py');
const entree = JSON.stringify(parcours.map(p => ({ sphere: p.sphere, reponses: p.reponses })));
let py = null;
for (const [exe, args] of [['py', ['-3', '-I']], ['python3', ['-I']], ['python', ['-I']]]) {
  const r = spawnSync(exe, [...args, pilote, RACINE], { input: entree, encoding: 'utf8', maxBuffer: 1 << 28 });
  if (r.status === 0) { py = JSON.parse(r.stdout); break; }
  if (r.stderr && !r.error) { console.error(r.stderr); break; }
}
if (!py) { console.error('Impossible de lancer engine.py (Python introuvable ou en erreur).'); process.exit(1); }

const TOL = 1e-9;
let nbEcartsCalcul = 0;
parcours.forEach((p, i) => {
  const e = py[i], s = p.site, lieu = `${p.sphere} parcours ${i % N + 1}`;
  const diffs = [];
  for (const k of Object.keys(e.pos)) if (Math.abs(e.pos[k] - s.pos[k]) > TOL) diffs.push(`${k} ${s.pos[k]} ≠ ${e.pos[k]}`);
  if (e.code !== s.code) diffs.push(`code ${s.code} ≠ ${e.code}`);
  if (Math.abs(e.delta - s.delta) > TOL) diffs.push(`delta ${s.delta} ≠ ${e.delta}`);
  if (e.saveur !== s.saveur || e.figure !== s.figure) diffs.push(`saveur ${s.saveur} ≠ ${e.saveur}`);
  if (e.teinte !== s.teinte) diffs.push(`teinte ${s.teinte} ≠ ${e.teinte}`);
  if (diffs.length) { nbEcartsCalcul++; if (nbEcartsCalcul <= 10) ecart(`${lieu} : ${diffs.join(', ')}`); }
});

// --- bilan -----------------------------------------------------------------
console.log(`Données du site / data.json + profils.json : ${nbEcartsDonnees ? nbEcartsDonnees + ' écart(s)' : 'identiques'}`);
console.log(`Calcul du site / engine.py, ${N} parcours par sphère (graine ${GRAINE}) : ${nbEcartsCalcul ? nbEcartsCalcul + ' parcours en écart' : 'identique sur tous les parcours'}`);
for (const [, sphere] of SPHERES) {
  const ps = parcours.filter(p => p.sphere === sphere);
  const codes = new Set(ps.map(p => p.site.code)), teintes = new Set(ps.map(p => p.site.teinte));
  console.log(`  couverture ${sphere} : ${codes.size}/16 profils, ${teintes.size}/4 teintes`);
}
if (erreurs.length) { console.log('\nDétail :'); erreurs.forEach(m => console.log(' - ' + m)); }
console.log(erreurs.length ? '\nÉCHEC' : '\nCONFORME');
process.exit(erreurs.length ? 1 : 0);
