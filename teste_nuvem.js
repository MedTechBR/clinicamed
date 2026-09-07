/* Mesclagem do nuvem.js testada fora do navegador: dois "aparelhos" rodando o mesmo código,
   trocando pacotes na mão. Rode antes de todo deploy que mexer em nuvem.js:
       node teste_nuvem.js
   Ele cobre os cenários que já custaram dados em outros apps do ecossistema — exclusão que
   ressuscita, nuvem vazia que apaga o aparelho cheio, e os dois lados se reenviando para sempre. */
const fs=require("fs");
const fonte=fs.readFileSync(__dirname+"/nuvem.js","utf8");
const VAZIO={resp:{},fav:{},flash:{},treino:{},lidas:{},atividade:{},sim:[],contest:[],erros:[],cfg:{}};

function aparelho(est){
  const loja={};
  const ctx={
    PREF:"cm_", ST:JSON.parse(JSON.stringify({...VAZIO,...est})),
    UI:{banner:(t,m)=>{}},
    localStorage:{getItem:k=>loja[k]===undefined?null:loja[k],setItem:(k,v)=>{loja[k]=v}},
    document:{getElementById:()=>null,querySelector:()=>null,body:{classList:{add(){},remove(){}}}},
    addEventListener:()=>{}, setTimeout:(f)=>0, clearTimeout:()=>{}, console, window:{}
  };
  ctx.salva=(k,v)=>{ctx.ST[k]=v;return true};
  const nomes=Object.keys(ctx);
  const N=new Function(...nomes, fonte+"\nreturn NUVEM;")(...nomes.map(n=>ctx[n]));
  N.init();
  return {N,ST:ctx.ST,
    grava(k,v){ctx.ST[k]=v;N.carimba(k,v)}};
}
let falhas=0;
const ok=(n,c,x)=>{if(c)console.log("  ok   "+n);else{falhas++;console.log("FALHA  "+n+"  "+JSON.stringify(x))}};

