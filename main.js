/* ============================================================
   LA VILLE HOTEL — Main JavaScript
   ============================================================ */

'use strict';

// ── ROOM DATA ──
const ROOMS = [
  {
    id: 'twin',
    name: 'Twin Room',
    capacity: 2,
    beds: '2 Single Beds',
    icon: '🛏',
    desc: 'Bright and comfortable room with two single beds, en-suite bathroom, and views over Victoria Street.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV'],
    size: '22m²',
    prices: { weekday: 95, weekend: 115 },
    qty: 4
  },
  {
    id: 'double',
    name: 'Double Room',
    capacity: 2,
    beds: '1 Double Bed',
    icon: '🛏',
    desc: 'Cosy and elegant double room with en-suite, perfect for couples exploring beautiful Alderney.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV'],
    size: '24m²',
    prices: { weekday: 105, weekend: 125 },
    qty: 5
  },
  {
    id: 'king-suite',
    name: 'King Size Suite',
    capacity: 2,
    beds: '1 King Size Bed',
    icon: '👑',
    desc: 'Our most luxurious room, featuring a king size bed, spacious sitting area, and premium en-suite with rainfall shower.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV', 'Sitting Area', 'Premium Toiletries'],
    size: '36m²',
    prices: { weekday: 155, weekend: 185 },
    qty: 2
  },
  {
    id: 'triple',
    name: 'Triple Room',
    capacity: 3,
    beds: '3 Single Beds',
    icon: '🛏',
    desc: 'Spacious room with three single beds, ideal for small groups or families with older children.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV'],
    size: '28m²',
    prices: { weekday: 135, weekend: 155 },
    qty: 3
  },
  {
    id: 'family-4',
    name: 'Family Room (sleeps 4)',
    capacity: 4,
    beds: '1 Double + 2 Single Beds',
    icon: '👨‍👩‍👧‍👦',
    desc: 'Perfect for families of four, with a double bed for the parents and two singles for the children — all in one generous room.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV', 'Family Friendly'],
    size: '34m²',
    prices: { weekday: 165, weekend: 195 },
    qty: 3
  },
  {
    id: 'family-5',
    name: 'Family Room (sleeps 5)',
    capacity: 5,
    beds: '1 Double + 3 Single Beds',
    icon: '👨‍👩‍👧‍👦',
    desc: 'Our larger family room, accommodating up to five guests comfortably with a double and three single beds.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV', 'Family Friendly'],
    size: '40m²',
    prices: { weekday: 195, weekend: 225 },
    qty: 2
  },
  {
    id: 'quad-suite',
    name: 'Quad Family Suite',
    capacity: 4,
    beds: '2 Double Beds',
    icon: '🏨',
    desc: 'A stunning suite with two double beds, a separate lounge area, and everything your family needs for a perfect Alderney stay.',
    features: ['En-suite', 'Wi-Fi', 'Tea & Coffee', 'TV', 'Lounge Area', 'Premium Toiletries'],
    size: '48m²',
    prices: { weekday: 210, weekend: 250 },
    qty: 1
  }
];

