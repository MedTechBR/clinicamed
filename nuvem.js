/* ================================================================
   ClínicaMed — conta MedTech e sincronização entre aparelhos.

   Login é OPCIONAL: sem conta o app continua inteiro, gravando só neste
   aparelho. Entrar apenas acrescenta a cópia na nuvem e o encontro entre
   celular e computador.

   Por que NÃO usamos o MT.save cru do _mtauth.js: ele grava o estado
   inteiro num doc só (setDoc merge) — isso é last-write-wins, e foi
   exatamente assim que o Granaê apagou dados. Aqui o que chega da nuvem é
   MESCLADO item a item, com carimbo por item e lápide para exclusão, e só
   depois gravado. O MT.save é usado apenas como transporte, já com o
   resultado da mesclagem pronto.

   O QUE SINCRONIZA (progresso de verdade):
     resp, fav, flash, treino, lidas, atividade, sim, contest, erros
   O QUE NÃO SINCRONIZA (tela deste aparelho):
     cfg (aba aberta, tema, filtros), pos (posição na lista), simativo
     (simulado em andamento). Sincronizar isso teleportaria a tela do
     outro celular para cá no meio do estudo.
   ================================================================ */
const NUVEM=(function(){

/* mapas chave→valor: carimbo por item, lápide na exclusão */
const MAPAS=["resp","fav","flash","treino","lidas"];
/* listas com identidade própria: união pelo campo, sem carimbo */
const LISTAS={sim:"quando",contest:"quando"};
/* atividade é {dia:n} e se resolve pelo maior; erros é DERIVADO de resp */
const SINC=[...MAPAS,"atividade",...Object.keys(LISTAS),"erros"];

const TETO_AVISO=800*1024, TETO_DURO=950*1024;   /* doc do Firestore: 1 MB */

let CAR={}, LAP={}, FOTO={};          /* carimbos, lápides, retrato do último estado visto */
let usuario=null, modo="local", aplicando=false, ultimoEnv="", ultimoSync=null, pend=null, avisouTeto=false;

const clona=o=>JSON.parse(JSON.stringify(o));
/* JSON.stringify depende da ORDEM das chaves, e a mesclagem monta o objeto em ordens
   diferentes em cada aparelho (aqui as locais primeiro, lá as remotas). Comparar assim faria
   os dois acharem que houve mudança a cada rodada e ficarem se reenviando o mesmo estado
   para sempre. Daí a serialização estável, com as chaves ordenadas. */
function estavel(o){
  if(o===null||typeof o!=="object")return JSON.stringify(o);
  if(Array.isArray(o))return "["+o.map(estavel).join(",")+"]";
  return "{"+Object.keys(o).sort().map(k=>JSON.stringify(k)+":"+estavel(o[k])).join(",")+"}";
}
const igual=(a,b)=>estavel(a)===estavel(b);
function leMeta(k){try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){return {}}}
function gravaMeta(){try{localStorage.setItem(PREF+"car",JSON.stringify(CAR));
  localStorage.setItem(PREF+"lap",JSON.stringify(LAP))}catch(e){}}

/* ---------- carimbo: chamado a CADA salva(), sem tocar nos pontos de escrita ----------
   Diferença contra o retrato em memória: o que mudou ganha carimbo, o que sumiu ganha
   lápide. Sem lápide, o item excluído aqui volta do outro aparelho na mesclagem. */
function carimba(k,v){
  if(!MAPAS.includes(k)){ if(SINC.includes(k))FOTO[k]=clona(v); return }
  const ag=Date.now(), ant=FOTO[k]||{}, car=CAR[k]||(CAR[k]={}), lap=LAP[k]||(LAP[k]={});
  if(!aplicando){
    Object.keys(v).forEach(ch=>{ if(!(ch in ant)||!igual(ant[ch],v[ch])){car[ch]=ag;delete lap[ch]} });
    Object.keys(ant).forEach(ch=>{ if(!(ch in v)){lap[ch]=ag;delete car[ch]} });
    gravaMeta();
  }
  FOTO[k]=clona(v);
}

/* ---------- mesclagem ---------- */
function uneHist(a,b){
  const ha=((a||{}).hist)||[], hb=((b||{}).hist)||[];
  if(!ha.length&&!hb.length)return null;
  const vis=new Set(), out=[];
  ha.concat(hb).forEach(r=>{const id=(r&&r.ts)||(r&&r.d+"|"+r.alt+"|"+r.ok);
    if(id===undefined||vis.has(id))return; vis.add(id); out.push(r)});
  out.sort((x,y)=>(x.ts||0)-(y.ts||0));
  return {...(a||{}),...(b||{}),hist:out.slice(-60)};
}
function maiorCarimbo(a,b){const o={...(a||{})};
  Object.keys(b||{}).forEach(k=>{if(!(k in o)||b[k]>o[k])o[k]=b[k]});return o}
/* erros não se mescla: ele é consequência de resp. Uma questão fica na lista de erros
   enquanto tiver algum erro no histórico e menos de 2 acertos seguidos no fim — que é
   exatamente a regra do registraResposta(). Derivar evita ressuscitar erro já vencido. */
function derivaErros(resp){
  const out=[];
  Object.keys(resp||{}).forEach(ch=>{
    const h=((resp[ch]||{}).hist)||[];
    if(!h.some(r=>!r.ok))return;
    let n=0; for(let i=h.length-1;i>=0;i--){if(h[i].ok)n++;else break}
    if(n<2)out.push(ch);
  });
  return out;
}

function mescla(rem){
  if(!rem||typeof rem!=="object"||rem.ap!=="clinicamed")return false;
  const rd=rem.d||{}, rc=rem.c||{}, rl=rem.l||{};
  let mudou=false;
  aplicando=true;
  try{
    MAPAS.forEach(k=>{
      const loc=ST[k]||{}, rv=rd[k]||{};
      if(!rv||typeof rv!=="object")return;
      const cl=CAR[k]||{}, cr=rc[k]||{}, ll=LAP[k]||{}, lr=rl[k]||{}, out={};
      const chaves=new Set(Object.keys(loc).concat(Object.keys(rv)));
      chaves.forEach(ch=>{
        /* item que existe mas nunca foi carimbado (dado anterior à nuvem) vale 1:
           mais que "não existe" (0) e menos que qualquer escrita datada. */
        const tl=(ch in loc)?(cl[ch]||1):0, tr=(ch in rv)?(cr[ch]||1):0;
        const lap=Math.max(ll[ch]||0, lr[ch]||0);
        if(lap>Math.max(tl,tr))return;                 /* apagado depois de escrito */
        if(k==="resp"){const u=uneHist(loc[ch],rv[ch]); if(u)out[ch]=u; return}
        out[ch]= tr>tl ? rv[ch] : ((ch in loc)?loc[ch]:rv[ch]);
      });
      CAR[k]=maiorCarimbo(cl,cr); LAP[k]=maiorCarimbo(ll,lr);
      if(!igual(out,loc)){ST[k]=out;salva(k,out);mudou=true}
    });

    /* atividade: dois aparelhos no mesmo dia não têm como saber o que é sobreposto;
       o maior é o único palpite que nunca infla o número. */
    const ra=rd.atividade;
    if(ra&&typeof ra==="object"){
      const out={...(ST.atividade||{})};
      Object.keys(ra).forEach(d=>{const n=+ra[d]||0; if(n>(out[d]||0))out[d]=n});
      if(!igual(out,ST.atividade)){ST.atividade=out;salva("atividade",out);mudou=true}
    }

    Object.keys(LISTAS).forEach(k=>{
      const campo=LISTAS[k], loc=Array.isArray(ST[k])?ST[k]:[], rv=Array.isArray(rd[k])?rd[k]:[];
      const vis=new Set(), out=[];
      loc.concat(rv).forEach(it=>{const id=it&&it[campo]; if(!id||vis.has(id))return;vis.add(id);out.push(it)});
      out.sort((a,b)=>String(a[campo]).localeCompare(String(b[campo])));
      if(k==="contest"){out.reverse(); out.splice(60)}
      if(!igual(out,loc)){ST[k]=out;salva(k,out);mudou=true}
    });

    const er=derivaErros(ST.resp);
    if(!igual(er,ST.erros)){ST.erros=er;salva("erros",er);mudou=true}
    gravaMeta();
  } finally { aplicando=false }
  return mudou;
}

/* ---------- resumo para a coordenação ----------------------------------
   Quem tem o banco de questões é o cliente: só aqui a chave da resposta vira área do
   edital. Então o resumo é calculado no aparelho e publicado num doc PEQUENO e separado
   (apps/clinicamed_resumo). A coordenação lê esse doc — nunca o caderno de respostas:
   ela acompanha desempenho, não o que a pessoa respondeu em cada questão.
   "acertos" conta questão cuja ÚLTIMA tentativa foi certa, igual ao painel do aluno;
   "respondidas" conta todas as tentativas, inclusive as repetidas. */
function resumo(){
  const resp=ST.resp||{}, porArea={};
  let tentativas=0, unicas=0, acertos=0;
  Object.keys(resp).forEach(ch=>{
    const h=((resp[ch]||{}).hist)||[]; if(!h.length)return;
    unicas++; tentativas+=h.length;
    const certa=!!h[h.length-1].ok; if(certa)acertos++;
    const q=(typeof QIDX!=="undefined")&&QIDX.get(ch); if(!q)return;
    const a=porArea[q.tema]||(porArea[q.tema]={n:0,ok:0}); a.n++; if(certa)a.ok++;
  });
  const dias=Object.keys(ST.atividade||{}).sort();
  const corte=new Date(Date.now()-7*864e5).toISOString().slice(0,10);
  const ultimos7=dias.filter(d=>d>corte).reduce((s,d)=>s+(+ST.atividade[d]||0),0);
  const sims=Array.isArray(ST.sim)?ST.sim:[];
  return {respondidas:tentativas, unicas, acertos,
    leituras:Object.keys(ST.lidas||{}).length, cartoes:Object.keys(ST.flash||{}).length,
    simulados:sims.length,
    notaMedia:sims.length?Math.round(sims.reduce((s,x)=>s+(+x.nota||0),0)/sims.length*100)/100:0,
    diasAtivos:dias.length, ultimos7, ultimaAtividade:dias[dias.length-1]||"",
    porArea, versao:(typeof V!=="undefined")?V:""};
}
let ultimoResumo="", coord=null;
async function publicaResumo(){
  if(!usuario||!window.MT||!MT._fb)return;
  const r=resumo(), s=JSON.stringify(r);
  if(s===ultimoResumo)return;
  try{
    const {db,F}=MT._fb;
    await F.setDoc(F.doc(db,"users",usuario.uid,"apps","clinicamed_resumo"),
      {json:s, atualizadoEm:new Date().toISOString(),
       nome:usuario.displayName||"", email:usuario.email||""},{merge:true});
    ultimoResumo=s;
  }catch(e){ console.warn("nuvem: resumo não publicado",e) }
}
/* A pessoa tem de PODER SABER que é acompanhada. A coordenação grava este doc na área
   dela quando a inclui na turma, e o app mostra isso em Ajustes. */
async function leCoord(){
  if(!usuario||!window.MT||!MT._fb){coord=null;return}
  try{ const {db,F}=MT._fb;
    const s=await F.getDoc(F.doc(db,"users",usuario.uid,"apps","clinicamed_coord"));
    coord=s.exists()?s.data():null;
  }catch(e){ coord=null }
}

/* ---------- transporte ---------- */
function pacote(){
  const d={}; SINC.forEach(k=>{if(ST[k]!==undefined)d[k]=ST[k]});
  const c={},l={}; MAPAS.forEach(k=>{if(CAR[k])c[k]=CAR[k];if(LAP[k])l[k]=LAP[k]});
  return {v:1,ap:"clinicamed",t:Date.now(),d,c,l};
}
async function envia(){
  if(!usuario||!window.MT)return;
  const p=pacote(), s=JSON.stringify(p);
  const corpo=estavel({...p,t:0});                 /* o carimbo t muda sempre; fora da comparação */
  if(corpo===ultimoEnv)return;
  if(s.length>TETO_DURO){UI.banner("erro",`Seu progresso passou de ${Math.round(s.length/1024)} KB e não cabe mais num registro da nuvem. Exporte o backup em Ajustes — a gravação local segue normal.`,true);return}
  if(s.length>TETO_AVISO&&!avisouTeto){avisouTeto=true;
    UI.banner("avi",`O progresso já ocupa ${Math.round(s.length/1024)} KB dos 1000 KB que cabem na nuvem.`)}
  try{ await MT.save(p); ultimoEnv=corpo; ultimoSync=new Date(); pintaChip(); publicaResumo() }
  catch(e){ console.warn("nuvem: falha ao enviar",e); pintaChip("erro") }
}
function agenda(){ if(!usuario)return; clearTimeout(pend); pend=setTimeout(envia,2500) }

/* ---------- chip do cabeçalho ---------- */
function pintaChip(estado){
  const b=document.getElementById("btConta"); if(!b)return;
  if(modo!=="nuvem"){b.hidden=true;return}
  b.hidden=false;
  if(usuario){
    const nome=(usuario.displayName||usuario.email||"conta").split(/[ @]/)[0];
    b.textContent=(estado==="erro"?"⚠ ":"● ")+nome;
    b.title=estado==="erro"?"Falha ao sincronizar — toque para ver":"Sincronizado com sua conta MedTech";
    b.classList.add("logado");
  } else { b.textContent="Entrar"; b.title="Entrar na conta MedTech e sincronizar entre aparelhos"; b.classList.remove("logado") }
}
function abreLogin(){
  if(!window.MT)return;
  if(!document.getElementById("mt-auth")&&window.__mtMountAuth)window.__mtMountAuth();
  const card=document.querySelector("#mt-auth .mt-card");
  if(card&&!card.querySelector(".mt-fecha")){
    const x=document.createElement("button"); x.className="mt-fecha"; x.type="button";
    x.textContent="Continuar sem entrar";
    x.onclick=()=>document.body.classList.remove("quer-login");
    card.appendChild(x);
  }
  document.body.classList.add("quer-login");
}

/* ---------- boot ---------- */
/* O _mtauth.js é <script type="module">, e módulo é diferido: roda DEPOIS de todo script
   clássico da página, inclusive do boot. Por isso esperamos o window.MT aparecer em vez de
   testá-lo uma vez só. Se ele nunca chegar (raiz do site fora do ar, primeira visita offline),
   o app continua inteiro em modo local. */
function esperaMT(ms){return new Promise(res=>{const t0=Date.now();
  (function tenta(){ if(window.MT)return res(window.MT);
    if(Date.now()-t0>ms)return res(null); setTimeout(tenta,60) })()})}

/* síncrono, chamado logo depois do carregaEstado(): o retrato precisa existir ANTES da
   primeira gravação, senão o primeiro salva() dataria o estado inteiro como novidade. */
function init(){
  CAR=leMeta(PREF+"car"); LAP=leMeta(PREF+"lap"); FOTO={};
  SINC.forEach(k=>{if(ST[k]!==undefined)FOTO[k]=clona(ST[k])});
}
async function boot(){
  init();
  await esperaMT(8000);
  if(!window.MT||window.MT.mode!=="cloud"){modo="local";pintaChip();return}
  try{ await MT.ready }catch(e){ modo="local";pintaChip();return }
  if(!MT._fb){modo="local";pintaChip();return}
  modo="nuvem";
  const {A,auth}=MT._fb;
  A.onAuthStateChanged(auth,u=>{
    usuario=u||null;
    if(u){ document.body.classList.remove("quer-login");
      leCoord().then(()=>{if(typeof pintaAjustes==="function"&&(ST.cfg||{}).aba==="ajustes")pintaAjustes()});
      if(typeof TURMA!=="undefined")TURMA.boot(); }
    else { ultimoEnv="";ultimoResumo="";ultimoSync=null;coord=null;
      if(typeof TURMA!=="undefined")TURMA.esconde(); }
    pintaChip();
    if(typeof pintaAjustes==="function"&&ST.cfg.aba==="ajustes")pintaAjustes();
  });
  MT.onData(rem=>{
    if(!usuario)return;
    const mudou=mescla(rem);
    ultimoSync=new Date();
    if(mudou&&typeof repinta==="function")repinta();
    envia();                       /* devolve o que o outro lado ainda não tem */
    pintaChip();
  });
  addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){clearTimeout(pend);envia()}});
  pintaChip();
}

/* mescla/pacote saem expostos de propósito: é por eles que a sincronização é testada fora do
   navegador (scratchpad/teste_merge.js) e inspecionada no console quando algo não bate. */
return {init,boot,carimba,agenda,abreLogin,mescla,pacote,
  get modo(){return modo}, get usuario(){return usuario},
  get ultimoSync(){return ultimoSync}, get coord(){return coord}, resumo,
  sair(){ if(window.MT&&MT.signOut)MT.signOut() },
  entrar:abreLogin};
})();
