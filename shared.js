/* ================================================================
   LA VILLE HOTEL — Shared JS (loaded on every page)
   ================================================================ */
'use strict';

// ── NAVBAR SCROLL ──
(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});
})();

// ── MOBILE NAV ──
(function(){
  const btn  = document.getElementById('nav-toggle');
  const list = document.getElementById('nav-list');
  if(!btn||!list) return;
  btn.addEventListener('click',()=>{
    const open = list.classList.toggle('open');
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open);
  });
  list.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ list.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded',false); }));
})();

// ── ACTIVE NAV LINK ──
(function(){
  const path = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('#nav-list a[href]').forEach(a=>{
    const href = a.getAttribute('href').split('/').filter(Boolean).pop();
    if(href===path) a.classList.add('active');
  });
})();

// ── SCROLL REVEAL ──
(function(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
  },{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// ── TOAST ──
function showToast(msg,type='ok'){
  let t=document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.className=type;
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>t.classList.add('show')); });
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),4500);
}

// ── ROOMS DATA ──
const ROOMS=[
  {id:'twin',    name:'Twin Room',              icon:'🛏', cap:2, beds:'2 Single Beds',    size:'22m²', pw:95,  pwe:115, desc:'Bright and airy room with two single beds, en-suite bathroom, and views over Victoria Street or St Anne\'s Church.'},
  {id:'double',  name:'Double Room',            icon:'🛏', cap:2, beds:'1 Double Bed',     size:'24m²', pw:105, pwe:125, desc:'Cosy and elegant double room with en-suite — ideal for couples exploring beautiful Alderney.'},
  {id:'king',    name:'King Size Suite',         icon:'👑', cap:2, beds:'1 King Size Bed',  size:'36m²', pw:155, pwe:185, desc:'Our most luxurious option — king size bed, spacious sitting area, and premium en-suite with rainfall shower.'},
  {id:'triple',  name:'Triple Room',             icon:'🛌', cap:3, beds:'3 Single Beds',    size:'28m²', pw:135, pwe:155, desc:'Spacious room with three singles, perfect for small groups or families with older children.'},
  {id:'fam4',    name:'Family Room (sleeps 4)',  icon:'👨‍👩‍👧‍👦', cap:4, beds:'1 Double + 2 Singles', size:'34m²', pw:165, pwe:195, desc:'Perfect for families — a double for the parents, two singles for the kids, all in one generous en-suite room.'},
  {id:'fam5',    name:'Family Room (sleeps 5)',  icon:'👨‍👩‍👧‍👦', cap:5, beds:'1 Double + 3 Singles', size:'40m²', pw:195, pwe:225, desc:'Our larger family room, sleeping up to five with a double and three single beds — plenty of space for everyone.'},
  {id:'quad',    name:'Quad Family Suite',       icon:'🏨', cap:4, beds:'2 Double Beds',    size:'48m²', pw:210, pwe:250, desc:'Stunning suite with two double beds, a separate lounge area — everything your family needs for the perfect stay.'}
];

const AMENITIES=['En-suite','Free Wi-Fi','Tea & Coffee','TV','Hairdryer','Toiletries','USB Charging','Nespresso'];

// ── AVAILABILITY CHECKER ──
function initBookingWidget(prefix){
  const btn = document.getElementById(prefix+'-btn');
  if(!btn) return;
  btn.addEventListener('click',()=>{
    const ci  = document.getElementById(prefix+'-ci')?.value;
    const co  = document.getElementById(prefix+'-co')?.value;
    const g   = parseInt(document.getElementById(prefix+'-g')?.value)||2;
    const r   = parseInt(document.getElementById(prefix+'-r')?.value)||1;
    const res = document.getElementById(prefix+'-res');
    if(!res) return;
    if(!ci||!co){ showToast('Please select check-in and check-out dates.','err'); return; }
    const d1=new Date(ci), d2=new Date(co);
    if(d2<=d1){ showToast('Check-out must be after check-in.','err'); return; }
    const nights=Math.round((d2-d1)/86400000);
    const perRoom=Math.ceil(g/r);
    const seed=d1.getDate()+d1.getMonth()*13;
    const results=ROOMS.filter(rm=>rm.cap>=perRoom).map((rm,i)=>{
      const s=(seed+i*5)%9;
      const avail=s<5?'ok':s===5?'ltd':'no';
      const isWe=d1.getDay()===5||d1.getDay()===6;
      const ppn=isWe?rm.pwe:rm.pw;
      return{...rm,avail,ppn,total:ppn*nights*r,nights};
    });
    renderResults(results,res,nights,r);
  });

  // set today as min
  const today=new Date().toISOString().split('T')[0];
  ['ci','co'].forEach(k=>{ const el=document.getElementById(prefix+'-'+k); if(el) el.min=today; });
}

function renderResults(results,container,nights,rooms){
  const avail=results.filter(r=>r.avail!=='no').length;
  container.innerHTML=`<div class="avail-results__hd">${avail} room type${avail!==1?'s':''} available for ${nights} night${nights!==1?'s':''}</div>`;
  results.forEach(rm=>{
    const bcls=rm.avail==='ok'?'badge-ok':rm.avail==='ltd'?'badge-ltd':'badge-no';
    const blab=rm.avail==='ok'?'✓ Available':rm.avail==='ltd'?'⚠ Limited':'✕ Unavailable';
    const bookBtn=rm.avail!=='no'?`<button class="btn btn-primary btn-sm" onclick="promptBook('${rm.name}')">Book</button>`:'';
    container.insertAdjacentHTML('beforeend',`
      <div class="rr">
        <div>
          <div class="rr__name">${rm.icon} ${rm.name}</div>
          <div class="rr__info">£${rm.ppn}/night · ${rm.nights} nights · ${rooms} room${rooms>1?'s':''}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span class="badge ${bcls}">${blab}</span>${bookBtn}
        </div>
      </div>`);
  });
  container.classList.add('show');
}

function promptBook(name){
  showToast(`To book the "${name}", call us on +44 1481 824784 or email info@lavillehotel.com — we'll be delighted to help! 💙`,'ok');
}

// ── CONTACT FORM ──
function submitContact(){
  const n=document.getElementById('c-name')?.value.trim();
  const e=document.getElementById('c-email')?.value.trim();
  const m=document.getElementById('c-msg')?.value.trim();
  if(!n||!e||!m){ showToast('Please fill in your name, email and message.','err'); return; }
  showToast(`Thanks ${n}! We'll be in touch soon. 💙`,'ok');
  ['c-name','c-email','c-phone','c-subject','c-msg'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}
