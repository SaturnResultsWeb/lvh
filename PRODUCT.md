# PRODUCT.md — La Ville Hotel Website

**Product:** La Ville Hotel — Public-facing marketing and booking website  
**Audience:** Leisure travellers, couples, families, groups visiting Alderney  
**Primary goal:** Convert website visitors into direct room bookings (call or email)  
**Secondary goals:** Showcase the restaurant/bar, promote the island as a destination

---

## 1. Business Summary

La Ville Hotel sits at the heart of Victoria Street, Alderney — the main street of the island's only town, St. Anne's. The hotel is a full-service property: accommodation, restaurant, and bar all under one roof, with The Chez Bar operating as a companion venue next door.

Alderney is the smallest of the inhabited Channel Islands, known for extraordinary wildlife (puffins, gannets, blonde hedgehogs), WWII history, and an unhurried way of life. The hotel positions itself as the ideal base for visitors: welcoming, sociable, and deeply connected to island life.

The business is not a faceless chain — it has real personality. The Chez Bar hosts karaoke Sundays and Friday meat draws. The restaurant does £5 Aperol Spritzes all day. The Food Dude van shows up at Alderney Week. This personality needs to come through in the website.

---

## 2. Target Audiences

| Audience | Profile | Primary Need |
|---|---|---|
| Couples | UK-based, seeking island escape | Romance, calm, good food |
| Families | Parents with children, school holidays | Space, flexibility, activities nearby |
| Groups | Friends, stag/hen, corporate | Social venues (bar), capacity |
| Wildlife/nature tourists | Birdwatchers, walkers | Proximity to natural attractions |
| Event guests | Wedding, party, celebration attendees | Venue hire, catering |
| Business visitors | Work-related travel to Alderney | Reliable, central, comfortable |

---

## 3. Page Inventory

### 3.1 Homepage — `index.html`

**Purpose:** First impression. Communicate what La Ville is, where it is, and why to book.

**Sections:**
1. Top bar (phone, email, address, Instagram)
2. Sticky navbar with Book Now CTA
3. Hero — full-height, island atmosphere, inline booking widget (desktop), two CTAs
4. Quick facts strip — 20 rooms, Bar & Restaurant, The Chez Bar, Heart of Alderney
5. About split — history of the hotel, St. Anne's Church view
6. Photo strip (3-panel visual)
7. Feature cards — Island Escape, Fresh Local Food, Events & Celebrations, Sports & Entertainment
8. Testimonials — 3 guest reviews (5-star)
9. Alderney teaser split — links to Alderney page
10. CTA banner — Check Availability, Call to Book, Email Us
11. Footer — full links, hours, address, socials

**Key interactions:**
- Booking widget: check-in / check-out date picker, guests, rooms selector → simulated results
- Scroll reveal animations on most sections
- Sticky navbar gains shadow on scroll

---

### 3.2 Rooms — `rooms.html`

**Purpose:** Convert interest into bookings by showcasing all 7 room types.

**Sections:**
1. Page hero — "Our Rooms"
2. Inline booking widget (wider, full-width)
3. Room grid — 7 cards dynamically rendered from `ROOMS` data in `shared.js`
4. Facilities section — Wi-Fi, en-suite, tea/coffee, USB charging
5. Breakfast CTA — links to `breakfast.html`
6. Help CTA — phone and email

**Room cards include:** Room name, icon, capacity badge, bed configuration, room size, description, amenity chips, price from, "Book This Room" button (fires toast).

**Key interactions:**
- Availability checker with simulated results
- "Book This Room" fires toast with call/email prompt
- Room cards render dynamically via JS loop over `ROOMS` array

---

### 3.3 Restaurant — `restaurant.html`

**Purpose:** Drive food/dining visits and event/wedding enquiries.

**Sections:**
1. Page hero — "Bar & Restaurant"
2. Establishment sub-nav (Restaurant / Breakfast / Chez / Food Dude)
3. About split — "Good Food, Good Times" + £5 Aperol Spritz notice
4. Photo strip
5. Opening hours — Breakfast, Lunch, Dinner info boxes
6. Weddings & Events split — venue hire, outside catering
7. Hospitality Staff Discount — 20% off Wed/Thu for Alderney hospitality workers
8. CTA — call, email, view breakfast menu

**Special offers featured:**
- £5 Aperol Spritz all day every day
- 20% off for Alderney hospitality staff (Wed & Thu)

---

### 3.4 Breakfast Menu — `breakfast.html`

**Purpose:** Show the full breakfast menu with prices to pre-sell the dining experience.

**Menu sections:**

**Hot Breakfast**
| Item | Price |
|---|---|
| Full English Breakfast | £12.50 |
| Vegetarian Full Breakfast | £11.50 |
| Eggs Benedict | £10.00 |
| Eggs Royale | £11.50 |
| Eggs Florentine | £9.50 |
| Scrambled Eggs on Toast | £7.50 |
| Scrambled Eggs & Smoked Salmon | £10.50 |
| Pancakes | £8.00 |
| Pancakes with Bacon & Maple Syrup | £10.00 |

