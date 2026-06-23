/* Form submission — Google Forms, Formspree, or redirect */
(function () {
  function buildGooglePrefillUrl(baseUrl, fields) {
    const params = new URLSearchParams();
    Object.entries(fields).forEach(([key, val]) => {
      if (val) params.append(key, val);
    });
    const sep = baseUrl.includes("?") ? "&" : "?";
    return baseUrl + sep + params.toString();
  }

  async function submitEnquiry(data) {
    const cfg = window.VE_CONFIG.forms;
    const provider = cfg.provider;

    if (provider === "google-redirect") {
      const url = buildGooglePrefillUrl(cfg.enquiryUrl, {
        "usp=pp_url": "",
      });
      const msg = [
        data.package ? `Package: ${data.package}` : "",
        data.name ? `Name: ${data.name}` : "",
        data.email ? `Email: ${data.email}` : "",
        data.phone ? `Phone: ${data.phone}` : "",
        data.travel_date ? `Travel Date: ${data.travel_date}` : "",
        data.num_travelers ? `Travelers: ${data.num_travelers}` : "",
        data.message ? `Message: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(
        cfg.enquiryUrl +
          (cfg.enquiryUrl.includes("?") ? "&" : "?") +
          "entry.XXXXX=" +
          encodeURIComponent(msg),
        "_blank"
      );
      return { ok: true };
    }

    if (provider === "formspree") {
      const res = await fetch(cfg.formspreeEnquiry, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          travel_date: data.travel_date || "",
          num_travelers: data.num_travelers || "",
          message: data.message || "",
          package: data.package || "",
          _subject: data.package
            ? `Enquiry: ${data.package}`
            : "New Travel Enquiry — Voyager Elite",
        }),
      });
      if (!res.ok) throw new Error("Form submission failed");
      return { ok: true };
    }

    if (provider === "google-post") {
      const ids = cfg.googleEntryIds;
      const body = new FormData();
      body.append(ids.name, data.name);
      body.append(ids.email, data.email);
      if (data.phone) body.append(ids.phone, data.phone);
      if (data.travel_date) body.append(ids.travelDate, data.travel_date);
      if (data.num_travelers) body.append(ids.travelers, data.num_travelers);
      if (data.message) body.append(ids.message, data.message);
      if (data.package) body.append(ids.package, data.package);

      await fetch(cfg.googleEnquiryAction, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      return { ok: true };
    }

    throw new Error("Form provider not configured. Edit js/config.js");
  }

  async function submitTravelPlan(data) {
    const cfg = window.VE_CONFIG.forms;
    const provider = cfg.provider;

    if (provider === "google-redirect") {
      window.open(cfg.travelPlanUrl, "_blank");
      return { ok: true };
    }

    if (provider === "formspree") {
      const res = await fetch(cfg.formspreeTravelPlan, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: "Custom Trip Request — Voyager Elite",
        }),
      });
      if (!res.ok) throw new Error("Form submission failed");
      return { ok: true };
    }

    if (provider === "google-post") {
      const body = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== "") body.append(k, Array.isArray(v) ? v.join(", ") : v);
      });
      await fetch(cfg.googleTravelPlanAction, { method: "POST", mode: "no-cors", body });
      return { ok: true };
    }

    throw new Error("Form provider not configured. Edit js/config.js");
  }

  function bindEnquiryForm(formEl, extraData) {
    if (!formEl) return;
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = formEl.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;

      const fd = new FormData(formEl);
      const data = {
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone") || "",
        travel_date: fd.get("travel_date") || "",
        num_travelers: fd.get("num_travelers") || "",
        message: fd.get("message") || "",
        ...(extraData || {}),
      };

      if (!data.name || !data.email) {
        VE.showToast("Please fill in your name and email.", true);
        if (btn) btn.disabled = false;
        return;
      }

      try {
        await submitEnquiry(data);
        VE.showToast("Thank you! We will contact you shortly.");
        formEl.reset();
        const modal = document.getElementById("enquiry-modal");
        if (modal) modal.classList.remove("open");
        if (formEl.dataset.redirect === "thank-you") {
          const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
          window.location.href = base + 'thank-you/';
        }
      } catch (err) {
        VE.showToast(err.message || "Something went wrong. Please try again.", true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  // Note: travel-plan submissions will send 'segments' as a JSON string containing objects with source/destination (display, lat, lon), date, mode, travelers, notes.

  window.VE_FORMS = { submitEnquiry, submitTravelPlan, bindEnquiryForm };
})();
