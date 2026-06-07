# MASTER.md — La Ville Hotel Website

**Project:** La Ville Hotel Alderney — Official Website  
**Owner:** LV Hotel Limited  
**Working Directory:** `laville-hotel-v2/laville-hotel/`  
**Status:** Active development — v2 in progress

---

## 1. Project Overview

La Ville Hotel is a 20-room boutique hotel on Victoria Street, Alderney (Channel Islands). The business operates three distinct establishments under the LV Hotel Limited umbrella:

| Establishment | Type | Instagram |
|---|---|---|
| La Ville Hotel | Accommodation + Bar & Restaurant | @laville_hotel |
| The Chez Bar | Standalone bar (next door to hotel) | @thechezbar |
| Food Dude | Licensed mobile catering unit | — |

The website is a pure HTML/CSS/JS static site. There is no backend, CMS, or build process. It runs directly from the file system and can be deployed to any static host.

---

## 2. File Structure

```
laville-hotel-v2/laville-hotel/
├── index.html          — Homepage / Welcome
├── rooms.html          — Room listing + booking widget
├── restaurant.html     — Bar & Restaurant overview
├── breakfast.html      — Breakfast menu with prices
├── chez-bar.html       — The Chez Bar page
├── food-dude.html      — Food Dude mobile catering
├── alderney.html       — Discover Alderney / tourism
├── contact.html        — Contact form + hours + taxis
├── css/
│   └── style.css       — Single master stylesheet (all components)
├── js/
│   ├── shared.js       — All shared logic: nav, rooms data, booking widget, toast, contact form
│   └── nav-footer.js   — (Unused in v2 — nav/footer are hardcoded per page)
└── README.md
```

### Root-Level Duplicates (Ignore / Delete)

The parent folder `La Ville 2/` contains loose HTML files (`index (4).html`, `contact (1).html`, etc.) that are old downloaded copies. They reference `css/style.css` but have no `css/` folder, so they render unstyled. **Do not edit these.** All active work happens inside `laville-hotel-v2/laville-hotel/`.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Markup | Vanilla HTML5 |
| Styling | Vanilla CSS3 (custom properties, grid, flexbox, clamp) |
| Scripting | Vanilla JavaScript (ES6+, no framework, no bundler) |
| Fonts | Google Fonts — Cormorant Garamond (display) + DM Sans (body) |
| Images | Currently emoji placeholders — no real photography loaded yet |
| Icons | Emoji (to be replaced with SVG/Phosphor in redesign) |
| Hosting | Static file — no server required |
| Build | None — open HTML files directly in browser |

---

## 4. Architecture Decisions

### Single Stylesheet
All CSS lives in `css/style.css`. There are no component stylesheets, no preprocessors, no utility classes. Sections are delimited by comment headers. This keeps the setup simple for a non-framework project.

### Shared JS via `shared.js`
Every page loads `js/shared.js` as its final script. This file contains:
- Navbar scroll shadow toggle
- Mobile nav hamburger toggle
- Active nav link detection (by matching `location.pathname`)
- Scroll reveal via `IntersectionObserver`
- Toast notification system
- `ROOMS` data array (canonical room definitions with IDs, capacities, prices)
- `AMENITIES` array
- `initBookingWidget(prefix)` — wires up the availability checker by DOM prefix
- `renderResults()` — renders room availability cards
- `promptBook(name)` — fires a toast directing users to call/email
- `submitContact()` — handles contact form submission (client-side only, toast only)

### `nav-footer.js` Status
`nav-footer.js` exists but is **not loaded** on any page in v2. The nav and footer are hardcoded in each HTML file. This file is a leftover from an earlier approach and can be removed or ignored.

### Booking Widget
The booking widget is a **simulated** availability checker. It uses a deterministic seed derived from the check-in date to generate fake availability badges (Available / Limited / Unavailable). No real property management system is connected. Booking redirects to a toast prompting users to call or email.

### Contact Form
The contact form is **client-side only** — `submitContact()` validates fields and fires a toast. No data is sent anywhere. A real form backend (Formspree, Netlify Forms, etc.) needs to be wired up.

---

## 5. Navigation Structure

```
Top Bar (persistent)
  ├── Phone: +44 1481 824784
  ├── Email: info@lavillehotel.com
  ├── Address: Victoria Street · Alderney · Channel Islands
  └── Instagram: @laville_hotel

Main Nav
  ├── Welcome          → index.html
  ├── Our Rooms        → rooms.html
  ├── Restaurant       → restaurant.html
  ├── The Chez         → chez-bar.html
  ├── Food Dude        → food-dude.html
  ├── Alderney         → alderney.html
  ├── Contact          → contact.html
  └── [Book Now CTA]   → rooms.html

Establishment Sub-Nav (restaurant/chez/food-dude pages only)
  ├── Bar & Restaurant → restaurant.html
  ├── Breakfast Menu   → breakfast.html
  ├── The Chez Bar     → chez-bar.html
  └── Food Dude        → food-dude.html
```