**Lighter Bites**
| Item | Price |
|---|---|
| Continental Breakfast | £8.50 |
| Toast & Preserves | £3.50 |
| Smashed Avocado on Toast | £8.00 |
| Smashed Avocado & Poached Egg | £9.50 |
| Granola with Yoghurt & Honey | £6.50 |
| Fresh Fruit Bowl | £5.00 |

**Extra Sides**
| Item | Price |
|---|---|
| Bacon (2 rashers) | £2.50 |
| Sausage (1) | £1.75 |
| Fried / Poached / Scrambled Egg | £2.00 |
| Grilled Mushrooms | £2.00 |
| Grilled Tomato | £1.50 |
| Hash Brown | £1.50 |
| Black Pudding | £2.00 |
| Smoked Salmon | £3.50 |

**Hot Drinks**
| Item | Price |
|---|---|
| Nespresso Coffee | £3.00 |
| Pot of Tea | £2.50 |
| Hot Chocolate | £3.00 |

**Cold Drinks**
| Item | Price |
|---|---|
| Fresh Orange Juice | £3.00 |
| Apple Juice | £2.50 |
| Still / Sparkling Water | £1.50 |

**Note:** Breakfast included for hotel guests. Walk-ins welcome — no booking required.  
**Hours:** 7:30am – 10:00am daily.  
**Saturday special:** From 8:30am — ice cream, burgers and brunch specials.

---

### 3.5 The Chez Bar — `chez-bar.html`

**Purpose:** Showcase Alderney's largest bar as a destination in its own right.

**Sections:**
1. Page hero — "The Chez Bar"
2. Establishment sub-nav
3. About split — "Where the Party's At" + Friday Meat Draw notice + Karaoke notice
4. Photo strip
5. Opening times — Bar Hours and Off-Licence hours
6. Regular events — Live Sports, Karaoke Sundays, Friday Meat Draw, Live Music & DJs
7. Drinks section (ocean background) — Rum & Gin, Draft & Ales, Cocktails
8. CTA — Follow on Instagram

**Regular events:**
| Event | When |
|---|---|
| Karaoke Night | Every Sunday from 9pm |
| Meat Draw (with Alderney Farm Shop) | Every Friday from 6:30pm |
| Live Sports | Every major match — Sky TV & TNT Sports, two 50" screens |
| Live Music & DJs | Regular throughout year — check Instagram for dates |

---

### 3.6 Food Dude — `food-dude.html`

**Purpose:** Promote the mobile catering unit for events and private hire.

**Sections:**
1. Page hero — "Food Dude"
2. Establishment sub-nav
3. About split — "Great Food, Anywhere"
4. Equipment grid — Mr Whippy Ice Cream, Candy Floss Machine, Crêperie, Popcorn Machine
5. Major events split — all annual Alderney events attended
6. CTA — book for private events

**Events attended:**
- Alderney Week (annual, August)
- Bunkers Parties
- Sports Matches
- Hill Climb Weekend
- Bonfire Night
- Christmas Market

**Available for private hire:** Weddings, garden parties, corporate functions — contact for quote.

---

### 3.7 Alderney — `alderney.html`

**Purpose:** Sell Alderney as a destination to encourage bookings from visitors who haven't committed yet. Doubles as a local tourism resource.

**Sections:**
1. Page hero — "Discover Alderney"
2. Island introduction split
3. Photo strip
4. Attractions grid (9 cards)
5. Getting Here split (flights + ferries)
6. CTA — Book Your Stay

**Attractions featured:**
| Attraction | Description |
|---|---|
| Braye Beach | Golden sand, calm waters, beach bar |
| Alderney Wildlife Trust | Puffins, gannets, blonde hedgehogs |
| Gannet Rock | Thousands of nesting gannets |
| Alderney Museum | History from ancient to WWII |
| Lighthouse Ride | Bike hire + panoramic views |
| St. Anne's Church | Cathedral of the Channel Islands |
| WWII Fortifications | Most intact in British Isles |
| Water Taxis & Boat Trips | Surrounding waters exploration |
| Alderney Week | Annual August celebration |

**Getting here:**
- By air: Aurigny from Guernsey & Southampton; Finistair from France
- By sea: Water Taxi CI and other operators from Guernsey
- From airport/harbour: Local taxis available

---

### 3.8 Contact — `contact.html`

**Purpose:** Provide all contact methods and help visitors plan their journey.

**Sections:**
1. Page hero — "Get in Touch"
2. Two-column layout: Contact details (left) + Contact form (right)
3. Contact form: Name, Email, Phone, Topic (dropdown), Message
4. Opening hours grid (Restaurant + Chez Bar)
5. Getting here (taxis — Alderney + Southampton)
6. Map placeholder with Google Maps link
7. Quick contact boxes (Call Us / Email Us)
8. CTA — Check Availability

