"""Serveur local pour fabriquer les images de partage (outils/cartes-partage.html).

Lancer depuis la racine du projet :  py outils/serveur-cartes.py
puis ouvrir http://localhost:8010/outils/cartes-partage.html et cliquer sur « Générer ».
Les images sont enregistrées dans site/partage/.
"""

import functools
import http.server
import os
import re

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SORTIE = os.path.join(RACINE, 'site', 'partage')
PORT = int(os.environ.get('PORT', '8010'))


class Gestionnaire(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # seul chemin accepté : /enregistrer/<nom>.png, nom en minuscules, chiffres et tirets
        m = re.fullmatch(r'/enregistrer/([a-z0-9-]+\.png)', self.path)
        if not m:
            self.send_error(404)
            return
        taille = int(self.headers.get('Content-Length', '0'))
        if taille <= 0 or taille > 5_000_000:
            self.send_error(400)
            return
        os.makedirs(SORTIE, exist_ok=True)
        with open(os.path.join(SORTIE, m.group(1)), 'wb') as f:
            f.write(self.rfile.read(taille))
        self.send_response(204)
        self.end_headers()


if __name__ == '__main__':
    gestionnaire = functools.partial(Gestionnaire, directory=RACINE)
    print(f'http://localhost:{PORT}/outils/cartes-partage.html')
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), gestionnaire).serve_forever()
