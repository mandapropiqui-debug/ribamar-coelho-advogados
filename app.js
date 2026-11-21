(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
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
const heroEls=$$('#links [data-a], #links .words');
function center(r){return{x:r.left+r.width/2,y:r.top+r.height/2}}
function inside(){const s=stamp.getBoundingClientRect(),p=paper.getBoundingClientRect(),c=center(s);return c.x>p.left&&c.x<p.right&&c.y>p.top&&c.y<p.bottom}
function enter(){if(entered)return;entered=true;gate.classList.add('open');document.body.classList.remove('lock');window.scrollTo(0,0);
 setTimeout(()=>menu.classList.add('show'),1100);heroEls.forEach((e,i)=>setTimeout(()=>e.classList.add('in'),500+i*110));setTimeout(()=>gate.remove(),2400)}
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
if(reduce){enter()}

/* ===== REVEAL ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('[data-a],.words,.map').forEach(e=>{if(!heroEls.includes(e))io.observe(e)});

/* ===== MENU ===== */
const M={links:'links',triagem:'triagem',escritorio:'socios',socios:'socios',areas:'areas',causas:'causas',atuacao:'atuacao',anos:'atuacao',voz:'contato',faq:'contato',contato:'contato'};
const mlinks=$$('#menu a');
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const k=M[e.target.id];mlinks.forEach(a=>a.classList.toggle('on',a.dataset.s===k));menu.classList.toggle('onlight',e.target.dataset.th==='light')}}),{rootMargin:'-40% 0px -55% 0px'});
$$('main section').forEach(s=>sio.observe(s));
const bar=$('#mbar');
function onScroll(){const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')';tlUpdate();parUpdate()}

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

/* ===== faixas e ripple ===== */
$$('.strip .track').forEach(t=>{[...t.children].forEach(c=>t.append(c.cloneNode(true)))});
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,d=document.createElement('i');d.className='rip';d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.append(d);setTimeout(()=>d.remove(),700)});
})();
