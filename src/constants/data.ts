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
    title: "InboxIT: Messaging API for Static Websites",
    links: {
      github: "https://github.com/Popthemy/inbox-messaging-api",
      live: "#",
    },
    images: [
      {
        url: "../images/inboxit-emaildelivered.png",
        alt: "Message delivered to email from inbox API with validation and routing",
        description:
          "Flow enabling secure inquiry collection and routing without a traditional backend server",
      },
      {
        url: "../images/inboxit-api-endpoint.png",
        alt: "API endpoint interface for sending messages through the inbox API",
        description:
          "API endpoints for integrating the inbox messaging API into static websites",
      },
    ],
    timeline:
      "Manually sending email through apps now send api to email securely, API-driven inbox system",
    problem:
      "Static marketing or product pages had no safe, backend-free way to collect and route user messages, leading to spam, lost inquiries, and poor data quality.",
    solution:
      "Built a secure messaging API with server-side validation, honeypot protection, and routing logic—allowing static sites (e.g landing pages...) to receive, filter, and forward inquiries directly to multiple emails at once.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JavaScript",
      "HTM5",
      "CSS",
    ],
    impact:
      "Enabled backend-like messaging for static sites; reduced bot submissions significantly and allowed direct replies to client email with one click.",
    hook: "Static site? Still collect and reply to messages securely.",
    cta: "View the Project →",
  },

  {
    id: "Event-profile-generator",
    title: "Automated Event profile Generator",
    links: {
      github: "https://github.com/Popthemy/linkedIn-dp-generator",
      live: "#",
    },
    images: [
      {
        url: "../images/linkedinProfile-screen.png",
        alt: "Portal for profile  and issuance.",
        description:
          "Interface for uploading images and generating user profile",
      },
      {
        url: "../images/linkedin-local-lagos-certificate.png",
        alt: "Portal for certificate and issuance.",
        description:
          "Interface for uploading images and generating user profile",
      },
      {
        url: "../images/linkedin-local-lagos-dp.png",
        alt: "Sample event profile with name, event details, and branding",
        description: "Output profile ready for download",
      },
    ],
    timeline:
      "Manual designing → secure, generation for individual user, same resolution",
    problem:
      "Manually creating and sending profile for events like LinkedIn Local Lagos was slow and hard to scale for large groups, limiting publicity and follow-up.",
    solution:
      "Built an profile generated system for and collaborated to build a certificate generator for bulk generation, QR verification, branding, and automated delivery—used to drive event visibility and engagement.",
    tech: ["NEXTJS", "HTML", "JAVASCRIPT", "Tailwind"],
    impact:
      "Automated issuance for 1,000+ participants instantly; improved event branding and post-event reach through verifiable digital certs.",
    hook: "Generate and deliver profile and certificate for hundreds—automatically.",
    cta: "View Project →",
  },

  {
    id: "ecogather",
    title: "EcoGather- Eco-Friendly event planner",
    links: { github: "https://github.com/Popthemy/EcoGather", live: "#" },
    images: [
      {
        url: "../images/ecogather-homepage.png",
        alt: "EcoGather event program dashboard showing schedule, timings, and sections",
        description: "Main program view with timeline and section details",
      },
      {
        url: "../images/ecogather-responsive-design.png",
        alt: "Mobile view of EcoGather showing event schedule on phone",
        description: "Responsive mobile layout for on-the-go planning",
      },
      {
        url: "../images/ecogather-test-cases.png",
        alt: "Pytest test coverage report showing high coverage for EcoGather backend",
        description: "Comprehensive test coverage ensuring reliability",
      },
    ],
    timeline: "Static list → Interactive, sustainable event planner",
    problem:
      "Planning events like Sunday services or programs required printing large order-of-program sheets, increasing cost and paper waste. Attendees had no easy way to know exact timings or decide which sections to attend.",
    solution:
      "Created a platform where event organizers upload the program once, and attendees view the full schedule digitally reducing printing costs and enabling better personal planning.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Pytest (test coverage)",
      "Bootstrap",
      "JavaScript",
      "HTMl",
      "Css",
    ],
    impact:
      "Eliminated paper waste for events, lowered planning costs, and allowed attendees to know exact section timings. Used in real church/event contexts to improve sustainability and planning.",
    hook: "Plan your event day without printing see the full program anytime.",
    cta: "View Project →",
  },

  {
    id: "load-calculator",
    title: "Load Calculator",
    links: { github: "#", live: "https://load-calc.onrender.com/" },
    images: [
      {
        url: "../images/load-calculations-screen.png",
        alt: "Full Load Calculator interface showing appliance inputs and solar/battery calculations",
        description:
          "Main view with added appliances and real-time system results",
      },
      {
        url: "../images/load-calculations-input.png",
        alt: "Appliance addition form with power rating and usage hours",
        description: "Interactive input section for adding household devices",
      },
      {
        url: "../images/load-calc-backup-screen.png",
        alt: "Appliance backup form with day of autonomy and volt rating",
        description: "Interactive input section for adding household devices",
      },
      {
        url: "../images/load-calc-mobile-screen.png",
        alt: "Mobile-responsive view of the Load Calculator tool",
        description: "Responsive design on smaller screens",
      },
    ],
    timeline:
      "Load calculator → Dynamic, interactive tool with validation & export",
    problem:
      "Manual power load calculations for solar and inverter setups were time-consuming and error-prone, especially for homes, seminars, and small businesses in Nigeria planning off-grid solutions.",
    solution:
      "Built a lightweight, framework-free interactive tool that lets users add appliances, input power ratings and daily usage hours, then instantly calculates total load, daily energy, battery sizing, and solar panel requirements.",
    tech: ["Vanilla JavaScript", "HTML", "CSS", "Render"],
    impact:
      "Automated estimates for homes, offices, and schools; enables faster, more accurate planning for solar/inverter investments without spreadsheets or guesswork.",
    hook: "Stop guessing your power needs calculate exactly what solar setup will keep the lights on.",
    cta: "Try it live →",
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
        alt: "Clinical Trial Viewer dashboard showing fetched trial list from ClinicalTrials.gov",
        description:
          "Main interface displaying trial title, status, location, and summary",
      },
      {
        url: "../images/clinagent-home.png",
        alt: "Clinical Trial Viewer homepage showing list of queries",
        description:
          "Main interface displaying example of queries",
      },
      {
        url: "https://via.placeholder.com/600x400?text=AI+Generated+Trial+Image",
        alt: "AI-generated visual representation of a clinical trial process",
        description: "OpenAI-generated image enhancing trial understanding",
      },
    ],
    timeline: "Modern Next.js + TypeScript viewer with AI visuals",
    problem:
      "Clinical trial information on ClinicalTrials.gov is scattered and hard to digest quickly for researchers, students, or patients.",
    solution:
      "Built a clean Next.js + TypeScript web app that fetches trial data from ClinicalTrials.gov API, displays key details, and uses OpenAI to generate contextual images for better understanding.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "ClinicalTrials.gov API"],
    impact:
      "Simplified access to trial info with visual aids; made complex data more approachable for non-technical users.",
    hook: "Find and understand clinical trials faster—with visuals that make it clear.",
    cta: "View Project →",
  },
  {
    id: "ecommerce-backend-platform",
    title: "E-Commerce Backend for Fashion Designers",
    links: {
      github: "https://github.com/Popthemy/ecommerce-backend",
      live: "#",
    },
    images: [
      {
        url: "https://via.placeholder.com/800x600?text=E-Commerce+API+Endpoints",
        alt: "Postman collection showing e-commerce API endpoints for products, cart, and orders",
        description: "API documentation and testing in Postman",
      },
      {
        url: "https://via.placeholder.com/600x400?text=E-Commerce+RBAC",
        alt: "Role-Based Access Control dashboard for admin, seller, and buyer roles",
        description: "RBAC interface demonstrating permission management",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Custom+Order+Form",
        alt: "User order form with measurement inputs and designer style selection",
        description: "Frontend-facing order flow for custom dress requests",
      },
    ],
    timeline: "Full secure e-commerce backend with payments",
    problem:
      "Fashion designers needed a way for users to order custom-made clothes based on posted designs and personal measurements—standard e-commerce didn't support artisan workflows or measurement-based orders.",
    solution:
      "Built a backend platform where designers post styles, users browse and order custom pieces with their exact measurements, including product listing, cart, orders, RBAC, JWT/OTP auth, Cloudinary images, and Flutterwave payments.",
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
      "Enabled artisans to sell custom designs directly; users get personalized fits without generic sizing issues; secure and scalable transaction handling.",
    hook: "Designers post, customers order custom—measurements included.",
    cta: "View Project →",
  },

  {
    id: "cms-newsletter-platform",
    title: "CMS & Automated Newsletter Platform",
    links: {
      github: "#",
      live: "#",
    },
    images: [
      {
        url: "../images/cms-newsletter.png",
        alt: "CMS API swagger docs interface showing newsletter creation with dispatch to subscriber",
        description:
          "API endpoints for newsletter creation and email distribution",
      },
      {
        url: "../images/cms-blogs.png",
        alt: "CMS API swagger docs interface showing blog endpoints and automated blog retrieval",
        description:
          "API endpoints for newsletter creation and email distribution",
      },
    ],
    timeline:
      "Manual publishing of blog and styling → automated, scalable content delivery",
    problem:
      "Sending newsletters manually took too much time, introduced errors, and didn't scale as audience grew.",
    solution:
      "Co-developed a lightweight CMS with content management, automated email distribution, automated blog delivery and standardized API responses.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Cloudinary",
      "Postman",
      "Vercel",
    ],
    impact:
      "Cut manual publishing time by ~50%; shortened QA and feedback loops by ~30% through documented APIs and collaboration with QA engineers.",
    hook: "Write once—deliver to thousands automatically.",
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
