/* ================================================================
   ClínicaMed — conta MedTech e sincronização (versão de 25/09/2026).

   Todo o trabalho pesado está no mtsync.js (cópia de ~/Documents/Claude/_mtsync/, testado
   por `node _mtsync/teste.js`): portão de login, um documento por item na nuvem, fila
   offline do próprio Firestore e recebimento em tempo real. Aqui ficam só as coisas do
   ClínicaMed:
     - quais chaves sincronizam e de que tipo são;
     - o resumo que a coordenação lê (users/{uid}/apps/clinicamed_resumo);
     - a migração, uma vez por conta, do formato antigo (um pacote só em apps/clinicamed);
     - o chip do cabeçalho e o bloco "Conta" de Ajustes.

   Pedido do Matheus (25/09): o app só abre logado, a sincronização é automática e o
   cliente nunca precisa fazer backup. Por isso não há mais exportar/importar/restaurar.

   NÃO sincronizam (são a tela deste aparelho): cfg (aba, tema, filtros), pos, simativo.
   erros é derivado de resp: é recalculado quando chegam respostas de outro aparelho.
   ================================================================ */
const NUVEM=(function(){

const COLECOES={
  resp:{tipo:"hist",teto:60},
  fav:{tipo:"mapa"}, flash:{tipo:"mapa"}, treino:{tipo:"mapa"}, lidas:{tipo:"mapa"}, prog:{tipo:"mapa"},
  atividade:{tipo:"soma"},
  sim:{tipo:"lista",id:"quando",ordena:(a,b)=>String(a.quando).localeCompare(String(b.quando))},
  contest:{tipo:"lista",id:"quando",teto:60,ordena:(a,b)=>String(b.quando).localeCompare(String(a.quando))}
};

let coord=null, ultimoResumo="", resumoT=null;

/* ---------- erros derivados de resp (mesma regra do registraResposta) ---------- */
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

/* ---------- resumo para a coordenação ----------------------------------
   Calculado no aparelho (só aqui a chave da resposta vira área do edital) e publicado num
   doc pequeno e separado. A coordenação lê esse doc, nunca o caderno de respostas. */
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
function agendaResumo(){ clearTimeout(resumoT); resumoT=setTimeout(publicaResumo,4000) }
async function publicaResumo(){
  const u=MTS.usuario; if(!u||!MTS.db)return;
  const r=resumo(), s=JSON.stringify(r);
  if(s===ultimoResumo)return;
  try{
    await MTS.db.collection("users").doc(u.uid).collection("apps").doc("clinicamed_resumo")
      .set({json:s, atualizadoEm:new Date().toISOString(), nome:u.displayName||"", email:u.email||""},{merge:true});
    ultimoResumo=s;
  }catch(e){ console.warn("nuvem: resumo não publicado",e) }
}
/* A pessoa tem de PODER SABER que é acompanhada: a coordenação grava este doc na área dela. */
async function leCoord(){
  const u=MTS.usuario; if(!u||!MTS.db){coord=null;return}
  try{ const s=await MTS.db.collection("users").doc(u.uid).collection("apps").doc("clinicamed_coord").get();
    coord=s.exists?s.data():null;
  }catch(e){ coord=null }
}

/* ---------- migração do formato antigo (uma vez por conta) ----------
   Até 24/09 a nuvem guardava tudo num pacote só: users/{uid}/apps/clinicamed = {json}.
   Um aparelho que nunca abriu a versão nova ainda pode ter progresso só lá. Mescla aqui:
   histórico unido, o resto pelo carimbo antigo, listas unidas pelo "quando". */
async function legado(ctx){
  const ref=ctx.db.collection("users").doc(ctx.uid).collection("apps").doc("clinicamed");
  const snap=await Promise.race([ref.get({source:"server"}),new Promise((_,f)=>setTimeout(()=>f(new Error("tempo")),9000))]);
  if(!snap.exists)return true;
  let rem; try{rem=JSON.parse(snap.data().json||"null")}catch(e){return true}
  if(!rem||rem.ap!=="clinicamed")return true;
  const rd=rem.d||{}, rc=rem.c||{}, rl=rem.l||{};
  let cl={},ll={}; try{cl=JSON.parse(localStorage.getItem(PREF+"car"))||{};ll=JSON.parse(localStorage.getItem(PREF+"lap"))||{}}catch(e){}
  const N=MTS.NUCLEO;
  ["resp","fav","flash","treino","lidas","prog"].forEach(k=>{
    const loc=ST[k]||{}, rv=rd[k]; if(!rv||typeof rv!=="object")return;
    const out={...loc}, car=cl[k]||{}, cr=rc[k]||{}, lapL=ll[k]||{}, lapR=rl[k]||{};
    Object.keys(rv).forEach(ch=>{
      const tl=(ch in loc)?(car[ch]||1):0, tr=cr[ch]||1, lap=Math.max(lapL[ch]||0,lapR[ch]||0);
      if(lap>Math.max(tl,tr))return;
      if(k==="resp"){const h=N.uneEntradas(((loc[ch]||{}).hist)||[],((rv[ch]||{}).hist)||[],0,60);
        if(h.length)out[ch]={...(loc[ch]||{}),...(rv[ch]||{}),hist:h}; return}
      if(!(ch in loc)||tr>tl)out[ch]=rv[ch];
    });
    if(N.estavel(out)!==N.estavel(loc)){ST[k]=out;ARM.save(PREF+k,out)}
  });
  /* atividade só entra se o motor ainda não começou: depois disso a contagem é por aparelho */
  if(!ctx.depois&&rd.atividade&&typeof rd.atividade==="object"){
    const out={...(ST.atividade||{})};
    Object.keys(rd.atividade).forEach(d=>{const n=+rd.atividade[d]||0;if(n>(out[d]||0))out[d]=n});
    ST.atividade=out;ARM.save(PREF+"atividade",out);
  }
  [["sim",false],["contest",true]].forEach(([k,desc])=>{
    const loc=Array.isArray(ST[k])?ST[k]:[], rv=Array.isArray(rd[k])?rd[k]:[]; if(!rv.length)return;
    const vis=new Set(),out=[];
    loc.concat(rv).forEach(it=>{const id=it&&it.quando;if(!id||vis.has(id))return;vis.add(id);out.push(it)});
    out.sort((a,b)=>String(a.quando).localeCompare(String(b.quando))); if(desc){out.reverse();out.splice(60)}
    ST[k]=out;ARM.save(PREF+k,out);
  });
  const er=derivaErros(ST.resp); ST.erros=er; ARM.save(PREF+"erros",er);
  return true;
}

/* ---------- apagar o que é da conta que saiu ---------- */
async function limparLocal(){
  try{Object.keys(localStorage).filter(k=>k.startsWith(PREF)&&k!==PREF+"tema").forEach(k=>localStorage.removeItem(k))}catch(e){}
  try{Object.keys(localStorage).filter(k=>k.startsWith("mt_clinicamed")).forEach(k=>localStorage.removeItem(k))}catch(e){}
  try{if(ARM.db)ARM.db.close()}catch(e){}
  await new Promise(r=>{try{const q=indexedDB.deleteDatabase("cm-db");q.onsuccess=q.onerror=q.onblocked=()=>r()}catch(e){r()}});
}

/* ---------- chegou algo de outro aparelho ---------- */
function aoReceber(cols){
  if(cols.includes("resp")){const er=derivaErros(ST.resp);ST.erros=er;ARM.save(PREF+"erros",er)}
  /* repinta só telas de consulta: redesenhar a questão aberta tiraria a pessoa do lugar */
  const aba=(ST.cfg||{}).aba;
  if(["inicio","painel","ajustes","leituras","cartoes"].includes(aba)&&typeof PINTA!=="undefined"&&PINTA[aba])PINTA[aba]();
  agendaResumo();
}

/* ---------- chip do cabeçalho ---------- */
function pintaChip(){
  const b=document.getElementById("btConta"); if(!b)return;
  const u=MTS.usuario; if(!u){b.hidden=true;return}
  b.hidden=false; b.classList.add("logado");
  const s=MTS._sit, d=MTS.descreve(s);
  const ico=d.cl==="erro"?"cloud-exclamation":d.cl==="pend"?(s.online?"cloud-upload":"cloud-off"):"cloud-check";
  const nome=(u.displayName||u.email||"conta").split(/[ @]/)[0];
  b.innerHTML=`<i class="ti ti-${ico}" aria-hidden="true"></i><span>${nome.replace(/[<>&]/g,"")}</span>`;
  b.title=d.txt;
  const m=document.getElementById("btLinha"); if(m)m.hidden=true;
}

function contaMarkup(){
  const u=MTS.usuario; if(!u)return `<p class="mini">Abrindo sua conta…</p>`;
  const d=MTS.descreve();
  const cor=d.cl==="erro"?"var(--erro,#b42318)":d.cl==="pend"?"var(--ink2)":"var(--brandInk)";
  return `<p class="mini">Conectado como <b>${esc(u.displayName||u.email||"")}</b>${u.displayName&&u.email?` (${esc(u.email)})`:""}.</p>
   <p class="mini" id="ctSit" style="margin-top:6px;color:${cor}">${esc(d.txt)}</p>
   <p class="mini" style="margin-top:6px">Tudo o que você faz é salvo sozinho na sua conta enquanto estuda, e aparece igual no celular e no computador. Sem internet, o app continua funcionando e envia depois.</p>
   ${coord?`<p class="mini" style="margin-top:6px;padding:8px 10px;background:var(--aviSup);border-radius:8px">
     <b>A coordenação acompanha seu desempenho neste app.</b> ${esc(coord.coordenador||"")}
     ${coord.turma?`incluiu você na turma ${esc(coord.turma)}`:"incluiu você na turma"} e vê o resumo do seu estudo:
     quantas questões você fez, o acerto por área, leituras concluídas, simulados e há quanto tempo você não entra.
     O que você respondeu em cada questão <b>não</b> aparece para ninguém.</p>`:""}
   <div class="linha" style="margin-top:10px"><button class="bt sec" id="btSair">Sair da conta</button>
    <a class="bt sec" href="/provas.html">MedTech Provas</a></div>`;
}

/* ---------- boot ---------- */
function boot(){
  MTS.aoMudarSituacao(s=>{
    pintaChip();
    const el=document.getElementById("ctSit"); if(el){const d=MTS.descreve(s);el.textContent=d.txt}
    if(!s.pendentes&&!s.enviando)agendaResumo();
  });
  MTS.iniciar({
    app:"clinicamed", nome:"ClínicaMed", pref:PREF, vendor:"vendor/",
    cores:(()=>{const c=getComputedStyle(document.documentElement);const g=k=>c.getPropertyValue(k).trim();
      return {cor:g("--brand")||"#0B6A72",sobrecor:g("--brandTxt")||"#fff",fundo:g("--papel")||"#fff",texto:g("--ink")||"#1d2433",suave:g("--ink2")||"#5b6475",borda:g("--linhaF")||"#d5d9e0",campo:g("--papel")||"#fff"}})(),
    colecoes:COLECOES,
    ler:c=>ST[c],
    gravar:(c,v)=>{ST[c]=v;ARM.save(PREF+c,v)},
    aoReceber,
    legado,
    limparLocal,
    /* primeiro contato da versão nova num aparelho que tinha outra conta aberta (a chave
       mt_clinicamed_<uid> do login antigo diz de quem era): não herda o progresso alheio */
    aoEntrar(u){
      leCoord().then(()=>{if((ST.cfg||{}).aba==="ajustes")pintaAjustes()});
      if(typeof TURMA!=="undefined")TURMA.boot();
      pintaChip();
      if((ST.cfg||{}).aba==="ajustes")pintaAjustes();
    }
  });
}
/* conta que era de outra pessoa no login antigo: resolve antes do MTS decidir */
(function(){try{
  if(localStorage.getItem(PREF+"mts_uid"))return;
  const antigos=Object.keys(localStorage).filter(k=>/^mt_clinicamed_.+/.test(k)).map(k=>k.slice("mt_clinicamed_".length));
  if(antigos.length===1)localStorage.setItem(PREF+"mts_uid",antigos[0]);
}catch(e){}})();

return {boot, mudou:k=>{if(COLECOES[k])MTS.mudou(k)}, resumo, pintaChip, contaMarkup,
  get usuario(){return MTS.usuario}, get coord(){return coord},
  sair(){MTS.sair()}};
})();
