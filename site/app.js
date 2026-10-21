(function(){
THREE.ColorManagement.legacyMode=false;
const C=window.CONTENT;
const RECHERCHE=new URLSearchParams(location.search).has('recherche');
const wrap=document.getElementById('wrap'),canvas=document.getElementById('c');
const R=new THREE.WebGLRenderer({canvas,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=THREE.LinearToneMapping;R.toneMappingExposure=0.92;R.outputEncoding=THREE.sRGBEncoding;
R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const BG='#f3ede4';const scene=new THREE.Scene();scene.background=new THREE.Color(BG);scene.fog=new THREE.Fog(BG,20,46);
const FOV=36,TAN=Math.tan(THREE.MathUtils.degToRad(FOV/2));
const cam=new THREE.PerspectiveCamera(FOV,1,0.05,200);
const envScene=new THREE.Scene();const skyG=new THREE.SphereGeometry(20,48,24);const sc=[];const sp=skyG.attributes.position;
const cLow=new THREE.Color('#e8dccd'),cMid=new THREE.Color('#8a7566'),cHigh=new THREE.Color('#4a3d35'),tmp=new THREE.Color();
for(let i=0;i<sp.count;i++){const y=sp.getY(i)/20;if(y<0)tmp.copy(cMid).lerp(cLow,Math.min(1,-y*2.5));else tmp.copy(cMid).lerp(cHigh,Math.min(1,y*1.4));sc.push(tmp.r,tmp.g,tmp.b);}
skyG.setAttribute('color',new THREE.Float32BufferAttribute(sc,3));envScene.add(new THREE.Mesh(skyG,new THREE.MeshBasicMaterial({side:THREE.BackSide,vertexColors:true})));
function sbox(w,h,int,x,y,z,tint){const col=new THREE.Color(tint||'#fff6ec').multiplyScalar(int);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);envScene.add(m);}
sbox(14,7,2.6,-3,10,8);sbox(4,10,1.8,-12,2,3);sbox(4,10,1.5,12,2,-2,'#ffe9d6');sbox(18,4,1.1,0,4,-15,'#ffe2c8');sbox(12,4,1.4,0,0,15);
const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(envScene,0.035).texture;
const key=new THREE.DirectionalLight(0xfff1e2,1.4);key.position.set(-5,11,7);key.target.position.set(0,0,-10);scene.add(key,key.target);
key.castShadow=true;key.shadow.mapSize.set(2048,2048);const kc=key.shadow.camera;kc.left=-20;kc.right=20;kc.top=26;kc.bottom=-26;kc.near=1;kc.far=80;key.shadow.bias=-0.0004;key.shadow.normalBias=0.025;
scene.add(new THREE.HemisphereLight(0xfff6ee,0xd8c6b4,0.3));
const S=1.15,RD=0.045,GROUND=-0.6,DEC=0.98,Q=Math.PI/2,FONT='"Source Serif 4", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
const CAMY=1.25,LOOKY=-0.5;
const ground=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.ShadowMaterial({opacity:0.24}));ground.rotation.x=-Math.PI/2;ground.position.y=GROUND;ground.receiveShadow=true;scene.add(ground);
const DARK={INK:'rgba(18,12,10,0.92)',INK2:'rgba(18,12,10,0.56)',RULE:'rgba(18,12,10,0.2)',SEL:'rgba(18,12,10,0.09)'};
const LIGHT={INK:'rgba(255,255,255,0.96)',INK2:'rgba(255,255,255,0.68)',RULE:'rgba(255,255,255,0.32)',SEL:'rgba(255,255,255,0.14)'};
function rbox(e){const N=2*e+1;const g=new THREE.BoxGeometry(1,1,1,N,N,N);const p=g.attributes.position,n=g.attributes.normal;const h=S/2-RD;
const map=u=>{const k=Math.round((u+0.5)*N);if(k<=e)return -h-RD*Math.cos((k/e)*Q);const j=N-k;return h+RD*Math.cos((j/e)*Q);};
const v=new THREE.Vector3(),c=new THREE.Vector3(),d=new THREE.Vector3();
for(let i=0;i<p.count;i++){v.set(map(p.getX(i)),map(p.getY(i)),map(p.getZ(i)));c.set(THREE.MathUtils.clamp(v.x,-h,h),THREE.MathUtils.clamp(v.y,-h,h),THREE.MathUtils.clamp(v.z,-h,h));d.copy(v).sub(c);
if(d.lengthSq()<1e-10)d.set(0,0,1);d.normalize();v.copy(c).addScaledVector(d,RD);p.setXYZ(i,v.x,v.y,v.z);n.setXYZ(i,d.x,d.y,d.z);}
g.computeBoundingSphere();return g;}
function popc(hex){const c=new THREE.Color(hex);const h={};c.getHSL(h);c.setHSL(h.h,Math.min(1,h.s*1.1),Math.min(h.l,0.56));return c;}
function metal(col){return new THREE.MeshPhysicalMaterial({color:col,metalness:1,roughness:0.24,envMapIntensity:1.2});}
function lum(c){const s=c.clone().convertLinearToSRGB();return 0.2126*s.r+0.7152*s.g+0.0722*s.b;}
const BUCKETS=[['#3A68DF'],['#6363B5'],['#78E823','#97FF3D','#9ECE66','#ADEF5B'],['#C7FB2A','#CDEC50','#C7E77D'],['#FFCE44','#FFD56E'],['#FFAB24','#FFB71A','#E88F30','#EC9F3D','#A96936'],['#FF593D','#FF501A','#FF6829','#FC5B1D','#FF541A'],['#FF361A','#FF2E20','#FF2F1A','#FF4940','#D71300']].map(b=>b.map(popc));
function balanced(i){const b=BUCKETS[(i*5+Math.floor(i/BUCKETS.length))%BUCKETS.length];return b[Math.floor(Math.random()*b.length)];}
/* ---------- séquences ---------- */
function sceneItems(list,label){const out=[];list.forEach((scn,j)=>{out.push({k:'text',label,title:scn.title,paras:[scn.intro],cta:'Entrer dans la scène',scene:scn.key,numero:j+1,total:list.length});
scn.items.forEach(it=>out.push(Object.assign({},it,{label:it.n+' / 8   ·   '+it.t,scene:scn.key})));});return out;}
const ONB=[
{k:'text',label:'Chez nous',title:'Bienvenue',paras:['On va regarder ta façon d\u2019être avec les autres. Pas pour te mettre dans une case, pas pour te juger : juste pour voir comment tu circules quand il y a du monde autour de toi.','Il n\u2019y a pas de bonne réponse. Il n\u2019y a que la tienne. Réponds vite, au premier mouvement.','Ce qui suit va peut-être te bousculer un peu. Te sortir de ta zone de confort.'],coda:'Et c\u2019est ok.',cta:'Commencer'},
{k:'q',trap:true,label:'1 / 3',s:'Avec les gens, tu es plutôt…',o:['Fidèle à moi-même, toujours','Caméléon, je m\u2019adapte','Moi en mieux, les autres me tirent vers le haut','Moi tout court, à prendre ou à laisser'].map(t=>({t,w:{}}))},
{k:'q',trap:true,label:'2 / 3',s:'Dans un groupe, on peut compter sur toi pour…',o:['Dire les choses franchement','Mettre de l\u2019ambiance','Être là quand il faut','Rester moi-même quoi qu\u2019il arrive'].map(t=>({t,w:{}}))},
{k:'q',trap:true,label:'3 / 3',s:'Ce que tes proches diraient de toi, en un mot…',o:['Entier','Fidèle','Présent','Vrai'].map(t=>({t,w:{}}))},
{k:'text',label:'',title:'C\u2019était ton horoscope.',paras:['Ces trois questions étaient écrites pour que tu te trouves génial, à tous les coups.'],coda:'Maintenant, on regarde ce que tu fais vraiment.',cta:'On y va'}];
/* couleur des deux cubes : tirée au hasard à chaque visite, parmi des teintes assez soutenues
   pour que le nom blanc reste lisible, et jamais deux fois la même famille */
const FAMILLES=[['#3A68DF','#6363B5'],['#FF4940','#FF593D','#D71300'],['#FF541A','#E88F30'],['#A96936']];
const TIRAGE=(()=>{const f=[...FAMILLES].sort(()=>Math.random()-0.5);const un=c=>c[Math.floor(Math.random()*c.length)];return [un(f[0]),un(f[1])];})();
const SPH=[
{key:'chez_les_autres',name:'Chez les autres',col:TIRAGE[0],lines:['Chez les','autres'],sub:'avec ceux que tu ne<br>connais pas encore',x:-0.88,lean:0.42,
 seq:[{k:'accueil'},...sceneItems(C.autres,'Chez les autres'),{k:'res1'},{k:'merci'}]},
{key:'chez_nous',name:'Chez nous',col:TIRAGE[1],lines:['Chez','nous'],sub:'avec ceux qui te<br>connaissent par cœur',x:0.88,lean:-0.3,
 seq:[...ONB,{k:'accueil'},...sceneItems(C.nous,'Chez nous'),{k:'res1'},{k:'merci'}]}];
SPH.forEach(s=>{s.c=popc(s.col);s.read=s.c.clone().lerp(new THREE.Color('#ffffff'),0.22);});
/* ---------- moteur de calcul ---------- */
function compute(si){const s=SPH[si],c=cubes[si],aw=C.meta.aw;const pos={DON:0,PRESENCE:0,DETTE:0,PARI:0,CONF:0};const eng=[];
const add=(w,f,p)=>{for(const k in w){const v=w[k];pos[k]+=(k==='DON'&&p!=null)?(v-p)*f:v*f;}};
s.seq.forEach((it,idx)=>{const a=c.ans[idx];if(!a||it.trap)return;
 if(it.k==='q'&&a.o!=null){const o=it.o[a.o];add(o.w,1,it.p);if(o.e!=null)eng.push(o.e);}
 else if(it.k==='tree'&&a.e1!=null){add(it.o[a.e1].w,aw,it.p);if(a.b!=null)add(it.br[a.e1].o[a.b].w,aw,it.p);}});
const raw=Object.assign({},pos);const off=C.meta.rec[s.key];for(const k in off)pos[k]+=off[k];
const code=['DON','PRESENCE','DETTE','PARI'].map(k=>pos[k]>0?'+':'-').join('');const prof=C.profiles[s.key][code];
const delta=['DON','PRESENCE','DETTE','PARI'].reduce((a,k)=>a+Math.abs(pos[k]),0);
let ti,tsrc;if(s.key==='chez_les_autres'){const m=eng.length?eng.reduce((a,b)=>a+b,0)/eng.length:2.5;const E=C.meta.engT;ti=m<E[0]?0:m<E[1]?1:m<E[2]?2:3;tsrc='engagement moyen '+m.toFixed(2)+' sur '+eng.length+' sondes (seuils '+E.join(' / ')+')';}
else{const T=C.meta.confT,x=pos.CONF;ti=x<T[0]?0:x<T[1]?1:x<T[2]?2:3;tsrc='CONF '+x.toFixed(2)+' (seuils '+T.join(' / ')+')';}
return {raw,pos,code,prof,delta,teinte:prof.teintes[ti],tsrc};}
/* ---------- dessin des faces ---------- */
const AX=[new THREE.Vector3(1,0,0),new THREE.Vector3(-1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,-1,0),new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,-1)];
const TS=1280;let dist=8;
function view(){const vh=2*dist*TAN;return {vh,vw:vh*cam.aspect};}
function bigScale(){const {vh,vw}=view();return Math.max(vw,vh)*1.12/S;}
function drawName(f,lines){const x=f.ctx;x.clearRect(0,0,TS,TS);x.textAlign='center';x.textBaseline='middle';x.font='600 230px '+FONT;const ys=lines.length>1?[505,795]:[640];
lines.forEach((l,j)=>{x.fillStyle='rgba(20,8,4,0.3)';x.fillText(l,640,ys[j]+4);x.fillStyle='rgba(255,255,255,0.97)';x.fillText(l,640,ys[j]);});f.rects=[];f.tex.needsUpdate=true;}
function drawClear(f){f.ctx.clearRect(0,0,TS,TS);f.rects=[];f.tex.needsUpdate=true;}
const labels=[document.getElementById('l0'),document.getElementById('l1')];
function orient(c,fi,up){const f=c.faces[fi];const n=f.n.clone();const u=up.clone().sub(n.clone().multiplyScalar(up.dot(n))).normalize();const x=u.clone().cross(n);f.dec.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,u,n));f.dec.position.copy(n).multiplyScalar(S/2+0.003);}
const mainGeo=rbox(4);
const cubes=SPH.map((s,i)=>{const mat=metal(s.c.clone());const m=new THREE.Mesh(mainGeo,mat);m.castShadow=true;m.visible=false;
const faces=AX.map(n=>{const cv=document.createElement('canvas');cv.width=cv.height=TS;const ctx=cv.getContext('2d');const tex=new THREE.CanvasTexture(cv);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;
const dec=new THREE.Mesh(new THREE.PlaneGeometry(DEC,DEC),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,toneMapped:false,fog:false,polygonOffset:true,polygonOffsetFactor:-2}));m.add(dec);
return {cv,ctx,tex,dec,n,rects:[],op:0};});scene.add(m);return {m,mat,faces,ans:{},result:null,done:false};});
function homeColor(i){const c=cubes[i];return c.result?popc(c.result.prof.col):SPH[i].c;}
function readColor(i,spk){const c=cubes[i];if((spk==='res1'||spk==='merci')&&c.result)return popc(c.result.prof.col).lerp(new THREE.Color('#ffffff'),0.4);return SPH[i].read;}
function setCaption(i){const c=cubes[i];labels[i].innerHTML=c.result?('<span class="cap-saveur">'+c.result.prof.sav+'</span><br>'+c.result.prof.fig):SPH[i].sub;}
function resetMain(c,i,full){const s=SPH[i];Object.assign(c,{cx:s.x,cy:GROUND+S/2,cz:0,cs:1,spring:0,vel:0,ry:Math.PI+s.lean,rolling:false,p:0,toReveal:true,q:new THREE.Quaternion(),qT:new THREE.Quaternion(),tw:null,front:4,hist:[],landed:false,settled:false,wv:null});
if(full){c.revealed=false;c.ans={};c.result=null;c.done=false;}
c.m.visible=false;c.mat.color.copy(homeColor(i));c.mat.metalness=1;c.mat.roughness=0.24;c.faces.forEach(f=>{drawClear(f);f.op=0;f.dec.material.opacity=0;});orient(c,4,new THREE.Vector3(0,1,0));drawName(c.faces[4],s.lines);
labels[i].style.opacity=0;labels[i].style.transform='translate(-50%,8px)';setCaption(i);}
cubes.forEach((c,i)=>resetMain(c,i,true));
/* le nom sur la face est dessiné dans une image : on le redessine une fois la police chargée */
if(document.fonts)document.fonts.load('600 230px "Source Serif 4"').then(()=>{if(!entered)cubes.forEach((c,i)=>drawName(c.faces[4],SPH[i].lines));});
const MAXI=260;const inst=new THREE.InstancedMesh(rbox(2),new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:0.26,envMapIntensity:1.15}),MAXI);inst.castShadow=true;inst.frustumCulled=false;scene.add(inst);
for(let i=0;i<MAXI;i++)inst.setColorAt(i,balanced(i));inst.instanceColor.needsUpdate=true;
const dummy=new THREE.Object3D();const ZERO=new THREE.Matrix4().makeScale(0,0,0);function clearInst(){for(let i=0;i<MAXI;i++)inst.setMatrixAt(i,ZERO);inst.instanceMatrix.needsUpdate=true;}clearInst();
const tq=new THREE.Mesh(rbox(3),metal(balanced(Math.floor(Math.random()*8)).clone()));scene.add(tq);
const ALIGN=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,1,1).normalize(),new THREE.Vector3(0,1,0));
const tqS={spring:0,vel:0,hop:0,spin:0,fade:1,leaving:false};
const pres=document.getElementById('pres'),desc=document.getElementById('desc'),prev=document.getElementById('prev'),qmEl=document.getElementById('qm'),calc=document.getElementById('calc'),calcBody=document.getElementById('calcBody');
let decalVue=0,tqCible=null,descMinuteur=0;/* écrans allongés : la scène d'accueil descend pour équilibrer la composition */
let entered=false,active=-1,camY=CAMY,timers=[],started=false,t=0,waveT=-1,dice=[];
function later(fn,ms){timers.push(setTimeout(fn,ms));}
/* pendant qu'on écrit, la page est figée : le clavier ne doit ni redimensionner la scène 3D, ni faire bouger la mise en page */
let clavierOuvert=false;
document.addEventListener('focusin',e=>{if(e.target.tagName!=='TEXTAREA')return;clavierOuvert=true;wrap.style.setProperty('--hauteur-figee',wrap.clientHeight+'px');wrap.classList.add('fige');});
document.addEventListener('focusout',e=>{if(e.target.tagName!=='TEXTAREA')return;clavierOuvert=false;wrap.classList.remove('fige');size();});
function size(){if(clavierOuvert)return;const w=wrap.clientWidth,h=wrap.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;const need=3.7;dist=Math.max(5.5,(need/2)/(TAN*cam.aspect));cam.updateProjectionMatrix();}
new ResizeObserver(size).observe(wrap);size();
function halfW(z){return (dist-z)*TAN*cam.aspect;}
const UP=new THREE.Vector3(0,1,0);
function rnd(a,b){return a+Math.random()*(b-a);}
function randQ(){return new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize(),rnd(0,Math.PI*2));}
const mtx=new THREE.Matrix4();
function support(q){mtx.makeRotationFromQuaternion(q);const e=mtx.elements;return (S/2)*(Math.abs(e[1])+Math.abs(e[5])+Math.abs(e[9]))-RD*0.6;}
function snapQ(q){mtx.makeRotationFromQuaternion(q);const e=mtx.elements;const cols=[[e[0],e[1],e[2]],[e[4],e[5],e[6]]];const used=[];const out=[];
cols.forEach(cl=>{let bi=-1,bv=-1;for(let k=0;k<3;k++){if(used.includes(k))continue;if(Math.abs(cl[k])>bv){bv=Math.abs(cl[k]);bi=k;}}used.push(bi);const v=new THREE.Vector3();v.setComponent(bi,Math.sign(cl[bi])||1);out.push(v);});
const z=new THREE.Vector3().crossVectors(out[0],out[1]);return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(out[0],out[1],z));}
function mkDie(o){const dir=o.dir.clone().normalize();const axis=new THREE.Vector3().crossVectors(UP,dir).normalize().applyAxisAngle(dir,rnd(-1.05,1.05));
return Object.assign({dir,axis,spin:Math.random()<0.6?rnd(-5,5):rnd(-1,1),s:0,prevS:0,q:randQ(),done:false,pos:new THREE.Vector3(),vis:false},o);}
const dq=new THREE.Quaternion(),om=new THREE.Vector3();
function stepDie(d,ts,dt){const lt=ts-d.delay;if(lt<0){d.vis=false;return;}d.vis=true;let p=0,w=0;
if(d.mode==='run'){d.s=Math.min(d.L,d.v0*lt*Math.max(0.55,1-0.05*lt));if(d.s>=d.L)d.done=true;}
else{p=Math.min(1,lt/d.T);d.s=d.L*(1-Math.pow(1-p,3));if(p>0.6)w=(p-0.6)/0.4;w=w*w*(3-2*w);}
const spd=dt>0?(d.s-d.prevS)/dt:0;d.prevS=d.s;
if(!d.done||d.mode==='run'){om.copy(d.axis).multiplyScalar(spd/(S*0.58)).addScaledVector(UP,d.spin*Math.min(1,spd/3));om.multiplyScalar(1-w);
const a=om.length()*dt;if(a>1e-5){dq.setFromAxisAngle(om.normalize(),a);d.q.premultiply(dq);}}
if(d.mode!=='run'&&p>0.6){if(!d.target)d.target=snapQ(d.q);d.q.slerp(d.target,0.05+0.35*w);if(p>=1){d.q.copy(d.target);d.done=true;}}
const u=Math.min(1,lt/d.A);const air=u<1?d.H*Math.pow(1-u,2)*Math.abs(Math.cos(Math.PI*d.b*u)):0;
d.pos.copy(d.P0).addScaledVector(d.dir,d.s);d.pos.y=GROUND+support(d.q)+air;}
function startWave(){waveT=t;dice=[];let idx=0;const SRC=new THREE.Vector3(120,0,-24);
const hw4=halfW(4.4);let x=hw4+1.5*S;const v0F=rnd(8,10);const dF=new THREE.Vector3(-1,0,0);
for(let j=0;j<6&&idx<MAXI;j++){const xs=x;x+=S*rnd(2.1,3.2);const L=xs+hw4+2*S;
dice.push({i:idx++,d:mkDie({P0:new THREE.Vector3(xs,0,4.4),dir:dF,L,mode:'run',delay:rnd(0,0.4),v0:v0F,A:rnd(0.4,0.9),H:rnd(0.5,1.6),b:1+Math.floor(Math.random()*3)})});}
let zT=-6.5;while(zT>-44&&idx<MAXI){const E=new THREE.Vector3(-(halfW(zT)+2*S),0,zT);const d=E.clone().sub(SRC).normalize();
const v0=rnd(6.5,10),rayDelay=rnd(0,0.9);const xRight=halfW(zT)+1.5*S;const Lvis=(xRight-E.x)/(-d.x)+rnd(0,2.5)*S;
const count=5+Math.floor(Math.random()*8);const stopper=Math.random()<0.55;
let Lb=Lvis;for(let j=0;j<count&&idx<MAXI;j++){const Lj=Lb;Lb+=S*rnd(2.1,3.4);const P0=E.clone().addScaledVector(d,-Lj);
const air={A:rnd(0.35,1.1),H:rnd(0.4,2.4),b:1+Math.floor(Math.random()*3)};
if(stopper&&j===count-1){const hw=halfW(zT);const xst=rnd(-0.85,0.85)*hw;const uS=(xst-E.x)/(-d.x);const L=Lj-uS;const T=Math.max(1.4,3*L/v0);
dice.push({i:idx++,d:mkDie(Object.assign({P0,dir:d,L,mode:'stop',delay:rayDelay,T},air,{A:Math.min(air.A,T*0.5)}))});}
else dice.push({i:idx++,d:mkDie(Object.assign({P0,dir:d,L:Lj,mode:'run',delay:rayDelay,v0},air))});}
zT-=rnd(2.0,2.4);}
cubes.forEach((c,i)=>{const s=SPH[i];const L=9.2;c.wv=mkDie({P0:new THREE.Vector3(s.x+L,0,0),dir:new THREE.Vector3(-1,0,0),L,mode:'stop',delay:0.9,T:2.2,A:1.0,H:1.8,b:2});c.wv.target=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,Math.PI+s.lean,0));c.m.visible=false;});}
function start(){if(started)return;started=true;pres.style.opacity=0;pres.style.pointerEvents='none';qmEl.style.pointerEvents='none';tqS.leaving=true;vib(14);later(startWave,500);}
const paysageEl=document.getElementById('paysage');
function verifierPaysage(){const o=screen.orientation&&screen.orientation.type;const horizontal=o?o.indexOf('landscape')===0:Math.abs(window.orientation||0)===90;
/* l'appareil ET la fenêtre doivent être à l'horizontale : le clavier n'élargit que la fenêtre */
paysageEl.classList.toggle('on',horizontal&&innerWidth>innerHeight&&matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<500);}
if(screen.orientation&&screen.orientation.addEventListener)screen.orientation.addEventListener('change',verifierPaysage);addEventListener('orientationchange',verifierPaysage);addEventListener('resize',verifierPaysage);verifierPaysage();
function vib(p){try{if(navigator.vibrate)navigator.vibrate(p);}catch(e){}}
document.getElementById('go').addEventListener('click',start);
qmEl.addEventListener('click',()=>{if(!started&&tqS.hop<=0){tqS.hop=1;tqS.vel+=2.2;vib(10);}});
function roll(i,dir){const c=cubes[i];c.rolling=true;c.p=0;c.toReveal=true;c.sy=c.ry;c.ey=(dir>=0?Math.PI*2:0)+SPH[i].lean;c.vel+=1.2;vib(12);}
const DIRS=['right','down','right','up'];
function rotFor(dir,sign){const r=new THREE.Quaternion();const a=(dir==='right'||dir==='down'?-1:1)*Math.PI/2*sign;r.setFromAxisAngle(dir==='right'?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),a);return r;}
/* ---------- navigation ---------- */
function specFor(i,e){const s=SPH[i],c=cubes[i],it=s.seq[e.idx],a=c.ans[e.idx]||{};
if(it.k==='res1'||it.k==='merci'){if(!c.result)c.result=compute(i);return {k:it.k,label:s.name+'   ·   '+(it.k==='res1'?'Ton résultat':'Merci'),r:c.result};}
if(it.k==='accueil')return {k:'accueil',label:'',sel:-1};
if(it.k==='text')return {k:'text',label:it.label,title:it.title,paras:it.paras,coda:it.coda,cta:it.cta,scene:it.scene,numero:it.numero,total:it.total,sel:-1};
if(e.br!=null)return {k:'q',label:it.label,s:it.br[e.br].s,o:it.br[e.br].o,sel:a.b??-1};
return {k:'q',label:it.label,s:it.s,o:it.o,sel:(it.k==='tree'?a.e1:a.o)??-1};}
function palette(i,spk){return lum(readColor(i,spk))<0.42?LIGHT:DARK;}
function paint(c,fi,i,e){const sp=specFor(i,e);sp.premier=e.idx===0;const f=c.faces[fi];f.op=1;f.dec.material.opacity=1;f.spec=sp;f.entry=e;drawClear(f);c.spk=sp.k;cacherFace();faceAttente={i,sp};}
/* ---------- écrans de lecture : éléments de page posés sur le cube ---------- */
const faceEl=document.getElementById('face'),faceCorps=faceEl.querySelector('.f-corps'),faceActions=faceEl.querySelector('.f-actions');
let faceAttente=null;
/* le texte qui défile s'efface sous le haut de l'écran, seulement une fois qu'on a commencé à faire défiler */
faceCorps.addEventListener('scroll',()=>faceCorps.classList.toggle('defile',faceCorps.scrollTop>4),{passive:true});
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function bouton(label,act,sel){const b=el('button','f-choix'+(sel?' sel':''),label);b.type='button';b.addEventListener('click',()=>choisir(act,b));return b;}
function cacherFace(){faceEl.classList.remove('on');faceAttente=null;if(tqCible){tqCible=null;tq.visible=false;}}
/* textes de l'écran d'accueil des scènes et des boutons d'entrée dans chaque scène */
const ACCUEIL={chez_les_autres:{titre:'Trois scènes t\u2019attendent',promesse:'Une soirée, un train, une partie : trois moments avec des gens que tu ne connais pas, huit choix dans chacun. Il n\u2019y a pas de bonne réponse, seulement la tienne.'},
 chez_nous:{titre:'Trois scènes avec les tiens',promesse:'Ta bande, tes proches, ceux qui te connaissent par cœur : trois moments, huit choix dans chacun. Fais ce que tu ferais vraiment.'}};
