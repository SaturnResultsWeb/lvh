# DESIGN.md — La Ville Hotel Website

**Design Philosophy:** Warm, editorial hospitality. Island soul with premium finish.  
**Reference aesthetic:** Lime Wood Hotel, The Pig Hotels, White Lotus — understated luxury, natural materials, personality over polish.  
**Design variance:** 8/10 — asymmetric, editorial, distinct. Not corporate. Not generic.  
**Motion intensity:** 6/10 — purposeful scroll animations, subtle physics. Nothing gratuitous.  
**Visual density:** 4/10 — generous white space, content breathes.

---

## 1. Color System

### Current CSS Custom Properties

```css
:root {
  --sand:       #f5efe6;   /* Warm off-white — section backgrounds */
  --cream:      #fdf9f4;   /* Page base — softer than white */
  --stone:      #e8ddd0;   /* Borders, dividers, form inputs */
  --terracotta: #c4795a;   /* Primary accent — CTAs, labels, highlights */
  --terra-dark: #a85e42;   /* Terracotta hover/pressed state */
  --ocean:      #2d5a6b;   /* Secondary accent — logo, nav active, info sections */
  --ocean-lt:   #4a7d91;   /* Ocean hover state */
  --charcoal:   #2a2421;   /* Near-black — headings, body text */
  --mid-grey:   #7a6e67;   /* Body paragraphs, secondary text */
  --white:      #ffffff;
  --nav-h:      76px;      /* Navbar height (desktop) — 62px on mobile */
  --r:          5px;       /* Default border-radius */
  --ease:       0.28s ease;
  --sh:         0 4px 24px rgba(42,36,33,.10);    /* Standard shadow */
  --sh-lg:      0 12px 48px rgba(42,36,33,.16);   /* Large shadow */
}
```

### Palette Usage Rules

| Color | Use |
|---|---|
| `--cream` | Page background — never pure white |
| `--sand` | Alternate section backgrounds, form inputs |
| `--stone` | Borders, dividers, card separators |
| `--terracotta` | Primary CTA buttons, label accents, hover states |
| `--terra-dark` | Terracotta pressed/hover state |
| `--ocean` | Logo, secondary buttons, hero backgrounds, dark sections |
| `--ocean-lt` | Ocean hover/gradient endpoint |
| `--charcoal` | All headings, strong text — never pure black (`#000`) |
| `--mid-grey` | Body paragraphs, captions, secondary information |

### Color Principle
Two accent colors (terracotta + ocean) that feel complementary — terracotta is warm and inviting (food, welcome, CTAs), ocean is cool and grounding (location, reliability, navigation). Neither is oversaturated. The combination suggests warmth, water, and the natural world simultaneously — perfect for an island hotel.

---

## 2. Typography

### Font Stack

```css
/* Display / Headings */
font-family: 'Cormorant Garamond', Georgia, serif;
/* Weights used: 300, 400, 500, 600 — both upright and italic */

/* Body / UI */
font-family: 'DM Sans', system-ui, sans-serif;
/* Optical sizes: 9..40 — Weights: 300, 400, 500, 600 */
```

### Type Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| `h1` | `clamp(2.2rem, 5vw, 4rem)` | 400 | Cormorant Garamond |
| `h2` | `clamp(1.7rem, 3.5vw, 2.8rem)` | 400 | Cormorant Garamond |
| `h3` | `clamp(1.2rem, 2.5vw, 1.75rem)` | 400 | Cormorant Garamond |
| `h4` | `1.1rem` | 400 | Cormorant Garamond |
| `p` | `1rem` | 400 | DM Sans, `line-height: 1.8` |
| Labels | `0.75rem` | 600 | DM Sans, `letter-spacing: 0.22em`, uppercase |
| Nav links | `0.8rem` | 500 | DM Sans, `letter-spacing: 0.06em`, uppercase |
| Buttons | `0.85rem` | 600 | DM Sans, `letter-spacing: 0.07em`, uppercase |
| Logo name | `1.55rem` | 500 | Cormorant Garamond |
| Logo tag | `0.62rem` | 400 | DM Sans, `letter-spacing: 0.2em`, uppercase |

### Italic Use
Italic weight (Cormorant Garamond italic) is used strategically in headings to signal warmth and personality. Pattern: `"Good Food, <em>Good Times</em>"` — the italic word is the emotive, distinctive word. Never apply italic to entire headings.

### Line Height
- Headings: `1.15`
- Body: `1.8`
- DM Sans body: `1.7`

---

## 3. Spacing System

### Container
```css
.container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
```

