// Envoi anonyme des réponses vers la Google Sheet de recherche.
// adresse : l'URL de l'application web Google Apps Script (voir outils/google-sheet.gs).
// Tant qu'elle est vide, le bouton d'envoi n'apparaît pas.
// version : à changer dès qu'on modifie les questions ou les poids, pour savoir
// avec quelle version de questionnaire chaque ligne a été produite.
window.ENVOI = {
  adresse: '',
  version: 'v1-2026-10-17',
};
