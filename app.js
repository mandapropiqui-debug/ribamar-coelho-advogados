(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const DESK=matchMedia('(min-width:1024px)').matches;
const WA='5586981433130',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const wa=l=>'https://wa.me/'+WA+'?text='+encodeURIComponent(l.join('\n'));
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ico=id=>'<svg class="i"><use href="#'+id+'"/></svg>';
try{document.documentElement.classList.add('js')}catch(e){}

/* mensagens de WhatsApp: uma linha por dado */
const NM={prev:'Previdenciário',pub:'Público',trab:'Trabalhista',banc:'Bancário'};
$$('[data-msg]').forEach(a=>{const t=a.dataset.msg;let l=['Olá, Ribamar Coelho Advogados!','Vim pelo biolink.'];
 if(t==='geral')l.push('Gostaria de falar sobre o meu caso.');
 else if(NM[t]){l.push('Área: '+NM[t],'Gostaria de uma análise do meu caso.')}
 else if(t==='socio'){l=['Olá, '+a.dataset.who+'!','Vim pelo biolink do escritório.','Gostaria de conversar sobre o meu caso.']}
 else if(t==='causa'){l.push('Assunto: '+a.dataset.c,'Gostaria de saber se o meu caso se enquadra.')}
 a.href=wa(l);if(!a.target){a.target='_blank';a.rel='noopener'}});

/* títulos palavra a palavra */
function split(el){let i=0;const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(' ');return}const s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=t;f.append(s)});c.replaceWith(f)}else if(c.nodeType===1&&!c.classList.contains('w'))walk(c)})};walk(el)}
$$('.words').forEach(split);

/* contadores em rolo (digitos) */
function reels(el,digits){el.textContent='';const rs=[];for(let k=0;k<digits;k++){const r=document.createElement('b');r.className='reel';const s=document.createElement('span');for(let d=0;d<10;d++){const i=document.createElement('i');i.textContent=d;s.append(i)}r.append(s);el.append(r);rs.push(s)}
 return v=>{const str=String(v).padStart(digits,'0');rs.forEach((s,k)=>s.style.transform='translateY('+(-Number(str[k]))+'em)')}}

/* ===== ABERTURA: PROTOCOLO (carimbo arrastavel) ===== */
const gate=$('#gate'),paper=$('#paper'),stamp=$('#stamp'),gcall=$('#gcall'),hold=$('#hold'),menu=$('#menu');
const setG=reels($('#gnum'),2);setG(0);
let done=false,entered=false,sdrag=false,moved=false,sx=0,sy=0;
/* tudo anima: auto-marca elementos da pagina */
const hw=$('#links .hero');let ht=500;
const hl=[['.hside',900],['.stage',600],['.stage .lg2',700],['h1',1500],['.sub',2150],['.chips .chip',2150],['.areas4 a',2350],['.wave',2650],['.stack .btn',2750]];
hl.forEach(([sel,t0])=>$$(sel,hw).forEach((e,i)=>{if(!e.hasAttribute('data-a')&&sel!=='.stage .lg2')e.setAttribute('data-a',sel==='.areas4 a'||sel==='.chips .chip'?'pop':'');e.dataset.t=t0+i*(sel==='.stack .btn'?100:75)}));
$$('#links .lg2 path,#links .lg2 polygon').forEach((p,i)=>p.style.setProperty('--k',i));
const heroEls=$$('#links [data-t]');
$$('.sec:not(#links) .wrap > *:not([data-a]):not(.words):not(.eyebrow), .sec:not(#links) .wrap > * > *:not([data-a]):not(.bdg):not(svg):not(.pcnt)').forEach((e,i,all)=>{if(e.closest('.map,.deck,.bdg'))return;const p=e.parentElement,k=[...p.children].indexOf(e);e.setAttribute('data-a',k%2?'':'');e.style.setProperty('--d',Math.min(k*.07,.28)+'s')});
$$('.eyebrow').forEach(e=>{if(!e.hasAttribute('data-a'))e.setAttribute('data-a','')});
function center(r){return{x:r.left+r.width/2,y:r.top+r.height/2}}
function inside(){const s=stamp.getBoundingClientRect(),p=paper.getBoundingClientRect(),c=center(s);return c.x>p.left&&c.x<p.right&&c.y>p.top&&c.y<p.bottom}
function enter(){if(entered)return;entered=true;gate.classList.add('open');document.body.classList.remove('lock');window.scrollTo(0,0);
 setTimeout(()=>menu.classList.add('show'),1100);heroEls.forEach(e=>setTimeout(()=>e.classList.add('in'),+e.dataset.t));setTimeout(()=>gate.remove(),2400)}
