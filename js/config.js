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
   * Form handling — using "google-post" for silent auto-submit
   * Forms will be filled and submitted in background without user seeing them
   */
  forms: {
    provider: "google-post",

    // Google Form action endpoints for POST submission
    enquiryAction: "https://docs.google.com/forms/d/e/1FAIpQLSfEAJN35AOGB1hb0XQQsjz68lHi8ol3Qw4CYeG_cF-eGQ6Vag/formResponse",
    travelPlanAction: "https://docs.google.com/forms/d/e/1FAIpQLSdV6mzD-JjEzMgXjo-K1a_tbzNc0jJq_R0_4Cs0XZ16MIHwEg/formResponse",
    transportBookingAction: "https://docs.google.com/forms/d/e/1FAIpQLSeVAgWuWmMSYztzlRetpZ1gEF2yuAfvXt9n6w7TcmDTbh3n-g/formResponse",

    // Travel Enquiry Form Entry IDs
    enquiryEntryIds: {
      name: "entry.1131269551",
      email: "entry.1729620236",
      phone: "entry.771633320",
      travelers: "entry.1478205533",      // Number of Travellers
      package: "entry.1572531549",        // Package
      message: "entry.241453670",         // Message
      travelDate: "entry.1366720409",     // Travel Date
    },

    // Custom Trip Plan Form Entry IDs
    travelPlanEntryIds: {
      name: "entry.1253365035",
      email: "entry.789250796",
      phone: "entry.1522248118",
      fromLocation: "entry.1327714132",
      destinations: "entry.1733651471",
      startDate: "entry.1304135612",
      endDate: "entry.1141532271",
      transportMode: "entry.990154997",
      budget: "entry.1015767172",
      notes: "entry.1304135612",
    },

    // Transport Booking Form Entry IDs
    transportBookingEntryIds: {
      // Section 1: Basic Info
      name: "entry.1250143177",
      email: "entry.626632984",
      phone: "entry.1923781285",
      
      // Section 2: Trip Segment
      source: "entry.1789512304",
      destination: "entry.1453095976",
      travelers: "entry.1060493185",
      notes: "entry.864271153",
      date_year: "entry.195141226_year",
      date_month: "entry.195141226_month",
      date_day: "entry.195141226_day",
      mode: "entry.1623760142",
      mode_sentinel: "entry.1623760142_sentinel",
      
      // Section 3: Summary
      totalTravelers: "entry.936040890",
      budgetPerPerson: "entry.1274534142",
      overallNotes: "entry.737071276",
    },

    // Legacy Formspree endpoints (if needed)
    formspreeEnquiry: "https://formspree.io/f/YOUR_FORM_ID",
    formspreeTravelPlan: "https://formspree.io/f/YOUR_FORM_ID",
  },

  heroSlides: [
    { image: "images/hero-beach.jpg", title: "Discover Paradise", subtitle: "Unforgettable beach escapes to the world's most stunning coastlines" },
    { image: "images/hero-backwaters.jpg", title: "Backwaters of Kerala", subtitle: "Cruise through serene waterways and experience timeless beauty" },
    { image: "images/hero-bali.jpg", title: "Bali Awaits", subtitle: "Ancient temples, rice terraces, and spiritual retreats" },
    { image: "images/hero-mountains.jpg", title: "Adventure Awaits", subtitle: "Trek through majestic landscapes and find your inner explorer" },
  ],

  popularDestinations: ["Goa", "Kerala", "Bali", "Dubai", "Thailand"],
};