// ── PAGE ROUTER ──
const router = {
  pages: {
    home:        () => renderHome(),
    rooms:       () => renderRooms(),
    restaurant:  () => renderRestaurant(),
    chez:        () => renderChez(),
    fooddude:    () => renderFoodDude(),
    alderney:    () => renderAlderney(),
    contact:     () => renderContact()
  },

  init() {
    this.navigateTo(this.getHash());
    window.addEventListener('hashchange', () => {
      this.navigateTo(this.getHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  getHash() {
    const h = location.hash.replace('#', '') || 'home';
    return this.pages[h] ? h : 'home';
  },

  navigateTo(page) {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    const fn = this.pages[page];
    if (fn) fn();
    updateNav(page);
    initScrollReveal();
    initNavScroll();
  }
};

// ── NAV ACTIVE STATE ──
function updateNav(page) {
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

// ── NAVBAR SCROLL ──
function initNavScroll() {
  const nav = document.querySelector('.navbar');
  const handler = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.removeEventListener('scroll', handler);
  window.addEventListener('scroll', handler);
}

// ── MOBILE NAV TOGGLE ──
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  // Close on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── BOOKING LOGIC ──
function checkAvailability(checkIn, checkOut, guests, numRooms, resultsEl) {
  if (!checkIn || !checkOut) {
    showToast('Please select check-in and check-out dates.', 'error');
    return;
  }
  const d1 = new Date(checkIn), d2 = new Date(checkOut);
  if (d2 <= d1) {
    showToast('Check-out must be after check-in.', 'error');
    return;
  }
  const nights = Math.round((d2 - d1) / 86400000);
  const gNum = parseInt(guests) || 2;
  const rNum = parseInt(numRooms) || 1;

  // Simulate availability — deterministic seed from dates
  const seed = d1.getDate() + d1.getMonth() * 7;
  const available = ROOMS.filter(r => r.capacity >= Math.ceil(gNum / rNum));

  const results = available.map((room, i) => {
    const avail = ((seed + i * 3) % 7) < 5 ? 'available' :
                  ((seed + i * 3) % 7) === 5 ? 'limited' : 'unavailable';
    const isWeekend = d1.getDay() === 5 || d1.getDay() === 6;
    const nightly = isWeekend ? room.prices.weekend : room.prices.weekday;
    const total = nightly * nights * rNum;
    return { ...room, avail, nightly, total, nights };
  });

  renderAvailability(results, resultsEl, nights, rNum);
}

function renderAvailability(results, container, nights, rooms) {
  container.innerHTML = `<div class="availability-results__title">
    Found ${results.filter(r => r.avail !== 'unavailable').length} available room types for ${nights} night${nights !== 1 ? 's' : ''}
  </div>`;
  results.forEach(r => {
    const badgeClass = r.avail === 'available' ? 'badge-available' :
                       r.avail === 'limited' ? 'badge-limited' : 'badge-unavailable';
    const badgeText = r.avail === 'available' ? '✓ Available' :
                      r.avail === 'limited' ? '⚠ Limited' : '✕ Unavailable';
    const btn = r.avail !== 'unavailable'
      ? `<button class="btn btn-primary" style="padding:7px 16px;font-size:0.75rem" onclick="handleBookNow('${r.name}')">Book</button>`
      : '';
    container.insertAdjacentHTML('beforeend', `
      <div class="room-result">
        <div>
          <div class="room-result__name">${r.icon} ${r.name}</div>
          <div class="room-result__info">£${r.nightly}/night · ${r.nights} nights · ${rooms} room${rooms > 1 ? 's' : ''}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span class="badge ${badgeClass}">${badgeText}</span>
          ${btn}
        </div>
      </div>
    `);
  });
  container.classList.add('visible');
  container.style.display = 'block';
}

function handleBookNow(roomName) {
  showToast(`Great choice! To complete your "${roomName}" booking, please call us on +44 1481 824784 or email info@lavillehotel.com`, 'success');
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast toast--${type}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ── BOOKING WIDGET HTML ──
function bookingWidgetHTML(context = 'hero') {
  const id = `booking-${context}`;
  return `
  <div class="booking-widget">
    <div class="booking-widget__title"><em>Check</em> Availability</div>
    <div class="form-grid">
      <div class="form-row">
        <div class="form-group">
          <label for="${id}-checkin">Check In</label>
          <input type="date" id="${id}-checkin" min="${todayStr()}">
        </div>
        <div class="form-group">
          <label for="${id}-checkout">Check Out</label>
          <input type="date" id="${id}-checkout" min="${todayStr()}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${id}-guests">Guests</label>
          <select id="${id}-guests">
            ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}"${n===2?' selected':''}>${n} Guest${n>1?'s':''}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="${id}-rooms">Rooms</label>
          <select id="${id}-rooms">
            ${[1,2,3,4,5].map(n => `<option value="${n}">${n} Room${n>1?'s':''}</option>`).join('')}
          </select>
        </div>
      </div>
      <button class="btn btn-primary" onclick="doCheck('${id}')">Search Availability</button>
      <div id="${id}-results" class="availability-results"></div>
    </div>
  </div>`;
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function doCheck(id) {
  const checkIn = document.getElementById(`${id}-checkin`)?.value;
  const checkOut = document.getElementById(`${id}-checkout`)?.value;
  const guests = document.getElementById(`${id}-guests`)?.value;
  const rooms = document.getElementById(`${id}-rooms`)?.value;
  const resultsEl = document.getElementById(`${id}-results`);
  if (resultsEl) checkAvailability(checkIn, checkOut, guests, rooms, resultsEl);
}

// ── SHARED COMPONENTS ──
function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer__brand">
          <span class="logo__text">La Ville</span>
          <span class="logo__sub">Hotel · Alderney</span>
          <p>Situated at the heart of the vibrant Alderney community, La Ville offers fantastic food, 20 spacious en-suite rooms, a cocktail bar, terrace and a large dining room.</p>
          <div class="social-links" style="margin-top:20px">
            <a href="https://www.instagram.com/laville_hotel/" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
            <a href="https://www.instagram.com/thechezbar/" target="_blank" rel="noopener" aria-label="The Chez Instagram">🍹</a>
          </div>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul>
            <li><a href="#home">Welcome</a></li>
            <li><a href="#rooms">Our Rooms</a></li>
            <li><a href="#restaurant">Bar & Restaurant</a></li>
            <li><a href="#chez">The Chez Bar</a></li>
            <li><a href="#fooddude">Food Dude</a></li>
            <li><a href="#alderney">Alderney</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Hotel Hours</h4>
          <ul style="gap:8px">
            <li style="font-size:0.85rem;color:rgba(255,255,255,0.9);font-weight:600">Breakfast</li>
            <li>7:30am – 10:00am daily</li>
            <li style="font-size:0.85rem;color:rgba(255,255,255,0.9);font-weight:600;margin-top:6px">Lunch</li>
            <li>12pm – 3pm Tue–Sat</li>
            <li style="font-size:0.85rem;color:rgba(255,255,255,0.9);font-weight:600;margin-top:6px">Dinner</li>
            <li>6pm – 9pm Tue–Sat</li>
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <ul style="gap:10px">
            <li>📍 Victoria Street, Alderney, GY9 3TA</li>
            <li><a href="tel:+441481824784">📞 +44 1481 824784</a></li>
            <li><a href="mailto:info@lavillehotel.com">✉ info@lavillehotel.com</a></li>
          </ul>
          <div style="margin-top:20px">
            <h4>Our Establishments</h4>
            <ul style="gap:8px">
              <li><a href="#home">🏨 La Ville Hotel</a></li>
              <li><a href="#chez">🍺 The Chez Bar</a></li>
              <li><a href="#fooddude">🍦 Food Dude</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;width:100%">
        <span>© ${new Date().getFullYear()} LV Hotel Limited · La Ville Hotel, Alderney</span>
        <span style="color:rgba(255,255,255,0.35)">Victoria Street · Alderney · Channel Islands · GY9 3TA</span>
      </div>
    </div>
  </footer>`;
}

function estabNavHTML(active) {
  const links = [
    { href: '#home', label: '🏨 La Ville Hotel', key: 'home' },
    { href: '#chez', label: '🍺 The Chez Bar', key: 'chez' },
    { href: '#fooddude', label: '🍦 Food Dude', key: 'fooddude' }
  ];
  return `<nav class="estab-nav">
    <div class="container">
      ${links.map(l => `<a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a>`).join('')}
    </div>
  </nav>`;
}

// ── HOME PAGE ──
function renderHome() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__bg"></div>
      <div class="hero__overlay"></div>
      <div class="container" style="display:grid;grid-template-columns:1fr 340px;gap:48px;align-items:center">
        <div>
          <span class="hero__kicker">✦ Alderney · Channel Islands</span>
          <h1 class="hero__title"><em>Relax</em> in Our<br><strong>Island Hotel</strong></h1>
          <p class="hero__sub">Situated at the heart of Alderney's vibrant community — fantastic food, 20 spacious en-suite rooms, a cocktail bar, terrace and large dining room.</p>
          <div class="hero__ctas">
            <a href="#rooms" class="btn btn-primary">View Our Rooms</a>
            <a href="#contact" class="btn btn-white">Get in Touch</a>
          </div>
        </div>
        <div>${bookingWidgetHTML('hero')}</div>
      </div>
    </section>

    <!-- QUICK FACTS -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="info-cards">
          <div class="info-card reveal">
            <div class="info-card__icon">🏨</div>
            <h4>20 Rooms</h4>
            <p>Spacious en-suite rooms for every type of traveller</p>
          </div>
          <div class="info-card reveal">
            <div class="info-card__icon">🍽</div>
            <h4>Bar & Restaurant</h4>
            <p>Breakfast, brunch & lunch using locally sourced ingredients</p>
          </div>
          <div class="info-card reveal">
            <div class="info-card__icon">🍺</div>
            <h4>The Chez Bar</h4>
            <p>Alderney's largest bar — live music, DJs & sports</p>
          </div>
          <div class="info-card reveal">
            <div class="info-card__icon">📍</div>
            <h4>Heart of Alderney</h4>
            <p>Victoria Street — walks, beaches & attractions on your doorstep</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SPLIT -->
    <section class="section--lg">
      <div class="container">
        <div class="split">
          <div class="split__img-wrap reveal">
            <span style="color:rgba(255,255,255,0.5);font-size:5rem">🏝</span>
          </div>
          <div class="split__content reveal">
            <span class="section-label">About La Ville</span>
            <h2>The Heart of <em>Alderney</em></h2>
            <p>With views of one of the finest Victorian buildings in the Channel Islands — St. Anne's Church — or the beautiful cobbled Victoria Street, La Ville Hotel is perfectly situated at the heart of Alderney.</p>
            <p>The hotel comprises 20 spacious ensuite rooms and a large restaurant that offers a fantastic customer experience built around great food, drinks, accommodation and the best service on the island.</p>
            <p>Whether you are visiting to work on your tan, exploring somewhere new, or simply escaping the city — La Ville will be the place for you.</p>
            <a href="#rooms" class="btn btn-ocean">Explore Our Rooms</a>
          </div>
        </div>
      </div>
    </section>

    <!-- PHOTO STRIP -->
    <div class="photo-strip">
      <div class="photo-strip__item"><div class="photo-strip__placeholder">🍽</div></div>
      <div class="photo-strip__item"><div class="photo-strip__placeholder">🍹</div></div>
      <div class="photo-strip__item"><div class="photo-strip__placeholder">🛏</div></div>
      <div class="photo-strip__item"><div class="photo-strip__placeholder">🌊</div></div>
    </div>

    <!-- FEATURES -->
    <section class="section">
      <div class="container">
        <div class="text-center reveal">
          <span class="section-label">Why Choose La Ville</span>
          <h2>Everything You <em>Need</em></h2>
        </div>
        <div class="features">
          <div class="feature-card reveal">
            <span class="feature-card__icon">🏖</span>
            <h3>Island Escape</h3>
            <p>Alderney's stunning beaches, crystal clear waters and wildlife are all within walking distance — your adventure starts at our front door.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">🍳</span>
            <h3>Fresh Local Food</h3>
            <p>Our kitchen serves the best locally sourced ingredients, from hearty breakfasts to flavourful lunches in our sun-drenched terrace.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">🎉</span>
            <h3>Events & Celebrations</h3>
            <p>Planning a wedding, party or group trip? La Ville and The Chez Bar are the perfect venues for celebrations of all sizes.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">⚽</span>
            <h3>Sports & Entertainment</h3>
            <p>Next door at The Chez Bar, catch every game on Sky TV & TNT Sports across two 50" screens — the island's premier sports venue.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section testimonials">
      <div class="container">
        <div class="text-center reveal">
          <span class="section-label">Guest Reviews</span>
          <h2>What Our Guests <em>Say</em></h2>
        </div>
        <div class="testimonial-grid">
          <div class="testimonial-card reveal">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">"Wonderful hotel in the perfect location. The staff are incredibly friendly and the food is fantastic. We'll definitely be back!"</p>
            <div class="testimonial-card__author">— Sarah M., Visited 2024</div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">"The best base for exploring Alderney. Comfortable rooms, great breakfast, and The Chez Bar next door is brilliant for evenings!"</p>
            <div class="testimonial-card__author">— James T., Visited 2024</div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-card__stars">★★★★★</div>
            <p class="testimonial-card__text">"Perfect family holiday. The rooms are spotless and spacious, the kids loved it, and the town is gorgeous. Couldn't recommend more."</p>
            <div class="testimonial-card__author">— The Robertson Family, Visited 2023</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ALDERNEY TEASER -->
    <section class="section">
      <div class="container">
        <div class="split split--reverse">
          <div class="split__img-wrap reveal">
            <span style="color:rgba(255,255,255,0.5);font-size:5rem">🌅</span>
          </div>
          <div class="split__content reveal">
            <span class="section-label">Discover Alderney</span>
            <h2>Your Island <em>Adventure</em></h2>
            <p>From stunning cliff walks and pristine beaches to wildlife, history and a wonderfully slow pace of life — Alderney is the hidden gem of the Channel Islands.</p>
            <p>Take a bike out to the lighthouse, wander to Gannet Rock, stroll down Braye Road to one of many stunning beaches, or simply perch on a bench with your favourite book.</p>
            <a href="#alderney" class="btn btn-outline">Explore the Island</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="cta-banner">
      <div class="container reveal">
        <span class="section-label" style="justify-content:center">Book Your Stay</span>
        <h2>Ready for Your <em>Island Escape?</em></h2>
        <p>Join us at La Ville — where great hospitality meets the beauty of Alderney.</p>
        <div class="cta-banner__btns">
          <a href="#rooms" class="btn btn-primary">Check Availability</a>
          <a href="tel:+441481824784" class="btn btn-ocean">📞 Call to Book</a>
          <a href="mailto:info@lavillehotel.com" class="btn btn-outline">✉ Email Us</a>
        </div>
      </div>
    </section>

    ${renderFooter()}
  </div>`;
}

// ── ROOMS PAGE ──
function renderRooms() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">La Ville Hotel</span>
        <h1 class="page-hero__title">Our <em>Rooms</em></h1>
        <p class="page-hero__sub">20 spacious en-suite rooms to suit every type of guest — from romantic breaks to family adventures.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Inline booking -->
        <div class="inline-booking reveal">
          <h2><em>Check</em> Availability</h2>
          <div class="form-grid">
            <div class="form-row">
              <div class="form-group">
                <label for="rooms-checkin">Check In</label>
                <input type="date" id="rooms-checkin" min="${todayStr()}">
              </div>
              <div class="form-group">
                <label for="rooms-checkout">Check Out</label>
                <input type="date" id="rooms-checkout" min="${todayStr()}">
              </div>
              <div class="form-group">
                <label for="rooms-guests">Guests</label>
                <select id="rooms-guests">
                  ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}"${n===2?' selected':''}>${n} Guest${n>1?'s':''}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label for="rooms-numrooms">Rooms</label>
                <select id="rooms-numrooms">
                  ${[1,2,3,4,5].map(n => `<option value="${n}">${n} Room${n>1?'s':''}</option>`).join('')}
                </select>
              </div>
              <div class="form-group" style="justify-content:flex-end">
                <label style="opacity:0">Search</label>
                <button class="btn btn-primary" onclick="doCheck('booking-rooms-inline')">Search</button>
              </div>
            </div>
            <div id="booking-rooms-inline-results" class="availability-results"></div>
          </div>
        </div>
        <!-- hidden inputs -->
        <input type="hidden" id="booking-rooms-inline-checkin">
        <input type="hidden" id="booking-rooms-inline-checkout">
        <input type="hidden" id="booking-rooms-inline-guests">
        <input type="hidden" id="booking-rooms-inline-rooms">

        <div class="text-center reveal" style="margin-bottom:16px">
          <span class="section-label">Accommodation</span>
          <h2>Choose Your <em>Perfect Room</em></h2>
        </div>

        <div class="rooms-grid">
          ${ROOMS.map(room => `
          <div class="room-card reveal">
            <div class="room-card__img">${room.icon}</div>
            <div class="room-card__body">
              <div class="room-card__meta">
                <span class="room-card__tag">👤 Up to ${room.capacity}</span>
                <span class="room-card__tag">🛏 ${room.beds}</span>
                <span class="room-card__tag">📐 ${room.size}</span>
              </div>
              <h3>${room.name}</h3>
              <p>${room.desc}</p>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
                ${room.features.map(f => `<span style="font-size:0.75rem;background:var(--sand);color:var(--charcoal);padding:3px 10px;border-radius:20px">${f}</span>`).join('')}
              </div>
              <div class="room-card__footer">
                <div class="room-card__price">From £${room.prices.weekday} / night</div>
                <button class="btn btn-primary" style="padding:9px 20px;font-size:0.8rem" onclick="handleBookNow('${room.name}')">Book This Room</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- hook up inline booking -->
    <script>
      document.getElementById('rooms-checkin').addEventListener('change', e => document.getElementById('booking-rooms-inline-checkin').value = e.target.value);
      document.getElementById('rooms-checkout').addEventListener('change', e => document.getElementById('booking-rooms-inline-checkout').value = e.target.value);
      document.getElementById('rooms-guests').addEventListener('change', e => document.getElementById('booking-rooms-inline-guests').value = e.target.value);
      document.getElementById('rooms-numrooms').addEventListener('change', e => document.getElementById('booking-rooms-inline-rooms').value = e.target.value);
    <\/script>

    <section class="cta-banner">
      <div class="container reveal">
        <h2>Need Help Choosing?</h2>
        <p>Our friendly team is happy to help you find the perfect room for your stay.</p>
        <div class="cta-banner__btns">
          <a href="tel:+441481824784" class="btn btn-primary">📞 +44 1481 824784</a>
          <a href="mailto:info@lavillehotel.com" class="btn btn-outline">✉ Email Us</a>
        </div>
      </div>
    </section>
    ${renderFooter()}
  </div>`;

  // Wire up hidden inputs on render
  setTimeout(() => {
    const ci = document.getElementById('rooms-checkin');
    const co = document.getElementById('rooms-checkout');
    const g  = document.getElementById('rooms-guests');
    const r  = document.getElementById('rooms-numrooms');
    const btn = document.querySelector('.inline-booking .btn-primary');
    if (btn) btn.onclick = () => checkAvailability(ci?.value, co?.value, g?.value, r?.value, document.getElementById('booking-rooms-inline-results'));
  }, 100);
}

// ── RESTAURANT PAGE ──
function renderRestaurant() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    ${estabNavHTML('home')}
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">La Ville Hotel</span>
        <h1 class="page-hero__title">Bar & <em>Restaurant</em></h1>
        <p class="page-hero__sub">Fresh, locally sourced food served in our welcoming dining room and sunny terrace.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="split reveal">
          <div class="split__img-wrap">
            <span style="color:rgba(255,255,255,0.5);font-size:5rem">🍽</span>
          </div>
          <div class="split__content">
            <span class="section-label">Dining at La Ville</span>
            <h2>Good Food, <em>Good Times</em></h2>
            <p>Our Restaurant serves a delicious variety of food for breakfast, brunch and lunch. We always use the best, locally sourced ingredients wherever possible — because fresh island food just tastes better.</p>
            <p>Whether you're fuelling up for a day of island exploration or settling in for a lazy terrace brunch with an Aperol Spritz, we've got you covered.</p>
            <p style="font-weight:600;color:var(--terracotta);font-size:0.95rem">🍹 £5 Aperol Spritz all day, every day!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Opening Hours -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:40px">
          <span class="section-label">When We're Open</span>
          <h2>Opening <em>Hours</em></h2>
        </div>
        <div class="info-cards" style="max-width:700px;margin:0 auto">
          <div class="info-card reveal" style="text-align:left">
            <div class="info-card__icon">☀️</div>
            <h4>Breakfast</h4>
            <p>7:30am – 10:00am<br>Monday to Sunday</p>
          </div>
          <div class="info-card reveal" style="text-align:left">
            <div class="info-card__icon">🥗</div>
            <h4>Lunch</h4>
            <p>12pm – 3pm<br>Tuesday to Saturday</p>
          </div>
          <div class="info-card reveal" style="text-align:left">
            <div class="info-card__icon">🍷</div>
            <h4>Dinner</h4>
            <p>6pm – 9pm<br>Tuesday to Saturday</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Weddings & Events -->
    <section class="section">
      <div class="container">
        <div class="split split--reverse reveal">
          <div class="split__img-wrap">
            <span style="color:rgba(255,255,255,0.5);font-size:5rem">💐</span>
          </div>
          <div class="split__content">
            <span class="section-label">Special Occasions</span>
            <h2>Weddings & <em>Events</em></h2>
            <p>La Ville is the perfect venue for weddings, large parties and celebrations. Our spacious dining room and beautiful setting make it an unforgettable backdrop for your special day.</p>
            <p>We also offer an outside catering service for events across the island — whatever the occasion, our team will make it memorable.</p>
            <a href="mailto:info@lavillehotel.com" class="btn btn-primary">Enquire About Events</a>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container reveal">
        <h2>Reserve Your <em>Table</em></h2>
        <p>Join us for breakfast, brunch or lunch — no booking necessary, but we love a call ahead!</p>
        <div class="cta-banner__btns">
          <a href="tel:+441481824784" class="btn btn-primary">📞 +44 1481 824784</a>
          <a href="mailto:info@lavillehotel.com" class="btn btn-outline">✉ Email Us</a>
        </div>
      </div>
    </section>
    ${renderFooter()}
  </div>`;
}

// ── CHEZ BAR PAGE ──
function renderChez() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    ${estabNavHTML('chez')}
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">The Chez Bar · Alderney</span>
        <h1 class="page-hero__title">The <em>Chez</em> Bar</h1>
        <p class="page-hero__sub">Alderney's largest bar — live music, DJs, sports & the best rum & gin selection on the island.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="split reveal">
          <div class="split__img-wrap" style="background:linear-gradient(135deg,#1a3a47,#c4795a)">
            <span style="color:rgba(255,255,255,0.6);font-size:5rem">🍺</span>
          </div>
          <div class="split__content">
            <span class="section-label">About The Chez</span>
            <h2>Where the <em>Party's At</em></h2>
            <p>The largest bar on Alderney, with regular DJs & live music. We serve the best selection of rum, gin, draft lager and real ales on the island.</p>
            <p>The perfect venue for celebrations. With two 50" screens showing Sky TV and TNT Sports — it's the only place to be for every sporting event.</p>
            <div style="background:var(--sand);border-radius:8px;padding:18px 20px;border-left:4px solid var(--terracotta)">
              <p style="margin:0;font-size:0.95rem;color:var(--charcoal)"><strong>🥩 Meat Draw</strong> — Every Friday from 6:30pm with friends from The Alderney Farm Shop, raising money for local charities.</p>
            </div>
            <div style="background:var(--sand);border-radius:8px;padding:18px 20px;border-left:4px solid var(--ocean)">
              <p style="margin:0;font-size:0.95rem;color:var(--charcoal)"><strong>🎤 Karaoke Night</strong> — An island favourite, every Sunday from 9pm. You won't want to miss it!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Opening Times -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div style="max-width:560px;margin:0 auto">
          <div class="text-center reveal" style="margin-bottom:32px">
            <span class="section-label">When We're Open</span>
            <h2>The Chez <em>Hours</em></h2>
          </div>
          <div class="info-card reveal" style="text-align:left;background:var(--white)">
            <h4 style="font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--terracotta);margin-bottom:12px">Bar Hours</h4>
            <table class="times-table">
              <tr><td>Monday</td><td>3pm – 11pm</td></tr>
              <tr><td>Tuesday</td><td>3pm – 11pm</td></tr>
              <tr><td>Wednesday</td><td>3pm – 11pm</td></tr>
              <tr><td>Thursday</td><td>3pm – 1am</td></tr>
              <tr><td>Friday</td><td>12pm – 1am</td></tr>
              <tr><td>Saturday</td><td>12pm – 1am</td></tr>
              <tr><td>Sunday</td><td>12pm – 1am</td></tr>
            </table>
          </div>
          <div class="info-card reveal" style="margin-top:16px;text-align:left;background:var(--white)">
            <h4 style="font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ocean);margin-bottom:12px">Off-Licence Hours</h4>
            <table class="times-table">
              <tr><td>Mon – Thu</td><td>12pm – 8pm</td></tr>
              <tr><td>Fri – Sun</td><td>12pm – Late</td></tr>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container reveal">
        <h2>Join Us <em>Tonight</em></h2>
        <p>Follow @thechezbar on Instagram for events, special nights and the latest news.</p>
        <div class="cta-banner__btns">
          <a href="https://www.instagram.com/thechezbar/" target="_blank" rel="noopener" class="btn btn-primary">📷 Follow on Instagram</a>
          <a href="tel:+441481824784" class="btn btn-outline">📞 Call The Hotel</a>
        </div>
      </div>
    </section>
    ${renderFooter()}
  </div>`;
}

// ── FOOD DUDE PAGE ──
function renderFoodDude() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    ${estabNavHTML('fooddude')}
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">La Ville · Mobile Catering</span>
        <h1 class="page-hero__title">Food <em>Dude</em></h1>
        <p class="page-hero__sub">La Ville's licensed mobile catering facility — bringing great food to every corner of Alderney.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="split reveal">
          <div class="split__img-wrap" style="background:linear-gradient(135deg,#c4795a,#f5c842)">
            <span style="color:rgba(255,255,255,0.7);font-size:5rem">🍦</span>
          </div>
          <div class="split__content">
            <span class="section-label">About Food Dude</span>
            <h2>Great Food, <em>Anywhere</em></h2>
            <p>The Food Dude is La Ville's licensed mobile catering facility. You'll find us at all major island events — bringing the flavour wherever the fun is!</p>
            <p>Keep your eyes peeled at Alderney Week, Bunkers Parties, Sports Matches, Hill Climb Weekend, Bonfire Night and the Christmas Market.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:40px">
          <span class="section-label">Our Equipment</span>
          <h2>Sweet Treats & <em>More</em></h2>
        </div>
        <div class="features">
          <div class="feature-card reveal">
            <span class="feature-card__icon">🍦</span>
            <h3>Mr Whippy</h3>
            <p>Classic soft-serve ice cream — the ultimate island treat on a warm Alderney day.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">🩷</span>
            <h3>Candy Floss</h3>
            <p>Fluffy, colourful candy floss that delights guests of all ages at any event.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">🥞</span>
            <h3>Crêperie</h3>
            <p>Sweet and savoury crêpes made fresh — a crowd favourite at every event we attend.</p>
          </div>
          <div class="feature-card reveal">
            <span class="feature-card__icon">🍿</span>
            <h3>Popcorn Machine</h3>
            <p>Freshly popped popcorn in a variety of flavours — perfect for parties and markets.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container reveal">
        <h2>Book Us for <em>Your Event</em></h2>
        <p>We can be booked for private events including weddings, garden parties and corporate functions.</p>
        <div class="cta-banner__btns">
          <a href="mailto:info@lavillehotel.com" class="btn btn-primary">✉ Get a Quote</a>
          <a href="tel:+441481824784" class="btn btn-outline">📞 +44 1481 824784</a>
        </div>
      </div>
    </section>
    ${renderFooter()}
  </div>`;
}

// ── ALDERNEY PAGE ──
function renderAlderney() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">Channel Islands</span>
        <h1 class="page-hero__title">Discover <em>Alderney</em></h1>
        <p class="page-hero__sub">From stunning clifftops to crystal-clear beaches — the hidden gem of the Channel Islands awaits.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="split reveal">
          <div class="split__img-wrap" style="background:linear-gradient(135deg,#2d5a6b,#4a7d91)">
            <span style="color:rgba(255,255,255,0.6);font-size:5rem">🌊</span>
          </div>
          <div class="split__content">
            <span class="section-label">The Island</span>
            <h2>A Place Like <em>No Other</em></h2>
            <p>From stunning views to pleasant walks, Alderney has a wonderful selection of nature and activities. With a slow pace of life, it's perfect for a relaxing holiday or an escape from the bustle of city life.</p>
            <p>Alderney's beaches are boasted as the best in the Channel Islands — with crystal clear waters and soft sand. Whether you want a relaxing holiday or one packed with adventure, Alderney has it all.</p>
            <a href="https://www.visitalderney.com/" target="_blank" rel="noopener" class="btn btn-ocean">Visit Alderney →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Attractions -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:40px">
          <span class="section-label">Things to Do</span>
          <h2>Island <em>Highlights</em></h2>
        </div>
        <div class="attractions-grid">
          <div class="attraction-card reveal">
            <div class="attraction-card__img">🏖</div>
            <div class="attraction-card__body">
              <h3>Braye Beach</h3>
              <p>The island's most popular beach, with a beautiful stretch of golden sand and calm waters perfect for swimming and paddling.</p>
            </div>
          </div>
          <div class="attraction-card reveal">
            <div class="attraction-card__img">🦆</div>
            <div class="attraction-card__body">
              <h3>Alderney Wildlife Trust</h3>
              <p>Home to rare puffins, gannets and blonde hedgehogs — Alderney's wildlife is extraordinary and unlike anywhere else in the British Isles.</p>
            </div>
          </div>
          <div class="attraction-card reveal">
            <div class="attraction-card__img">⛵</div>
            <div class="attraction-card__body">
              <h3>Gannet Rock</h3>
              <p>A spectacular wander from the hotel to see thousands of gannets — an unforgettable and uniquely Alderney experience.</p>
            </div>
          </div>
          <div class="attraction-card reveal">
            <div class="attraction-card__img">🏛</div>
            <div class="attraction-card__body">
              <h3>Alderney Museum</h3>
              <p>Explore Alderney's fascinating history spanning many centuries, from ancient occupation to the Second World War.</p>
            </div>
          </div>
          <div class="attraction-card reveal">
            <div class="attraction-card__img">🚴</div>
            <div class="attraction-card__body">
              <h3>Lighthouse Ride</h3>
              <p>Hire a bike and ride out to the lighthouse for breathtaking views across the Channel — a must-do for every visitor.</p>
            </div>
          </div>
          <div class="attraction-card reveal">
            <div class="attraction-card__img">⛪</div>
            <div class="attraction-card__body">
              <h3>St. Anne's Church</h3>
              <p>One of the finest Victorian buildings in the Channel Islands, visible from La Ville Hotel — a beautiful landmark in the heart of town.</p>
            </div>
          </div>
        </div>
        <p style="text-align:center;margin-top:28px;font-size:0.85rem">Photos with thanks to Alderney's talented photographer Stevie Phelan</p>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container reveal">
        <h2>Your <em>Alderney</em> Adventure Starts Here</h2>
        <p>Book your room at La Ville and let the island do the rest.</p>
        <div class="cta-banner__btns">
          <a href="#rooms" class="btn btn-primary">Book Your Stay</a>
          <a href="https://www.visitalderney.com/" target="_blank" rel="noopener" class="btn btn-outline">Visit Alderney Website</a>
        </div>
      </div>
    </section>
    ${renderFooter()}
  </div>`;
}

// ── CONTACT PAGE ──
function renderContact() {
  document.getElementById('main-content').innerHTML = `
  <div class="page">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__kicker">La Ville Hotel</span>
        <h1 class="page-hero__title">Get in <em>Touch</em></h1>
        <p class="page-hero__sub">We'd love to hear from you — whether it's a booking, event enquiry or just a question about the island.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="reveal">
            <span class="section-label">Contact Details</span>
            <h2>We're <em>Here</em> to Help</h2>
            <p style="margin-bottom:32px">Our friendly team is always happy to assist. Give us a call, drop us an email, or pop in and see us on Victoria Street.</p>

            <div class="contact-detail">
              <div class="contact-detail__icon">📍</div>
              <div class="contact-detail__text">
                <h4>Address</h4>
                <p>La Ville Hotel<br>Victoria Street<br>Alderney, GY9 3TA<br>Channel Islands</p>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail__icon">📞</div>
              <div class="contact-detail__text">
                <h4>Phone</h4>
                <a href="tel:+441481824784">+44 1481 824784</a>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail__icon">✉</div>
              <div class="contact-detail__text">
                <h4>Email</h4>
                <a href="mailto:info@lavillehotel.com">info@lavillehotel.com</a>
              </div>
            </div>

            <hr style="border:none;border-top:1px solid var(--stone);margin:28px 0">

            <h3 style="font-size:1.2rem;margin-bottom:20px">Getting Here</h3>
            <div class="contact-detail">
              <div class="contact-detail__icon">🚕</div>
              <div class="contact-detail__text">
                <h4>Taxi – Alderney</h4>
                <a href="tel:+447781137053">+44 7781 137053</a><br>
                <a href="mailto:alderneytaxi@gmail.com">alderneytaxi@gmail.com</a>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail__icon">🚗</div>
              <div class="contact-detail__text">
                <h4>Taxi – Southampton</h4>
                <p>Nik Alen Cars</p>
                <a href="http://nikalencars.co.uk/" target="_blank" rel="noopener">nikalencars.co.uk</a><br>
                <a href="tel:07969665640">079 696 65640</a>
              </div>
            </div>

            <div class="map-placeholder reveal" style="margin-top:28px">
              <div class="map-placeholder__icon">🗺</div>
              <p>Victoria Street, Alderney, GY9 3TA</p>
              <a href="https://www.google.com/maps/search/La+Ville+Hotel+Victoria+Street+Alderney" target="_blank" rel="noopener">Open in Google Maps →</a>
            </div>
          </div>

          <div class="reveal">
            <span class="section-label">Send a Message</span>
            <h2>Drop Us a <em>Line</em></h2>
            <div class="contact-form" style="margin-top:24px">
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-name">Your Name</label>
                  <input type="text" id="contact-name" placeholder="Jane Smith">
                </div>
                <div class="form-group">
                  <label for="contact-email">Email Address</label>
                  <input type="email" id="contact-email" placeholder="jane@example.com">
                </div>
              </div>
              <div class="form-group">
                <label for="contact-phone">Phone (optional)</label>
                <input type="tel" id="contact-phone" placeholder="+44 ...">
              </div>
              <div class="form-group">
                <label for="contact-subject">Subject</label>
                <select id="contact-subject">
                  <option value="">Select a topic...</option>
                  <option>Room Booking Enquiry</option>
                  <option>Restaurant / Events</option>
                  <option>The Chez Bar</option>
                  <option>Food Dude Booking</option>
                  <option>Wedding Enquiry</option>
                  <option>General Question</option>
                </select>
              </div>
              <div class="form-group">
                <label for="contact-msg">Message</label>
                <textarea id="contact-msg" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button class="btn btn-primary" onclick="submitContactForm()" style="width:100%;justify-content:center">Send Message →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  </div>`;
}

function submitContactForm() {
  const name = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const msg = document.getElementById('contact-msg')?.value.trim();
  if (!name || !email || !msg) {
    showToast('Please fill in your name, email and message.', 'error');
    return;
  }
  showToast(`Thanks ${name}! We've received your message and will be in touch soon. 💙`, 'success');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  router.init();
  setTimeout(() => {
    document.getElementById('loading')?.classList.add('hidden');
  }, 400);
});