---

## 6. Room Data (Canonical)

Defined in `shared.js` — `ROOMS` array. Single source of truth.

| ID | Name | Capacity | Beds | Size | Weekday | Weekend |
|---|---|---|---|---|---|---|
| twin | Twin Room | 2 | 2 Single | 22m² | £95 | £115 |
| double | Double Room | 2 | 1 Double | 24m² | £105 | £125 |
| king | King Size Suite | 2 | 1 King | 36m² | £155 | £185 |
| triple | Triple Room | 3 | 3 Single | 28m² | £135 | £155 |
| fam4 | Family Room (sleeps 4) | 4 | 1 Double + 2 Singles | 34m² | £165 | £195 |
| fam5 | Family Room (sleeps 5) | 5 | 1 Double + 3 Singles | 40m² | £195 | £225 |
| quad | Quad Family Suite | 4 | 2 Double | 48m² | £210 | £250 |

All rooms include: En-suite, Free Wi-Fi, Tea & Coffee, Nespresso, TV, Hairdryer, USB Charging, Toiletries.

---

## 7. Business Details

| Field | Value |
|---|---|
| Legal entity | LV Hotel Limited |
| Address | Victoria Street, Alderney, GY9 3TA, Channel Islands |
| Phone | +44 1481 824784 |
| Email | info@lavillehotel.com |
| Instagram (hotel) | https://www.instagram.com/laville_hotel/ |
| Instagram (chez bar) | https://www.instagram.com/thechezbar/ |
| Google Maps | La Ville Hotel, Victoria Street, Alderney GY9 3TA |
| Taxi (Alderney) | +44 7781 137053 / alderneytaxi@gmail.com |
| Taxi (Southampton) | Nik Alen Cars — nikalencars.co.uk / 079 696 65640 |

---

## 8. Opening Hours

### Hotel Restaurant
| Service | Days | Hours |
|---|---|---|
| Breakfast | Mon–Sun | 7:30am – 10:00am |
| Lunch | Tue–Sat | 12pm – 3pm |
| Dinner | Tue–Sat | 6pm – 9pm |

### The Chez Bar
| Day | Hours |
|---|---|
| Mon–Wed | 3pm – 11pm |
| Thu | 3pm – 1am |
| Fri–Sun | 12pm – 1am |

### Off-Licence
| Days | Hours |
|---|---|
| Mon–Thu | 12pm – 8pm |
| Fri–Sun | 12pm – Late |

---

## 9. Known Issues & Technical Debt

| Issue | Severity | Detail |
|---|---|---|
| No real images | High | All visual blocks use emoji placeholders. No photography loaded. |
| No form backend | High | Contact form fires toast only — messages go nowhere. |
| No real booking system | Medium | Availability checker is simulated with a date seed. |
| Emojis throughout | Medium | Used for icons, visual placeholders, and decorative elements — not accessible or professional. |
| `nav-footer.js` orphaned | Low | Unused file. Nav/footer are hardcoded per page instead. |
| Root-level HTML duplicates | Low | Old copies in parent `La Ville 2/` folder cause confusion. |
| No `<main>` on index.html | Low | Homepage lacks `<main>` wrapper (inner pages have it). |
| No real map embed | Low | Map placeholder links to Google Maps search but has no iframe. |
| Copyright year hardcoded | Low | "© 2026 LV Hotel Limited" is hardcoded — will need updating. |

---

## 10. Redesign Goals (v3 Target)

The current v2 site is functional but visually conservative. The redesign direction targets:

1. **Premium hospitality aesthetic** — warm, editorial, island feel. Reference: Lime Wood, The Pig Hotels, White Lotus aesthetic.
2. **Real photography** — replace all emoji placeholders with actual hotel photography.
3. **GSAP scroll animations** — cinematic scroll-triggered reveals, pinned sections, parallax.
4. **Framer Motion components** — if moving to React/Next.js stack.
5. **Real booking integration** — connect to a property management API or direct booking engine.
6. **Real form backend** — Formspree, Netlify Forms, or custom endpoint.
7. **SEO optimisation** — Open Graph meta, structured data (Hotel schema), sitemap.
8. **Performance** — image optimisation (WebP), lazy loading, font display:swap.
9. **Accessibility** — replace emoji icons with proper SVGs, add ARIA labels, improve focus states.

---

## 11. Deployment Notes

The site is a static HTML site — no build step required. To deploy:
- Upload the entire `laville-hotel-v2/laville-hotel/` folder to any static host (Netlify, Vercel, GitHub Pages, traditional web hosting).
- Ensure the folder structure is preserved so relative paths (`css/style.css`, `js/shared.js`) resolve correctly.
- Do not deploy from the parent `La Ville 2/` root — only from `laville-hotel-v2/laville-hotel/`.
