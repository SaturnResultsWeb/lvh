'use strict';

(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});
})();

(function(){
  const btn  = document.getElementById('nav-toggle');
  const list = document.getElementById('nav-list');
  if(!btn||!list) return;
  btn.addEventListener('click',()=>{
    const open = list.classList.toggle('open');
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open);
  });
  list.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    list.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded',false);
  }));
})();

(function(){
  const path = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('#nav-list a[href]').forEach(a=>{
    const href = a.getAttribute('href').split('/').filter(Boolean).pop();
    if(href===path) a.classList.add('active');
  });
})();

(function(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
  },{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

function showToast(msg,type='ok'){
  let t=document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.className=type;
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>t.classList.add('show')); });
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),4800);
}

const ROOMS=[
  {id:'twin',   name:'Twin Room',             icon:'https://picsum.photos/seed/hotel-twin/600/400',   cap:2, beds:'2 Single Beds',          size:'22m²', pw:95,  pwe:115, desc:'Bright and airy room with two single beds, en-suite bathroom, and views over Victoria Street or St Anne\'s Church.'},
  {id:'double', name:'Double Room',            icon:'https://picsum.photos/seed/hotel-double/600/400', cap:2, beds:'1 Double Bed',            size:'24m²', pw:105, pwe:125, desc:'Cosy and elegant double room with en-suite — ideal for couples exploring beautiful Alderney.'},
  {id:'king',   name:'King Size Suite',        icon:'https://picsum.photos/seed/hotel-king/600/400',   cap:2, beds:'1 King Size Bed',         size:'36m²', pw:155, pwe:185, desc:'Our most luxurious option — king size bed, spacious sitting area, and premium en-suite with rainfall shower.'},
  {id:'triple', name:'Triple Room',            icon:'https://picsum.photos/seed/hotel-triple/600/400', cap:3, beds:'3 Single Beds',           size:'28m²', pw:135, pwe:155, desc:'Spacious room with three singles, perfect for small groups or families with older children.'},
  {id:'fam4',   name:'Family Room (sleeps 4)', icon:'https://picsum.photos/seed/hotel-family/600/400', cap:4, beds:'1 Double + 2 Singles',    size:'34m²', pw:165, pwe:195, desc:'Perfect for families — a double for the parents, two singles for the kids, all in one generous en-suite room.'},
  {id:'fam5',   name:'Family Room (sleeps 5)', icon:'https://picsum.photos/seed/hotel-fam5/600/400',   cap:5, beds:'1 Double + 3 Singles',   size:'40m²', pw:195, pwe:225, desc:'Our larger family room, sleeping up to five with a double and three single beds — plenty of space for everyone.'},
  {id:'quad',   name:'Quad Family Suite',      icon:'https://picsum.photos/seed/hotel-suite/600/400',  cap:4, beds:'2 Double Beds',           size:'48m²', pw:210, pwe:250, desc:'Stunning suite with two double beds, a separate lounge area — everything your family needs for the perfect stay.'}
];

const AMENITIES=['En-suite','Free Wi-Fi','Tea & Coffee','Nespresso','TV','Hairdryer','USB Charging','Toiletries'];

const ICON_USERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>';
const ICON_BED   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 7.5l16.5-4.125M12 6.375v-.375m0 .375c-1.104 0-2.148.37-2.933 1.02M6.75 7.5H5.25A2.25 2.25 0 003 9.75v9a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75v-9a2.25 2.25 0 00-2.25-2.25H17.25m-10.5 0v-.375c0-1.036.84-1.875 1.875-1.875h1.5c1.035 0 1.875.84 1.875 1.875v.375m-9.75 3.75h13.5"/></svg>';
const ICON_RULER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"/></svg>';

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
  const today=new Date().toISOString().split('T')[0];
  ['ci','co'].forEach(k=>{ const el=document.getElementById(prefix+'-'+k); if(el) el.min=today; });
}

function renderResults(results,container,nights,rooms){
  const avail=results.filter(r=>r.avail!=='no').length;
  container.innerHTML=`<div class="avail-results__hd">${avail} room type${avail!==1?'s':''} available for ${nights} night${nights!==1?'s':''}</div>`;
  results.forEach(rm=>{
    const bcls=rm.avail==='ok'?'badge-ok':rm.avail==='ltd'?'badge-ltd':'badge-no';
    const blab=rm.avail==='ok'?'Available':rm.avail==='ltd'?'Limited':'Unavailable';
    const bookBtn=rm.avail!=='no'?`<button class="btn btn-primary btn-sm" onclick="promptBook('${rm.name}')">Book</button>`:'';
    container.insertAdjacentHTML('beforeend',`
      <div class="rr">
        <div>
          <div class="rr__name">${rm.name}</div>
          <div class="rr__info">From £${rm.ppn}/night &middot; ${rm.nights} night${rm.nights!==1?'s':''} &middot; ${rooms} room${rooms>1?'s':''}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span class="badge ${bcls}">${blab}</span>${bookBtn}
        </div>
      </div>`);
  });
  container.classList.add('show');
}

function promptBook(name){
  showToast(`To book the ${name}, call us on +44 1481 824784 or email info@lavillehotel.com — we’d be delighted to help.`,'ok');
}

function submitContact(){
  const n=document.getElementById('c-name')?.value.trim();
  const e=document.getElementById('c-email')?.value.trim();
  const m=document.getElementById('c-msg')?.value.trim();
  if(!n||!e||!m){ showToast('Please fill in your name, email and message.','err'); return; }
  showToast(`Thank you ${n}. We’ll be in touch soon.`,'ok');
  ['c-name','c-email','c-phone','c-subject','c-msg'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

function buildRoomCards(){
  const grid=document.getElementById('rooms-grid');
  if(!grid) return;
  ROOMS.forEach(rm=>{
    grid.insertAdjacentHTML('beforeend',`
      <div class="room-card reveal">
        <div class="room-card__thumb">
          <img src="${rm.icon}" alt="${rm.name}" loading="lazy">
        </div>
        <div class="room-card__body">
          <div class="room-card__meta">
            <span class="room-card__tag">${ICON_USERS} Up to ${rm.cap}</span>
            <span class="room-card__tag">${ICON_BED} ${rm.beds}</span>
            <span class="room-card__tag">${ICON_RULER} ${rm.size}</span>
          </div>
          <h3>${rm.name}</h3>
          <p>${rm.desc}</p>
          <div class="room-card__amenities">${AMENITIES.map(a=>`<span class="room-card__amenity">${a}</span>`).join('')}</div>
          <div class="room-card__foot">
            <div class="room-card__price">
              <strong>From &pound;${rm.pw}</strong>
              per room / night
            </div>
            <button class="btn btn-primary btn-sm" onclick="promptBook('${rm.name}')">Book This Room</button>
          </div>
        </div>
      </div>`);
  });
  document.querySelectorAll('.room-card.reveal').forEach(el=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
    },{threshold:.06});
    obs.observe(el);
  });
}