**Contact form topic options:**
- Room Booking Enquiry
- Restaurant / Table Reservation
- Wedding or Events Enquiry
- The Chez Bar
- Food Dude Booking
- General Question
- Other

**Note:** Form is client-side only — no data is currently sent. Needs a real backend.

---

## 4. User Journeys

### Journey 1: Direct Booking
Homepage → Rooms page → Check availability (widget) → Toast with phone/email → Call hotel → Book

### Journey 2: Evaluate then Book
Homepage → Rooms page → Alderney page → Homepage → Contact form or phone call

### Journey 3: Restaurant Visit
Direct to Restaurant page → Check opening hours → Turn up (no booking needed for breakfast/lunch)

### Journey 4: Event Enquiry
Homepage or Restaurant page → Weddings & Events section → Email enquiry

### Journey 5: Local / Bar
Direct to Chez Bar page → Check what's on → Turn up

### Journey 6: Food Dude Hire
Food Dude page → See equipment and events → Email for quote

---

## 5. Features Inventory

| Feature | Status | Notes |
|---|---|---|
| Booking availability widget | Simulated | Date seed-based fake results. No real PMS. |
| Room cards (dynamic) | Working | Rendered from JS `ROOMS` array |
| Contact form | Client-only | Toast confirmation only. No data sent. |
| Mobile hamburger nav | Working | Toggle via `shared.js` |
| Active nav link detection | Working | Matches filename via `location.pathname` |
| Scroll reveal animations | Working | IntersectionObserver with `.reveal` class |
| Sticky navbar + scroll shadow | Working | `.scrolled` class on scroll |
| Toast notifications | Working | Global `showToast()` function |
| Establishment sub-nav | Working | On restaurant, breakfast, chez, food-dude pages |
| Responsive layout | Working | Breakpoints at 1060px, 768px, 480px |

---

## 6. Content Tone & Voice

- Friendly and welcoming, not corporate
- British English spelling throughout
- Enthusiastic about Alderney — the island is a genuine selling point
- Honest about what they are: a community-facing, social hotel
- Specific over generic: "£5 Aperol Spritz all day, every day" not "great drink deals"
- First-person plural ("we", "our") throughout
- Italics in headings signal warmth and personality (e.g., "Good Food, *Good Times*")

---

## 7. SEO & Metadata

Current state per page:

| Page | Title | Description |
|---|---|---|
| index.html | La Ville Hotel – Alderney \| Welcome | 20 en-suite rooms, restaurant, bar in heart of Victoria Street |
| rooms.html | Our Rooms – La Ville Hotel Alderney | Twin, Double, King Suite, Triple, Family, Quad |
| restaurant.html | Bar & Restaurant – La Ville Hotel Alderney | Fresh locally sourced food, weddings, events |
| breakfast.html | Breakfast Menu – La Ville Hotel Alderney | Served daily 7:30am to 10:00am |
| chez-bar.html | The Chez Bar – La Ville Hotel Alderney | Largest bar, live music, Sky TV, rum, gin |
| food-dude.html | Food Dude – La Ville Hotel Alderney | Licensed mobile catering, events, weddings |
| alderney.html | Alderney – La Ville Hotel Alderney | Beaches, wildlife, history, Channel Islands |
| contact.html | Contact – La Ville Hotel Alderney | Phone, email, address, taxi info |

**Missing (to add in v3):**
- Open Graph / Twitter Card meta tags
- Structured data: Hotel schema, Restaurant schema
- Canonical URLs
- XML sitemap
- robots.txt
- Favicon (currently SVG data-URI with emoji)

---

## 8. Conversion Points

| Page | CTA | Action |
|---|---|---|
| All pages | "Book Now" in nav | → rooms.html |
| Homepage | "View Our Rooms" | → rooms.html |
| Homepage | "Get in Touch" | → contact.html |
| Rooms | "Book This Room" | Toast with phone/email |
| Rooms | Booking widget | Simulated check then toast |
| Restaurant | "Enquire About Events" | mailto: |
| Restaurant | "View Breakfast Menu" | → breakfast.html |
| All pages | Footer phone number | tel: link |
| All pages | Footer email | mailto: link |
| Contact | Contact form | Client-side toast only |

---

## 9. Missing Pages / Future Pages

| Page | Priority | Description |
|---|---|---|
| Gallery | High | Real photography of rooms, food, bar, island |
| Weddings | Medium | Dedicated page for wedding venue hire |
| Events | Medium | What's on calendar at The Chez Bar |
| Accessibility statement | Low | Legal requirement in UK |
| Privacy policy | Low | GDPR compliance |
| Cookie notice | Low | Required for any analytics/tracking |
