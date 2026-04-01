import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Layers, 
  Cpu, 
  Users, 
  Award, 
  ChevronRight, 
  X,
  Menu,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface ProjectImage {
  url: string;
  alt: string;
  description?: string;
}


export interface Project {
  id: string;
  title: string;
  images: Object[];
  timeline: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  links: { github?: string; live?: string };
  hook: string;
  cta: string;
}

// --- Data ---
export const PROJECTS: Project[] = [
  {
    id: "inbox-messaging-api",
    title: "InboxIT – Messaging API for Static Websites",
    links: {
      github: "https://github.com/Popthemy/inbox-messaging-api",
      live: "https://inboxit-frontend.vercel.app/", // add deployed demo if available
    },
    images: [
      {
        url: "../images/inboxit-emaildelivered.png",
        alt: "Email received from static site submission showing validated message and clean routing",
        description:
          "Real message delivered to inbox after passing honeypot + server-side validation",
      },
      {
        url: "../images/inboxit-api-endpoint.png",
        alt: "API endpoint documentation showing POST /send-message with honeypot field",
        description:
          "Integration-ready endpoint for static sites to securely collect inquiries",
      },
    ],
    timeline: "Manual copy-paste emails → secure, automated inbox API",
    problem:
      "Static landing pages and marketing sites had no safe way to collect user messages without a full backend—leading to spam, lost leads, and manual forwarding.",
    solution:
      "Built a lightweight messaging API that static sites can POST to; includes honeypot spam protection, server-side validation, and automatic routing to multiple email addresses with direct-reply support.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JavaScript",
      "React",
      "HTML5",
      "CSS",
    ],
    impact:
      "Enabled backend-like messaging on static sites; cut spam significantly and allowed one-click replies from client email—no extra tools needed.",
    hook: "Your static site can still collect leads and reply instantly—securely.",
    cta: "See how it works →",
  },

  {
    id: "event-profile-generator",
    title: "LinkedIn Local – Event Profile & Certificate Generator",
    links: {
      github: "https://github.com/Popthemy/linkedIn-dp-generator",
      live: "#",
    },
    images: [
      {
        url: "../images/linkedinProfile-screen.png",
        alt: "Event profile generator portal showing image upload and profile preview",
        description:
          "User interface for uploading photo and generating branded event profile",
      },
      {
        url: "../images/linkedin-local-lagos-certificate.png",
        alt: "Sample generated certificate with participant name, event branding, and QR code",
        description:
          "Automated certificate output used for LinkedIn Local Lagos attendees",
      },
      {
        url: "../images/linkedin-local-lagos-dp.png",
        alt: "Generated LinkedIn-style profile picture overlay with event branding",
        description: "Custom event DP ready for social sharing and publicity",
      },
    ],
    timeline:
      "Manual Canva editing → automated, consistent profile & cert generation",
    problem:
      "Manually designing event profile pictures and certificates for LinkedIn Local Lagos was slow, inconsistent, and hard to scale for hundreds of attendees—limiting post-event publicity.",
    solution:
      "Built a generator that lets users upload photos to create branded event profile overlays and certificates in seconds—complete with consistent sizing, QR verification, and bulk capability.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML"],
    impact:
      "Automated creation for hundreds of participants; boosted event visibility through shareable profiles and certificates; saved hours of manual design work.",
    hook: "One upload → branded profile and certificate ready for sharing.",
    cta: "View the Generator →",
  },

  {
    id: "ecogather",
    title: "EcoGather – QR-Based Eco-Friendly Event Planner",
    links: { github: "https://github.com/Popthemy/EcoGather", live: "https://eco-gather.vercel.app/" },
    images: [
      {
        url: "../images/ecogather-homepage.png",
        alt: "EcoGather homepage showing digital event schedule and QR code access",
        description: "Clean event program dashboard with timings and sections",
      },
      {
        url: "../images/ecogather-responsive-design.png",
        alt: "Mobile view of EcoGather event schedule on smartphone",
        description:
          "Fully responsive layout for attendees to check program on the go",
      },
      {
        url: "../images/ecogather-test-cases.png",
        alt: "Pytest coverage report showing high test coverage for EcoGather backend",
        description:
          "Backend reliability ensured through comprehensive automated tests",
      },
    ],
    timeline:
      "Printed paper programs → digital, sustainable QR-access platform",
    problem:
      "Events (Sunday services, seminars) relied on expensive printed programs—costly, wasteful, and hard to update. Attendees couldn’t easily plan which parts to attend.",
    solution:
      "Created a digital platform where organizers upload the schedule once; attendees scan a QR code to view the full program, timings, and sections on their phones—eliminating printing.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Pytest (test coverage)",
      "Bootstrap",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    impact:
      "Cut printing costs and paper waste for real church and seminar events; improved attendee planning and sustainability without losing convenience.",
    hook: "One QR scan replaces stacks of paper—sustainable and always up-to-date.",
    cta: "See the Platform →",
  },

  {
    id: "load-calculator",
    title: "Load Calculator – Solar & Inverter Planner",
    links: { github: "#", live: "https://load-calc.onrender.com/" },
    images: [
      {
        url: "../images/load-calculations-screen.png",
        alt: "Load Calculator showing appliance list and full solar/battery calculations",
        description:
          "Complete interface with inputs and real-time system sizing results",
      },
      {
        url: "../images/load-calculations-input.png",
        alt: "Appliance input form with wattage, hours, and add/remove controls",
        description:
          "Simple, focused form for entering household or office devices",
      },
      {
        url: "../images/load-calc-backup-screen.png",
        alt: "Backup system calculator with autonomy days and voltage selection",
        description: "Battery and inverter backup sizing section",
      },
      {
        url: "../images/load-calc-mobile-screen.png",
        alt: "Mobile view of Load Calculator displaying responsive layout",
        description: "Fully usable on phones for on-site power audits",
      },
    ],
    timeline:
      "Manual spreadsheet math → dynamic, interactive solar planning tool",
    problem:
      "Estimating power load for solar/inverter setups in Nigeria was manual, error-prone, and slow—especially for homes, seminars, offices, and schools going off-grid.",
    solution:
      "Built a framework-free tool: add appliances → input watts/hours → instantly get total load, daily energy, battery Ah needed, and solar panel sizing.",
    tech: ["Vanilla JavaScript", "HTML", "CSS", "Render"],
    impact:
      "Automated accurate planning for multiple seminars, homes, and small businesses; eliminated spreadsheets and guesswork for inverter/solar decisions.",
    hook: "Know exactly what solar system you need—no more over- or under-buying.",
    cta: "Calculate Your Load Live →",
  },

  {
    id: "clinical-trial-viewer",
    title: "Clinical Trial Viewer",
    links: {
      github: "https://github.com/Popthemy/clinic-trial-viewer",
      live: "#",
    },
    images: [
      {
        url: "../images/clinagent-home.png",
        alt: "Clinical Trial Viewer homepage showing fetched trial list and search",
        description:
          "Clean dashboard displaying trial summaries from ClinicalTrials.gov",
      },
      {
        url: "../images/clinagent-home.png",
        alt: "Example query results with trial title, status, location, and summary",
        description:
          "Search results interface with essential trial information",
      },
      {
        url: "https://via.placeholder.com/600x400?text=AI+Generated+Trial+Visual",
        alt: "OpenAI-generated illustration explaining a clinical trial phase",
        description:
          "AI visual aid making complex trial data easier to understand",
      },
    ],
    timeline: "Manual browsing → fast, visual trial search + AI explanations",
    problem:
      "ClinicalTrials.gov data is scattered and hard to read quickly—researchers, students, and patients waste time digging for key details.",
    solution:
      "Built a Next.js + TypeScript app that searches and displays trials cleanly, then uses OpenAI to generate simple visuals that explain trial phases and context.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "ClinicalTrials.gov API"],
    impact:
      "Made trial info faster to access and easier to understand—especially for non-experts—with visual summaries that reduce confusion.",
    hook: "Find trials fast and actually understand what they mean.",
    cta: "View the Tool →",
  },

  {
    id: "ecommerce-backend-platform",
    title: "E-Commerce Backend for Custom Fashion Designers",
    links: {
      github: "https://github.com/Popthemy/ecommerce-backend",
      live: "#",
    },
    images: [
      {
        url: "https://via.placeholder.com/800x600?text=E-Commerce+Admin+Dashboard",
        alt: "Admin dashboard showing designer posts, custom orders, and measurements",
        description:
          "Backend view for managing custom clothing requests and payments",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Custom+Measurement+Order",
        alt: "User order form with designer style selection and personal measurements",
        description:
          "Frontend flow for customers to submit custom dress orders",
      },
    ],
    timeline: "Generic e-commerce → artisan-focused custom ordering system",
    problem:
      "Fashion designers had no easy way for customers to order custom-made clothes based on posted designs + personal body measurements—standard shops only sold ready-made items.",
    solution:
      "Built a backend where designers post styles, customers browse, select designs, input exact measurements, add to cart, pay via Flutterwave, with full RBAC, JWT/OTP auth, and Cloudinary image handling.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Flutterwave",
      "Cloudinary",
      "JWT",
      "OTP Auth",
    ],
    impact:
      "Allowed artisans to sell truly custom pieces; customers get perfect fits without guesswork; secure payments and role-based access kept everything organized.",
    hook: "Post your design → customers order custom-made, measured to fit.",
    cta: "Explore the Backend →",
  },

  {
    id: "cms-newsletter-platform",
    title: "CMS + Automated Newsletter & Blog Platform",
    links: {
      github: "#",
      live: "#",
    },
    images: [
      {
        url: "../images/cms-newsletter.png",
        alt: "Swagger docs showing newsletter creation and dispatch endpoints",
        description:
          "API interface for creating and sending newsletters to subscribers",
      },
      {
        url: "../images/cms-blogs.png",
        alt: "API endpoints for blog post creation, retrieval, and automation",
        description: "Backend documentation for automated blog publishing",
      },
    ],
    timeline: "Manual blog/newsletter publishing → fully automated delivery",
    problem:
      "Publishing blogs and newsletters manually was slow, repetitive, and didn't scale as the audience or content volume grew.",
    solution:
      "Co-developed a CMS backend with content creation, automated email dispatch for newsletters, scheduled blog delivery, Cloudinary media, and clear API documentation for team use.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Cloudinary",
      "Postman",
      "Vercel",
    ],
    impact:
      "Reduced publishing time by ~50%; shortened QA cycles by ~30% through standardized APIs and collaboration with testing team.",
    hook: "Write once → blogs and newsletters go out automatically.",
    cta: "View the CMS →",
  },
];


export const SKILLS = [
  'Python', 'Django', 'DRF', 'React', 'PostgreSQL', 
  'Celery', 'OpenAI API', 'JWT Auth', 'API Optimization',
  'Git', 'Docker', 'Linux', 'Automation'
];

export const NAV_ITEMS = [
  { name: 'Home', href: '#home', icon: 'Home' },
  { name: 'Projects', href: '#projects', icon: 'Briefcase' },
  { name: 'Skills', href: '#skills', icon: 'Cpu' },
  { name: 'Mentorship', href: '#mentorship', icon: 'Users' },
  { name: 'Contact', href: '#contact', icon: 'Mail' },
];