function hit(){if(done)return;done=true;stamp.classList.remove('drag');
 const s=stamp.style;const r0=stamp.getBoundingClientRect(),p=paper.getBoundingClientRect();
 const cur=new DOMMatrix(getComputedStyle(stamp).transform);
 const tx=cur.m41+(p.left+p.width/2-(r0.left+r0.width/2)),ty=cur.m42+(p.top+p.height*.62-(r0.top+r0.height*.82));
 s.transform='translate('+tx+'px,'+ty+'px) scale(1.12)';
 setTimeout(()=>{s.transform='translate('+tx+'px,'+(ty+8)+'px) scale(.97)';paper.classList.remove('over');paper.classList.add('hit');if(navigator.vibrate)navigator.vibrate(18);
  const t0=performance.now();(function tick(t){const k=Math.min(1,(t-t0)/1500);setG(Math.round(35*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(tick)})(t0);
  gcall.textContent='Protocolado. Há mais de 35 anos ao seu lado.';
  setTimeout(()=>{stamp.classList.add('gone');s.transform='translate('+tx+'px,'+(ty-60)+'px) scale(1)';hold.hidden=false;hold.classList.remove('dn')},520);
  setTimeout(enter,3600)},300)}
stamp.addEventListener('pointerdown',e=>{if(done)return;sdrag=true;moved=false;sx=e.clientX;sy=e.clientY;stamp.setPointerCapture(e.pointerId);stamp.classList.add('drag')});
stamp.addEventListener('pointermove',e=>{if(!sdrag||done)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.hypot(dx,dy)>6)moved=true;stamp.style.transform='translate('+dx+'px,'+dy+'px) scale(1.1) rotate('+dx*.06+'deg)';paper.classList.toggle('over',inside())});
function release(){if(!sdrag||done)return;sdrag=false;if(!moved||inside()){hit()}else{stamp.classList.remove('drag');stamp.style.transform='';paper.classList.remove('over')}}
stamp.addEventListener('pointerup',release);stamp.addEventListener('pointercancel',()=>{if(!sdrag||done)return;sdrag=false;stamp.classList.remove('drag');stamp.style.transform='';paper.classList.remove('over')});
stamp.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();hit()}});
hold.addEventListener('click',enter);
$('#skip').addEventListener('click',enter);
if(DESK){entered=true;gate.remove();document.body.classList.remove('lock');menu.classList.add('show');heroEls.forEach(e=>setTimeout(()=>e.classList.add('in'),Math.max(80,+e.dataset.t-480)))}
else if(reduce){enter();gate.classList.remove('pre')}
else{/* abertura entra em sequencia */
 const lines=$$('.pls i',paper);lines.forEach((l,i)=>l.style.transitionDelay=(.05*i)+'s');
 const S=[['.skip',100],['.gk',250],['.paper',600],['.pcnt',1100],['.pls i',1350],['#gcall',2100],['.stamp',2400]];
 S.forEach(([s,t])=>setTimeout(()=>{$$(s,gate).forEach(e=>e.classList.add('rv'))},t));
}

