/* ClínicaMed — service worker.
   BUMPAR a constante CACHE a CADA deploy (cm-v1, cm-v2, …). Sem isso o app fica preso na
   versão velha e a correção vira fantasma.
   Estáticos usam stale-while-revalidate: bump de versão não basta quando a borda do CDN
   devolve conteúdo velho para o precache. HTML é network-first. */
const CACHE="cm-v14", FONTES="cm-fontes-v1";
const PRE=["./","./index.html","./taxonomia.js","./provas.js","./banco.js","./flash.js",
           "./pratica.js","./leituras.js","./manifest.webmanifest",
           "./leituras/_leitura.css","./leituras/_leitura.js"];
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
  if(url.hostname.endsWith("googleapis.com")||url.hostname.endsWith("gstatic.com")){
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
