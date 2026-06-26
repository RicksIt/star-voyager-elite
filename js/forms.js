/* Form submission — Google Forms auto-submit in background */
(function () {
  
  /**
   * Submit Enquiry Form to Google Forms (silent, no redirect)
   */
  async function submitEnquiry(data) {
    const cfg = window.VE_CONFIG.forms;
    
    if (cfg.provider === "google-post") {
      const ids = cfg.enquiryEntryIds;
      const body = new FormData();
      
      if (data.name) body.append(ids.name, String(data.name));
      if (data.email) body.append(ids.email, String(data.email));
      if (data.phone) body.append(ids.phone, String(data.phone));
      if (data.message) body.append(ids.message, String(data.message));
      if (data.travel_date) body.append(ids.travelDate, String(data.travel_date));
      if (data.num_travelers) body.append(ids.travelers, String(data.num_travelers));
      if (data.package) body.append(ids.package, String(data.package));

      // Add required Google Forms parameters
      body.append('fvv', '1');
      body.append('partialResponse', '[null,null,"-1"]');

      try {
        await fetch(cfg.enquiryAction, {
          method: "POST",
          mode: "no-cors",
          body,
        });
        return { ok: true };
      } catch (err) {
        console.error("Enquiry submission error:", err);
        throw err;
      }
    }
    
    throw new Error("Form provider not configured. Edit js/config.js");
  }

  /**
   * Submit Travel Plan Form to Google Forms (silent, no redirect)
   */
  async function submitTravelPlan(data) {
    const cfg = window.VE_CONFIG.forms;
    
    if (cfg.provider === "google-post") {
      const ids = cfg.travelPlanEntryIds;
      const body = new FormData();
      
      if (data.name) body.append(ids.name, String(data.name));
      if (data.email) body.append(ids.email, String(data.email));
      if (data.phone) body.append(ids.phone, String(data.phone));
      if (data.from_location) body.append(ids.fromLocation, String(data.from_location));
      
      // Handle multiple destinations
      if (data.destinations) {
        const destStr = Array.isArray(data.destinations) ? data.destinations.join(", ") : String(data.destinations);
        body.append(ids.destinations, destStr);
      }
      
      if (data.start_date) body.append(ids.startDate, String(data.start_date));
      if (data.end_date) body.append(ids.endDate, String(data.end_date));
      
      // Handle transport modes (checkboxes)
      if (data.transport_mode) {
        const modesStr = Array.isArray(data.transport_mode) ? data.transport_mode.join(", ") : String(data.transport_mode);
        body.append(ids.transportMode, modesStr);
      }
      
      if (data.budget) body.append(ids.budget, String(data.budget));
      if (data.notes) body.append(ids.notes, String(data.notes));

      // Add required Google Forms parameters
      body.append('fvv', '1');
      body.append('partialResponse', '[null,null,"-1"]');

      try {
        await fetch(cfg.travelPlanAction, {
          method: "POST",
          mode: "no-cors",
          body,
        });
        return { ok: true };
      } catch (err) {
        console.error("Travel plan submission error:", err);
        throw err;
      }
    }
    
    throw new Error("Form provider not configured. Edit js/config.js");
  }

  /**
   * Submit Transport Booking Form to Google Forms (silent, no redirect)
   * Handles multi-segment trips
   */
  async function submitTransportBooking(data) {
    const cfg = window.VE_CONFIG.forms;
    
    if (cfg.provider === "google-post") {
      const ids = cfg.transportBookingEntryIds;
      const body = new FormData();
      
      // Section 1: Basic Info
      if (data.name) body.append(ids.name, String(data.name));
      if (data.email) body.append(ids.email, String(data.email));
      if (data.phone) body.append(ids.phone, String(data.phone));
      
      // Section 2: Trip Segment (first segment - or combine all segments)
      if (data.source) body.append(ids.source, String(data.source));
      if (data.destination) body.append(ids.destination, String(data.destination));
      if (data.travelers) body.append(ids.travelers, String(data.travelers));
      if (data.notes) body.append(ids.notes, String(data.notes));
      
      // Date fields (year/month/day)
      if (data.date) {
        const dateObj = new Date(data.date);
        body.append(ids.date_year, String(dateObj.getFullYear()));
        body.append(ids.date_month, String(dateObj.getMonth() + 1));
        body.append(ids.date_day, String(dateObj.getDate()));
      }
      
      if (data.mode) body.append(ids.mode, String(data.mode));
      
      // Section 3: Summary
      if (data.total_travelers) body.append(ids.totalTravelers, String(data.total_travelers));
      if (data.budget_per_person) body.append(ids.budgetPerPerson, String(data.budget_per_person));
      if (data.overall_notes) body.append(ids.overallNotes, String(data.overall_notes));

      // Add required Google Forms parameters
      body.append('fvv', '1');
      body.append('partialResponse', '[null,null,"-1"]');

      try {
        await fetch(cfg.transportBookingAction, {
          method: "POST",
          mode: "no-cors",
          body,
        });
        return { ok: true };
      } catch (err) {
        console.error("Transport booking submission error:", err);
        throw err;
      }
    }
    
    throw new Error("Form provider not configured. Edit js/config.js");
  }

  /**
   * Bind enquiry form submission
   */
  function bindEnquiryForm(formEl, extraData) {
    if (!formEl) return;
    
    // Add autocomplete attributes to prevent browser warnings
    const nameField = formEl.querySelector('input[name="name"]');
    const emailField = formEl.querySelector('input[name="email"]');
    const phoneField = formEl.querySelector('input[name="phone"]');
    
    if (nameField) nameField.setAttribute('autocomplete', 'name');
    if (emailField) emailField.setAttribute('autocomplete', 'email');
    if (phoneField) phoneField.setAttribute('autocomplete', 'tel');
    
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
        // Ensure extraData values are strings, not objects
        ...(extraData && typeof extraData === 'object' ? Object.fromEntries(Object.entries(extraData).map(([k, v]) => [k, String(v)])) : {}),
      };

      if (!data.name || !data.email) {
        VE.showToast("Please fill in your name and email.", true);
        if (btn) btn.disabled = false;
        return;
      }

      try {
        await submitEnquiry(data);
        VE.showToast("Thank you! Your enquiry has been submitted.");
        formEl.reset();
        const modal = document.getElementById("enquiry-modal");
        if (modal) modal.classList.remove("open");
        if (formEl.dataset.redirect === "thank-you") {
          const base = (window.VE && typeof VE.getBasePath === 'function') ? VE.getBasePath() : '/';
          setTimeout(() => {
            window.location.href = base + 'thank-you/';
          }, 1000);
        }
      } catch (err) {
        VE.showToast(err.message || "Something went wrong. Please try again.", true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  /**
   * Bind travel plan form submission
   */
  function bindTravelPlanForm(formEl) {
    if (!formEl) return;
    
    // Add autocomplete attributes
    const nameField = formEl.querySelector('input[name="name"]');
    const emailField = formEl.querySelector('input[name="email"]');
    const phoneField = formEl.querySelector('input[name="phone"]');
    
    if (nameField) nameField.setAttribute('autocomplete', 'name');
    if (emailField) emailField.setAttribute('autocomplete', 'email');
    if (phoneField) phoneField.setAttribute('autocomplete', 'tel');
    
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = formEl.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;

      const fd = new FormData(formEl);
      const destinations = [...formEl.querySelectorAll('input[name="destination"], .destination-input')].map(i => i.value.trim()).filter(Boolean);
      const modes = [...formEl.querySelectorAll('input[name="transport_mode"]:checked')].map(c => c.value);
      
      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone') || '',
        from_location: fd.get('from_location') || '',
        destinations: destinations,
        start_date: fd.get('start_date') || '',
        end_date: fd.get('end_date') || '',
        transport_mode: modes,
        budget: fd.get('budget') || '',
        notes: fd.get('notes') || '',
      };

      if (!data.name || !data.email) {
        VE.showToast("Please fill in your name and email.", true);
        if (btn) btn.disabled = false;
        return;
      }

      if (!destinations.length) {
        VE.showToast('Please add at least one destination.', true);
        if (btn) btn.disabled = false;
        return;
      }

      try {
        await submitTravelPlan(data);
        VE.showToast('Thank you! Your trip plan has been submitted.');
        document.getElementById('travel-plan-content')?.classList.add('hidden');
        document.getElementById('plan-trip-success')?.classList.remove('hidden');
      } catch (err) {
        VE.showToast(err.message || 'Failed to submit.', true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  /**
   * Bind transport booking form submission
   */
  function bindTransportBookingForm(formEl) {
    if (!formEl) return;
    
    // Add autocomplete attributes
    const nameField = formEl.querySelector('input[name="name"]');
    const emailField = formEl.querySelector('input[name="email"]');
    const phoneField = formEl.querySelector('input[name="phone"]');
    
    if (nameField) nameField.setAttribute('autocomplete', 'name');
    if (emailField) emailField.setAttribute('autocomplete', 'email');
    if (phoneField) phoneField.setAttribute('autocomplete', 'tel');
    
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = formEl.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;

      const fd = new FormData(formEl);
      const segmentsContainer = document.getElementById("segments-container");
      
      // Get first segment data (main segment)
      let firstSegment = null;
      if (segmentsContainer && segmentsContainer.children.length > 0) {
        const firstSegmentEl = segmentsContainer.children[0];
        const srcEl = firstSegmentEl.querySelector('.loc-input.source');
        const dstEl = firstSegmentEl.querySelector('.loc-input.destination');
        const dateEl = firstSegmentEl.querySelector('.segment-date');
        const modeEl = firstSegmentEl.querySelector('.segment-mode');
        const travelersEl = firstSegmentEl.querySelector('.segment-travelers');
        const notesEl = firstSegmentEl.querySelector('.segment-notes');
        
        firstSegment = {
          source: srcEl ? srcEl.value.trim() : '',
          destination: dstEl ? dstEl.value.trim() : '',
          date: dateEl ? dateEl.value : '',
          mode: modeEl ? modeEl.value : '',
          travelers: travelersEl ? travelersEl.value : '1',
          notes: notesEl ? notesEl.value : '',
        };
      }

      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone') || '',
        source: firstSegment?.source || '',
        destination: firstSegment?.destination || '',
        date: firstSegment?.date || '',
        mode: firstSegment?.mode || '',
        travelers: firstSegment?.travelers || '1',
        notes: firstSegment?.notes || '',
        total_travelers: fd.get('num_travelers') || '',
        budget_per_person: fd.get('budget') || '',
        overall_notes: fd.get('notes') || '',
      };

      if (!data.name || !data.email) {
        VE.showToast("Please fill in your name and email.", true);
        if (btn) btn.disabled = false;
        return;
      }

      if (!data.source || !data.destination) {
        VE.showToast('Please fill source and destination for the trip segment.', true);
        if (btn) btn.disabled = false;
        return;
      }

      try {
        await submitTransportBooking(data);
        VE.showToast("Transport booking submitted successfully!");
        document.getElementById('travel-plan-content')?.classList.add('hidden');
        document.getElementById('transport-success')?.classList.remove('hidden');
      } catch (err) {
        VE.showToast(err.message || 'Failed to submit.', true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  window.VE_FORMS = { 
    submitEnquiry, 
    submitTravelPlan,
    submitTransportBooking,
    bindEnquiryForm,
    bindTravelPlanForm,
    bindTransportBookingForm,
  };
})();