/* ===== REVEAL ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('[data-a],.words,.map').forEach(e=>{if(!heroEls.includes(e))io.observe(e)});

/* ===== MENU ===== */
const M={links:'links',triagem:'triagem',escritorio:'equipe',principios:'equipe',equipe:'equipe',areas:'areas',causas:'causas',atuacao:'atuacao',anos:'atuacao',voz:'contato',faq:'contato',contato:'contato'};
const mlinks=$$('#menu a');
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const k=M[e.target.id];mlinks.forEach(a=>a.classList.toggle('on',a.dataset.s===k));}}),{rootMargin:'-40% 0px -55% 0px'});
$$('main section').forEach(s=>sio.observe(s));
const bar=$('#mbar');
const secs=$$('main section');let thLast='';
function menuTone(){const y=(menu.getBoundingClientRect().top||12)+30;let t='dark';for(const s of secs){const r=s.getBoundingClientRect();if(r.top<=y&&r.bottom>y){t=s.dataset.th;break}}if(t!==thLast){thLast=t;menu.classList.toggle('onlight',t==='light')}}
function onScroll(){menuTone();menu.classList.toggle('lift',scrollY>40);const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')';tlUpdate();parUpdate()}

/* ===== PRINCÍPIOS ===== */
{const pt=$$('#ptabs button'),pp=$$('#ppan .pp'),pi=$('#pind');
function pgo(i){pt.forEach((b,k)=>b.classList.toggle('on',k===i));pp.forEach((p,k)=>p.classList.toggle('on',k===i));const b=pt[i];pi.style.width=b.offsetWidth+'px';pi.style.transform='translateX('+b.offsetLeft+'px)'}
pt.forEach((b,i)=>b.onclick=()=>pgo(i));pgo(0);addEventListener('resize',()=>pgo(pt.findIndex(b=>b.classList.contains('on'))));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>pgo(pt.findIndex(b=>b.classList.contains('on'))))}

/* ===== TRIAGEM ===== */
const T={
prev:{n:'Previdenciário',ic:'i-hand',q:[
 {k:'O que você precisa?',lab:'Assunto',o:['Aposentadoria','Pensão por morte','Auxílio por doença','BPC/LOAS','Benefício negado ou cortado']},
 {k:'Qual o seu perfil?',lab:'Perfil',o:['Trabalhador do INSS','Servidor público','Contribuinte facultativo','Ainda não sei']},
 {k:'Já pediu ao INSS?',lab:'Pedido ao INSS',o:['Ainda não','Pedi e foi negado','Está em análise','Foi cortado']},
 {k:'O que você já tem em mãos?',lab:'Em mãos',o:['Extrato CNIS','Carta de indeferimento','Laudos médicos','Quase nada ainda']}],
 d:['Documento com foto e CPF','Extrato CNIS (Meu INSS)','Carteira de trabalho e carnês, se houver','Comprovante de residência','Carta de concessão ou de indeferimento','Laudos e exames, nos casos de saúde']},
pub:{n:'Público',ic:'i-bld',q:[
 {k:'Qual o assunto?',lab:'Assunto',o:['ATS (tempo de serviço)','Licença-prêmio','Paridade ou revisão de proventos','Redução de carga horária','Outro tema de servidor']},
 {k:'Você é...',lab:'Perfil',o:['Servidor municipal','Servidor estadual','Aposentado ou pensionista','Outro']},
 {k:'Já pediu à administração?',lab:'Pedido à administração',o:['Ainda não','Pedi e foi negado','Pedi e sem resposta','Prefiro conversar']},
 {k:'O que você já tem em mãos?',lab:'Em mãos',o:['Contracheques','Ato de nomeação ou aposentadoria','Protocolo do pedido','Quase nada ainda']}],
 d:['Documento com foto e CPF','Contracheques recentes','Ficha funcional','Ato de nomeação ou de aposentadoria','Protocolos e respostas da prefeitura ou do órgão','Estatuto do servidor, se tiver']},
trab:{n:'Trabalhista',ic:'i-brief',q:[
 {k:'Qual o assunto?',lab:'Assunto',o:['Verbas rescisórias','Horas extras e jornada','Carteira não assinada','Acidente ou doença do trabalho','Outro']},
 {k:'Como está o vínculo?',lab:'Vínculo',o:['Ainda trabalho lá','Fui demitido','Pedi demissão','O contrato terminou']},
 {k:'Há quanto tempo?',lab:'Tempo',o:['Menos de 6 meses','De 6 meses a 2 anos','Mais de 2 anos','Ainda acontece']},
 {k:'O que você já tem em mãos?',lab:'Em mãos',o:['Carteira de trabalho','Contracheques','Conversas e provas','Quase nada ainda']}],
 d:['Documento com foto e CPF','Carteira de trabalho','Contracheques','Termo de rescisão, se houver','Conversas, fotos e provas','Nome e endereço da empresa']},
banc:{n:'Bancário',ic:'i-bank',q:[
 {k:'Qual o problema?',lab:'Problema',o:['Golpe ou fraude','Desconto indevido','Empréstimo questionado','Cobrança abusiva','Outro']},
 {k:'Onde aconteceu?',lab:'Onde',o:['Conta bancária','Benefício do INSS','Contracheque','Cartão']},
 {k:'Já reclamou ao banco?',lab:'Reclamação ao banco',o:['Ainda não','Sim, sem solução','Sim, negaram','Tenho protocolo']},
 {k:'O que você já tem em mãos?',lab:'Em mãos',o:['Extratos','Contrato','Prints e protocolos','Quase nada ainda']}],
 d:['Documento com foto e CPF','Extratos do período','Contrato ou proposta','Prints, e-mails e protocolos','Boletim de ocorrência, em caso de golpe','Histórico de consignações, se for o caso']}};