### Section Padding
```css
.section    { padding: 80px 0; }    /* Standard sections */
.section-lg { padding: 120px 0; }   /* Large/feature sections */
/* Mobile overrides */
@media (max-width: 768px) {
  .section    { padding: 56px 0; }
  .section-lg { padding: 72px 0; }
}
```

### Key Spacing Values
| Context | Value |
|---|---|
| Card padding | `32px 26px` |
| Info box padding | `22px` |
| Button padding | `13px 30px` (standard), `9px 20px` (small) |
| Form gap | `12px` |
| Nav link padding | `8px 13px` |
| Top bar padding | `9px 0` |
| Footer padding | `64px 0 0` |
| Footer grid gap | `44px` |

---

## 4. Layout System

### Grid Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Default | > 1060px | Full desktop layout |
| Large tablet | ≤ 1060px | Hero collapses to single column, booking widget hidden, footer → 2 cols |
| Mobile | ≤ 768px | Nav collapses, splits → single col, contact grid → 1 col, footer → 1 col |
| Small mobile | ≤ 480px | Rooms/attract/cards grids → 1 col, strip → 1 col |

### Core Layout Classes

```css
/* Split / 50-50 feature layout */
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.split.rev { direction: rtl; } /* Reverses column order */
.split.rev > * { direction: ltr; }

/* Card grids */
.cards-grid    { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.rooms-grid    { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
.attract-grid  { grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); }
.testi-grid    { grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); }
.info-grid     { grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.footer-grid   { grid-template-columns: 2fr 1fr 1fr 1.5fr; }

/* Photo strip */
.strip { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4px; height: 320px; }

/* Hero (homepage) */
.hero .container { display: grid; grid-template-columns: 1fr 360px; gap: 60px; }
```

### Contact Layout
```css
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
```

---

## 5. Component Library

### 5.1 Navbar

- `position: sticky; top: 0; z-index: 200`
- Background: `rgba(253,249,244,.96)` with `backdrop-filter: blur(14px)`
- Gains `.scrolled` class → `box-shadow: var(--sh)` on scroll > 30px
- Mobile: hamburger toggle, full-width dropdown with `.open` class
- Active link: detected by JS, adds `.active` class → `color: var(--ocean); background: var(--sand)`

### 5.2 Top Bar

- Ocean background (`var(--ocean)`)
- White text at 80% opacity
- Flexbox, space-between, wraps on mobile
- Contains phone, email, address, Instagram link

### 5.3 Hero (Homepage)

- `min-height: calc(92vh - var(--nav-h))`
- Background: `linear-gradient(135deg, #1a3a47, #2d5a6b, #3d7a8a)` with ocean image overlay at 20% opacity + luminosity blend mode
- Gradient overlay from left to right: `rgba(26,58,71,.88)` → `rgba(26,58,71,.5)` → transparent
- Two-column grid: content left, booking widget right (widget hidden on mobile)

### 5.4 Page Hero (Inner pages)

- Background: `linear-gradient(135deg, #1a3a47 0%, #2d5a6b 60%, #3d7a8a 100%)` with radial terracotta wash
- Centered text layout
- White `h1`, white kicker, white/70 paragraph
- Padding: `90px 0 80px`

### 5.5 Buttons

```css
/* Variants */
.btn-primary  /* terracotta fill, white text */
.btn-outline  /* transparent, terracotta border + text → fills on hover */
.btn-ocean    /* ocean fill, white text */
.btn-white    /* white fill, ocean text */
.btn-sm       /* smaller padding: 9px 20px */

/* All buttons */
display: inline-flex;
padding: 13px 30px;
font-size: 0.85rem;
font-weight: 600;
letter-spacing: 0.07em;
text-transform: uppercase;
border-radius: var(--r);
transition: var(--ease);
```

**Hover states:**
- `btn-primary`: `background: var(--terra-dark)` + `translateY(-2px)` + shadow
- `btn-ocean`: `background: var(--ocean-lt)` + `translateY(-2px)`
- `btn-outline`: fills with terracotta, text → white
- `btn-white`: `background: var(--sand)`

### 5.6 Label

```css
.label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--terracotta);
  font-weight: 600;
  margin-bottom: 14px;
}
/* Decorative line before label */
.label::before { content: ''; width: 26px; height: 1.5px; background: var(--terracotta); }
```

### 5.7 Cards

```css
.card {
  background: #fff;
  border-radius: 10px;
  padding: 32px 26px;
  box-shadow: 0 2px 14px rgba(42,36,33,.07);
  border-bottom: 3px solid transparent;
  transition: transform .3s, box-shadow .3s, border-bottom-color .3s;
}
.card:hover { transform: translateY(-4px); box-shadow: var(--sh); border-bottom-color: var(--terracotta); }
```

