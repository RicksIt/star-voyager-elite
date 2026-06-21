/* Shared layout, icons, and utilities */
(function () {
  const ICONS = {
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    xmark: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    message: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    send: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  };

  const NAV = [
    { href: "", label: "Home", page: "home" },
    { href: "destinations/", label: "Destinations", page: "destinations" },
    { href: "packages/", label: "Packages", page: "packages" },
    { href: "travel-plan/", label: "Plan Trip", page: "travel-plan" },
    { href: "gallery/", label: "Gallery", page: "gallery" },
    { href: "about/", label: "About", page: "about" },
    { href: "contact/", label: "Contact", page: "contact" },
  ];

  function esc(s) {
    if (!s) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
  }

  function formatPrice(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getBasePath() {
    // Return '/' for local testing and custom domains.
    // For GitHub Pages project sites (username.github.io/repo/) return '/repo/'.
    try {
      const host = location.hostname || '';
      const parts = location.pathname.split('/').filter(Boolean);
      if (host.endsWith('github.io') && parts.length > 0) {
        return '/' + parts[0] + '/';
      }
    } catch (e) {
      // fallback
    }
    return '/';
  }

  function renderHeader(activePage) {
    const cfg = window.VE_CONFIG;
    const base = getBasePath();
    const navLinks = NAV.map(
      (l) => `<a href="${base}${l.href}" class="${l.page === activePage ? "active" : ""}">${l.label}</a>`
    ).join("");
    const mobileLinks = NAV.map(
      (l) => `<a href="${base}${l.href}" class="${l.page === activePage ? "active" : ""}">${l.label}</a>`
    ).join("");

    return `<header class="site-header">
      <div class="header-inner">
        <a href="${base}" class="logo">${ICONS.mapPin}<span>${esc(cfg.brand.short)}</span></a>
        <nav class="nav-desktop">${navLinks}</nav>
        <a href="${cfg.contact.phoneHref}" class="btn-call">${ICONS.phone} Call Us</a>
        <button class="menu-toggle" aria-label="Toggle menu" id="menu-toggle">${ICONS.menu}</button>
      </div>
      <nav class="nav-mobile" id="nav-mobile">${mobileLinks}
        <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border)">
          <a href="${cfg.contact.phoneHref}" style="display:flex;align-items:center;gap:0.5rem">${ICONS.phone} ${esc(cfg.contact.phone)}</a>
          <a href="mailto:${cfg.brand.email}" style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem">${ICONS.mail} ${esc(cfg.brand.email)}</a>
        </div>
      </nav>
    </header>`;
  }

  function renderFooter() {
    const cfg = window.VE_CONFIG;
    const base = getBasePath();
    const quickLinks = [
      { href: "destinations/", label: "Destinations" },
      { href: "packages/", label: "Travel Packages" },
      { href: "gallery/", label: "Gallery" },
      { href: "about/", label: "About Us" },
      { href: "contact/", label: "Contact" },
    ]
      .map((l) => `<li><a href="${base}${l.href}">${l.label}</a></li>`)
      .join("");

    const destLinks = cfg.popularDestinations
      .map((d) => `<li><a href="${base}destination/?slug=${d.toLowerCase()}">${esc(d)}</a></li>`)
      .join("");

    return `<footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="logo">${ICONS.mapPin}<span>${esc(cfg.brand.short)}</span></div>
          <p>Crafting unforgettable travel experiences since 2015. Your journey to extraordinary destinations begins here.</p>
          <div class="social-links">
            <a href="${cfg.social.instagram}" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="${cfg.social.facebook}" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="${cfg.social.twitter}" aria-label="Twitter">${ICONS.twitter}</a>
          </div>
        </div>
        <div class="footer-col"><h4>Quick Links</h4><ul>${quickLinks}</ul></div>
        <div class="footer-col"><h4>Popular Destinations</h4><ul>${destLinks}</ul></div>
        <div class="footer-col footer-contact">
          <h4>Contact Us</h4>
          <a href="${cfg.contact.phoneHref}">${ICONS.phone} ${esc(cfg.contact.phone)}</a>
          <a href="${cfg.contact.whatsappHref}">${ICONS.phone} WhatsApp Us</a>
          <a href="mailto:${cfg.brand.email}">${ICONS.mail} ${esc(cfg.brand.email)}</a>
          <p>${ICONS.mapPin} ${esc(cfg.contact.address)}</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${esc(cfg.brand.full)}. All rights reserved.</p>
        <div style="display:flex;gap:1rem"><a href="${base}">Privacy Policy</a><a href="${base}">Terms of Service</a></div>
      </div>
    </footer>`;
  }

  function initLayout(activePage) {
    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    if (headerEl) headerEl.innerHTML = renderHeader(activePage);
    if (footerEl) footerEl.innerHTML = renderFooter();

    const toggle = document.getElementById("menu-toggle");
    const mobile = document.getElementById("nav-mobile");
    if (toggle && mobile) {
      toggle.addEventListener("click", () => mobile.classList.toggle("open"));
    }
  }

  function showToast(msg, isError) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = "toast show" + (isError ? " error" : "");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  window.VE = { ICONS, esc, formatPrice, getQueryParam, initLayout, showToast, NAV };
})();