const tri=$('#tri');let st={a:null,v:[]};
function prog(n){return '<div class="prog">'+[0,1,2,3,4].map(i=>'<i class="'+(i<n?'on':'')+'"></i>').join('')+'</div>'}
function drawT(){
 if(!st.a){tri.innerHTML=prog(0)+'<div class="tq"><div class="k">Passo 1 de 5</div><h3>Qual área combina com o seu caso?</h3><div class="opts">'+Object.entries(T).map(([k,a])=>'<button type="button" data-k="'+k+'">'+ico(a.ic)+a.n+'</button>').join('')+'</div></div>';
  $$('button',tri).forEach(b=>b.onclick=()=>{st.a=b.dataset.k;st.v=[];drawT()});return}
 const A=T[st.a],i=st.v.length;
 if(i<A.q.length){const q=A.q[i];tri.innerHTML=prog(i+1)+'<div class="tq"><div class="k">Passo '+(i+2)+' de 5 · '+A.n+'</div><h3>'+q.k+'</h3><div class="opts">'+q.o.map(o=>'<button type="button">'+ico('i-next')+o+'</button>').join('')+'</div><button class="back" type="button">'+ico('i-back')+'Voltar</button></div>';
  $$('.opts button',tri).forEach(b=>b.onclick=()=>{b.classList.add('sel');setTimeout(()=>{st.v.push(b.textContent);drawT()},260)});
  $('.back',tri).onclick=()=>{if(st.v.length)st.v.pop();else st.a=null;drawT()};return}
 const lines=['Olá, Ribamar Coelho Advogados!','Fiz a triagem no biolink.','Área: '+A.n].concat(A.q.map((q,k)=>q.lab+': '+st.v[k]),['Gostaria de uma análise do meu caso.']);
 tri.innerHTML=prog(5)+'<div class="res"><span class="seal">'+ico('i-seal')+'Triagem pronta</span><h3>'+A.n+'</h3><p>Com base no que você respondeu, este é o resumo para levar à conversa:</p><dl>'+A.q.map((q,k)=>'<div><dt>'+q.lab+'</dt><dd>'+st.v[k]+'</dd></div>').join('')+'</dl><h4>Separe estes documentos</h4><ul>'+A.d.map(x=>'<li>'+ico('i-chk')+x+'</li>').join('')+'</ul><a class="btn big" href="'+wa(lines)+'" target="_blank" rel="noopener"><span class="waves"><i></i><i></i><i></i></span><span class="ic">'+ico('i-wa')+'</span><span><b>Enviar para o escritório</b><small>Mensagem pronta no WhatsApp</small></span></a><p class="cav">Triagem inicial, sem valor de parecer jurídico. A análise depende de cada caso.</p><button class="again" type="button">Refazer a triagem</button></div>';
 $('.again',tri).onclick=()=>{st={a:null,v:[]};drawT()}}
