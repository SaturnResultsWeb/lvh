/* nav-footer.js — injects consistent nav and footer across all pages */
(function(){
  // Insert top bar before body
  const topBar = `
<div class="top-bar">
  <div class="container">
    <div class="top-bar__group">
      <a href="tel:+441481824784">📞 +44 1481 824784</a>
      <span class="top-bar__sep">|</span>
      <a href="mailto:info@lavillehotel.com">✉ info@lavillehotel.com</a>
    </div>
    <div class="top-bar__group">
      <span>Victoria Street · Alderney · Channel Islands</span>
      <a href="https://www.instagram.com/laville_hotel/" target="_blank" rel="noopener">📷 Instagram</a>
    </div>
  </div>
</div>`;

  const navbar = `
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="index.html" class="logo" aria-label="La Ville Hotel">
      <span class="logo__name">La Ville</span>
      <span class="logo__tag">Hotel · Alderney</span>
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-list" id="nav-list">
      <li><a href="index.html">Welcome</a></li>
      <li><a href="rooms.html">Our Rooms</a></li>
      <li><a href="restaurant.html">Restaurant</a></li>
      <li><a href="chez-bar.html">The Chez</a></li>
      <li><a href="food-dude.html">Food Dude</a></li>
      <li><a href="alderney.html">Alderney</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="rooms.html" class="nav-cta">Book Now</a></li>
    </ul>
  </div>
</nav>`;

  const footer = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer__brand">
        <span class="logo__name">La Ville</span>
        <span class="logo__tag">Hotel · Alderney</span>
        <p>Situated at the heart of the vibrant Alderney community, La Ville offers fantastic food, 20 spacious en-suite rooms, a cocktail bar, terrace and large dining room.</p>
        <div class="socials" style="margin-top:18px">
          <a href="https://www.instagram.com/laville_hotel/" target="_blank" rel="noopener" aria-label="La Ville Instagram">📷</a>
          <a href="https://www.instagram.com/thechezbar/" target="_blank" rel="noopener" aria-label="Chez Bar Instagram">🍹</a>
        </div>
      </div>
      <div>
        <h4>Navigate</h4>
        <ul>
          <li><a href="index.html">Welcome</a></li>
          <li><a href="rooms.html">Our Rooms</a></li>
          <li><a href="breakfast.html">Breakfast Menu</a></li>
          <li><a href="restaurant.html">Bar &amp; Restaurant</a></li>
          <li><a href="chez-bar.html">The Chez Bar</a></li>
          <li><a href="food-dude.html">Food Dude</a></li>
          <li><a href="alderney.html">Alderney</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Hotel Hours</h4>
        <ul style="gap:6px">
          <li style="color:#fff;font-weight:700;font-size:.84rem">Breakfast</li>
          <li>7:30am – 10:00am daily</li>
          <li style="color:#fff;font-weight:700;font-size:.84rem;margin-top:6px">Lunch</li>
          <li>12pm – 3pm Tue–Sat</li>
          <li style="color:#fff;font-weight:700;font-size:.84rem;margin-top:6px">Dinner</li>
          <li>6pm – 9pm Tue–Sat</li>
        </ul>
      </div>
      <div>
        <h4>Get in Touch</h4>
        <ul style="gap:8px">
          <li>📍 Victoria Street, Alderney, GY9 3TA</li>
          <li><a href="tel:+441481824784">📞 +44 1481 824784</a></li>
          <li><a href="mailto:info@lavillehotel.com">✉ info@lavillehotel.com</a></li>
        </ul>
        <h4 style="margin-top:20px">Our Establishments</h4>
        <ul style="gap:7px">
          <li><a href="index.html">🏨 La Ville Hotel</a></li>
          <li><a href="chez-bar.html">🍺 The Chez Bar</a></li>
          <li><a href="food-dude.html">🍦 Food Dude</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;width:100%">
      <span>© 2026 LV Hotel Limited</span>
      <span style="color:rgba(255,255,255,.3)">Victoria Street · Alderney · GY9 3TA · Channel Islands</span>
    </div>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', topBar + navbar);
  document.body.insertAdjacentHTML('beforeend', footer + '<div id="toast"></div>');
})();
