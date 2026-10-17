(function(){
THREE.ColorManagement.legacyMode=false;
const C=window.CONTENT;
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
const S=1.15,RD=0.045,GROUND=-0.6,DEC=0.98,Q=Math.PI/2,FONT='"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
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
function sceneItems(list,label){const out=[];list.forEach(scn=>{out.push({k:'text',label,title:scn.title,paras:[scn.intro],cta:'Entrer dans la scène'});
scn.items.forEach(it=>out.push(Object.assign({},it,{label:it.n+' / 8   ·   '+it.t})));});return out;}
const ONB=[
{k:'text',label:'Chez nous',title:'Bienvenue',paras:['On va regarder ta façon d\u2019être avec les autres. Pas pour te mettre dans une case, pas pour te juger : juste pour voir comment tu circules quand il y a du monde autour de toi.','Il n\u2019y a pas de bonne réponse. Il n\u2019y a que la tienne. Réponds vite, au premier mouvement.','Ce qui suit va peut-être te bousculer un peu. Te sortir de ta zone de confort.'],coda:'Et c\u2019est ok.',cta:'Commencer'},
{k:'q',trap:true,label:'1 / 3',s:'Avec les gens, tu es plutôt…',o:['Fidèle à toi-même, toujours','Caméléon, tu t\u2019adaptes','Toi en mieux, les autres te tirent vers le haut','Toi tout court, à prendre ou à laisser'].map(t=>({t,w:{}}))},
{k:'q',trap:true,label:'2 / 3',s:'Dans un groupe, on peut compter sur toi pour…',o:['Dire les choses franchement','Mettre de l\u2019ambiance','Être là quand il faut','Rester toi-même quoi qu\u2019il arrive'].map(t=>({t,w:{}}))},
{k:'q',trap:true,label:'3 / 3',s:'Ce que tes proches diraient de toi, en un mot…',o:['Entier','Fidèle','Présent','Vrai'].map(t=>({t,w:{}}))},
{k:'text',label:'',title:'C\u2019était ton horoscope.',paras:['Ces trois questions étaient écrites pour que tu te trouves génial, à tous les coups.'],coda:'Maintenant, on regarde ce que tu fais vraiment.',cta:'On y va'}];
const SPH=[
{key:'chez_les_autres',name:'Chez les autres',col:'#3A68DF',lines:['Chez les','autres'],sub:'avec ceux que tu ne<br>connais pas encore',x:-0.88,lean:0.42,
 seq:[...sceneItems(C.autres,'Chez les autres'),{k:'res1'},{k:'res2'}]},
{key:'chez_nous',name:'Chez nous',col:'#FF4940',lines:['Chez','nous'],sub:'avec ceux qui te<br>connaissent par cœur',x:0.88,lean:-0.3,
 seq:[...ONB,...sceneItems(C.nous,'Chez nous'),{k:'res1'},{k:'res2'}]}];
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
function layout(){const {vh,vw}=view();const cs=bigScale();const ppw=TS/(DEC*S*cs);const k=ppw/(wrap.clientHeight/vh);const hw=(vw/2)*ppw,hh=(vh/2)*ppw;
return {k,x0:TS/2-hw+16*k,x1:TS/2+hw-16*k,y0:TS/2-hh+(58+safeTop())*k,y1:TS/2+hh-(78+safeBot())*k};}
const _sa=document.getElementById('sa');function safeTop(){return _sa?_sa.offsetTop:0;}
const _sb=document.getElementById('sb');function safeBot(){return _sb?_sb.offsetHeight:0;}
function wrapText(x,txt,maxW){const words=txt.split(' ');const out=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(x.measureText(t).width>maxW&&line){out.push(line);line=w;}else line=t;}if(line)out.push(line);return out;}
function drawName(f,lines){const x=f.ctx;x.clearRect(0,0,TS,TS);x.textAlign='center';x.textBaseline='middle';x.font='400 230px '+FONT;const ys=lines.length>1?[505,795]:[640];
lines.forEach((l,j)=>{x.fillStyle='rgba(20,8,4,0.3)';x.fillText(l,640,ys[j]+4);x.fillStyle='rgba(255,255,255,0.97)';x.fillText(l,640,ys[j]);});f.rects=[];f.tex.needsUpdate=true;}
function drawClear(f){f.ctx.clearRect(0,0,TS,TS);f.rects=[];f.tex.needsUpdate=true;}
function render(x,L,sp,sel,z,P,dry){const k=L.k*z,W=L.x1-L.x0;x.textAlign='left';x.textBaseline='alphabetic';let y=L.y0+14*L.k;
const txt=(font,lines,lh,col)=>{x.font=font;x.fillStyle=col;wrapText(x,lines,W).forEach(l=>{if(!dry)x.fillText(l,L.x0,y);y+=lh;});};
if(sp.label){x.font=(13*L.k)+'px '+FONT;x.fillStyle=P.INK2;if(!dry)x.fillText(sp.label,L.x0,y);}
const items=[];let rowsAtBottom=false;
if(sp.k==='text'){y+=50*k;txt((36*k)+'px '+FONT,sp.title,44*k,P.INK);y+=6*k;sp.paras.forEach(p=>{txt('italic '+(21*k)+'px '+FONT,p,31*k,P.INK);y+=14*k;});
 if(sp.coda){y+=12*k;txt((25*k)+'px '+FONT,sp.coda,34*k,P.INK);}items.push({label:sp.cta,act:'next'});rowsAtBottom=true;}
else if(sp.k==='q'){y+=44*k;txt('italic '+(23*k)+'px '+FONT,sp.s,32*k,P.INK);y+=26*k;sp.o.forEach((o,i)=>items.push({label:o.t,act:i}));}
else if(sp.k==='res1'){y+=40*k;x.font=(13*L.k)+'px '+FONT;y+=8*k;txt((46*k)+'px '+FONT,sp.r.prof.sav,52*k,P.INK);y+=2*k;txt('italic '+(26*k)+'px '+FONT,sp.r.prof.fig,34*k,P.INK);
 y+=22*k;txt('italic '+(19*k)+'px '+FONT,sp.r.prof.sline||'',28*k,P.INK);y+=26*k;txt((13*k)+'px '+FONT,'Ta nuance · '+sp.r.teinte.l,20*k,P.INK2);y+=6*k;txt((19*k)+'px '+FONT,sp.r.teinte.x,28*k,P.INK);
 items.push({label:'Lire ton portrait',act:'next'},{label:'Revenir aux cubes',act:'exit'});rowsAtBottom=true;}
else if(sp.k==='res2'){y+=44*k;txt((30*k)+'px '+FONT,sp.r.prof.fig,38*k,P.INK);y+=8*k;sp.r.prof.paras.forEach(p=>{txt((18.5*k)+'px '+FONT,p,27*k,P.INK);y+=10*k;});
 items.push({label:'Revenir aux cubes',act:'exit'},{label:'Voir le calcul',act:'calc'});rowsAtBottom=true;}
x.font=(19*k)+'px '+FONT;const lh=26*k;const rh=items.map(it=>{const ls=wrapText(x,it.label,W-16*L.k);return {ls,h:Math.max(Math.max(56,66*z)*L.k,ls.length*lh+38*k)};});
const total=rh.reduce((a,b)=>a+b.h,0);let ry=rowsAtBottom?Math.max(y+30*k,L.y1-total):y;const rects=[];
rh.forEach((r,i)=>{if(!dry){x.fillStyle=P.RULE;x.fillRect(L.x0,ry,W,Math.max(1.5,1.2*L.k));if(sel===items[i].act){x.fillStyle=P.SEL;x.fillRect(L.x0,ry,W,r.h);}
 const tp=ry+(r.h-r.ls.length*lh)/2+19*k;x.fillStyle=P.INK;r.ls.forEach((l,j)=>x.fillText(l,L.x0+8*L.k,tp+j*lh));}
 rects.push({y0:ry,y1:ry+r.h,act:items[i].act});ry+=r.h;});
if(!dry&&rh.length){x.fillStyle=P.RULE;x.fillRect(L.x0,ry,W,Math.max(1.5,1.2*L.k));}
return {end:ry,rects};}
function drawSpec(f,sp,sel,P){const L=layout(),x=f.ctx;x.clearRect(0,0,TS,TS);let z=1;
for(;z>0.6;z-=0.04){if(render(x,L,sp,sel,z,P,true).end<=L.y1+1)break;}
const r=render(x,L,sp,sel,z,P,false);f.rects=r.rects;f.z=z;f.tex.needsUpdate=true;window.__fit=window.__fit||[];window.__fit.push({k:sp.k,label:sp.label||'',z:+z.toFixed(2)});}
const labels=[document.getElementById('l0'),document.getElementById('l1')];
function orient(c,fi,up){const f=c.faces[fi];const n=f.n.clone();const u=up.clone().sub(n.clone().multiplyScalar(up.dot(n))).normalize();const x=u.clone().cross(n);f.dec.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,u,n));f.dec.position.copy(n).multiplyScalar(S/2+0.003);}
const mainGeo=rbox(4);
const cubes=SPH.map((s,i)=>{const mat=metal(s.c.clone());const m=new THREE.Mesh(mainGeo,mat);m.castShadow=true;m.visible=false;
const faces=AX.map(n=>{const cv=document.createElement('canvas');cv.width=cv.height=TS;const ctx=cv.getContext('2d');const tex=new THREE.CanvasTexture(cv);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;
const dec=new THREE.Mesh(new THREE.PlaneGeometry(DEC,DEC),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,toneMapped:false,fog:false,polygonOffset:true,polygonOffsetFactor:-2}));m.add(dec);
return {cv,ctx,tex,dec,n,rects:[],op:0};});scene.add(m);return {m,mat,faces,ans:{},result:null,done:false};});
function homeColor(i){const c=cubes[i];return c.result?popc(c.result.prof.col):SPH[i].c;}
function readColor(i,spk){const c=cubes[i];if((spk==='res1'||spk==='res2')&&c.result)return popc(c.result.prof.col).lerp(new THREE.Color('#ffffff'),0.12);return SPH[i].read;}
function setCaption(i){const c=cubes[i];labels[i].innerHTML=c.result?('<span style="font-size:16px;color:var(--ink)">'+c.result.prof.sav+'</span><br><i>'+c.result.prof.fig+'</i>'):SPH[i].sub;}
function resetMain(c,i,full){const s=SPH[i];Object.assign(c,{cx:s.x,cy:GROUND+S/2,cz:0,cs:1,spring:0,vel:0,ry:Math.PI+s.lean,rolling:false,p:0,toReveal:true,q:new THREE.Quaternion(),qT:new THREE.Quaternion(),tw:null,front:4,hist:[],landed:false,settled:false,wv:null});
if(full){c.revealed=false;c.ans={};c.result=null;c.done=false;}
c.m.visible=false;c.mat.color.copy(homeColor(i));c.mat.metalness=1;c.mat.roughness=0.24;c.faces.forEach(f=>{drawClear(f);f.op=0;f.dec.material.opacity=0;});orient(c,4,new THREE.Vector3(0,1,0));drawName(c.faces[4],s.lines);
labels[i].style.opacity=0;labels[i].style.transform='translate(-50%,8px)';setCaption(i);}
cubes.forEach((c,i)=>resetMain(c,i,true));
const MAXI=260;const inst=new THREE.InstancedMesh(rbox(2),new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:0.26,envMapIntensity:1.15}),MAXI);inst.castShadow=true;inst.frustumCulled=false;scene.add(inst);
for(let i=0;i<MAXI;i++)inst.setColorAt(i,balanced(i));inst.instanceColor.needsUpdate=true;
const dummy=new THREE.Object3D();const ZERO=new THREE.Matrix4().makeScale(0,0,0);function clearInst(){for(let i=0;i<MAXI;i++)inst.setMatrixAt(i,ZERO);inst.instanceMatrix.needsUpdate=true;}clearInst();
const tq=new THREE.Mesh(rbox(3),metal(balanced(Math.floor(Math.random()*8)).clone()));scene.add(tq);
const ALIGN=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,1,1).normalize(),new THREE.Vector3(0,1,0));
const tqS={spring:0,vel:0,hop:0,spin:0,fade:1,leaving:false};
const pres=document.getElementById('pres'),desc=document.getElementById('desc'),prev=document.getElementById('prev'),rst=document.getElementById('rst'),qmEl=document.getElementById('qm'),calc=document.getElementById('calc'),calcBody=document.getElementById('calcBody');
let entered=false,active=-1,camY=CAMY,timers=[],started=false,t=0,waveT=-1,dice=[];
function later(fn,ms){timers.push(setTimeout(fn,ms));}
function size(){const w=wrap.clientWidth,h=wrap.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;const need=3.7;dist=Math.max(5.5,(need/2)/(TAN*cam.aspect));cam.updateProjectionMatrix();}
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
function vib(p){try{if(navigator.vibrate)navigator.vibrate(p);}catch(e){}}
document.getElementById('go').addEventListener('click',start);
qmEl.addEventListener('click',()=>{if(!started&&tqS.hop<=0){tqS.hop=1;tqS.vel+=2.2;vib(10);}});
function roll(i,dir){const c=cubes[i];c.rolling=true;c.p=0;c.toReveal=true;c.sy=c.ry;c.ey=(dir>=0?Math.PI*2:0)+SPH[i].lean;c.vel+=1.2;vib(12);}
const DIRS=['right','down','right','up'];
function rotFor(dir,sign){const r=new THREE.Quaternion();const a=(dir==='right'||dir==='down'?-1:1)*Math.PI/2*sign;r.setFromAxisAngle(dir==='right'?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),a);return r;}
/* ---------- navigation ---------- */
function specFor(i,e){const s=SPH[i],c=cubes[i],it=s.seq[e.idx],a=c.ans[e.idx]||{};
if(it.k==='res1'||it.k==='res2'){if(!c.result)c.result=compute(i);return {k:it.k,label:it.k==='res1'?'Ton Apéricube · '+s.name:'Ton portrait',r:c.result};}
if(it.k==='text')return {k:'text',label:it.label,title:it.title,paras:it.paras,coda:it.coda,cta:it.cta,sel:-1};
if(e.br!=null)return {k:'q',label:it.label,s:it.br[e.br].s,o:it.br[e.br].o,sel:a.b??-1};
return {k:'q',label:it.label,s:it.s,o:it.o,sel:(it.k==='tree'?a.e1:a.o)??-1};}
function palette(i,spk){return lum(readColor(i,spk))<0.42?LIGHT:DARK;}
function paint(c,fi,i,e){const sp=specFor(i,e);const f=c.faces[fi];f.op=1;f.dec.material.opacity=1;f.spec=sp;f.entry=e;drawSpec(f,sp,sp.sel,palette(i,sp.k));c.spk=sp.k;}
function turnTo(i,e,dir,sign){const c=cubes[i];const to=rotFor(dir,sign).multiply(c.qT.clone());const inv=to.clone().invert();const lf=new THREE.Vector3(0,0,1).applyQuaternion(inv);const lu=new THREE.Vector3(0,1,0).applyQuaternion(inv);
let fi=0,best=-2;AX.forEach((a,k)=>{const d=a.dot(lf);if(d>best){best=d;fi=k;}});
orient(c,fi,lu);paint(c,fi,i,e);c.tw={from:c.q.clone(),to:to.clone(),p:0};c.qT.copy(to);c.front=fi;c.vel+=1.0;vib(10);}
function forward(i,e){const c=cubes[i];const dir=DIRS[c.hist.length%DIRS.length];c.hist.push({e,dir});turnTo(i,e,dir,1);}
function nextEntry(i,cur,choice){const s=SPH[i],c=cubes[i],it=s.seq[cur.idx];
if(it.k==='tree'&&cur.br==null){c.ans[cur.idx]={e1:choice};return {idx:cur.idx,br:choice};}
if(it.k==='tree'){c.ans[cur.idx].b=choice;}else if(it.k==='q'){c.ans[cur.idx]={o:choice};}
const n={idx:cur.idx+1,br:null};if(s.seq[n.idx]&&s.seq[n.idx].k==='res1'){c.result=compute(i);c.done=true;setCaption(i);}return n;}
function goBack(){const i=active,c=cubes[i];if(c.tw||busy)return;if(c.hist.length<=1){exitEnter();return;}const last=c.hist.pop();const e=c.hist[c.hist.length-1].e;turnTo(i,e,last.dir,-1);}
function enter(i){entered=true;active=i;const c=cubes[i];c.qT.identity();c.front=4;c.hist=[];vib(20);
const start=c.done?{idx:SPH[i].seq.findIndex(x=>x.k==='res1'),br:null}:{idx:0,br:null};
later(()=>{c.faces[4].op=0;},420);
later(()=>{if(entered&&active===i){orient(c,4,new THREE.Vector3(0,1,0));c.hist=[{e:start,dir:null}];paint(c,4,i,start);c.faces[4].dec.material.opacity=0;}},820);}
function exitEnter(){timers.forEach(clearTimeout);timers=[];if(active>=0){const c=cubes[active],a=active;c.tw=null;c.faces.forEach(f=>{f.op=0;});
later(()=>{c.faces.forEach(f=>{drawClear(f);f.op=0;});orient(c,4,new THREE.Vector3(0,1,0));drawName(c.faces[4],SPH[a].lines);c.faces[4].op=1;},300);}
entered=false;active=-1;calc.classList.remove('on');}
function fullReset(){timers.forEach(clearTimeout);timers=[];entered=false;active=-1;started=false;waveT=-1;dice=[];clearInst();cubes.forEach((c,i)=>resetMain(c,i,true));
Object.assign(tqS,{spring:0,vel:0,hop:0,fade:1,leaving:false});tq.visible=true;pres.style.opacity=1;qmEl.style.pointerEvents='auto';desc.style.opacity=0;calc.classList.remove('on');}
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
canvas.addEventListener('pointerup',e=>{if(!started)return;
if(entered){const i=active,c=cubes[i];if(c.tw||busy)return;setRay(e);const f=c.faces[c.front];const h=ray.intersectObject(f.dec);if(!h.length||!h[0].uv)return;
const yy=(1-h[0].uv.y)*TS;const r=f.rects.find(r=>yy>=r.y0&&yy<=r.y1);if(!r)return;const cur=c.hist[c.hist.length-1].e;
if(r.act==='exit'){exitEnter();return;}if(r.act==='calc'){showCalc(i);return;}
if(r.act==='next'){forward(i,{idx:cur.idx+1,br:null});return;}
busy=true;drawSpec(f,f.spec,r.act,palette(i,f.spec.k));c.vel+=0.6;vib(8);const n=nextEntry(i,cur,r.act);setTimeout(()=>{busy=false;forward(i,n);},380);return;}
const i=dIdx>=0?dIdx:pick(e);if(i<0)return;const c=cubes[i];if(c.rolling)return;
if(!c.revealed)roll(i,(e.clientX-dX)>=0?1:-1);else enter(i);});
prev.addEventListener('click',()=>{if(entered)goBack();});
rst.addEventListener('click',fullReset);
const ease=x=>1-Math.pow(1-x,3),eio=x=>x<0.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eul=new THREE.Euler(),vv=new THREE.Vector3(),sq1=new THREE.Quaternion(),sq2=new THREE.Quaternion(),PA=new THREE.Vector3();
const D0='Deux cubes sont restés pour toi. Chacun ouvre une série de petites scènes : l\u2019un avec des inconnus, l\u2019autre avec les tiens. Fais-les rouler pour découvrir lequel est lequel.';
const D1='Le premier s\u2019est dévoilé. Fais rouler l\u2019autre, ou touche celui-ci pour commencer.';
const D2='Quelques minutes par cube, et une saveur d\u2019Apéricube au bout. Touche celui par lequel tu veux commencer : l\u2019autre t\u2019attendra.';
const D3='Ton premier Apéricube est trouvé. L\u2019autre cube t\u2019attend, touche-le quand tu veux.';
const D4='Tes deux Apéricubes : un avec ceux que tu ne connais pas, un avec les tiens. Touche un cube pour relire ton résultat.';
const clock=new THREE.Clock();
function loop(){const dt=Math.min(clock.getDelta(),0.033);t+=dt;
camY+=((entered?0:CAMY)-camY)*0.07;const k01=camY/CAMY;cam.position.set(0,camY,dist);cam.lookAt(0,entered?0:LOOKY*k01,0);
const big=bigScale();
if(tq.visible){const r=qmEl.getBoundingClientRect(),wr=wrap.getBoundingClientRect();const zq=3;
const nx=((r.left+r.width/2-wr.left)/wr.width)*2-1,ny=-(((r.top+r.height/2-wr.top)/wr.height)*2-1);
vv.set(nx,ny,0.5).unproject(cam).sub(cam.position).normalize();const kk=(zq-cam.position.z)/vv.z;const px=cam.position.x+vv.x*kk,py=cam.position.y+vv.y*kk;
const wpp=2*(cam.position.z-zq)*TAN/wr.height;const sc0=(r.height*0.92*wpp)/(S*1.732);
const a=-120*tqS.spring-7*tqS.vel;tqS.vel+=a*dt;tqS.spring+=tqS.vel*dt;
let hopY=0;if(tqS.hop>0){tqS.hop=Math.max(0,tqS.hop-dt*1.6);hopY=Math.sin((1-tqS.hop)*Math.PI)*sc0*S*1.2;}
tqS.spin+=dt*(0.75+(tqS.hop>0?4:0)+(tqS.leaving?6:0));
if(tqS.leaving){tqS.fade=Math.max(0,tqS.fade-dt*1.8);if(tqS.fade<=0)tq.visible=false;}
PA.set(Math.cos(t*1.3),0,Math.sin(t*1.3));sq1.setFromAxisAngle(UP,tqS.spin);sq2.setFromAxisAngle(PA,0.07+Math.sin(t*0.9)*0.02);tq.quaternion.copy(sq2).multiply(sq1).multiply(ALIGN);
const squ=tqS.spring*0.1;const sz=sc0*tqS.fade;tq.scale.set(sz*(1-squ*0.5),sz*(1+squ),sz*(1-squ*0.5));tq.position.set(px,py+hopY+(tqS.leaving?(1-tqS.fade)*0.6:0),zq);}
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
const v=new THREE.Vector3(c.cx,GROUND,c.cz).project(cam);labels[i].style.left=((v.x*0.5+0.5)*wrap.clientWidth)+'px';labels[i].style.top=((-v.y*0.5+0.5)*wrap.clientHeight+16)+'px';
const show=c.revealed&&!entered&&started;labels[i].style.opacity=show?1:0;labels[i].style.transform=show?'translate(-50%,0)':'translate(-50%,8px)';});
const allSet=cubes.every(c=>c.settled),nrev=cubes.filter(c=>c.revealed).length,ndone=cubes.filter(c=>c.done).length;
const want=ndone===2?D4:ndone===1?D3:nrev===0?D0:(nrev===1?D1:D2);if(desc.dataset.txt!==want){desc.dataset.txt=want;desc.textContent=want;}
desc.style.opacity=(started&&allSet&&!entered)?1:0;
prev.style.opacity=entered?1:0;prev.style.pointerEvents=entered?'auto':'none';
const light=entered&&active>=0&&palette(active,cubes[active].spk)===LIGHT;const icol=entered?(light?'rgba(255,255,255,.75)':'rgba(18,12,10,.6)'):'#a89a8d';rst.style.color=icol;prev.style.color=icol;
rst.style.opacity=started?1:0;rst.style.pointerEvents=started?'auto':'none';
R.render(scene,cam);requestAnimationFrame(loop);}
loop();
window.__SPH=SPH;window.__cubes=cubes;window.__compute=compute;window.__specFor=specFor;
})();