drawT();

/* ===== carrosseis laterais (crachas e equipe) ===== */
function car(box,dots,sel){const bs=$$(sel,box);let cur=-1,last=0,held=false;
 bs.forEach((b,i)=>{const d=document.createElement('i');d.onclick=()=>go(i);dots.append(d)});const ds=$$('i',dots);
 function go(i){last=performance.now();const b=bs[i];box.scrollTo({left:b.offsetLeft-(box.clientWidth-b.offsetWidth)/2,behavior:'smooth'})}
 function upd(){const c=box.scrollLeft+box.clientWidth/2;let k=0,m=1e9;bs.forEach((b,i)=>{const d=Math.abs(b.offsetLeft+b.offsetWidth/2-c);if(d<m){m=d;k=i}});if(k!==cur){cur=k;bs.forEach((b,i)=>b.classList.toggle('act',i===k));ds.forEach((d,i)=>d.classList.toggle('on',i===k))}}
 let raf=0;box.addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;upd()})},{passive:true});
 box.addEventListener('pointerdown',()=>{held=true;last=performance.now()});
 ['pointerup','pointercancel','pointerleave'].forEach(t=>box.addEventListener(t,()=>{held=false;last=performance.now()}));
 ['touchstart','wheel'].forEach(t=>box.addEventListener(t,()=>{last=performance.now()},{passive:true}));
 box.scrollLeft=0;upd();
 setInterval(()=>{const r=box.getBoundingClientRect();if(DESK||held||r.top>innerHeight||r.bottom<0||performance.now()-last<2500||reduce)return;go((cur+1)%bs.length)},3600);
 return bs}
(function(){ car($('#tcs'),$('#tdots'),'.tc')})();

/* ===== ÁREAS ===== */
const AR={
prev:{t:'Previdenciário',p:'Benefícios do INSS e de regimes próprios, do pedido ao recurso.',l:['Aposentadorias','Pensão por morte','Auxílio por incapacidade','BPC/LOAS','Salário-maternidade, inclusive contribuinte facultativa','Revisão de benefícios e de proventos']},
pub:{t:'Público',p:'Direitos do servidor público, municipal e estadual, e questões contra a administração.',l:['Adicional por tempo de serviço (ATS)','Licença-prêmio','Paridade e revisão de proventos','Redução de carga horária (ex.: filho com autismo)','URV e diferenças salariais','Recursos especiais']},
trab:{t:'Trabalhista',p:'Relações de trabalho, do vínculo ao fim do contrato.',l:['Verbas rescisórias','Horas extras e jornada','Reconhecimento de vínculo','Acidente e doença do trabalho','Orientação a partir do que a lei prevê']},
banc:{t:'Bancário',p:'Conflitos com bancos e financeiras, inclusive golpes e descontos.',l:['Golpes e fraudes em conta','Descontos indevidos','Empréstimos e consignados questionados','Cobranças abusivas','Orientação para reunir provas']}};
const pan=$('#pan'),tabs=$$('#tabs button');
function areaDraw(k){const a=AR[k];tabs.forEach(b=>b.classList.toggle('on',b.dataset.k===k));pan.classList.remove('swap');void pan.offsetWidth;pan.classList.add('swap');
 pan.innerHTML='<h3>'+a.t+'</h3><p>'+a.p+'</p><ul>'+a.l.map((x,i)=>'<li style="animation-delay:'+(.12+i*.07)+'s">'+ico('i-chk')+x+'</li>').join('')+'</ul><a class="btn" href="'+wa(['Olá, Ribamar Coelho Advogados!','Vim pelo biolink.','Área: '+a.t,'Gostaria de uma análise do meu caso.'])+'" target="_blank" rel="noopener"><span class="ic">'+ico('i-wa')+'</span><span><b>Falar sobre '+a.t+'</b><small>WhatsApp do escritório</small></span></a>'}