/* 1 — respostas: o histórico UNE; nenhum aparelho perde a resposta do outro */
{
 const A=aparelho({resp:{q1:{hist:[{ts:100,ok:true}]}}});
 const B=aparelho({resp:{q1:{hist:[{ts:200,ok:false}]},q2:{hist:[{ts:300,ok:true}]}}});
 A.N.mescla(B.N.pacote());
 const h=A.ST.resp.q1.hist.map(r=>r.ts);
 ok("resp: histórico unido e ordenado", JSON.stringify(h)==="[100,200]", h);
 ok("resp: questão só do outro aparelho entra", !!A.ST.resp.q2, Object.keys(A.ST.resp));
}
/* 2 — favorita desmarcada aqui NÃO ressuscita do outro aparelho (lápide) */
{
 const A=aparelho({fav:{q1:true,q2:true}});
 const B=aparelho({fav:{q1:true,q2:true}});
 A.grava("fav",{q2:true});                       // desmarcou q1 aqui
 A.N.mescla(B.N.pacote());
 ok("fav: exclusão não ressuscita", !A.ST.fav.q1, A.ST.fav);
 ok("fav: o que ficou continua", !!A.ST.fav.q2, A.ST.fav);
}
/* 3 — favorita marcada no outro DEPOIS de eu ter desmarcado volta (o carimbo é mais novo) */
{
 const A=aparelho({fav:{q1:true}});
 const B=aparelho({fav:{q1:true}});
 A.grava("fav",{});                              // desmarcou
 const antes=Date.now(); while(Date.now()===antes);
 B.grava("fav",{});                              // o outro aparelho também desmarcou…
 B.grava("fav",{q1:true,q3:true});               // …e remarcou depois, com carimbo novo
 A.N.mescla(B.N.pacote());
 ok("fav: remarcação posterior vence a lápide", !!A.ST.fav.q1&&!!A.ST.fav.q3, A.ST.fav);
}
/* 4 — entrar na conta com o app CHEIO e a conta VAZIA não apaga nada */
{
 const A=aparelho({resp:{q1:{hist:[{ts:1,ok:true}]}},lidas:{"x.html":true},sim:[{quando:"2026-09-01T10:00"}]});
 const antes=JSON.stringify(A.ST);
 A.N.mescla({ap:"clinicamed",v:1,d:{},c:{},l:{}});
 ok("nuvem vazia não apaga o local", JSON.stringify(A.ST.resp)===JSON.stringify(JSON.parse(antes).resp)&&!!A.ST.lidas["x.html"]&&A.ST.sim.length===1, A.ST.lidas);
}
/* 5 — pacote inválido/nulo é ignorado */
{
 const A=aparelho({resp:{q1:{hist:[{ts:1,ok:true}]}}});
 ok("remoto nulo ignorado", A.N.mescla(null)===false);
 ok("remoto de outro app ignorado", A.N.mescla({ap:"outro",d:{resp:{}}})===false);
 ok("estado intacto", !!A.ST.resp.q1);
}
/* 6 — atividade: o maior por dia, nunca a soma inflada */
{
 const A=aparelho({atividade:{"2026-09-01":10,"2026-09-02":3}});
 const B=aparelho({atividade:{"2026-09-01":4,"2026-09-03":7}});
 A.N.mescla(B.N.pacote());
 ok("atividade: maior por dia", A.ST.atividade["2026-09-01"]===10&&A.ST.atividade["2026-09-02"]===3&&A.ST.atividade["2026-09-03"]===7, A.ST.atividade);
}
/* 7 — simulados e contestações: união por identidade, sem duplicar */
{
 const A=aparelho({sim:[{quando:"2026-09-01T10:00",nota:7}],contest:[{quando:"2026-09-01T11:00"}]});
 const B=aparelho({sim:[{quando:"2026-09-01T10:00",nota:7},{quando:"2026-09-02T10:00",nota:8}],contest:[{quando:"2026-09-02T11:00"}]});
 A.N.mescla(B.N.pacote());
 ok("sim: união sem duplicata", A.ST.sim.length===2, A.ST.sim.map(s=>s.quando));
 ok("contest: mais nova primeiro", A.ST.contest.length===2&&A.ST.contest[0].quando==="2026-09-02T11:00", A.ST.contest.map(c=>c.quando));
}
/* 8 — erros derivam de resp: some com 2 acertos seguidos, volta ao errar */
{
 const A=aparelho({resp:{
   q1:{hist:[{ts:1,ok:false},{ts:2,ok:true},{ts:3,ok:true}]},   // vencido
   q2:{hist:[{ts:1,ok:false},{ts:2,ok:true}]},                   // 1 acerto só
   q3:{hist:[{ts:1,ok:true},{ts:2,ok:true}]}                     // nunca errou
 },erros:["q1","q2","q3"]});
 A.N.mescla({ap:"clinicamed",v:1,d:{},c:{},l:{}});
 ok("erros: derivados de resp", JSON.stringify(A.ST.erros)===JSON.stringify(["q2"]), A.ST.erros);
}
/* 9 — cfg/pos/simativo NÃO viajam */
{
 const A=aparelho({cfg:{tema:"claro",aba:"questoes"}});
 const p=A.N.pacote();
 ok("cfg fora do pacote", !("cfg" in p.d)&&!("pos" in p.d)&&!("simativo" in p.d), Object.keys(p.d));
}
/* 10 — cartão de flashcard: vence a revisão mais recente, não a maior */
{
 const A=aparelho({flash:{c1:{n:1,ef:2.5}}});
 const B=aparelho({flash:{c1:{n:1,ef:2.5}}});
 A.grava("flash",{c1:{n:2,ef:2.6}});
 const t=Date.now(); while(Date.now()===t);
 B.grava("flash",{c1:{n:3,ef:2.2}});
 A.N.mescla(B.N.pacote());
 ok("flash: vence o carimbo mais novo", A.ST.flash.c1.n===3, A.ST.flash.c1);
}
/* 11 — ida e volta: o que A mesclou, devolvido a B, deixa os dois iguais */
{
 const A=aparelho({resp:{q1:{hist:[{ts:1,ok:true}]}},lidas:{"a.html":true}});
 const B=aparelho({resp:{q2:{hist:[{ts:2,ok:false}]}},lidas:{"b.html":true}});
 A.N.mescla(B.N.pacote());
 B.N.mescla(A.N.pacote());
 const est=o=>{if(o===null||typeof o!=="object")return JSON.stringify(o);
   if(Array.isArray(o))return "["+o.map(est).join(",")+"]";
   return "{"+Object.keys(o).sort().map(k=>JSON.stringify(k)+":"+est(o[k])).join(",")+"}"};
 ok("convergem", est(A.ST.resp)===est(B.ST.resp)&&est(A.ST.lidas)===est(B.ST.lidas),
    {a:Object.keys(A.ST.resp),b:Object.keys(B.ST.resp)});
}
console.log(falhas? "\n"+falhas+" FALHA(S)" : "\ntodos passaram");
process.exit(falhas?1:0);
