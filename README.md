# Voyager Elite — Static Website

A fully static version of the Voyager Elite travel agency website, ready to deploy on **GitHub Pages** or any static hosting. No backend, database, or server required.

## Features

- **Homepage** — Hero carousel, featured packages, popular destinations, testimonials, enquiry form
- **14 Destinations** — Detail pages with highlights, things to do, gallery, Google Maps
- **13 Travel Packages** — Itineraries, inclusions/exclusions, pricing, enquiry modal
- **Custom Trip Planner** — Multi-destination form with transport preferences
- **Photo Gallery** — Masonry layout with destination filters
- **About & Contact** — Company story, team, stats, contact methods
- **WhatsApp integration** — Direct enquiry links on package pages
- **Mobile responsive** — Sticky header, hamburger menu

## Quick Start (Local Preview)

```bash
# Option 1: Python
cd voyager-elite-static
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: npx
npx serve .
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `voyager-elite-website`)
2. Upload the contents of this `voyager-elite-static` folder
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose branch `main` and folder `/ (root)`
6. Save — your site will be live at `https://YOUR_USERNAME.github.io/voyager-elite-website/`

> The `.nojekyll` file is included so GitHub Pages serves all files correctly.

---

## Form Setup (Enquiries & Trip Requests)

Since this is a static site, forms don't save to a database. Choose one of these free options:

### Option A: Google Forms (Recommended — Free & Easy)

1. Go to [Google Forms](https://forms.google.com) and create two forms:
   - **Travel Enquiry** — fields: Name, Email, Phone, Travel Date, Travelers, Message, Package (optional)
   - **Custom Trip Plan** — fields: Name, Email, Phone, From, Destinations, Dates, Transport, Budget, Notes

2. Click **Send → Link icon** and copy each form URL

3. Edit `js/config.js`:

```javascript
forms: {
  provider: "google-redirect",
  enquiryUrl: "https://docs.google.com/forms/d/e/YOUR_ENQUIRY_FORM_ID/viewform",
  travelPlanUrl: "https://docs.google.com/forms/d/e/YOUR_TRAVEL_PLAN_FORM_ID/viewform",
}
```

When users submit, they'll be redirected to your Google Form (or you can embed the forms directly on contact/travel-plan pages).

### Option B: Formspree (Free — 50 submissions/month)

1. Sign up at [formspree.io](https://formspree.io)
2. Create two forms and copy the endpoint URLs
3. Edit `js/config.js`:

```javascript
forms: {
  provider: "formspree",
  formspreeEnquiry: "https://formspree.io/f/YOUR_ENQUIRY_ID",
  formspreeTravelPlan: "https://formspree.io/f/YOUR_TRAVEL_PLAN_ID",
}
```

Submissions arrive in your email inbox automatically.

### Option C: Google Forms POST (Advanced)

For seamless in-page submission without redirect, use `provider: "google-post"` and configure entry IDs in `js/config.js`. See [this guide](https://stackoverflow.com/questions/24348601/submit-google-form-via-ajax) for finding entry IDs.

---

## Customization

| What to change | File |
|----------------|------|
| Phone, email, address, social links | `js/config.js` |
| Hero slides | `js/config.js` → `heroSlides` |
| Destinations & packages content | `js/data.js` |
| Colors & styling | `css/styles.css` → `:root` variables |
| Brand name | `js/config.js` → `brand` |

---

## Project Structure

```
voyager-elite-static/
├── index.html              # Homepage
├── destinations.html       # All destinations
├── destination.html        # Single destination (?slug=goa)
├── packages.html           # All packages
├── package.html            # Single package (?slug=...)
├── travel-plan.html        # Custom trip planner
├── gallery.html            # Photo gallery
├── about.html              # About us
├── contact.html            # Contact page
├── thank-you.html          # Post-submission page
├── css/styles.css          # All styles
├── js/
│   ├── config.js           # Site config & form URLs
│   ├── data.js             # Destinations, packages, gallery
│   ├── layout.js           # Header & footer
│   ├── forms.js            # Form submission logic
│   └── app.js              # Page rendering & interactions
├── images/                 # Local hero images (4 JPGs)
└── .nojekyll               # GitHub Pages config
```

---

## What's Different from the Original?

| Original (React + Supabase) | Static Version |
|----------------------------|----------------|
| Dynamic database content | Content baked into `js/data.js` |
| Server-side form submission | Google Forms / Formspree |
| Admin dashboard | Not included (manage content in `data.js`) |
| User authentication | Not needed |
| SSR with TanStack Start | Pure static HTML/CSS/JS |

---

## License

Content and branding © Voyager Elite Travel Agency. Free to use and modify for your travel business.
