/* Comportamentos compartilhados das leituras.
   - tema: vem por ?tema= na abertura e por postMessage quando o app troca com a leitura aberta;
   - progresso: avisa o app (iframe pai) até onde a pessoa rolou, para o "continuar lendo" e
     para marcar como lida sozinha ao chegar ao fim;
   - fluxogramas: carrega o mermaid só se a página tiver algum, com as cores do tema; offline
     sem cache, o texto do diagrama continua legível (é isso que o <pre> mostra). */
(function(){
  function aplica(t){ if(t==="escuro"||t==="claro")document.documentElement.setAttribute("data-tema",t) }
  var p=new URLSearchParams(location.search); aplica(p.get("tema"));
  /* Embutida no app, o sumário vive na coluna lateral — mantê-lo aqui repetiria meia tela de
     links na abertura, que era o que empurrava o texto para baixo. Fora do app (leitura aberta
     direto pelo endereço) ele continua no lugar. */
  /* `embutida=1` só marca que estamos dentro do app; quem manda esconder o sumário é a mensagem
     `sumario`, porque depende da largura da janela do app, não da nossa. */
  if(p.get("embutida")==="1") document.documentElement.classList.add("noApp");
  addEventListener("message",function(e){
    if(!e.data)return;
    if(e.data.cm==="tema"){aplica(e.data.tema);desenha(true)}
    if(e.data.cm==="ir"){ var el=document.getElementById(e.data.id);
      /* salto direto: com 14 mil pixels de texto, a rolagem suave leva segundos e qualquer
         toque no meio do caminho a cancela — o sumário deixaria de funcionar sem avisar. */
      if(el)el.scrollIntoView({behavior:"auto",block:"start"}) }
    if(e.data.cm==="sumario"){ document.documentElement.classList.toggle("embutida", !!e.data.lateral) }
  });

  var arq=location.pathname.split("/").pop();
  /* Só há progresso se a página for maior que a janela. No instante do load, antes de fonte
     e layout assentarem, scrollHeight pode ser igual a clientHeight — reportar 100% aí marcaria
     toda leitura como lida ao abrir. Por isso: max pequeno devolve 0, e o primeiro aviso só
     sai com rolagem de verdade, nunca no load. */
  function pct(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
    return max<200?0:Math.round(100*h.scrollTop/max)}
  var barra,ultimo=-1,tm;
  function progresso(){
    if(!barra){barra=document.createElement("div");barra.id="barraLeitura";document.body.appendChild(barra)}
    var v=pct(); barra.style.width=v+"%";
    if(v===ultimo)return; ultimo=v;
    clearTimeout(tm); tm=setTimeout(function(){
      try{ if(parent&&parent!==window)parent.postMessage({cm:"prog",f:arq,pct:v},"*") }catch(e){}
    },400);
  }
  /* diz ao app qual capítulo está na tela, para o sumário lateral acompanhar a leitura */
  var secAtual=null;
  function secaoVisivel(){
    var hs=document.querySelectorAll("h2[id],h3[id]"), achou=null;
    for(var i=0;i<hs.length;i++){ if(hs[i].getBoundingClientRect().top<=140) achou=hs[i].id; else break }
    if(achou&&achou!==secAtual){ secAtual=achou;
      try{ if(parent&&parent!==window)parent.postMessage({cm:"sec",f:arq,id:achou},"*") }catch(e){} }
  }
  addEventListener("scroll",function(){progresso();secaoVisivel()},{passive:true});
  addEventListener("load",function(){
    /* link copiável em cada seção */
    document.querySelectorAll("h2[id]").forEach(function(h){
      var a=document.createElement("a");a.className="lnk";a.href="#"+h.id;a.title="copiar link desta seção";a.textContent="#";
      a.onclick=function(ev){ev.preventDefault();history.replaceState(null,"","#"+h.id);
        try{navigator.clipboard.writeText(location.href)}catch(e){}};
      h.appendChild(a);
    });
    if(location.hash){var el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el)el.scrollIntoView()}
  });

  /* ---- mermaid ---- */
  var carregando=false, pronto=false;
  function escuro(){return document.documentElement.getAttribute("data-tema")==="escuro"||
    (document.documentElement.getAttribute("data-tema")!=="claro"&&matchMedia("(prefers-color-scheme:dark)").matches)}
  function tema(){var d=escuro();return {theme:"base",themeVariables:{
    fontFamily:"Figtree,system-ui,sans-serif",fontSize:"14px",
    primaryColor:d?"#14292B":"#E3F1F1",primaryTextColor:d?"#E9EBEE":"#23272E",primaryBorderColor:d?"#4FB8BD":"#0B6A72",
    lineColor:d?"#A3A9B2":"#5E646B",secondaryColor:d?"#23272E":"#F1F1EC",tertiaryColor:d?"#1B1E23":"#FFFFFF",
    background:d?"#1B1E23":"#FFFFFF",mainBkg:d?"#14292B":"#E3F1F1",nodeBorder:d?"#4FB8BD":"#0B6A72",
    clusterBkg:d?"#1B1E23":"#FAFAF8",clusterBorder:d?"#363C44":"#DDDDD5",edgeLabelBackground:d?"#1B1E23":"#FFFFFF",
    titleColor:d?"#E9EBEE":"#23272E"}}}
  var fontes={};   /* texto original de cada diagrama, para redesenhar ao trocar o tema */
  function desenha(redesenhar){
    var pres=document.querySelectorAll("pre.mermaid"); if(!pres.length)return;
    if(!window.mermaid){
      if(carregando)return; carregando=true;
      var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
      s.onload=function(){pronto=true;desenha()};
      s.onerror=function(){pres.forEach(function(p){var n=document.createElement("div");n.className="off";
        n.textContent="Fluxograma em texto: sem conexão para desenhar agora.";p.parentNode.insertBefore(n,p)})};
      document.head.appendChild(s); return;
    }
    pres.forEach(function(p,i){ if(!fontes[i])fontes[i]=p.textContent; if(redesenhar){p.removeAttribute("data-processed");p.innerHTML="";p.textContent=fontes[i]} });
    mermaid.initialize(Object.assign({startOnLoad:false,securityLevel:"strict",flowchart:{curve:"basis",htmlLabels:true,padding:8}},tema()));
    mermaid.run({nodes:pres}).catch(function(e){console.warn("mermaid",e)});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){desenha()});else desenha();
})();
