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
├── index.html              # Homepage (root)
├── about/                  # About page (index.html inside)
├── contact/                # Contact page (index.html inside)
├── destinations/           # Destinations list (index.html)
├── destination/            # Single destination (index.html reads ?slug=...)
├── packages/               # Packages list (index.html)
├── package/                # Package detail (index.html reads ?slug=...) — canonical detail page
├── travel-plan/            # Custom trip planner (index.html)
├── gallery/                # Photo gallery (index.html)
├── thank-you/              # Post-submission page (index.html)
├── css/styles.css          # All styles
├── js/
│   ├── config.js           # Site config & form URLs
│   ├── data.js             # Destinations, packages, gallery
│   ├── layout.js           # Header & footer, exports getBasePath()
│   ├── forms.js            # Form submission logic (redirects to /thank-you/)
│   └── app.js              # Page rendering & interactions (uses folder-based URLs)
├── images/                 # Local images
└── .nojekyll               # GitHub Pages config
```

Notes about folder-based URLs and redirects

- The site now uses folder-based URLs (e.g. `/packages/`, `/package/?slug=...`, `/destination/?slug=...`). This improves aesthetics and works well with GitHub Pages.
- `js/layout.js` exposes `VE.getBasePath()` which computes the correct base for GitHub Pages project sites (e.g. `/repo-name/`) so all scripts generate correct links.
- Legacy `*.html` URLs were supported via small redirect pages during migration. The canonical detail page is now `/package/?slug=...`. I removed duplicate nested folders so there should be no redundant `/packages/package/` paths.
- I scanned the JS code and replaced hardcoded `.html` links with folder-based URLs and base-aware hrefs. Keep an eye on any external hardcoded links you might have in other documentation.

Cleanup notes

- If you prefer to retain legacy redirect files (e.g. `package.html`) for older links, you can keep them; otherwise they have been removed to avoid duplicates.
- After changes, run a local server and test deep links (e.g. `/package/?slug=kodaikanal-lake-retreat`) and any old `.html` links to ensure everything works as expected.

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
