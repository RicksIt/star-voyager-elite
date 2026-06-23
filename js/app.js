/* Page-specific rendering and interactions */
(function () {
  function initHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dots button");
    if (!slides.length) return;

    let current = 0;
    function goTo(i) {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = i;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
      const title = slides[current].dataset.title;
      const subtitle = slides[current].dataset.subtitle;
      const h1 = document.getElementById("hero-title");
      const p = document.getElementById("hero-subtitle");
      if (h1) h1.textContent = title;
      if (p) p.textContent = subtitle;
    }

    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
    setInterval(() => goTo((current + 1) % slides.length), 5000);
  }

  function initPackageScroll() {
    const el = document.getElementById("pkg-scroll");
    if (!el) return;
    document.getElementById("scroll-left")?.addEventListener("click", () =>
      el.scrollBy({ left: -320, behavior: "smooth" })
    );
    document.getElementById("scroll-right")?.addEventListener("click", () =>
      el.scrollBy({ left: 320, behavior: "smooth" })
    );
  }

  function renderFeaturedPackages() {
    const el = document.getElementById("featured-packages");
    if (!el || !window.VE_DATA) return;
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    const pkgs = VE_DATA.packages.filter((p) => p.is_featured).slice(0, 6);
    el.innerHTML = pkgs
      .map(
        (pkg) => `
      <div class="card pkg-card">
        <div class="img-wrap">
          <img src="${VE.esc(pkg.hero_image)}" alt="${VE.esc(pkg.name)}" loading="lazy">
          <span class="badge">${VE.esc(pkg.duration)}</span>
        </div>
        <div class="card-body">
          <h3>${VE.esc(pkg.name)}</h3>
          <p class="text-muted text-sm line-clamp-2 mt-2">${VE.esc(pkg.tagline)}</p>
          <div class="meta">${VE.ICONS.mapPin.replace('width="24"','width="14"').replace('height="24"','height="14"')} ${VE.esc(pkg.destinations_covered[0] || "Multiple")}
            ${VE.ICONS.users} Max ${pkg.max_travelers}</div>
          <div class="flex-between mt-4">
            <span class="price">${VE.formatPrice(pkg.price_per_person)}<small> /person</small></span>
            <a href="${base}package/?slug=${VE.esc(pkg.slug)}" class="link-arrow">View Details ${VE.ICONS.arrowRight}</a>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  function renderPopularDestinations() {
    const el = document.getElementById("popular-destinations");
    if (!el || !window.VE_DATA) return;
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    const dests = VE_DATA.destinations.filter((d) => d.is_popular).slice(0, 6);
    el.innerHTML = dests
      .map(
        (d) => `
      <div class="card dest-card">
        <div class="img-wrap"><img src="${VE.esc(d.hero_image)}" alt="${VE.esc(d.name)}" loading="lazy"></div>
        <div class="card-body">
          <h3>${VE.esc(d.name)}</h3>
          <p class="text-muted text-sm line-clamp-2 mt-2">${VE.esc(d.tagline)}</p>
          <a href="${base}destination/?slug=${VE.esc(d.slug)}" class="link-arrow">Explore ${VE.ICONS.arrowRight}</a>
        </div>
      </div>`
      )
      .join("");
  }

  function renderTestimonials() {
    const el = document.getElementById("testimonials");
    if (!el || !window.VE_DATA) return;
    el.innerHTML = VE_DATA.testimonials
      .map(
        (t) => `
      <div class="card testimonial-card">
        <div class="stars">${Array(t.rating).fill(VE.ICONS.star).join("")}</div>
        <p class="text-muted text-sm">&ldquo;${VE.esc(t.text)}&rdquo;</p>
        <div class="testimonial-author">
          <div class="avatar">${VE.esc(t.name.charAt(0))}</div>
          <div><p class="text-sm" style="font-weight:500">${VE.esc(t.name)}</p><p class="text-sm text-muted">${VE.esc(t.location)}</p></div>
        </div>
      </div>`
      )
      .join("");
  }

  function renderDestinationsList() {
    const el = document.getElementById("destinations-list");
    if (!el || !window.VE_DATA) return;
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    el.innerHTML = VE_DATA.destinations
      .map(
        (d) => `
      <a href="${base}destination/?slug=${VE.esc(d.slug)}" class="card dest-card">
        <div class="img-wrap"><img src="${VE.esc(d.hero_image)}" alt="${VE.esc(d.name)}" loading="lazy"></div>
        <div class="card-body">
          <div class="text-sm text-muted" style="display:flex;align-items:center;gap:0.25rem;margin-bottom:0.5rem">${VE.ICONS.mapPin.replace('width="24"','width="12"').replace('height="24"','height="12"')} ${VE.esc(d.country)}</div>
          <h3>${VE.esc(d.name)}</h3>
          <p class="text-muted text-sm line-clamp-2 mt-2">${VE.esc(d.tagline || d.description)}</p>
          <span class="link-arrow">Explore ${VE.ICONS.arrowRight}</span>
        </div>
      </a>`
      )
      .join("");
  }

  function renderPackagesList() {
    const el = document.getElementById("packages-list");
    if (!el || !window.VE_DATA) return;
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    el.innerHTML = VE_DATA.packages
      .map(
        (pkg) => `
      <div class="card dest-card">
        <div class="img-wrap" style="height:13rem;position:relative">
          <img src="${VE.esc(pkg.hero_image)}" alt="${VE.esc(pkg.name)}" loading="lazy">
          <span class="badge">${VE.esc(pkg.duration)}</span>
          ${pkg.is_featured ? '<span class="badge badge-featured">Featured</span>' : ""}
        </div>
        <div class="card-body">
          <h3>${VE.esc(pkg.name)}</h3>
          <p class="text-muted text-sm line-clamp-2 mt-2">${VE.esc(pkg.tagline || pkg.description)}</p>
          <div class="meta">${VE.ICONS.mapPin.replace('width="24"','width="14"').replace('height="24"','height="14"')} ${VE.esc(pkg.destinations_covered[0] || "Multiple")}
            ${VE.ICONS.users} Max ${pkg.max_travelers}</div>
          <div class="flex-between mt-4">
            <span class="price" style="font-size:1.25rem">${VE.formatPrice(pkg.price_per_person)}<small> /person</small></span>
            <a href="${base}package/?slug=${VE.esc(pkg.slug)}" class="btn btn-primary btn-rounded text-sm">Details ${VE.ICONS.arrowRight}</a>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  function renderDestinationDetail() {
    const slug = VE.getQueryParam("slug");
    const el = document.getElementById("destination-detail");
    if (!el || !slug || !window.VE_DATA) return;
    const d = VE_DATA.destinations.find((x) => x.slug === slug);
    if (!d) {
      const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
      el.innerHTML = "<div class='container section text-center'><h2>Destination not found</h2><a href='"+base+"destinations/' class='btn btn-primary mt-4'>Back to Destinations</a></div>";
      return;
    }
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    document.title = `${d.name} — ${VE_CONFIG.brand.full}`;

    el.innerHTML = `
      <section class="page-hero detail-hero">
        <img src="${VE.esc(d.hero_image)}" alt="${VE.esc(d.name)}">
        <div class="overlay-bottom"></div>
        <div class="content">
          <a href="${base}destinations/" class="back-link">${VE.ICONS.arrowLeft} Back to Destinations</a>
          <div class="text-sm" style="color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">${VE.ICONS.mapPin} ${VE.esc(d.country)} — ${VE.esc(d.region)}</div>
          <h1 style="font-size:2rem">${VE.esc(d.name)}</h1>
          ${d.tagline ? `<p style="margin-top:0.5rem;font-size:1.125rem;color:rgba(255,255,255,0.9)">${VE.esc(d.tagline)}</p>` : ""}
        </div>
      </section>
      <section class="section">
        <div class="container detail-layout">
          <div class="space-y-6">
            <div><h2>About ${VE.esc(d.name)}</h2><p class="text-muted mt-4" style="line-height:1.8">${VE.esc(d.description)}</p></div>
            <div><h2>Highlights</h2><div class="grid-2 mt-4">${d.highlights.map((h) => `<div class="highlight-item">${VE.ICONS.star} <span class="text-sm">${VE.esc(h)}</span></div>`).join("")}</div></div>
            <div><h2>Things to Do</h2><div class="grid-2 mt-4">${d.things_to_do.map((t, i) => `<div class="todo-item"><span class="todo-num">${i + 1}</span><span class="text-sm">${VE.esc(t)}</span></div>`).join("")}</div></div>
            <div><h2>Gallery</h2><div class="gallery-grid mt-4">${d.gallery_images.map((img, i) => `<img src="${VE.esc(img)}" alt="Gallery ${i + 1}" loading="lazy">`).join("")}</div></div>
          </div>
          <div class="space-y-6">
            <div class="card sidebar-card"><div class="card-body space-y-4>
              <div style="display:flex;gap:0.75rem">${VE.ICONS.calendar}<div><p class="text-sm" style="font-weight:500">Best Time to Visit</p><p class="text-sm text-muted">${VE.esc(d.best_time)}</p></div></div>
              <div style="display:flex;gap:0.75rem">${VE.ICONS.mapPin}<div><p class="text-sm" style="font-weight:500">Location</p><p class="text-sm text-muted">${VE.esc(d.region)}, ${VE.esc(d.country)}</p></div></div>
              ${d.map_url ? `<a href="${VE.esc(d.map_url)}" target="_blank" rel="noopener" class="btn btn-outline btn-full">View on Map</a>` : ""}
            </div></div>
            <div class="card"><iframe class="map-embed" title="Map of ${VE.esc(d.name)}" src="https://www.google.com/maps?q=${encodeURIComponent(d.name + ", " + d.country)}&output=embed" loading="lazy"></iframe></div>
            <div class="card card-flat"><div class="card-body text-center">
              <h3>Ready to Visit ${VE.esc(d.name)}?</h3>
              <p class="text-sm text-muted mt-2">Explore our curated packages for this destination</p>
              <a href="${base}packages/" class="btn btn-primary btn-full mt-4">View Packages</a>
            </div></div>
          </div>
        </div>
      </section>`;
  }

  function renderPackageDetail() {
    const slug = VE.getQueryParam("slug");
    const el = document.getElementById("package-detail");
    if (!el || !slug || !window.VE_DATA) return;
    const pkg = VE_DATA.packages.find((x) => x.slug === slug);
    if (!pkg) {
      const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
      el.innerHTML = "<div class='container section text-center'><h2>Package not found</h2><a href='"+base+"packages/' class='btn btn-primary mt-4'>Back to Packages</a></div>";
      return;
    }
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
    document.title = `${pkg.name} — ${VE_CONFIG.brand.full}`;
    const waText = encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package. Can you share more details?`);

    el.innerHTML = `
      <section class="page-hero detail-hero">
        <img src="${VE.esc(pkg.hero_image)}" alt="${VE.esc(pkg.name)}">
        <div class="overlay-bottom"></div>
        <div class="content">
          <a href="${base}packages/" class="back-link">${VE.ICONS.arrowLeft} Back to Packages</a>
          <h1 style="font-size:2rem">${VE.esc(pkg.name)}</h1>
          ${pkg.tagline ? `<p style="margin-top:0.5rem;font-size:1.125rem;color:rgba(255,255,255,0.9)">${VE.esc(pkg.tagline)}</p>` : ""}
          <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:1rem;font-size:0.875rem;color:rgba(255,255,255,0.8)">
            <span style="display:flex;align-items:center;gap:0.25rem">${VE.ICONS.calendar} ${VE.esc(pkg.duration)}</span>
            <span style="display:flex;align-items:center;gap:0.25rem">${VE.ICONS.mapPin} ${VE.esc(pkg.destinations_covered.join(", "))}</span>
            <span style="display:flex;align-items:center;gap:0.25rem">${VE.ICONS.users} Max ${pkg.max_travelers} travelers</span>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container detail-layout">
          <div class="space-y-6">
            <div><h2>About This Package</h2><p class="text-muted mt-4" style="line-height:1.8">${VE.esc(pkg.description)}</p></div>
            <div><h2>Itinerary</h2><div class="space-y-4 mt-4">${pkg.itinerary.map((day) => `
              <div class="card"><div class="itinerary-day">
                <span class="day-num">${day.day}</span>
                <div><h3 class="text-sm" style="font-weight:600">${VE.esc(day.title)}</h3><p class="text-sm text-muted mt-2">${VE.esc(day.details)}</p></div>
              </div></div>`).join("")}</div></div>
            <div class="grid-2">
              <div class="card inclusion-card green"><div class="card-body"><h3 class="mb-4">Inclusions</h3><ul>${pkg.inclusions.map((i) => `<li>${VE.ICONS.check} ${VE.esc(i)}</li>`).join("")}</ul></div></div>
              <div class="card inclusion-card red"><div class="card-body"><h3 class="mb-4">Exclusions</h3><ul>${pkg.exclusions.map((i) => `<li>${VE.ICONS.xmark} ${VE.esc(i)}</li>`).join("")}</ul></div></div>
            </div>
            <div><h2>Gallery</h2><div class="gallery-grid mt-4">${pkg.gallery_images.map((img, i) => `<img src="${VE.esc(img)}" alt="Gallery ${i + 1}" loading="lazy">`).join("")}</div></div>
          </div>
          <div>
            <div class="card sidebar-card"><div class="card-body space-y-4">
              <div><p class="text-sm text-muted">Starting from</p><p class="price-big">${VE.formatPrice(pkg.price_per_person)}</p><p class="text-sm text-muted">per person</p></div>
              <div class="info-row"><span>Duration</span><span style="font-weight:500">${VE.esc(pkg.duration)}</span></div>
              <div class="info-row"><span>Max Travelers</span><span style="font-weight:500">${pkg.max_travelers}</span></div>
              <div class="info-row"><span>Destinations</span><span style="font-weight:500">${pkg.destinations_covered.length}</span></div>
              <button class="btn btn-primary btn-full" id="open-enquiry">Enquire Now</button>
              <a href="https://wa.me/919299152192?text=${waText}" target="_blank" rel="noopener" class="btn btn-outline btn-full">${VE.ICONS.message} Enquire on WhatsApp</a>
            </div></div>
          </div>
        </div>
      </section>
      <div class="modal-overlay" id="enquiry-modal">
        <div class="modal">
          <div class="modal-header"><h3>Enquire about ${VE.esc(pkg.name)}</h3><button class="modal-close" id="close-enquiry">&times;</button></div>
          <form id="package-enquiry-form" class="space-y-4">
            <div class="form-row">
              <div class="form-group"><label>Full Name *</label><input name="name" required placeholder="Your name"></div>
              <div class="form-group"><label>Phone</label><input name="phone" type="tel" placeholder="Your phone"></div>
            </div>
            <div class="form-group"><label>Email *</label><input name="email" type="email" required placeholder="your@email.com"></div>
            <div class="form-row">
              <div class="form-group"><label>Travel Date</label><input name="travel_date" type="date"></div>
              <div class="form-group"><label>Travelers</label><input name="num_travelers" type="number" min="1" placeholder="Number"></div>
            </div>
            <div class="form-group"><label>Message</label><textarea name="message" rows="3" placeholder="Any specific requirements..."></textarea></div>
            <div style="display:flex;gap:0.5rem">
              <button type="submit" class="btn btn-primary" style="flex:1">Submit Enquiry</button>
              <a href="https://wa.me/919299152192?text=${waText}" target="_blank" rel="noopener" class="btn btn-outline">${VE.ICONS.message}</a>
            </div>
          </form>
        </div>
      </div>`;

    document.getElementById("open-enquiry")?.addEventListener("click", () =>
      document.getElementById("enquiry-modal").classList.add("open")
    );
    document.getElementById("close-enquiry")?.addEventListener("click", () =>
      document.getElementById("enquiry-modal").classList.remove("open")
    );
    VE_FORMS.bindEnquiryForm(document.getElementById("package-enquiry-form"), { package: pkg.name });
  }

  function renderGallery() {
    const el = document.getElementById("gallery-grid");
    const filtersEl = document.getElementById("gallery-filters");
    if (!el || !window.VE_DATA) return;

    const destNames = [...new Set(VE_DATA.gallery.map((g) => g.destination_name))].sort();
    let filter = "all";
    const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';

    function renderFilters() {
      if (!filtersEl) return; // gracefully handle pages without a filters container
      filtersEl.innerHTML = `<button class="filter-pill active" data-filter="all">All</button>` +
        destNames.map((n) => `<button class="filter-pill" data-filter="${VE.esc(n)}">${VE.esc(n)}</button>`).join("");
      filtersEl.querySelectorAll(".filter-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          filter = btn.dataset.filter;
          filtersEl.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderItems();
        });
      });
    }

    function renderItems() {
      const items = filter === "all" ? VE_DATA.gallery : VE_DATA.gallery.filter((g) => g.destination_name === filter);
      el.innerHTML = items
        .map(
          (item, i) => `
        <a href="${base}destination/?slug=${VE.esc(item.destination_slug)}" class="masonry-item" style="aspect-ratio:${i % 3 === 0 ? "4/5" : i % 3 === 1 ? "4/3" : "1/1"}">
          <img src="${VE.esc(item.image_url)}" alt="${VE.esc(item.title)}" loading="lazy">
          <div class="caption"><p class="text-sm">${VE.esc(item.title)}</p><p class="text-sm" style="opacity:0.8;margin-top:0.25rem">${VE.ICONS.mapPin.replace('width="24"','width="12"').replace('height="24"','height="12"')} ${VE.esc(item.destination_name)}</p></div>
        </a>`
        )
        .join("");
    }

    renderFilters();
    renderItems();
  }

  function initTravelPlanForm() {
    const form = document.getElementById("travel-plan-form");
    if (!form) return;

    const segmentsContainer = document.getElementById("segments-container");
    const addBtn = document.getElementById("add-segment");
    let segmentIndex = 0;

    // debounce helper
    function debounce(fn, wait = 300) {
      let t;
      return function (...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
      };
    }

    // Simple Nominatim autocomplete (client-side). Be mindful of rate limits in production.
    function attachAutocomplete(input) {
      if (!input) return;
      input.setAttribute('autocomplete', 'off');
      let listEl = null;
      let items = [];
      let selected = -1;

      function closeList() {
        if (listEl) { listEl.remove(); listEl = null; }
        items = [];
        selected = -1;
      }

      function renderList() {
        closeList();
        listEl = document.createElement('div');
        listEl.className = 'autocomplete-list card';
        listEl.style.position = 'absolute';
        listEl.style.zIndex = 60;
        listEl.style.width = (input.offsetWidth) + 'px';
        (input.parentElement).appendChild(listEl);

        items.forEach((it, i) => {
          const row = document.createElement('div');
          row.className = 'autocomplete-item';
          row.tabIndex = 0;
          row.innerHTML = `<div class="autocomplete-title">${VE.esc(it.display)}</div><div class="text-sm text-muted">${VE.esc(it.type || '')} ${it.address ? VE.esc(it.address) : ''}</div>`;
          row.addEventListener('click', () => select(i));
          row.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); select(i); } });
          listEl.appendChild(row);
        });
      }

      function select(i) {
        const it = items[i];
        if (!it) return;
        input.value = it.display;
        input.dataset.lat = it.lat;
        input.dataset.lon = it.lon;
        input.dataset.type = it.type || '';
        closeList();
      }

      const doSearch = debounce(async () => {
        const q = input.value.trim();
        if (!q) { closeList(); return; }
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(q)}`;
          const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
          const data = await res.json();
          items = data.map(d => ({ display: d.display_name, lat: d.lat, lon: d.lon, type: d.type, address: d.address && (d.address.city || d.address.town || d.address.village || d.address.state || d.address.country) }));
          if (items.length) renderList(); else closeList();
        } catch (e) {
          console.error('Autocomplete error', e);
          closeList();
        }
      }, 300);

      input.addEventListener('input', () => { delete input.dataset.lat; delete input.dataset.lon; doSearch(); });
      input.addEventListener('keydown', (e) => {
        if (!listEl) return;
        const nodes = Array.from(listEl.children);
        if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, nodes.length - 1); nodes.forEach(n => n.classList.remove('active')); nodes[selected]?.classList.add('active'); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); nodes.forEach(n => n.classList.remove('active')); nodes[selected]?.classList.add('active'); }
        else if (e.key === 'Enter') { if (selected >= 0) { e.preventDefault(); nodes[selected].click(); } }
        else if (e.key === 'Escape') { closeList(); }
      });

      // close on outside click
      document.addEventListener('click', (ev) => { if (ev.target !== input && !input.contains(ev.target) && listEl && !listEl.contains(ev.target)) closeList(); });
      input.addEventListener('blur', () => setTimeout(closeList, 150));
    }

    function updateSegmentHeaders() {
      Array.from(segmentsContainer.children).forEach((el, i) => {
        const h = el.querySelector('h3'); if (h) h.textContent = `Trip Segment ${i + 1}`;
      });
    }

    function addSegment(prefill) {
      segmentIndex++;
      const wrap = document.createElement('div');
      wrap.className = 'card segment';
      wrap.style.marginBottom = '1rem';
      wrap.innerHTML = `
        <div class="card-body">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <h3>Trip Segment ${segmentIndex}</h3>
            <button type="button" class="btn btn-outline remove-segment">Remove</button>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Source *</label><input type="text" class="loc-input source" placeholder="Start location"></div>
            <div class="form-group"><label>Destination *</label><input type="text" class="loc-input destination" placeholder="End location"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="date" class="segment-date"></div>
            <div class="form-group"><label>Mode</label>
              <select class="segment-mode"><option value="">Select</option><option value="flight">Flight</option><option value="train">Train</option><option value="bus">Bus</option><option value="car">Car</option><option value="ferry">Ferry</option><option value="other">Other</option></select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Travellers</label><input type="number" min="1" class="segment-travelers" value="1"></div>
            <div class="form-group"><label>Notes</label><input type="text" class="segment-notes" placeholder="Any notes for this segment"></div>
          </div>
        </div>`;

      segmentsContainer.appendChild(wrap);
      wrap.querySelector('.remove-segment').addEventListener('click', () => { wrap.remove(); updateSegmentHeaders(); });

      // attach autocomplete to the new inputs
      attachAutocomplete(wrap.querySelector('.loc-input.source'));
      attachAutocomplete(wrap.querySelector('.loc-input.destination'));

      // apply prefill if provided
      if (prefill && typeof prefill === 'object') {
        const s = wrap.querySelector('.loc-input.source'); const d = wrap.querySelector('.loc-input.destination');
        if (prefill.source) s.value = prefill.source.display || prefill.source;
        if (prefill.destination) d.value = prefill.destination.display || prefill.destination;
        if (prefill.date) wrap.querySelector('.segment-date').value = prefill.date;
        if (prefill.mode) wrap.querySelector('.segment-mode').value = prefill.mode;
        if (prefill.travelers) wrap.querySelector('.segment-travelers').value = prefill.travelers;
        if (prefill.notes) wrap.querySelector('.segment-notes').value = prefill.notes;
      }

      updateSegmentHeaders();
      return wrap;
    }

    // init with one segment
    if (segmentsContainer && segmentsContainer.children.length === 0) addSegment();

    addBtn?.addEventListener('click', () => addSegment());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]'); if (btn) btn.disabled = true;

      const fd = new FormData(form);
      const segments = [];
      let valid = true;

      Array.from(segmentsContainer.children).forEach((el) => {
        const srcEl = el.querySelector('.loc-input.source');
        const dstEl = el.querySelector('.loc-input.destination');
        const date = el.querySelector('.segment-date')?.value || '';
        const mode = el.querySelector('.segment-mode')?.value || '';
        const travelers = el.querySelector('.segment-travelers')?.value || '';
        const notes = el.querySelector('.segment-notes')?.value || '';

        const src = srcEl ? { display: srcEl.value.trim(), lat: srcEl.dataset.lat || '', lon: srcEl.dataset.lon || '', type: srcEl.dataset.type || '' } : null;
        const dst = dstEl ? { display: dstEl.value.trim(), lat: dstEl.dataset.lat || '', lon: dstEl.dataset.lon || '', type: dstEl.dataset.type || '' } : null;

        if (!src || !src.display || !dst || !dst.display) { valid = false; }

        segments.push({ source: src, destination: dst, date, mode, travelers, notes });
      });

      if (!valid) {
        VE.showToast('Please fill source and destination for each segment.', true);
        if (btn) btn.disabled = false;
        return;
      }

      try {
        const payload = {
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone') || '',
          total_travelers: fd.get('num_travelers') || '',
          budget_per_person: fd.get('budget') || '',
          notes: fd.get('notes') || '',
          segments: JSON.stringify(segments),
        };

        await VE_FORMS.submitTravelPlan(payload);
        document.getElementById('travel-plan-content')?.classList.add('hidden');
        document.getElementById('travel-plan-success')?.classList.remove('hidden');
        VE.showToast("Trip request received — we'll be in touch shortly.");
      } catch (err) {
        VE.showToast(err.message || 'Failed to submit.', true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  window.VE_APP = {
    initHeroCarousel,
    initPackageScroll,
    renderFeaturedPackages,
    renderPopularDestinations,
    renderTestimonials,
    renderDestinationsList,
    renderPackagesList,
    renderDestinationDetail,
    renderPackageDetail,
    renderGallery,
    initTravelPlanForm,
    // back-compat alias used by some pages
    initTravelPlan: initTravelPlanForm,
  };
})();
