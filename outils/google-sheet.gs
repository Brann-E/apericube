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
// Une ligne par parcours (session + sphère) dans l'onglet « Réponses ».
// Le site l'envoie automatiquement au résultat ; un nouvel envoi pour le même
// parcours (choix modifiés, commentaire ajouté) met à jour la ligne au lieu d'en créer une.
// Aucune donnée personnelle n'est reçue : pas de nom, pas d'adresse, pas d'IP.

const ONGLET = 'Réponses';
const COLONNES = ['reçu le', 'version', 'session', 'sphère', 'saveur', 'figure', 'code', 'teinte', 'delta',
  'DON', 'PRÉSENCE', 'DETTE', 'PARI', 'CONF',
  'DON brut', 'PRÉSENCE brut', 'DETTE brut', 'PARI brut', 'CONF brut', 'réponses', 'commentaire'];

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
    // onglet créé avant l'ajout du commentaire : on complète la ligne de titres
    else if (onglet.getRange(1, COLONNES.length).getValue() === '') onglet.getRange(1, COLONNES.length).setValue(COLONNES[COLONNES.length - 1]);
    // ligne déjà reçue pour ce parcours (même session, même sphère) ?
    const n = onglet.getLastRow() - 1;
    let trouvee = 0;
    if (n > 0) {
      const cles = onglet.getRange(2, 3, n, 2).getValues();
      for (let k = n - 1; k >= 0; k--) if (cles[k][0] === d.session && cles[k][1] === d.sphere) { trouvee = k + 2; break; }
    }
    // sans nouveau commentaire, on garde celui déjà reçu
    let commentaire = String(d.commentaire || '').slice(0, 2000);
    if (!commentaire && trouvee) commentaire = String(onglet.getRange(trouvee, COLONNES.length).getValue() || '');
    // l'apostrophe empêche la Sheet de lire un code comme « +-+- » comme une formule
    const ligne = [new Date(), d.version, d.session, d.sphere, d.saveur, d.figure, "'" + d.code, d.teinte, d.delta,
      p.DON, p.PRESENCE, p.DETTE, p.PARI, p.CONF,
      b.DON, b.PRESENCE, b.DETTE, b.PARI, b.CONF, JSON.stringify(d.reponses),
      // l'apostrophe empêche un commentaire commençant par = + - @ d'être exécuté comme une formule
      commentaire ? "'" + commentaire : ''];
    if (trouvee) onglet.getRange(trouvee, 1, 1, ligne.length).setValues([ligne]);
    else onglet.appendRow(ligne);
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