const ACCUEIL_FIN='Au bout du chemin, ta saveur d\u2019Apéricube.';
const ACCUEIL_ANONYME='Tes choix sont enregistrés de façon anonyme, pour la recherche : ni nom, ni adresse.';
const ENTRER_SCENE={soiree:'Pousser la porte',train:'Lever les yeux',partie:'Approcher de la table',apero:'Rejoindre la bande',weekend:'Poser ton sac',demenagement:'Retrousser tes manches'};
/* « Le poulet grillé : convivial… » → « Convivial… » : la saveur est déjà écrite juste au-dessus */
function sansRepetition(t){return majuscule(t.replace(/^[^:]+ : /,''));}
function majuscule(t){return t?t[0].toUpperCase()+t.slice(1):t;}
function entete(i){const s=SPH[i],b=el('div','f-entete'),h=el('h1');s.lines.forEach((l,k)=>{if(k)h.append(document.createElement('br'));h.append(l);});b.append(h,el('p',null,s.sub.replace(/<br>/g,' ')));return b;}
function pips(sp){const p=el('div','f-pips');p.setAttribute('aria-label','Scène '+sp.numero+' sur '+sp.total);for(let k=1;k<=sp.total;k++)p.append(el('span','f-pip'+(k<sp.numero?' fait':k===sp.numero?' encours':'')));return p;}
function construireFace(i,sp){faceEl.dataset.encre=palette(i,sp.k)===LIGHT?'claire':'sombre';faceEl.dataset.type=sp.k;
const libelle=sp.premier?'':(sp.scene?SPH[i].name+'   ·   Scène '+sp.numero+' sur '+sp.total:sp.label||'');faceCorps.replaceChildren();faceCorps.classList.remove('defile');if(libelle)faceCorps.append(el('p','f-label',libelle));faceActions.replaceChildren();faceCorps.scrollTop=0;const acts=[];
if(sp.premier)faceCorps.append(entete(i));
if(sp.k==='accueil'){const a=ACCUEIL[SPH[i].key];if(!sp.premier)faceCorps.append(el('h2','f-titre',a.titre));faceCorps.append(el('p','f-recit',a.promesse));
 const liste=el('ol','f-scenes');(i?C.nous:C.autres).forEach((scn,k)=>{const li=el('li');li.append(el('span','f-num',String(k+1)),el('span',null,scn.title));liste.append(li);});
 faceCorps.append(liste,el('p','f-note',ACCUEIL_FIN),el('p','f-note',ACCUEIL_ANONYME));acts.push({label:'C\u2019est parti',act:'next'});}
else if(sp.k==='text'){if(sp.scene)faceCorps.append(pips(sp));faceCorps.append(el('h2','f-titre',sp.title));sp.paras.forEach(p=>faceCorps.append(el('p','f-recit',p)));if(sp.coda)faceCorps.append(el('p','f-coda',sp.coda));acts.push({label:ENTRER_SCENE[sp.scene]||sp.cta,act:'next'});}
else if(sp.k==='q'){faceCorps.append(el('p','f-question',sp.s));const opts=el('div','f-options');sp.o.forEach((o,k)=>opts.append(bouton(o.t,k,sp.sel===k)));faceCorps.append(opts);}
else if(sp.k==='res1'){const p=sp.r.prof,cube=el('div','f-cube');cube.setAttribute('aria-hidden','true');cube.addEventListener('click',()=>{if(tqS.hop<=0){tqS.hop=1;tqS.vel+=2.2;vib(10);}});
 faceCorps.append(cube,el('p','f-surtitre','Tu es l\u2019apéricube'),el('h2','f-saveur',p.sav),el('p','f-figure',p.fig),el('p','f-sline',sansRepetition(p.sline||'')));
 const nuance=el('div','f-bloc');nuance.append(el('h3','f-section','Ta nuance'),el('p','f-nuance-nom',sp.r.teinte.l),el('p','f-nuance',majuscule(sp.r.teinte.x)));
 const portrait=el('div','f-bloc');portrait.append(el('h3','f-section','Ton portrait'));p.paras.forEach(x=>portrait.append(el('p','f-portrait',x)));faceCorps.append(nuance,portrait);
 if(ENVOI_ACTIF)acts.push(envoye[i]?{label:TEXTE_DEJA,act:'aucun',disabled:true}:{label:TEXTE_VERS_RETOURS,act:'modale'});
 acts.push({label:TEXTE_PARTAGER,act:'partager'},{label:'Revenir aux cubes',act:'exit'});if(RECHERCHE)acts.push({label:'Voir le calcul',act:'calc'});}
else if(sp.k==='merci'){faceCorps.append(el('h2','f-titre','Merci\u00a0!'),el('p','f-recit',TEXTE_MERCI_ECRAN));acts.push({label:TEXTE_PARTAGER,act:'partager'},{label:'Revenir aux cubes',act:'exit'});}
/* sur le résultat, les boutons suivent le texte : tout défile d'un seul tenant */
const cibleActions=sp.k==='res1'?el('div','f-actions-fin'):faceActions;if(sp.k==='res1')faceCorps.append(cibleActions);
acts.forEach(a=>{const b=bouton(a.label,a.act,false);if(a.disabled)b.disabled=true;cibleActions.append(b);});}
function afficherFace(){const {i,sp}=faceAttente;faceAttente=null;construireFace(i,sp);faceEl.classList.add('on');
/* le petit cube de l'accueil revient sur le résultat, dans la couleur de la saveur */
if(sp.k==='res1'){tqCible=faceCorps.querySelector('.f-cube');tq.material.color.copy(popc(sp.r.prof.col));Object.assign(tqS,{fade:1,leaving:false,hop:0});tq.visible=true;}
if(sp.premier)finirMorph();}
/* ---------- transition : le nom écrit sur le cube glisse jusqu'en haut de page ---------- */
let morphEl=null;
function lancerMorph(i,start){const c=cubes[i],s=SPH[i];const sp=specFor(i,start);sp.premier=true;construireFace(i,sp);
const h=faceCorps.querySelector('.f-entete h1');if(!h)return;const fin=h.getBoundingClientRect(),wr=wrap.getBoundingClientRect(),cs=getComputedStyle(h);
const z=c.cz+(S/2)*c.cs,haut=new THREE.Vector3(c.cx,c.cy+0.49*c.cs,z).project(cam),bas=new THREE.Vector3(c.cx,c.cy-0.49*c.cs,z).project(cam),ctr=new THREE.Vector3(c.cx,c.cy,z).project(cam);
const facePx=Math.abs(haut.y-bas.y)/2*wr.height,taille0=230/TS*facePx,taille1=parseFloat(cs.fontSize);
const x0=(ctr.x*0.5+0.5)*wr.width,y0=(-ctr.y*0.5+0.5)*wr.height+10/TS*facePx,x1=fin.left-wr.left+fin.width/2,y1=fin.top-wr.top+fin.height/2;
const m=el('div','morph');s.lines.forEach((l,k)=>{if(k)m.append(document.createElement('br'));m.append(l);});
Object.assign(m.style,{left:(fin.left-wr.left)+'px',top:(fin.top-wr.top)+'px',width:fin.width+'px',fontSize:cs.fontSize,lineHeight:cs.lineHeight,
 transform:'translate('+(x0-x1)+'px,'+(y0-y1)+'px) scale('+(taille0/taille1)+')',lineHeight:(290/230)+'em'});
wrap.append(m);morphEl=m;m.getBoundingClientRect();
requestAnimationFrame(()=>{m.classList.add('vers-titre');Object.assign(m.style,{transform:'none',color:cs.color,lineHeight:cs.lineHeight});});}
function finirMorph(){const m=morphEl;morphEl=null;if(m)setTimeout(()=>m.remove(),450);}
function annulerMorph(){if(morphEl){morphEl.remove();morphEl=null;}}
/* ---------- envoi anonyme des réponses vers la Google Sheet de recherche ---------- */
const ENVOI_ACTIF=!!(window.ENVOI&&window.ENVOI.adresse);
const TEXTE_VERS_RETOURS='Laisser un commentaire',TEXTE_DEJA='Ton commentaire est envoyé, merci';
const TEXTE_PARTAGER='Partager mon résultat',TEXTE_COPIE='Copié, il n\u2019y a plus qu\u2019à coller';
const TEXTE_MERCI_ECRAN='Ton commentaire est bien arrivé. Il va servir à affiner les scènes, les questions et la façon dont les saveurs sont attribuées.';
const TEXTE_ENVOYER='Envoyer',TEXTE_MERCI='Merci, c’est envoyé',TEXTE_ECHEC='L’envoi n’a pas marché, réessayer';
const TEXTE_RETOUR_TITRE='Si tu as des retours, n\u2019hésite pas une seule seconde.';
const TEXTE_RETOUR_AIDE='Une scène qui sonne faux, une question pas claire, un résultat qui t\u2019a fait rire ou tiquer\u2026 Tout est utile.';
const SESSION=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
const envoye=[false,false],commentaires=['',''];
function reponsesParScene(i){const c=cubes[i],out={};SPH[i].seq.forEach((it,idx)=>{if(!it.scene||(it.k!=='q'&&it.k!=='tree'))return;const a=c.ans[idx]||{};(out[it.scene]=out[it.scene]||[]).push(a.e1!=null?[a.e1,a.b]:a.o);});return out;}
/* ---------- fenêtre des retours, posée sur le résultat ---------- */
let modaleEl=null;
function ouvrirModale(i){fermerModale();const m=el('div','modale');m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','modale-titre');
const carte=el('div','modale-carte'),titre=el('h2','modale-titre',TEXTE_RETOUR_TITRE);titre.id='modale-titre';
const fermer=el('button','ib modale-fermer');fermer.type='button';fermer.setAttribute('aria-label','Fermer');fermer.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const zone=el('textarea','modale-zone');zone.id='retour-'+i;zone.maxLength=2000;zone.placeholder=TEXTE_RETOUR_AIDE;zone.value=commentaires[i];zone.setAttribute('aria-labelledby','modale-titre');
const envoi=el('button','modale-envoyer',TEXTE_ENVOYER);envoi.type='button';envoi.disabled=!commentaires[i].trim();
zone.addEventListener('input',()=>{commentaires[i]=zone.value;if(!envoi.dataset.envoi)envoi.disabled=!zone.value.trim();});
envoi.addEventListener('click',()=>envoyer(i,envoi));fermer.addEventListener('click',fermerModale);m.addEventListener('click',e=>{if(e.target===m)fermerModale();});
carte.append(fermer,titre,zone,envoi);m.append(carte);wrap.append(m);modaleEl=m;ajusterModale();m.getBoundingClientRect();m.classList.add('on');}
function fermerModale(){const m=modaleEl;modaleEl=null;if(!m)return;m.classList.remove('on');setTimeout(()=>m.remove(),300);}
/* clavier du téléphone : la fenêtre remonte au-dessus du clavier */
/* la fenêtre se cale sur la partie réellement visible de l'écran, au-dessus du clavier */
function ajusterModale(){if(!window.visualViewport)return;const v=visualViewport;wrap.style.setProperty('--vv-haut',v.offsetTop+'px');wrap.style.setProperty('--vv-bas',Math.max(0,wrap.clientHeight-v.offsetTop-v.height)+'px');}
if(window.visualViewport){visualViewport.addEventListener('resize',ajusterModale);visualViewport.addEventListener('scroll',ajusterModale);}
function donneesEnvoi(i){const r=cubes[i].result,arrondi=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,+v.toFixed(4)]));
return {version:window.ENVOI.version,session:SESSION,sphere:SPH[i].key,saveur:r.prof.sav,figure:r.prof.fig,code:r.code,teinte:r.teinte.l,delta:+r.delta.toFixed(4),positions:arrondi(r.pos),brut:arrondi(r.raw),reponses:reponsesParScene(i),commentaire:commentaires[i].trim().slice(0,2000)};}
async function envoyer(i,b){if(envoye[i]||b.disabled||!commentaires[i].trim())return;b.disabled=true;b.dataset.envoi='1';b.textContent='Envoi…';
try{const rep=await fetch(window.ENVOI.adresse,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(donneesEnvoi(i))});
 const j=await rep.json();if(!j.ok)throw new Error(j.erreur||'refusé');envoye[i]=true;b.textContent=TEXTE_MERCI;const z=document.getElementById('retour-'+i);if(z)z.disabled=true;vib(12);fermerModale();
 const c=cubes[i];if(entered&&active===i&&!c.tw){const cur=c.hist[c.hist.length-1].e;forward(i,{idx:cur.idx+1,br:null});}}
