/* Tema da leitura: vem por ?tema= na abertura e por postMessage quando o app troca com a leitura aberta. */
(function(){
  function aplica(t){ if(t==="escuro"||t==="claro")document.documentElement.setAttribute("data-tema",t) }
  var p=new URLSearchParams(location.search); aplica(p.get("tema"));
  addEventListener("message",function(e){ if(e.data&&e.data.cm==="tema")aplica(e.data.tema) });
})();
