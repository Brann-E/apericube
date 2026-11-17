// Page des saveurs : deux onglets, « Chez les autres » et « Chez nous », de 16 saveurs chacun.
// L'adresse choisit l'onglet : #chez-nous ouvre « Chez nous » ; #<saveur> ouvre l'onglet de cette saveur
// et descend jusqu'à elle (c'est ce qu'envoie le bouton du résultat). Sans rien, « Chez les autres ».
(function () {
  const onglets = [...document.querySelectorAll('[role="tab"]')];
  if (!onglets.length) return;
  const panneau = o => document.getElementById(o.getAttribute('aria-controls'));
  function activer(o, focus) {
    onglets.forEach(x => { const on = x === o; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; panneau(x).hidden = !on; });
    if (focus) o.focus();
  }
  function depuisAdresse() {
    const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const cible = el && el.closest('[role="tabpanel"]');
    activer(onglets.find(o => panneau(o) === cible) || onglets[0]);
    if (el && el.classList.contains('saveur')) el.scrollIntoView({ block: 'center' });
  }
  onglets.forEach((o, k) => {
    o.addEventListener('click', () => { activer(o); history.replaceState(null, '', '#' + o.getAttribute('aria-controls')); });
    // flèches gauche et droite pour passer d'un onglet à l'autre au clavier
    o.addEventListener('keydown', e => {
      const pas = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!pas) return;
      e.preventDefault(); const suivant = onglets[(k + pas + onglets.length) % onglets.length]; activer(suivant, true);
      history.replaceState(null, '', '#' + suivant.getAttribute('aria-controls'));
    });
  });
  window.addEventListener('hashchange', depuisAdresse);
  depuisAdresse();
})();
