/* ClínicaMed — service worker.
   BUMPAR a constante CACHE a CADA deploy (cm-v1, cm-v2, …). Sem isso o app fica preso na
   versão velha e a correção vira fantasma.
   Estáticos usam stale-while-revalidate: bump de versão não basta quando a borda do CDN
   devolve conteúdo velho para o precache. HTML é network-first. */
const CACHE="cm-v42", FONTES="cm-fontes-v1";
const PRE=["./","./index.html","./taxonomia.js?v=42","./provas.js?v=42","./banco.js?v=42","./flash.js?v=42",
           "./pratica.js?v=42","./leituras.js?v=42","./nuvem.js?v=42","./manifest.webmanifest",
           "./leituras/_leitura.css?v=42","./leituras/_leitura.js?v=42"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(PRE.map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE&&k!==FONTES).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET")return;
  const url=new URL(req.url);
  /* SÓ fontes e os módulos versionados do Firebase entram no cache-first. O teste antigo era
     hostname.endsWith("googleapis.com"), que engolia firestore.googleapis.com — o canal de
     escuta do Firestore usa GET, e servir isso da cache trava a sincronização em silêncio. */
  if(url.hostname==="fonts.googleapis.com"||url.hostname==="fonts.gstatic.com"||
     (url.hostname==="www.gstatic.com"&&url.pathname.startsWith("/firebasejs/"))){
    e.respondWith(caches.open(FONTES).then(async c=>{
      const hit=await c.match(req); if(hit)return hit;
      try{const r=await fetch(req);if(r.ok)c.put(req,r.clone());return r}catch(err){return hit||Response.error()}
    })); return;
  }
  if(url.origin!==location.origin)return;
  if(req.mode==="navigate"||req.destination==="document"){
    e.respondWith(fetch(req).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(req);
    const rede=fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r}).catch(()=>null);
    return hit||(await rede)||Response.error();
  }));
});