tabs.forEach(b=>b.onclick=()=>areaDraw(b.dataset.k));areaDraw('prev');

/* ===== CAUSAS ===== */
if(DESK){const hx=$('.hintx');if(hx)hx.textContent='Clique em uma carta para virar.';$$('.fl .tap').forEach(t=>t.textContent='Clique para virar')}
$$('.fl').forEach(f=>f.addEventListener('click',e=>{if(e.target.closest('a'))return;const on=f.classList.contains('on');$$('.fl.on').forEach(x=>x.classList.remove('on'));if(!on)f.classList.add('on')}));

/* ===== MAPA ===== */
const CT=[['Campo Maior',212.3,131.6,'r',1],['Teresina',186.3,143.6,'l'],['Altos',200.3,140.3,'b'],['José de Freitas',193.8,129.6,'l'],['Barras',207.8,105.6,'l'],['Piripiri',231.3,106.6,'b'],['Pedro II',245.3,112.1,'r'],['Piracuruca',233.5,90,'r'],['Esperantina',209.5,88.6,'l'],['Castelo do Piauí',241.8,154.6,'l'],['São Miguel do Tapuio',251.5,162.1,'l']];
const OT=[['Parnaíba',231.8,44.3,'r'],['Cocal',242,69.6,'r'],['Miguel Alves',181.3,101.3,'l'],['União',182.8,118.1,'l'],['Valença do Piauí',232.3,204.8,'r'],['Floriano',174.5,222.3,'l'],['Oeiras',214.5,232,'l'],['Picos',246.3,235.1,'r'],['Canto do Buriti',176.8,282.1,'l'],['Paulistana',259.8,283.8,'l'],['São João do Piauí',209.8,294.6,'r'],['São Raimundo Nonato',189.8,325.3,'r'],['Corrente',73.8,390.6,'r']];
OT.forEach((c,i)=>{const [n,x,y,pos]=c,g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','ot');g.style.setProperty('--n',i);const dx=pos==='l'?-2.6:2.6;g.innerHTML='<circle cx="'+x+'" cy="'+y+'" r="1.3"/><text x="'+(x+dx)+'" y="'+(y+1.2)+'" text-anchor="'+(pos==='l'?'end':'start')+'" font-size="3.6">'+n+'</text>';$('#oth').append(g)});
const NS='http://www.w3.org/2000/svg',cts=$('#cts'),lns=$('#lines'),cbox=$('#cities'),sede=CT[0];
CT.forEach((c,i)=>{const [n,x,y,pos,sd]=c;
 if(i){const l=document.createElementNS(NS,'line');l.setAttribute('x1',sede[1]);l.setAttribute('y1',sede[2]);l.setAttribute('x2',x);l.setAttribute('y2',y);l.setAttribute('class','ln2');const L=Math.hypot(x-sede[1],y-sede[2]).toFixed(1);l.style.setProperty('--L',L);l.style.setProperty('--n',i);l.dataset.i=i;l.addEventListener('animationend',()=>l.classList.add('fin'));lns.append(l)}
 const g=document.createElementNS(NS,'g');g.setAttribute('class','ct'+(sd?' sede':''));g.dataset.i=i;
 const dx=pos==='l'?-3.2:pos==='r'?3.2:0,dy=pos==='b'?7:1.6,anc=pos==='l'?'end':pos==='b'?'middle':'start';
 g.innerHTML='<circle class="pu" cx="'+x+'" cy="'+y+'" r="2"/><circle class="d" cx="'+x+'" cy="'+y+'" r="'+(sd?3.2:1.9)+'"/><text x="'+(x+dx)+'" y="'+(y+dy)+'" text-anchor="'+anc+'" font-size="4.6">'+n+'</text>';
 g.style.setProperty('--n',i);g.addEventListener('click',()=>pick(i));cts.append(g);
 const b=document.createElement('button');b.type='button';b.textContent=n+(sd?' (sede)':'');b.style.setProperty('--n',i);b.dataset.i=i;b.onclick=()=>pick(i);cbox.append(b)});
function pick(i){$$('.ct').forEach(g=>g.classList.toggle('act',+g.dataset.i===i));$$('button',cbox).forEach(b=>b.classList.toggle('on',+b.dataset.i===i));}
pick(0);
let ci=0;setInterval(()=>{const r=$('#map').getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){ci=(ci+1)%CT.length;pick(ci)}},2600);

/* ===== LINHA DO TEMPO ===== */
const tl=$('#tl'),tlf=$('#tlf'),sts=$$('.st',tl);
function tlUpdate(){const r=tl.getBoundingClientRect(),y=innerHeight*.62;tlf.style.height=clamp((y-r.top)/r.height)*100+'%';sts.forEach(s=>s.classList.toggle('on',s.getBoundingClientRect().top<y))}
const par=$('#par');function parUpdate(){const r=par.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;par.style.transform='translateY('+((r.top+r.height/2-innerHeight/2)*-.08)+'px)'}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});onScroll();

