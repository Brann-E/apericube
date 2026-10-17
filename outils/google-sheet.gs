// Apéricube — réception des réponses dans une Google Sheet.
//
// Installation (une seule fois) :
//   1. Créer une Google Sheet vide.
//   2. Extensions > Apps Script, effacer le contenu, coller ce fichier, enregistrer.
//   3. Déployer > Nouveau déploiement > type « Application web » :
//        Exécuter en tant que : moi ; Qui peut accéder : tout le monde.
//   4. Autoriser l'accès demandé par Google, copier l'URL de l'application web
//      et la mettre dans site/envoi.js (champ adresse).
//
// Chaque envoi ajoute une ligne dans l'onglet « Réponses ».
// Aucune donnée personnelle n'est reçue : pas de nom, pas d'adresse, pas d'IP.

const ONGLET = 'Réponses';
const COLONNES = ['reçu le', 'version', 'session', 'sphère', 'saveur', 'figure', 'code', 'teinte', 'delta',
  'DON', 'PRÉSENCE', 'DETTE', 'PARI', 'CONF',
  'DON brut', 'PRÉSENCE brut', 'DETTE brut', 'PARI brut', 'CONF brut', 'réponses'];

function doPost(e) {
  const verrou = LockService.getScriptLock();
  try {
    const texte = e.postData.contents;
    if (texte.length > 20000) throw new Error('envoi trop long');
    const d = JSON.parse(texte);
    if (!d.version || !d.session || ['chez_les_autres', 'chez_nous'].indexOf(d.sphere) < 0) throw new Error('données incomplètes');
    const p = d.positions || {}, b = d.brut || {};
    verrou.waitLock(10000);
    const classeur = SpreadsheetApp.getActiveSpreadsheet();
    const onglet = classeur.getSheetByName(ONGLET) || classeur.insertSheet(ONGLET);
    if (onglet.getLastRow() === 0) onglet.appendRow(COLONNES);
    // l'apostrophe empêche la Sheet de lire un code comme « +-+- » comme une formule
    onglet.appendRow([new Date(), d.version, d.session, d.sphere, d.saveur, d.figure, "'" + d.code, d.teinte, d.delta,
      p.DON, p.PRESENCE, p.DETTE, p.PARI, p.CONF,
      b.DON, b.PRESENCE, b.DETTE, b.PARI, b.CONF, JSON.stringify(d.reponses)]);
    return repondre({ ok: true });
  } catch (err) {
    return repondre({ ok: false, erreur: String(err && err.message || err) });
  } finally {
    verrou.releaseLock();
  }
}

function repondre(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet)).setMimeType(ContentService.MimeType.JSON);
}
