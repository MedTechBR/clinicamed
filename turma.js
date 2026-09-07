/* ================================================================
   ClínicaMed — aba Turma (só para a coordenação).

   Nada aqui confia no navegador: a aba só aparece se a função
   `clinicamed` (backend medtech-c658c) responder que este e-mail é da
   coordenação, e TODA operação é conferida de novo lá. Esconder o botão
   é conveniência de tela, não permissão.

   Por que passa por função e não direto pelo Firestore: as regras só
   deixam cada conta ler a própria área — e devem continuar assim. A
   função roda com a conta de serviço, confere quem chamou e devolve só
   o RESUMO de cada aluno. O caderno de respostas de ninguém sai de lá.
   ================================================================ */
const TURMA=(function(){
let ehChefe=false, dados=null, carregando=false, erro="", Fn=null, so="";

async function chamar(op,extra){
  if(!window.MT||!MT._fb)throw new Error("Conta MedTech indisponível.");
  if(!Fn)Fn=await import("https://www.gstatic.com/firebasejs/10.13.2/firebase-functions.js");
  const f=Fn.getFunctions(MT._fb.app,"southamerica-east1");
  const r=await Fn.httpsCallable(f,"clinicamed")({op,...(extra||{})});
  return r.data;
}
function botao(){return document.querySelector('#abas button[data-aba="turma"]')}
function mostra(v){const b=botao(); if(b)b.hidden=!v}

async function boot(){
  try{ const r=await chamar("quemSou"); ehChefe=!!r.chefe }
  catch(e){ ehChefe=false }
  mostra(ehChefe);
  if(ehChefe&&(ST.cfg||{}).aba==="turma")carrega();
}
function esconde(){ehChefe=false;dados=null;mostra(false);
  if((ST.cfg||{}).aba==="turma")irAba("questoes")}

async function carrega(){
  carregando=true;erro="";pintaTurma();
  try{ dados=await chamar("listaAlunos") }
  catch(e){ erro=e.message||String(e) }
  carregando=false;pintaTurma();
}

/* senha provisória sorteada de verdade (crypto), não de Math.random: ela é a
   credencial inicial da pessoa até a primeira troca */
function senhaSorteada(){
  const abc="abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b=new Uint32Array(10);crypto.getRandomValues(b);
  return Array.from(b,n=>abc[n%abc.length]).join("");
}
const pct=(ok,n)=>n?Math.round(100*ok/n)+"%":"—";
function diasAtras(d){ if(!d)return "nunca";
  const dif=Math.round((Date.now()-new Date(d+"T12:00:00").getTime())/864e5);
  return dif<=0?"hoje":dif===1?"ontem":dif+" dias";}

function pintaTurma(){
  const sec=$("#sec-turma");
  if(!ehChefe){sec.innerHTML=`<div class="cx"><p class="mini">Esta aba é da coordenação da turma.</p></div>`;return}
  const alunos=((dados||{}).alunos||[]).slice().sort((a,b)=>
    (a.turma||"").localeCompare(b.turma||"")||(a.nome||a.email).localeCompare(b.nome||b.email));
  const vis=so?alunos.filter(a=>(a.turma||"")===so):alunos;
  const turmas=[...new Set(alunos.map(a=>a.turma||"").filter(Boolean))].sort();
  const comResumo=vis.filter(a=>a.resumo);
  const somaQ=comResumo.reduce((s,a)=>s+a.resumo.unicas,0);
  const somaOk=comResumo.reduce((s,a)=>s+a.resumo.acertos,0);
  const ativos=comResumo.filter(a=>a.resumo.ultimos7>0).length;

  sec.innerHTML=`
  <div class="cx">
   <h3 style="margin:0 0 8px">Turma</h3>
   <p class="mini">Cada pessoa da turma entra no ClínicaMed com a conta MedTech dela e o progresso acompanha o aparelho.
    Aqui você vê o <b>resumo</b> de desempenho e de uso — não as respostas questão a questão.
    Quem você cadastra passa a ver, nos Ajustes do app, que a coordenação acompanha o desempenho.</p>
   ${alunos.length?`<div class="linha" style="margin-top:10px">
     <div class="kpi"><b>${alunos.length}</b><span>na turma</span></div>
     <div class="kpi"><b>${ativos}</b><span>ativos nos últimos 7 dias</span></div>
     <div class="kpi"><b>${somaQ}</b><span>questões distintas feitas</span></div>
     <div class="kpi"><b>${pct(somaOk,somaQ)}</b><span>acerto da turma</span></div>
    </div>`:""}
   ${turmas.length>1?`<div class="linha" style="margin-top:10px">
     <button class="bt ${so?"sec":""} mini" data-so="">todas</button>
     ${turmas.map(t=>`<button class="bt ${so===t?"":"sec"} mini" data-so="${esc(t)}">${esc(t)}</button>`).join("")}
    </div>`:""}
   <div class="linha" style="margin-top:10px">
    <button class="bt sec mini" id="btRec">${carregando?"carregando…":"atualizar"}</button>
    <button class="bt sec mini" id="btCsv">exportar CSV</button>
   </div>
   ${erro?`<p class="mini" style="color:var(--err);margin-top:8px">${esc(erro)}</p>`:""}
  </div>

  <div class="cx">
   <h3 style="margin:0 0 8px">Cadastrar</h3>
   <p class="mini">Cria a conta MedTech já com uma senha provisória e coloca a pessoa na sua turma.
    Se o e-mail já tiver conta no ecossistema, a conta é aproveitada (nada dela é apagado) e só entra na turma.</p>
   <div class="linha" style="margin-top:10px;flex-wrap:wrap">
    <input id="nNome" placeholder="nome" style="flex:1 1 160px">
    <input id="nEmail" placeholder="e-mail" type="email" style="flex:1 1 200px">
    <input id="nTurma" placeholder="turma (ex.: R1)" style="flex:0 1 120px" value="${esc(so)}">
    <input id="nSenha" placeholder="senha provisória" style="flex:0 1 150px">
    <button class="bt sec mini" id="btSorteia">sortear senha</button>
    <button class="bt" id="btCria">Cadastrar</button>
   </div>
   <p class="mini" id="msgCria" style="margin-top:8px"></p>
  </div>

  <div class="cx">
   <h3 style="margin:0 0 8px">Desempenho</h3>
   ${!vis.length?`<p class="mini">Ninguém cadastrado ainda.</p>`:`
   <div class="rolagem"><table class="rec">
    <tr><th>Pessoa</th><th>Turma</th><th>Questões</th><th>Acerto</th><th>Leituras</th>
        <th>Simulados</th><th>7 dias</th><th>Último acesso</th><th></th></tr>
    ${vis.map(a=>{const r=a.resumo;
      return `<tr>
       <td><b>${esc(a.nome||a.email)}</b><br><span class="mini">${esc(a.email)}</span></td>
       <td>${esc(a.turma||"—")}</td>
       <td>${r?r.unicas:"—"}${r&&r.respondidas>r.unicas?`<span class="mini"> (${r.respondidas} tent.)</span>`:""}</td>
       <td>${r?pct(r.acertos,r.unicas):"—"}</td>
       <td>${r?r.leituras:"—"}</td>
       <td>${r?(r.simulados||0)+(r.simulados?` <span class="mini">nota ${r.notaMedia}</span>`:""):"—"}</td>
       <td>${r?r.ultimos7:"—"}</td>
       <td>${r?diasAtras(r.ultimaAtividade):"nunca entrou"}</td>
       <td><button class="bt sec mini" data-det="${esc(a.uid)}">detalhe</button></td>
      </tr>`}).join("")}
   </table></div>
   <p class="mini" style="margin-top:8px">“Questões” conta questões distintas; “acerto” é a última tentativa de cada uma, o mesmo critério do painel do aluno.
    “7 dias” é o volume de atividade da última semana — é por ele que se vê quem parou.</p>`}
  </div>

  <div class="cx">
   <h3 style="margin:0 0 8px">Coordenação</h3>
   <p class="mini">Quem está nesta lista vê esta aba e administra a turma.</p>
   <div class="linha" style="margin-top:8px;flex-wrap:wrap">
    ${((dados||{}).chefes||[]).map(e=>`<span class="pilula">${esc(e)}
      <button class="bt sec mini" data-tirachefe="${esc(e)}" style="margin-left:6px">tirar</button></span>`).join("")}
   </div>
   <div class="linha" style="margin-top:10px">
    <input id="nChefe" placeholder="e-mail de quem vai coordenar" type="email" style="flex:1 1 220px">
    <button class="bt sec" id="btChefe">Adicionar</button>
   </div>
  </div>`;

  $$("[data-so]").forEach(b=>b.onclick=()=>{so=b.dataset.so;pintaTurma()});
  $("#btRec").onclick=carrega;
  $("#btCsv").onclick=()=>baixaCsv(vis);
  $("#btSorteia").onclick=()=>{$("#nSenha").value=senhaSorteada()};
  $("#btCria").onclick=cria;
  if($("#btChefe"))$("#btChefe").onclick=async()=>{
    const e=$("#nChefe").value.trim(); if(!e)return;
    if(!confirm(`Dar acesso de coordenação a ${e}? Essa pessoa passa a ver o desempenho de toda a turma.`))return;
    try{ await chamar("addChefe",{email:e}); await carrega() }catch(x){ alert(x.message||x) }};
  $$("[data-tirachefe]").forEach(b=>b.onclick=async()=>{
    if(!confirm(`Tirar ${b.dataset.tirachefe} da coordenação?`))return;
    try{ await chamar("removeChefe",{email:b.dataset.tirachefe}); await carrega() }catch(x){ alert(x.message||x) }});
  $$("[data-det]").forEach(b=>b.onclick=()=>detalhe(b.dataset.det));
}

async function cria(){
  const nome=$("#nNome").value.trim(), email=$("#nEmail").value.trim(),
        turma=$("#nTurma").value.trim(), senha=$("#nSenha").value;
  const m=$("#msgCria");
  if(!email||senha.length<6){m.style.color="var(--err)";
    m.textContent="Preencha o e-mail e uma senha provisória de pelo menos 6 caracteres.";return}
  m.style.color="";m.textContent="cadastrando…";
  try{
    const r=await chamar("criaAluno",{nome,email,turma,senha});
    m.style.color="var(--ok)";
    m.textContent=r.nova
      ? `Conta criada. Passe para ${email}: senha provisória "${senha}" — ela pode trocar depois em “Esqueci minha senha” na tela de entrada.`
      : `Essa pessoa já tinha conta MedTech; agora está na turma. A senha dela continua a mesma (a que você digitou não vale).`;
    $("#nNome").value="";$("#nEmail").value="";$("#nSenha").value="";
    await carrega();
  }catch(e){ m.style.color="var(--err)"; m.textContent=e.message||String(e) }
}

function detalhe(uid){
  const a=((dados||{}).alunos||[]).find(x=>x.uid===uid); if(!a)return;
  const r=a.resumo;
  if(!r){alert(`${a.nome||a.email} ainda não sincronizou nenhum estudo — ou nunca entrou, ou usou o app sem entrar na conta.`);return}
  const areas=Object.keys(r.porArea||{}).map(id=>{
    const t=TAX.find(x=>x.id===id);
    return {nome:t?t.nome:id, ...r.porArea[id]}}).sort((x,y)=>y.n-x.n);
  mostraDetalheInline(a,r,areas);
}
function htmlDetalhe(a,r,areas){
  return `<div class="rolagem"><table class="rec">
    <tr><th>Área</th><th>Feitas</th><th>Acerto</th></tr>
    ${areas.map(x=>`<tr><td>${esc(x.nome)}</td><td>${x.n}</td><td>${pct(x.ok,x.n)}</td></tr>`).join("")}
   </table></div>`;
}
function mostraDetalheInline(a,r,areas){
  const sec=$("#sec-turma");
  const d=document.createElement("div"); d.className="cx";
  d.innerHTML=`<h3 style="margin:0 0 8px">${esc(a.nome||a.email)}</h3>
   <p class="mini">${r.unicas} questões distintas · ${pct(r.acertos,r.unicas)} de acerto · ${r.leituras} leituras ·
    ${r.cartoes} cartões · ${r.simulados} simulados · ${r.diasAtivos} dias de estudo ·
    último acesso ${diasAtras(r.ultimaAtividade)}</p>
   ${htmlDetalhe(a,r,areas)}
   <div class="linha" style="margin-top:10px">
    <button class="bt sec mini" data-senha="${esc(a.uid)}">nova senha provisória</button>
    <button class="bt sec mini" data-tira="${esc(a.uid)}">tirar da turma</button>
    <button class="bt sec mini" data-fecha="1">fechar</button>
   </div>`;
  sec.appendChild(d); d.scrollIntoView({behavior:"smooth",block:"center"});
  d.querySelector("[data-fecha]").onclick=()=>d.remove();
  d.querySelector("[data-senha]").onclick=async()=>{
    const s=senhaSorteada();
    if(!confirm(`Trocar a senha de ${a.nome||a.email} para "${s}"? A senha antiga deixa de funcionar em todos os apps MedTech.`))return;
    try{ await chamar("novaSenha",{uid:a.uid,senha:s}); alert(`Pronto. Passe para ${a.email}: ${s}`) }
    catch(x){ alert(x.message||x) }};
  d.querySelector("[data-tira]").onclick=async()=>{
    if(!confirm(`Tirar ${a.nome||a.email} da turma? A conta MedTech e o estudo dela continuam existindo — você só deixa de acompanhar.`))return;
    try{ await chamar("removeAluno",{uid:a.uid,apagarConta:false}); d.remove(); await carrega() }
    catch(x){ alert(x.message||x) }};
}

function baixaCsv(lista){
  const cab=["nome","email","turma","questoes","tentativas","acertos","acerto_pct","leituras","cartoes","simulados","nota_media","dias_ativos","ultimos_7_dias","ultimo_acesso"];
  const linhas=lista.map(a=>{const r=a.resumo||{};
    return [a.nome,a.email,a.turma,r.unicas||0,r.respondidas||0,r.acertos||0,
      r.unicas?Math.round(100*r.acertos/r.unicas):"",r.leituras||0,r.cartoes||0,
      r.simulados||0,r.notaMedia||"",r.diasAtivos||0,r.ultimos7||0,r.ultimaAtividade||""]
      .map(c=>`"${String(c==null?"":c).replace(/"/g,'""')}"`).join(",")});
  const blob=new Blob(["﻿"+[cab.join(","),...linhas].join("\n")],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
  a.download=`clinicamed-turma-${dataISO()}.csv`;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}

/* simula() desenha o painel com dados de mentira, para conferir a tela sem mexer na
   turma de verdade. Não dá permissão nenhuma: toda operação continua passando pela
   função, que confere quem chamou. */
function simula(d){ehChefe=true;dados=d;mostra(true);irAba("turma");pintaTurma()}
return {boot,esconde,carrega,pintaTurma,simula,get chefe(){return ehChefe}};
})();