### 5.8 Room Cards

- White background, `border-radius: 12px`, overflow hidden
- Thumb: `height: 200px`, ocean gradient background, large emoji icon
- Body: `padding: 22px`
- Meta row: capacity, bed type, room size as small tags
- Amenity chips: sand background, `border-radius: 20px`
- Footer: price (left) + "Book This Room" button (right)

### 5.9 Booking Widget

- White card, `border-radius: 12px`, large shadow
- Check-in / check-out date pickers
- Guests + Rooms selects
- Results panel with `badge-ok` (green), `badge-ltd` (amber), `badge-no` (red) availability states
- Inline on homepage (hero sidebar), full-width on rooms page

### 5.10 Info Boxes

```css
.info-box {
  background: #fff;
  border-radius: 10px;
  padding: 22px;
  box-shadow: 0 2px 12px rgba(42,36,33,.07);
  text-align: center;
}
```

### 5.11 Notice Boxes

```css
.notice { background: var(--sand); border-left: 4px solid var(--terracotta); border-radius: 0 6px 6px 0; padding: 16px 20px; }
.notice--ocean { border-color: var(--ocean); }
```

### 5.12 Photo Strip

- Three-panel grid: `2fr 1fr 1fr`
- Height: `320px`
- Currently: emoji on ocean background
- Target: real photography, `object-fit: cover`

### 5.13 Testimonial Cards

- Ocean section background
- Cards: `rgba(255,255,255,.08)` background, `1px solid rgba(255,255,255,.12)` border
- Quote: Cormorant Garamond italic
- Stars: `#f5c842`

### 5.14 Footer

- Charcoal background (`var(--charcoal)`)
- 4-column grid: Brand (2fr), Navigate (1fr), Hours (1fr), Contact (1.5fr)
- Bottom bar: full-width, `1px solid rgba(255,255,255,.1)` top border
- Links: `rgba(255,255,255,.6)` → `var(--terracotta)` on hover
- Social circles: `34px`, border with hover fill

### 5.15 Establishment Sub-Nav

- Sand background, stone bottom border
- Tab-style links with bottom border indicator on active
- Ocean color for active state

### 5.16 Times Table

```css
.t-table { width: 100%; border-collapse: collapse; }
.t-table tr { border-bottom: 1px solid var(--sand); }
.t-table td { padding: 10px 0; font-size: 0.9rem; color: var(--mid-grey); }
.t-table td:first-child { font-weight: 700; color: var(--charcoal); width: 110px; }
```

### 5.17 Contact Form

- Grid layout, `gap: 14px`
- Labels above inputs (always)
- Inputs: stone border, cream background → white + ocean border on focus
- Textarea: `min-height: 140px`, `resize: vertical`
- Custom select arrow via SVG background-image

### 5.18 Map Placeholder

- Ocean-to-charcoal gradient background, `border-radius: 12px`, `height: 320px`
- Contains icon, address text, Google Maps deep-link

### 5.19 Toast Notifications

```css
#toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  /* Animates in from translateY(80px) opacity:0 → translateY(0) opacity:1 */
  /* .ok variant: green left border */
  /* .err variant: terracotta left border */
}
```

---

## 6. Animation System

### Scroll Reveal

All elements with `.reveal` class animate in on scroll via `IntersectionObserver`.

```css
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }
```

Threshold: `0.08` — triggers when 8% of element is visible. Once triggered, observer disconnects.

### Navbar Scroll Shadow
```js
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
```

### Button Transitions
All buttons use `transition: var(--ease)` = `0.28s ease`.  
Hover: `translateY(-2px)` on primary and ocean variants.

### Card Hover
Cards: `transition: transform .3s, box-shadow .3s, border-bottom-color .3s`  
Hover: `translateY(-4px)` + elevated shadow + terracotta bottom border.

### Room / Attract Card Hover
`transition: transform .3s, box-shadow .3s`  
Room card hover: `translateY(-5px)` + large shadow.  
Attract card hover: `translateY(-3px)`.

---

## 7. Easing Principles (Emil Kowalski Framework)

Current easing is generic CSS `ease`. For v3 redesign, apply these corrections:

