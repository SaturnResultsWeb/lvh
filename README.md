# La Ville Hotel — Website

A fully rebuilt, modern static website for La Ville Hotel, Alderney.

## Pages Included

| File | Page |
|------|------|
| `index.html` | Welcome / Home |
| `rooms.html` | Our Rooms + Availability Checker |
| `breakfast.html` | Breakfast Menu |
| `restaurant.html` | Bar & Restaurant |
| `chez-bar.html` | The Chez Bar |
| `food-dude.html` | Food Dude (mobile catering) |
| `alderney.html` | Discover Alderney |
| `contact.html` | Contact Us |

## 🚀 Deploying to GitHub Pages (step by step)

### Step 1 — Create repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button → **New repository**
3. Name it `lavillehotel` (or anything you like)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload files
1. On your new repo page click **uploading an existing file**
2. Drag and drop **all** the files and folders from this zip:
   - `index.html`
   - `rooms.html`
   - `breakfast.html`
   - `restaurant.html`
   - `chez-bar.html`
   - `food-dude.html`
   - `alderney.html`
   - `contact.html`
   - the entire `css/` folder
   - the entire `js/` folder
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Source** select: `Deploy from a branch`
4. Branch: `main`, Folder: `/ (root)`
5. Click **Save**
6. After a minute, your site will be live at:
   `https://yourusername.github.io/lavillehotel/`

### Step 4 — Custom domain (lavillehotel.com)
1. In GitHub Pages settings, enter `lavillehotel.com` in the **Custom domain** field
2. Create a file called `CNAME` in the root of your repo containing just:
   ```
   lavillehotel.com
   ```
3. With your domain registrar, set up DNS:
   - For `www`: Add a **CNAME** record → `yourusername.github.io`
   - For apex (`lavillehotel.com`): Add **A** records pointing to:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Wait up to 24 hours for DNS to propagate

## 📁 File Structure

```
laville-hotel/
├── index.html          ← Home page
├── rooms.html          ← Rooms + availability checker
├── breakfast.html      ← Breakfast menu
├── restaurant.html     ← Bar & Restaurant
├── chez-bar.html       ← The Chez Bar
├── food-dude.html      ← Food Dude mobile catering
├── alderney.html       ← Discover Alderney
├── contact.html        ← Contact us
├── css/
│   └── style.css       ← All styles
├── js/
│   └── shared.js       ← Shared JS (nav, booking logic, rooms data)
└── README.md
```

## 🎨 Design

- **Display font:** Cormorant Garamond (warm, elegant serif)
- **Body font:** DM Sans (modern, clean)
- **Colours:** Ocean teal · Terracotta · Warm sand · Cream
- **Style:** Warm coastal luxury — welcoming, clean, modern

## 🛏 Rooms & Availability

The availability checker on the home page and rooms page lets guests enter:
- Check-in & check-out dates
- Number of guests
- Number of rooms needed

It then filters the 7 room types by capacity and shows availability status (Available / Limited / Unavailable) with pricing.

**Room types:**
- Twin Room (sleeps 2)
- Double Room (sleeps 2)
- King Size Suite (sleeps 2)
- Triple Room (sleeps 3)
- Family Room — sleeps 4
- Family Room — sleeps 5
- Quad Family Suite (sleeps 4)

## 🔧 Customising

### Adding real photos
Replace the emoji placeholders in `.split__vis` and `.strip__item` divs with `<img>` tags, or set a background image on the element.

### Updating prices
Edit the `ROOMS` array at the top of `js/shared.js` — each room has `pw` (weekday price) and `pwe` (weekend price).

### Real booking system
To connect a real booking engine (e.g. Caterbook, Beds24), replace the `renderResults()` function in `js/shared.js` with a call to your provider's API.

### Contact form
The contact form currently shows a toast notification. To make it actually send emails, connect it to a service like [Formspree](https://formspree.io) — just replace the `submitContact()` function with a fetch POST to your Formspree endpoint.

## © Licence
© 2026 LV Hotel Limited. All rights reserved.