/* ===== NÚMEROS ===== */
$$('.n[data-v],#n35').forEach(el=>{const v=+el.dataset.v,set=reels(el,String(v).length);set(0);
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){let n=0;const t=setInterval(()=>{n=Math.min(v,n+Math.ceil(v/12));set(n);if(n>=v)clearInterval(t)},70);o.disconnect()}}),{threshold:.4}).observe(el)});

/* ===== FAQ em conversa ===== */
$$('#chat .q').forEach(q=>q.addEventListener('click',()=>{const a=q.nextElementSibling;const open=a.classList.contains('show');
 $$('#chat .ans.show').forEach(x=>x.classList.remove('show'));$$('#chat .q.act').forEach(x=>x.classList.remove('act'));if(open)return;
 q.classList.add('act');const b=$('.bub',a),txt=b.dataset.t||(b.dataset.t=b.innerHTML);b.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';a.classList.add('show');setTimeout(()=>{b.innerHTML=txt},650)}));

/* ===== faixas e ripple ===== */
$$('.strip .track').forEach(t=>{[...t.children].forEach(c=>t.append(c.cloneNode(true)))});
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,d=document.createElement('i');d.className='rip';d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.append(d);setTimeout(()=>d.remove(),700)});

/* mapa: contorno do estado se desenha inteiro, depois a camera aproxima da regiao */
(function(){const mp=$('#map'),svg=$('#map svg'),pi=$('#map .pi'),A=[28,28,275,395],B=DESK?[134,52,152,152]:[146,62,126,126];let go=false;
 const L=pi.getTotalLength();pi.style.strokeDasharray=L;pi.style.strokeDashoffset=L;
 const ease=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,eo=k=>1-Math.pow(1-k,2);
 function run(){mp.classList.add('in');cbox.classList.add('in');const t0=performance.now(),TD=8500,TZ=4000,ZD=300;
  (function f(t){const d=t-t0,kd=Math.min(1,d/TD),kz=Math.min(1,Math.max(0,(d-ZD)/TZ));
   pi.style.strokeDashoffset=L*(1-(1-Math.cos(Math.PI*kd))/2);
   if(kd>.55)pi.style.fillOpacity=Math.min(1,(kd-.55)/.45);
   const q=ease(kz);svg.setAttribute('viewBox',A.map((v,i)=>v+(B[i]-v)*q).join(' '));
   if(kz<1||kd<1)requestAnimationFrame(f)})(t0)}
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting&&!go){go=true;o.disconnect();run()}}),{threshold:.7}).observe(mp)})();

})();