| Current | Target | Why |
|---|---|---|
| `transition: var(--ease)` (0.28s ease) | `transition: transform 200ms cubic-bezier(0.23,1,0.32,1)` | Strong ease-out feels responsive, not sluggish |
| `transition: all 300ms` (implicit in some hovers) | Specify exact properties only | Avoids animating expensive properties accidentally |
| No `:active` state on buttons | `transform: scale(0.97)` on `:active` | Buttons must feel pressed |
| No `@starting-style` or mount animation | `opacity: 0; transform: translateY(8px)` → `opacity: 1; transform: none` | Toast and card entries should feel natural |
| Generic `ease` on card hover | `cubic-bezier(0.23,1,0.32,1)` | Snappier, more intentional |

### Recommended Custom Curves (v3)
```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);      /* UI interactions, entries */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);     /* On-screen movement */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);      /* Drawers, panels */
}
```

---

## 8. GSAP Scroll Paradigms (v3 Target)

When implementing GSAP in v3, the following paradigms are prescribed:

### Pin + Scroll Gallery
- Pin the section headline on the left
- Gallery of room/attraction cards scrolls vertically on the right
- Use `ScrollTrigger { pin: true, scrub: 1 }`

### Image Scale Reveal
- Images start at `scale: 0.85, opacity: 0.6`
- Scroll in → `scale: 1.0, opacity: 1.0`
- Scroll out → `opacity: 0.2` (darken as they exit)

### Text Scrub
- Paragraph words start at `opacity: 0.1`
- Individual word opacities scrub to `1.0` sequentially as user scrolls
- Use `SplitText` + `ScrollTrigger scrub: true`

### Card Stack Entry
- Feature cards stack from bottom as user scrolls
- Each card overlaps the previous with slight `y` offset

---

## 9. Photography Direction (v3)

All current imagery is emoji placeholders. Real photography requirements:

| Location | Shots needed |
|---|---|
| Hero (homepage) | Exterior of hotel on Victoria Street, golden hour |
| Rooms | Each room type: wide shot + detail of bed |
| Restaurant | Dining room, terrace, food hero shots |
| Chez Bar | Bar interior, evening atmosphere, crowd |
| Food Dude | Van at events, product shots (ice cream, crepes) |
| Alderney | Braye Beach, cliffs, St Anne's Church, wildlife |
| Strip panels | Three strong horizontal images per page |

**Photography style:** Warm, natural light. Golden hour preferred. Not styled or artificial. Real guests, real food, real atmosphere. Reference: The Pig Hotels photography.

**Interim solution:** Use `https://picsum.photos/seed/{keyword}/1920/1080` with CSS filters:
```css
filter: saturate(0.9) contrast(1.05);
mix-blend-mode: luminosity; /* for dark overlays */
opacity: 0.25; /* when used as hero background texture */
```

---

## 10. Accessibility Checklist

| Issue | Status | Fix |
|---|---|---|
| Emoji as icons | Current | Replace with `@phosphor-icons/react` or inline SVG |
| Emoji in alt text | Current | Remove from `aria-label` and `alt` attributes |
| Focus states | Partial | Add visible `:focus-visible` outlines on all interactive elements |
| Colour contrast | Good | Terracotta on cream passes AA; white on ocean passes AA |
| Mobile tap targets | Good | Buttons and links are generally large enough |
| ARIA expanded | Good | `aria-expanded` on nav toggle is implemented |
| Reduced motion | Missing | Add `@media (prefers-reduced-motion: reduce)` — disable transforms, keep opacity |
| Form error states | Missing | No inline error messages on contact form |
| Skip to main | Missing | Add `<a href="#main" class="sr-only">Skip to main content</a>` |

### Reduced Motion Rule (add to style.css)
```css
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.2s ease; transform: none; }
  .card, .room-card, .attract-card { transition: none; }
  .btn { transition: background 0.2s ease, color 0.2s ease; }
}
```

---

## 11. Design Upgrade Priorities

Ordered by impact per effort:

| Priority | Change | Effort | Impact |
|---|---|---|---|
| 1 | Replace emoji strip panels with real photography | Low | Very High |
| 2 | Add `prefers-reduced-motion` media query | Very Low | High |
| 3 | Apply strong `ease-out` curves to all transitions | Very Low | Medium |
| 4 | Add `:active` scale feedback to all buttons | Very Low | Medium |
| 5 | Replace emoji icons with Phosphor SVGs | Medium | High |
| 6 | Add GSAP scroll reveal to homepage hero | Medium | High |
| 7 | Add stagger animation to cards-grid entries | Low | Medium |
| 8 | Upgrade hero to full-bleed photography with parallax | High | Very High |
| 9 | Add a real sticky CTA / floating booking bar | Medium | High |
| 10 | Dark mode variant | High | Low |
