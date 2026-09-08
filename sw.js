/* ClínicaMed — service worker.
   BUMPAR a constante CACHE a CADA deploy (cm-v1, cm-v2, …). Sem isso o app fica preso na
   versão velha e a correção vira fantasma.
   Estáticos usam stale-while-revalidate: bump de versão não basta quando a borda do CDN
   devolve conteúdo velho para o precache. HTML é network-first. */
const CACHE="cm-v57", FONTES="cm-fontes-v1", LIVROS="cm-livros-v1";
const PRE=["./","./index.html","./taxonomia.js?v=57","./provas.js?v=57","./banco.js?v=57","./flash.js?v=57",
           "./pratica.js?v=57","./leituras.js?v=57","./nuvem.js?v=57","./turma.js?v=57","./indice-leituras.js?v=57","./manifest.webmanifest",
           "./leituras/_leitura.css?v=57","./leituras/_leitura.js?v=57"];
/* As figuras (leituras/fig/*.svg) NÃO entram no precache — são 41 arquivos e 291 KB, e nem toda
   leitura usa todas. Elas caem no cache pela regra geral de estáticos (stale-while-revalidate)
   na primeira vez que a leitura abre online, e a partir daí funcionam offline. */
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(PRE.map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE&&k!==FONTES&&k!==LIVROS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET")return;
  const url=new URL(req.url);
  /* SÓ fontes e os módulos versionados do Firebase entram no cache-first. O teste antigo era
     hostname.endsWith("googleapis.com"), que engolia firestore.googleapis.com — o canal de
     escuta do Firestore usa GET, e servir isso da cache trava a sincronização em silêncio. */
  /* cdn.jsdelivr.net (ícones Tabler, mermaid) fica no balde de fontes, que sobrevive ao bump de
     versão, mas em stale-while-revalidate: o caminho tem versão maior (@3, @11) e pode andar. */
  if(url.hostname==="cdn.jsdelivr.net"){
    e.respondWith(caches.open(FONTES).then(async c=>{
      const hit=await c.match(req);
      const rede=fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r}).catch(()=>null);
      return hit||(await rede)||Response.error();
    })); return;
  }
  if(url.hostname==="fonts.googleapis.com"||url.hostname==="fonts.gstatic.com"||
     (url.hostname==="www.gstatic.com"&&url.pathname.startsWith("/firebasejs/"))){
    e.respondWith(caches.open(FONTES).then(async c=>{
      const hit=await c.match(req); if(hit)return hit;
      try{const r=await fetch(req);if(r.ok)c.put(req,r.clone());return r}catch(err){return hit||Response.error()}
    })); return;
  }
  if(url.origin!==location.origin)return;
  /* HTML é network-first, mas AGORA GUARDA o que baixou. Antes não guardava: o app abria offline
     e as 97 leituras não — a leitura caía no fallback e servia o index.html DENTRO do iframe, que
     é o app inteiro dentro da leitura. O fallback usa caches.match global de propósito, para achar
     também o que o botão "guardar no aparelho" pôs no balde LIVROS. */
  if(req.mode==="navigate"||req.destination==="document"){
    const leitura=url.pathname.includes("/leituras/");
    e.respondWith(
      fetch(req).then(r=>{
        if(r.ok&&r.type==="basic")caches.open(leitura?LIVROS:CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
        return r;
      }).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html"))));
    return;
  }
  /* As figuras vão para o balde da biblioteca, que sobrevive ao bump — um ECG não muda de deploy
     para deploy, e re-baixar 291 KB de SVG a cada versão é desperdício em rede de hospital. */
  const balde=url.pathname.includes("/leituras/fig/")?LIVROS:CACHE;
  e.respondWith(caches.open(balde).then(async c=>{
    const hit=await c.match(req);
    const rede=fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r}).catch(()=>null);
    return hit||(await rede)||(await caches.match(req))||Response.error();
  }));
});
