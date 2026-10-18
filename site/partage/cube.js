// Pages de partage : le petit cube du jeu, en 3D, qui tourne doucement dans la couleur de la saveur.
// Mêmes réglages que site/app.js (matière métallique, arêtes arrondies, environnement, ombre).
(function () {
  const toile = document.querySelector('canvas.cube');
  if (!toile || !window.THREE) return;
  const S = 1.15, RD = 0.045, Q = Math.PI / 2;
  const rendu = new THREE.WebGLRenderer({ canvas: toile, antialias: true, alpha: true });
  rendu.setPixelRatio(Math.min(devicePixelRatio, 2)); rendu.setSize(toile.clientWidth, toile.clientHeight, false); rendu.setClearColor(0, 0);
  rendu.toneMapping = THREE.LinearToneMapping; rendu.toneMappingExposure = 0.92; rendu.outputEncoding = THREE.sRGBEncoding;
  rendu.shadowMap.enabled = true; rendu.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  { const env = new THREE.Scene(), ciel = new THREE.SphereGeometry(20, 48, 24), cols = [], pos = ciel.attributes.position;
    const bas = new THREE.Color('#e8dccd'), milieu = new THREE.Color('#8a7566'), haut = new THREE.Color('#4a3d35'), t = new THREE.Color();
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i) / 20; if (y < 0) t.copy(milieu).lerp(bas, Math.min(1, -y * 2.5)); else t.copy(milieu).lerp(haut, Math.min(1, y * 1.4)); cols.push(t.r, t.g, t.b); }
    ciel.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); env.add(new THREE.Mesh(ciel, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));
    const boite = (w, h, int, x, y, z, teinte) => { const c = new THREE.Color(teinte || '#fff6ec').multiplyScalar(int); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); };
    boite(14, 7, 2.6, -3, 10, 8); boite(4, 10, 1.8, -12, 2, 3); boite(4, 10, 1.5, 12, 2, -2, '#ffe9d6'); boite(18, 4, 1.1, 0, 4, -15, '#ffe2c8'); boite(12, 4, 1.4, 0, 0, 15);
    scene.environment = new THREE.PMREMGenerator(rendu).fromScene(env, 0.035).texture; }
  const lumiere = new THREE.DirectionalLight(0xfff1e2, 1.4);
  lumiere.position.set(-6, 9, 4); lumiere.target.position.set(1.5, 0, -1.5); scene.add(lumiere, lumiere.target);
  lumiere.castShadow = true; lumiere.shadow.mapSize.set(1024, 1024); Object.assign(lumiere.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 40 }); lumiere.shadow.camera.updateProjectionMatrix();
  lumiere.shadow.bias = -0.0004; lumiere.shadow.normalBias = 0.025;
  scene.add(new THREE.HemisphereLight(0xfff6ee, 0xd8c6b4, 0.3));
  const sol = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.26 })); sol.rotation.x = -Math.PI / 2; sol.position.y = -S / 2; sol.receiveShadow = true; scene.add(sol);
  const e = 4, N = 2 * e + 1, g = new THREE.BoxGeometry(1, 1, 1, N, N, N), p = g.attributes.position, n = g.attributes.normal, h = S / 2 - RD;
  const map = u => { const k = Math.round((u + 0.5) * N); if (k <= e) return -h - RD * Math.cos((k / e) * Q); const j = N - k; return h + RD * Math.cos((j / e) * Q); };
  const v = new THREE.Vector3(), c = new THREE.Vector3(), d = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.set(map(p.getX(i)), map(p.getY(i)), map(p.getZ(i))); c.set(THREE.MathUtils.clamp(v.x, -h, h), THREE.MathUtils.clamp(v.y, -h, h), THREE.MathUtils.clamp(v.z, -h, h)); d.copy(v).sub(c);
    if (d.lengthSq() < 1e-10) d.set(0, 0, 1); d.normalize(); v.copy(c).addScaledVector(d, RD); p.setXYZ(i, v.x, v.y, v.z); n.setXYZ(i, d.x, d.y, d.z); }
  g.computeBoundingSphere();
  const couleur = new THREE.Color(toile.dataset.couleur), hsl = {}; couleur.getHSL(hsl); couleur.setHSL(hsl.h, Math.min(1, hsl.s * 1.1), Math.min(hsl.l, 0.56));
  const cube = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color: couleur, metalness: 1, roughness: 0.24, envMapIntensity: 1.2 })); cube.castShadow = true; scene.add(cube);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 100); camera.position.set(0, 1.7, 5.45); camera.lookAt(0, -0.05, 0); // cube au centre de son cadre
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t0 = performance.now();
  function boucle(t) { cube.rotation.y = Math.PI / 4 + 0.32 + (calme ? 0 : (t - t0) / 1000 * 0.5); rendu.render(scene, camera); if (!calme) requestAnimationFrame(boucle); }
  requestAnimationFrame(boucle);
})();
