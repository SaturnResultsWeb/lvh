# La Ville Hotel — Website

A modern, responsive single-page application for La Ville Hotel, Alderney.

## 🏨 About

La Ville Hotel is situated at the heart of Alderney's Victoria Street, offering 20 spacious en-suite rooms, a restaurant, The Chez Bar, and the Food Dude mobile catering service.

## 📁 File Structure

```
laville-hotel/
├── index.html          # Main HTML shell (SPA)
├── css/
│   └── style.css       # Full stylesheet
├── js/
│   └── main.js         # All JS — routing, booking logic, page renders
└── README.md
```

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `laville-hotel`)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages**
4. Set Source to `Deploy from a branch` → `main` → `/ (root)`
5. Your site will be live at `https://yourusername.github.io/laville-hotel/`

### Custom Domain
To use your own domain (e.g. `lavillehotel.com`):
1. In GitHub Pages settings, enter your custom domain
2. Add a `CNAME` file to the root containing just: `lavillehotel.com`
3. Update your DNS records with your domain registrar:
   - Add a CNAME record: `www` → `yourusername.github.io`
   - Or A records pointing to GitHub's IPs for apex domain

## 📄 Pages Included

| Page | Hash Route | Description |
|------|-----------|-------------|
| Home | `#home` | Welcome, hero with booking widget, features, testimonials |
| Rooms | `#rooms` | All 7 room types with live availability checker |
| Restaurant | `#restaurant` | Food, opening hours, weddings & events |
| The Chez Bar | `#chez` | Bar info, opening times, events |
| Food Dude | `#fooddude` | Mobile catering, what we offer, event booking |
| Alderney | `#alderney` | Island guide, attractions, things to do |
| Contact | `#contact` | Full contact details, taxi info, enquiry form |

## 🛏 Room Types

The availability checker supports all 7 room types:

- Twin Room (sleeps 2)
- Double Room (sleeps 2)
- King Size Suite (sleeps 2)
- Triple Room (sleeps 3)
- Family Room — sleeps 4
- Family Room — sleeps 5
- Quad Family Suite (sleeps 4)

Guests enter **check-in date, check-out date, number of guests, and number of rooms** — the system filters rooms by capacity and shows available/limited/unavailable status with pricing.

## 📞 Contact Details (update in `js/main.js` if needed)

- **Phone:** +44 1481 824784
- **Email:** info@lavillehotel.com
- **Address:** Victoria Street, Alderney, GY9 3TA

## 🎨 Design

- **Display font:** Cormorant Garamond (elegant, warm serif)
- **Body font:** DM Sans (modern, readable)
- **Palette:** Ocean teal · Terracotta · Warm sand · Cream
- **Style:** Warm coastal luxury — welcoming, modern, clean

## 🔧 Customisation

### Adding Real Photos
Replace the emoji placeholders in the room cards and split sections by changing:
```html
<div class="split__img-wrap">
  <span style="font-size:5rem">🏝</span>
</div>
```
to:
```html
<div class="split__img-wrap" style="background:none">
  <img src="images/your-photo.jpg" alt="Description" style="width:100%;height:100%;object-fit:cover">
</div>
```

### Updating Room Prices
Edit the `ROOMS` array at the top of `js/main.js` — each room has `weekday` and `weekend` pricing.

### Real Booking Integration
To connect a real booking system (e.g. Caterbook, Beds24, etc.), replace the `checkAvailability()` function in `js/main.js` with an API call to your booking provider.

### Instagram Feed
Add your Instagram feed by integrating a service like [Curator.io](https://curator.io) or [EmbedSocial](https://embedsocial.com) and adding the embed code to the home page section in `renderHome()`.

## 📱 Responsive

Fully responsive across:
- Desktop (1200px+)
- Tablet (768px–1060px)
- Mobile (< 768px)

## © Licence

© LV Hotel Limited. All rights reserved.
