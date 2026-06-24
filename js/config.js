/**
 * Site configuration — edit this file before deploying.
 * See README.md for Google Forms / Formspree setup instructions.
 */
window.VE_CONFIG = {
  brand: {
    short: "Star Voyager Elite",
    full: "Voyager Elite Travel Agency",
    email: "krupanand@voyagerelite.travel",
  },
  contact: {
    phone: "+91 9299152192",
    phoneHref: "tel:+919299152192",
    whatsapp: "+91 9299152192",
    whatsappHref: "https://wa.me/919299152192",
    address: "Pratap Nagar, Andhra Pradesh, India",
    mapLink: "https://maps.google.com/?q=Pratap+Nagar,Andhra+Pradesh,India",
    hours: "9 AM - 8 PM IST",
    responseTime: "Within 24 hours",
  },
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  /**
   * Form handling — choose ONE provider:
   *
   * "google-redirect" — opens your Google Form in a new tab (easiest setup)
   * "formspree"       — POST to Formspree (free tier: 50/month)
   * "google-post"     — POST directly to Google Forms (advanced, needs entry IDs)
   */
  forms: {
    provider: "google-redirect",

    // Replace with your Google Form URLs after creating forms
    enquiryUrl: "https://docs.google.com/forms/d/e/YOUR_ENQUIRY_FORM_ID/viewform",
    travelPlanUrl: "https://docs.google.com/forms/d/e/YOUR_TRAVEL_PLAN_FORM_ID/viewform",

    // Formspree endpoint (if provider is "formspree")
    formspreeEnquiry: "https://formspree.io/f/YOUR_FORM_ID",
    formspreeTravelPlan: "https://formspree.io/f/YOUR_FORM_ID",

    // Google Forms POST endpoints (if provider is "google-post")
    // Get these from your form's "prefill" link or browser dev tools
    googleEnquiryAction: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
    googleTravelPlanAction: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
    googleEntryIds: {
      name: "entry.123456789",
      email: "entry.987654321",
      phone: "entry.111111111",
      travelDate: "entry.222222222",
      travelers: "entry.333333333",
      message: "entry.444444444",
      package: "entry.555555555",
    },
  },

  heroSlides: [
    { image: "images/hero-beach.jpg", title: "Discover Paradise", subtitle: "Unforgettable beach escapes to the world's most stunning coastlines" },
    { image: "images/hero-backwaters.jpg", title: "Backwaters of Kerala", subtitle: "Cruise through serene waterways and experience timeless beauty" },
    { image: "images/hero-bali.jpg", title: "Bali Awaits", subtitle: "Ancient temples, rice terraces, and spiritual retreats" },
    { image: "images/hero-mountains.jpg", title: "Adventure Awaits", subtitle: "Trek through majestic landscapes and find your inner explorer" },
  ],

  popularDestinations: ["Goa", "Kerala", "Bali", "Dubai", "Thailand"],
};