catch(e){delete b.dataset.envoi;b.disabled=false;b.textContent=TEXTE_ECHEC;setTimeout(()=>{if(!b.disabled)b.textContent=TEXTE_ENVOYER;},2500);}}
/* envoi automatique et anonyme du résultat, dès qu'il est calculé ; un commentaire viendra compléter la même ligne */
async function envoiAuto(i){if(!ENVOI_ACTIF)return;try{await fetch(window.ENVOI.adresse,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(donneesEnvoi(i))});}catch(e){}}
/* partage : « Je suis l'apéricube Poulet grillé, le Chaleureux… » + l'adresse de sa page de résultat (site/r/<saveur>/) */
// même nom de page que outils/pages-partage.js et outils/cartes-partage.html
const slugSaveur=t=>t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/&/g,' ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
async function partager(i,b){const p=cubes[i].result.prof,url=location.origin+'/r/'+slugSaveur(p.sav)+'/';
const texte='Je suis l\u2019apéricube '+p.sav+', '+p.fig.charAt(0).toLowerCase()+p.fig.slice(1)+'. Et toi, quel Apéricube es-tu\u00a0?';
try{if(navigator.share){await navigator.share({title:'Quel Apéricube es-tu\u00a0?',text:texte,url});return;}
 await navigator.clipboard.writeText(texte+' '+url);b.textContent=TEXTE_COPIE;setTimeout(()=>{b.textContent=TEXTE_PARTAGER;},2500);}
catch(e){if(e&&e.name==='AbortError')return;b.textContent='Partage impossible sur cet appareil';setTimeout(()=>{b.textContent=TEXTE_PARTAGER;},2500);}}
function choisir(act,b){const i=active;if(i<0)return;const c=cubes[i];if(c.tw||busy||!faceEl.classList.contains('on'))return;const cur=c.hist[c.hist.length-1].e;
if(act==='exit'){exitEnter();return;}if(act==='calc'){showCalc(i);return;}if(act==='envoyer'){envoyer(i,b);return;}if(act==='partager'){partager(i,b);return;}if(act==='modale'){ouvrirModale(i);return;}
if(act==='next'){forward(i,{idx:cur.idx+1,br:null});return;}
busy=true;faceEl.querySelectorAll('.f-choix').forEach(x=>x.classList.toggle('sel',x===b));c.vel+=0.6;vib(8);const n=nextEntry(i,cur,act);setTimeout(()=>{busy=false;forward(i,n);},380);}
function turnTo(i,e,dir,sign){const c=cubes[i];const to=rotFor(dir,sign).multiply(c.qT.clone());const inv=to.clone().invert();const lf=new THREE.Vector3(0,0,1).applyQuaternion(inv);const lu=new THREE.Vector3(0,1,0).applyQuaternion(inv);
let fi=0,best=-2;AX.forEach((a,k)=>{const d=a.dot(lf);if(d>best){best=d;fi=k;}});
orient(c,fi,lu);paint(c,fi,i,e);c.tw={from:c.q.clone(),to:to.clone(),p:0};c.qT.copy(to);c.front=fi;c.vel+=1.0;vib(10);}
function forward(i,e){const c=cubes[i];const dir=DIRS[c.hist.length%DIRS.length];c.hist.push({e,dir});turnTo(i,e,dir,1);}
function nextEntry(i,cur,choice){const s=SPH[i],c=cubes[i],it=s.seq[cur.idx];
if(it.k==='tree'&&cur.br==null){c.ans[cur.idx]={e1:choice};return {idx:cur.idx,br:choice};}
if(it.k==='tree'){c.ans[cur.idx].b=choice;}else if(it.k==='q'){c.ans[cur.idx]={o:choice};}
const n={idx:cur.idx+1,br:null};if(s.seq[n.idx]&&s.seq[n.idx].k==='res1'){c.result=compute(i);c.done=true;setCaption(i);envoiAuto(i);}return n;}
function goBack(){const i=active,c=cubes[i];if(c.tw||busy)return;if(c.hist.length<=1){exitEnter();return;}const last=c.hist.pop();const e=c.hist[c.hist.length-1].e;turnTo(i,e,last.dir,-1);}
function enter(i){entered=true;active=i;const c=cubes[i];c.qT.identity();c.front=4;c.hist=[];vib(20);
const start=c.done?{idx:SPH[i].seq.findIndex(x=>x.k==='res1'),br:null}:{idx:0,br:null};
if(!c.done){drawClear(c.faces[4]);c.faces[4].op=0;c.faces[4].dec.material.opacity=0;lancerMorph(i,start);}
later(()=>{c.faces[4].op=0;},420);
later(()=>{if(entered&&active===i){orient(c,4,new THREE.Vector3(0,1,0));c.hist=[{e:start,dir:null}];paint(c,4,i,start);c.faces[4].dec.material.opacity=0;}},820);}
function exitEnter(){timers.forEach(clearTimeout);timers=[];if(active>=0){const c=cubes[active],a=active;c.tw=null;c.faces.forEach(f=>{f.op=0;});
later(()=>{c.faces.forEach(f=>{drawClear(f);f.op=0;});orient(c,4,new THREE.Vector3(0,1,0));drawName(c.faces[4],SPH[a].lines);c.faces[4].op=1;},300);}
entered=false;active=-1;cacherFace();annulerMorph();fermerModale();calc.classList.remove('on');}
function showCalc(i){const r=cubes[i].result;if(!r)return;const f=v=>(v>=0?'+':'')+v.toFixed(2);
const names={DON:'Don (retenir · donner)',PRESENCE:'Présence (s\u2019effacer · occuper)',DETTE:'Dette (rejouer · ouvrir)',PARI:'Pari (laisser venir · conditionner)',CONF:'Conformité (se conformer · circuler)'};
let h='<p class="cl">◐ Recherche · prototype</p><table>';
['DON','PRESENCE','DETTE','PARI'].concat(SPH[i].key==='chez_nous'?['CONF']:[]).forEach(k=>{h+='<tr><td>'+names[k]+'</td><td>'+f(r.raw[k])+'</td><td>'+f(r.pos[k])+'</td></tr>';});
h+='</table><p class="cl">brut · recentré</p><p>Code : <b>'+r.code+'</b> → '+r.prof.sav+' · '+r.prof.fig+'</p><p>Delta global : '+r.delta.toFixed(2)+'</p><p>Teinte : '+r.teinte.l+' ('+r.tsrc+')</p>';
calcBody.innerHTML=h;calc.classList.add('on');}
document.getElementById('calcX').addEventListener('click',()=>calc.classList.remove('on'));
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();let dX=0,dIdx=-1,busy=false;
function setRay(e){const r=canvas.getBoundingClientRect();mv.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(mv,cam);}
function pick(e){setRay(e);const h=ray.intersectObjects(cubes.filter(c=>c.settled).map(c=>c.m),true);if(!h.length)return -1;let o=h[0].object;while(o.parent&&!cubes.some(c=>c.m===o))o=o.parent;return cubes.findIndex(c=>c.m===o);}
canvas.addEventListener('pointerdown',e=>{dX=e.clientX;dIdx=entered?-1:pick(e);});
canvas.addEventListener('pointerup',e=>{if(!started||entered)return;
const i=dIdx>=0?dIdx:pick(e);if(i<0)return;const c=cubes[i];if(c.rolling)return;
if(!c.revealed)roll(i,(e.clientX-dX)>=0?1:-1);else enter(i);});
prev.addEventListener('click',()=>{if(entered)goBack();});
const ease=x=>1-Math.pow(1-x,3),eio=x=>x<0.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eul=new THREE.Euler(),vv=new THREE.Vector3(),sq1=new THREE.Quaternion(),sq2=new THREE.Quaternion(),PA=new THREE.Vector3();
const D0='Deux cubes sont restés pour toi. Chacun ouvre une série de petites scènes : l\u2019un avec des inconnus, l\u2019autre avec les tiens. Fais-les rouler pour découvrir lequel est lequel.';
const D1='Le premier s\u2019est dévoilé. Fais rouler l\u2019autre, ou touche celui-ci pour commencer.';
const D2='Quelques minutes par cube, et une saveur d\u2019Apéricube au bout. Touche celui par lequel tu veux commencer, l\u2019autre t\u2019attendra.';
const D3='Ton premier Apéricube est trouvé. L\u2019autre cube t\u2019attend, touche-le quand tu veux.';
const D4='Tes deux Apéricubes : un avec ceux que tu ne connais pas, un avec les tiens. Touche un cube pour relire ton résultat.';
const clock=new THREE.Clock();
function loop(){const dt=Math.min(clock.getDelta(),0.033);t+=dt;
camY+=((entered?0:CAMY)-camY)*0.07;const k01=camY/CAMY;cam.position.set(0,camY,dist);cam.lookAt(0,entered?0:LOOKY*k01,0);
{const W=wrap.clientWidth,H=wrap.clientHeight;/* texte au-dessus des cubes : on descend la scène, davantage sur les écrans peu allongés */
const cible=entered?0:Math.max(0,H/W-1.78)*W*0.5+H*(0.06+0.09*Math.min(1,Math.max(0,(2-H/W)/0.22)));decalVue+=(cible-decalVue)*0.07;cam.setViewOffset(W,H,0,-decalVue,W,H);}
const big=bigScale();
if(tq.visible){const r=(tqCible||qmEl).getBoundingClientRect(),wr=wrap.getBoundingClientRect();const zq=3;
const nx=((r.left+r.width/2-wr.left)/wr.width)*2-1,ny=-(((r.top+r.height/2-wr.top)/wr.height)*2-1);
vv.set(nx,ny,0.5).unproject(cam).sub(cam.position).normalize();const kk=(zq-cam.position.z)/vv.z;const px=cam.position.x+vv.x*kk,py=cam.position.y+vv.y*kk;
const wpp=2*(cam.position.z-zq)*TAN/wr.height;const sc0=(r.height*0.92*wpp)/(S*1.732);
const a=-120*tqS.spring-7*tqS.vel;tqS.vel+=a*dt;tqS.spring+=tqS.vel*dt;
let hopY=0;if(tqS.hop>0){tqS.hop=Math.max(0,tqS.hop-dt*1.6);hopY=Math.sin((1-tqS.hop)*Math.PI)*sc0*S*1.2;}
tqS.spin+=dt*(0.75+(tqS.hop>0?4:0)+(tqS.leaving?6:0));
if(tqS.leaving){tqS.fade=Math.max(0,tqS.fade-dt*1.8);if(tqS.fade<=0)tq.visible=false;}
PA.set(Math.cos(t*1.3),0,Math.sin(t*1.3));sq1.setFromAxisAngle(UP,tqS.spin);sq2.setFromAxisAngle(PA,0.07+Math.sin(t*0.9)*0.02);tq.quaternion.copy(sq2).multiply(sq1).multiply(ALIGN);
const squ=tqS.spring*0.1;/* sur le résultat, le petit cube rétrécit quand on le fait défiler hors de la zone de texte */
const sz=sc0*tqS.fade*(tqCible?Math.max(0,Math.min(1,(r.bottom-faceCorps.getBoundingClientRect().top)/r.height)):1);tq.scale.set(sz*(1-squ*0.5),sz*(1+squ),sz*(1-squ*0.5));tq.position.set(px,py+hopY+(tqS.leaving?(1-tqS.fade)*0.6:0),zq);}
if(waveT>=0){const ts=t-waveT;
dice.forEach(o=>{const d=o.d;if(!(d.mode==='run'&&d.done))stepDie(d,ts,dt);if(!d.vis||(d.mode==='run'&&d.done)||entered){inst.setMatrixAt(o.i,ZERO);return;}dummy.position.copy(d.pos);dummy.quaternion.copy(d.q);dummy.scale.setScalar(1);dummy.updateMatrix();inst.setMatrixAt(o.i,dummy.matrix);});
inst.instanceMatrix.needsUpdate=true;}
cubes.forEach((c,i)=>{const s=SPH[i];const reading=entered&&active===i;let hop=0;
if(!c.landed){labels[i].style.opacity=0;labels[i].style.transform='translate(-50%,8px)';
if(c.wv){stepDie(c.wv,t-waveT,dt);c.m.visible=c.wv.vis;if(c.wv.vis){c.q.copy(c.wv.q);c.m.position.copy(c.wv.pos);c.m.quaternion.copy(c.q);c.m.scale.setScalar(1);}
if(c.wv.done){c.landed=true;c.cx=s.x;c.cz=0;c.cy=GROUND+S/2;c.vel-=2.5;c.faces[4].op=1;vib(16);later(()=>{c.settled=true;},250);if(c.revealed){c.ry=2*Math.PI+s.lean;}}}return;}
let tx=s.x,tz=0,ts=1,ty=null;
if(entered){if(reading){tx=0;ts=big;tz=-S*big/2;ty=0;}else{tx=s.x*3;ts=0.001;tz=-2;}}
const lr=entered?0.075:0.12;c.cx+=(tx-c.cx)*lr;c.cz+=(tz-c.cz)*lr;c.cs+=(ts-c.cs)*lr;
if(c.rolling){c.p=Math.min(1,c.p+dt/1.1);const e=ease(c.p);const ry=c.sy+(c.ey-c.sy)*e,rx=Math.PI*2*e;hop=Math.sin(c.p*Math.PI)*0.75;
eul.set(rx,ry,0);c.q.setFromEuler(eul);
if(c.p>=1){c.rolling=false;c.revealed=c.toReveal;c.ry=c.ey;c.vel-=3.5;vib([18,30,34]);}}
else if(reading){if(c.tw){c.tw.p=Math.min(1,c.tw.p+dt/0.8);c.q.slerpQuaternions(c.tw.from,c.tw.to,eio(c.tw.p));if(c.tw.p>=1)c.tw=null;}else c.q.slerp(c.qT,0.1);c.mat.color.lerp(readColor(i,c.spk),0.06);}
else{eul.set(0,c.ry,0);sq1.setFromEuler(eul);c.q.slerp(sq1,0.12);c.mat.color.lerp(homeColor(i),0.08);}
c.mat.metalness+=((reading?0.15:1)-c.mat.metalness)*0.06;c.mat.roughness+=((reading?0.55:0.24)-c.mat.roughness)*0.06;c.mat.envMapIntensity+=((reading?0.6:1.2)-c.mat.envMapIntensity)*0.06;
c.faces.forEach(f=>{f.dec.material.opacity+=(f.op-f.dec.material.opacity)*0.18;});
const acc=-110*c.spring-6.5*c.vel;c.vel+=acc*dt;c.spring+=c.vel*dt;
const sq=c.spring*(reading?0.02:0.04);const syv=c.cs*(1+sq);c.m.scale.set(c.cs*(1-sq*0.5),syv,c.cs*(1-sq*0.5));
const yHome=GROUND+(S*syv)/2+hop;const yt=(ty!==null)?ty:yHome;c.cy=entered?c.cy+(yt-c.cy)*0.075:((Math.abs(c.cy-yt)>0.01&&!c.rolling)?c.cy+(yt-c.cy)*0.15:yt);
c.m.position.set(c.cx,c.cy,c.cz);c.m.quaternion.copy(c.q);
const v=new THREE.Vector3(c.cx,GROUND,c.cz).project(cam);labels[i].style.left=((v.x*0.5+0.5)*wrap.clientWidth)+'px';labels[i].style.top=((-v.y*0.5+0.5)*wrap.clientHeight+24)+'px';
const show=c.revealed&&!entered&&started;labels[i].style.opacity=show?1:0;labels[i].style.transform=show?'translate(-50%,0)':'translate(-50%,8px)';});
const allSet=cubes.every(c=>c.settled),nrev=cubes.filter(c=>c.revealed).length,ndone=cubes.filter(c=>c.done).length;
const want=ndone===2?D4:ndone===1?D3:nrev===0?D0:(nrev===1?D1:D2);if(desc.dataset.cible!==want){desc.dataset.cible=want;if(!desc.dataset.txt){desc.dataset.txt=want;desc.textContent=want;}
 else{desc.classList.add('fondu');clearTimeout(descMinuteur);descMinuteur=setTimeout(()=>{desc.dataset.txt=desc.dataset.cible;desc.textContent=desc.dataset.cible;desc.classList.remove('fondu');},400);}}
desc.style.opacity=(started&&allSet&&!entered)?1:0;
prev.style.opacity=entered?1:0;prev.style.pointerEvents=entered?'auto':'none';
const light=entered&&active>=0&&palette(active,cubes[active].spk)===LIGHT;const icol=entered?(light?'rgba(255,255,255,.75)':'rgba(18,12,10,.6)'):'#a89a8d';prev.style.color=icol;
if(faceAttente&&entered&&active===faceAttente.i&&!cubes[active].tw)afficherFace();
R.render(scene,cam);requestAnimationFrame(loop);}
loop();
window.__SPH=SPH;window.__cubes=cubes;window.__compute=compute;window.__specFor=specFor;
})();
