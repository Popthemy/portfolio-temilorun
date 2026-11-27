export interface ProjectImage {
  url: string;
  alt: string;
  description?: string;
}

export interface ProjectArchitectureNode {
  label: string;
  detail?: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  contribution: string;
  isCollaborative?: boolean;
  implementation: {
    summary: string;
    points: string[];
  };
  decisions: {
    title: string;
    detail: string;
  }[];
  architecture?: {
    title: string;
    note?: string;
    steps: ProjectArchitectureNode[];
    image?: ProjectImage;
  };
  outcome?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  images: ProjectImage[];
  timeline: string;
  problem: string;
  solution: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
  };
  cta: string;
  caseStudy: ProjectCaseStudy;
}

export const RESUME_URL =
  "https://docs.google.com/document/d/1g0JpLEIYOkChWsCEW7Kx1t69FLXzVVbB/export?format=pdf";

// --- Data ---
export const PROJECTS: Project[] = [
  {
    id: "sendit",
    slug: "sendit",
    title: "SendIT",
    featured: true,
    links: {
      live: "https://senditt.com.ng/",
    },
    images: [],
    timeline: "Logistics Marketplace | Backend Engineering",
    problem:
      "Getting a parcel across cities can be expensive. At the same time, people are already travelling those routes and may have room to carry items.",
    solution:
      "Built core backend workflows for a marketplace that connects senders with carriers travelling in the same direction. The work covers delivery offers, proposals, shipment lifecycle, verification, and payment and escrow integrations.",
    tech: [
      "Python",
      "Django",
      "PostGIS",
      "Django Channels",
      "Payments",
      "Webhooks",
    ],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "SendIT connects people who need to send parcels with travellers and carriers already heading in a compatible direction.",
      problem:
        "For inter-city deliveries, dedicated courier services can be costly. Existing travel routes are an opportunity to move parcels, but matching people safely requires clear delivery workflows, verification, and payment safeguards.",
      contribution:
        "I worked on the backend that supports the marketplace, including the offer-to-shipment workflow, route alerts, and payment and escrow integrations.",
      isCollaborative: true,
      implementation: {
        summary:
          "The backend uses Django with  PostGIS to support marketplace workflows, location-aware filtering, and payment events.",
        points: [
          "Built API workflows for creating offers, submitting proposals, and progressing accepted deliveries into shipments.",
          "Used PostgreSQL and PostGIS for location and route-related matching.",
          "Implemented verification steps that support trust and accountability during delivery.",
          "Integrated payment and escrow workflows with server-side handling of provider events.",
        ],
      },
      decisions: [
        {
          title: "A Clear Offer-to-Shipment Workflow",
          detail:
            "Kept offers, proposals, and shipments as distinct stages. This makes it clear when a carrier has responded, when a sender has accepted a proposal, and when a delivery is being carried out.",
        },
        {
          title: "Location-Aware Filtering ",
          detail:
            "Used PostgreSQL and PostGIS for geographic queries instead of relying only on city names, allowing the system to work with more useful location and route information.",
        },
        {
          title: "Idempotent Webhook Handling for Escrow & Payments",
          detail:
            "Kept payment and escrow state changes on the backend, where provider events can be checked before they affect the application’s records.",
        },
      ],
      architecture: {
        title: "How a Delivery Moves Through SendIT",
        note: "This is a high-level view of the system.",
        steps: [
          {
            label: "Sender and Carrier",
            detail:
              "Create offers, respond to proposals, and follow deliveries",
          },
          {
            label: "Django API",
            detail: "Handles accounts, verification, and delivery workflows",
          },
          {
            label: "PostgreSQL and PostGIS",
            detail: "Stores marketplace data and supports location queries",
          },
          {
            label: "Payment and Escrow",
            detail: "Handles payment events and settlement updates",
          },
        ],
      },
      outcome:
        "SendIT is available at senditt.com.ng. The backend supports the core marketplace workflow, from delivery offers and proposals to shipment tracking and payment-related processes.",
    },
  },
  {
    id: "inboxit",
    slug: "inboxit",
    title: "Inboxit",
    featured: true,
    links: {
      github: "https://github.com/Popthemy/inboxit-backend",
      live: "https://inboxit-frontend.vercel.app/",
    },
    images: [
      {
        url: "/images/inboxit-api-endpoint.png",
        alt: "Inboxit API endpoint documentation",
        description:
          "Integration-ready endpoint allowing static websites to submit validated inquiries securely.",
      },
      {
        url: "/images/inboxit-emaildelivered.png",
        alt: "Email delivered to inbox from a static website form submission",
        description:
          "Formatted message delivered to the recipient inbox after passing API-key and spam checks.",
      },
    ],
    timeline: "API-First Form Submission Backend",
    problem:
      "A simple contact form should not require every static website owner to build and maintain a backend.",
    solution:
      "Built a Django REST API that lets static websites submit contact forms securely. It checks incoming requests, filters basic spam, and routes valid messages to an email inbox.",
    tech: [
      "Python",
      "Django REST Framework",
      "API Security",
      "Email Integration",
    ],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "Inboxit gives static websites, portfolios, and landing pages a backend for receiving contact form messages without having to run their own server.",
      problem:
        "A static website cannot safely handle email delivery on its own. Putting mail credentials in frontend code exposes them, while building a separate backend just for a contact form can be unnecessary work.",
      contribution:
        "I built the Django REST Framework backend, including API-key checks, request validation, honeypot spam filtering, and email routing. I also worked on the companion frontend used to demonstrate the integration.",
      isCollaborative: false,
      implementation: {
        summary:
          "A REST API receives form submissions, checks them before processing, and sends accepted messages to the configured inbox.",
        points: [
          "Added submission endpoints that check a project API key before accepting a request.",
          "Validated submitted fields on the server and used a honeypot field to help filter automated spam.",
          "Connected accepted submissions to email delivery, with reply-to support so recipients can respond to the sender.",
        ],
      },
      decisions: [
        {
          title: "Keep Email Credentials on the Server",
          detail:
            "The frontend sends a project API key rather than handling mail-provider credentials. Email configuration stays on the backend.",
        },
        {
          title: "Validate Before Sending",
          detail:
            "Checked the request payload and honeypot field at the API boundary so invalid or obvious automated submissions are rejected before email delivery is attempted.",
        },
        {
          title: "Make Replies Practical",
          detail:
            "Used the sender’s address as the reply-to address, allowing the recipient to respond from their normal inbox without exposing email transport details to the frontend.",
        },
      ],
      architecture: {
        title: "From Website Form to Inbox",
        steps: [
          {
            label: "Website Form",
            detail: "Sends the message and project API key",
          },
          {
            label: "Django API",
            detail:
              "Checks the key, validates fields, and filters honeypot submissions",
          },
          {
            label: "Submission Handling",
            detail: "Prepares the accepted message for delivery and saves it.",
          },
          {
            label: "Recipient Inbox",
            detail: "Receives the email with reply-to information",
          },
        ],
      },
      outcome:
        "The API supports the contact workflow used by this portfolio. The public repository and frontend demo provide a way to explore the implementation.",
    },
  },
  {
    id: "ecogather",
    slug: "ecogather",
    title: "EcoGather",
    featured: true,
    links: {
      github: "https://github.com/Popthemy/EcoGather",
      live: "https://eco-gather.vercel.app/",
    },
    images: [
      {
        url: "/images/ecogather-homepage.png",
        alt: "EcoGather event programme interface showing schedule and sections",
        description:
          "Digital event programme view with structured timings and sections.",
      },
      {
        url: "/images/ecogather-responsive-design.png",
        alt: "Responsive mobile layout of EcoGather event schedule",
        description:
          "Mobile-accessible programme layout for attendees during live events.",
      },
      {
        url: "/images/ecogather-api-docs.png",
        alt: "EcoGather REST API documentation and architecture overview",
        description:
          "Documented API endpoints covering event management, templates, and QR generation.",
      },
      {
        url: "/images/ecogather-test-cases.png",
        alt: "Pytest test  output for EcoGather backend",
        description: "Automated Pytest coverage across core backend workflows.",
      },
    ],
    timeline: "Digital Event Programme | API-First Backend",
    problem:
      "Printed event programmes can become outdated when plans change, and many are thrown away shortly after an event.",
    solution:
      "Built an API-first event programme platform where organizers can manage events, control access to private programmes, reuse templates, add custom programme fields, and share a digital programme through a QR code.",
    tech: ["Python", "Django REST Framework", "PostgreSQL", "Segno", "Pytest"],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "EcoGather helps event organizers publish digital programmes that attendees can open from a shared link or QR code. Its idea came from seeing printed programmes discarded after events.",
      problem:
        "Printed programmes are difficult to update once distributed. If a schedule changes, organizers may need to print them again, and the original copies often have a very short useful life.",
      contribution:
        "I built the Django REST Framework backend and PostgreSQL data models, including organizer-owned event permissions, private-event access, reusable templates, custom programme fields, and a QR-code generation endpoint. I also built the project’s demo web views.",
      isCollaborative: false,
      implementation: {
        summary:
          "The platform uses Django REST Framework and PostgreSQL for event and programme management, with Segno generating QR images from links.",
        points: [
          "Added authentication and organizer-level permissions for managing events.",
          "Applied access rules so private event information is not treated as public content.",
          "Built reusable templates and custom fields to support different programme layouts.",
          "Added a Segno-powered endpoint that turns a URL supplied by the frontend into a QR code.",
        ],
      },
      decisions: [
        {
          title: "Reusable Templates and Flexible Fields",
          detail:
            "Used templates and custom programme fields so organizers can reuse a structure and adapt it to different events without requiring a new fixed set of fields for every programme.",
        },
        {
          title: "Organizer-Level Access Control",
          detail:
            "Kept ownership and private-event checks in the backend. The API, rather than the interface alone, decides whether an organizer can manage an event or a viewer can access restricted content.",
        },
        {
          title: "Keep QR Generation Focused",
          detail:
            "The QR endpoint accepts a URL from the frontend and encodes it using Segno. This keeps QR generation reusable instead of tying it to one hardcoded event URL format.",
        },
      ],
      architecture: {
        title: "From Event Setup to Attendee Access",
        note: "The frontend supplies the event URL to the QR endpoint. The backend generates a QR image from that URL; it does not independently construct the event link.",
        steps: [
          {
            label: "Organizer Sign-in",
            detail: "Authenticates before managing owned events",
          },
          {
            label: "Event Management",
            detail: "Creates an event and sets its visibility",
          },
          {
            label: "Programme Setup",
            detail: "Uses a template and adds programme fields",
          },
          {
            label: "QR Generation",
            detail: "Frontend sends the shareable URL to the Segno endpoint",
          },
          {
            label: "Attendee Access",
            detail: "Opens the digital programme from the shared link",
          },
        ],
        image: {
          url: "/images/ecogather-api-docs.png",
          alt: "EcoGather architecture and API documentation diagram",
          description: "EcoGather API and system architecture overview.",
        },
      },
      outcome:
        "The project has a deployed frontend and a Django REST API covering event management, templates, custom fields, access control, and QR generation.",
    },
  },
  {
    id: "event-profile-generator",
    slug: "linkedin-local-generator",
    title: "LinkedIn Local — Event Profile & Certificate Generator",
    featured: true,
    links: {
      github: "https://github.com/Popthemy/linkedIn-dp-generator",
    },
    images: [
      {
        url: "/images/linkedinProfile-screen.png",
        alt: "Event profile generator interface with photo upload and preview",
        description:
          "Participant portal for uploading a portrait and generating a branded overlay.",
      },
      {
        url: "/images/linkedin-local-lagos-dp.png",
        alt: "Generated branded LinkedIn event profile picture",
        description:
          "Consistent branded profile image formatted for social sharing.",
      },
      {
        url: "/images/linkedin-local-lagos-certificate.png",
        alt: "Sample generated event certificate with participant name and event branding",
        description:
          "Generated participant certificate with standardized event layout.",
      },
    ],
    timeline: "Collaborative Frontend Project",
    problem:
      "Preparing profile images and certificates for every event participant by hand takes time and can lead to inconsistent designs.",
    solution:
      "Contributed to a web tool that lets event participants create  certificates for LinkedIn Local event.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "A collaborative event tool that helps participants create LinkedIn Local event profile images and certificates using consistent event branding.",
      problem:
        "Preparing branded images and certificates one person at a time creates repetitive work for organizers and makes it harder to keep every asset consistent.",
      contribution:
        "I contributed to the Next.js and TypeScript frontend, working on the participant previewing the ceritificate, and generating shareable assets.",
      isCollaborative: true,
      implementation: {
        summary:
          "A Next.js and TypeScript interface that combines participant-provided information and photos with event-branded templates.",
        points: [
          "Built photo upload and preview interactions for participant portraits.",
          "Worked with reusable event frames for profile images and certificates.",
          "Used Tailwind CSS to support a responsive experience across screen sizes.",
        ],
      },
      decisions: [
        {
          title: "Let Participants Create Their Own Assets",
          detail:
            "A self-service flow reduces the need for organizers to prepare each participant’s image manually.",
        },
        {
          title: "Keep Template Data Structured",
          detail:
            "Used TypeScript types for participant information and template-related data to make the frontend easier to maintain.",
        },
      ],
      outcome:
        "Contributed to a reusable event asset generator for LinkedIn Local participants.",
    },
  },
  {
    id: "cms-newsletter-platform",
    slug: "cms-newsletter-platform",
    title: "CMS + Newsletter Platform",
    featured: true,
    links: {},
    images: [
      {
        url: "/images/cms-newsletter.png",
        alt: "Swagger API documentation for newsletter creation and dispatch endpoints",
        description:
          "Newsletter API endpoints for composing and dispatching subscriber campaigns.",
      },
      {
        url: "/images/cms-blogs.png",
        alt: "Swagger API documentation for blog publishing endpoints",
        description:
          "Blog content endpoints consumed by frontend and QA teams.",
      },
    ],
    timeline: "Collaborative Backend Development",
    problem:
      "Publishing content and sending newsletter updates manually can create repetitive work and slow down the handoff between content, engineering, and QA.",
    solution:
      "Co-developed backend features for a CMS and newsletter platform, including content APIs, newsletter workflows, media uploads, and API documentation for the wider team.",
    tech: ["Django", "Django REST Framework", "PostgreSQL", "Cloudinary"],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "A collaborative CMS and newsletter platform designed to bring content publishing, media management, and subscriber updates into one workflow.",
      problem:
        "The team needed a consistent way to manage blog content and newsletter activity, while making the backend straightforward for frontend developers and QA to work with.",
      contribution:
        "I co-developed the Django REST Framework backend workflows for blog and newsletter endpoints, Cloudinary media integration, and API documentation consumed by frontend and QA teammates.",
      isCollaborative: true,
      implementation: {
        summary:
          "A Django REST Framework and PostgreSQL backend exposing content and newsletter workflows, with Cloudinary handling uploaded media.",
        points: [
          "Worked on API endpoints for blog content and newsletter management.",
          "Integrated Cloudinary for uploaded article and campaign media.",
          "Documented API contracts with Swagger/OpenAPI to support frontend integration and QA.",
        ],
      },
      decisions: [
        {
          title: "Document the API for the Whole Team",
          detail:
            "Used Swagger/OpenAPI documentation to make request and response formats easier for frontend developers and QA engineers to understand and test.",
        },
        {
          title: "Use a Dedicated Media Service",
          detail:
            "Integrated Cloudinary for uploaded media rather than making the application responsible for serving those files itself.",
        },
      ],
      outcome:
        "Contributed backend features that brought content management, media uploads, and newsletter workflows behind a shared API.",
    },
  },
  {
    id: "ecommerce-backend-platform",
    slug: "ecommerce-backend",
    title: "E-commerce Backend",
    featured: true,
    links: {
      github: "#",
    },
    images: [],
    timeline: "E-commerce API | Backend Development",
    problem:
      "A made-to-measure clothing store needs more than a standard product catalogue: it also needs to collect measurements and keep them connected to the right order.",
    solution:
      "Built the backend for a clothing e-commerce workflow, covering product management, customer measurements, carts and orders, authentication, and payment integration.",
    tech: [
      "Django",
      "DRF",
      "PostgreSQL",
      "Flutterwave",
      "Cloudinary",
      "JWT/OTP",
    ],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "A Django REST Framework backend for a clothing store that supports both catalogue products and made-to-measure orders.",
      problem:
        "A standard product-and-size checkout does not capture the measurements a designer needs to fulfil a custom clothing order. Those details also need to remain associated with the correct purchase.",
      contribution:
        "I handled the backend work, including the API, database models, authentication and permissions, order workflows, and payment integration. Frontend implementation was outside my scope.",
      isCollaborative: false,
      implementation: {
        summary:
          "A Django REST Framework API backed by PostgreSQL, supporting buyer and designer workflows for products, measurements, orders, and payments.",
        points: [
          "Implemented JWT authentication, OTP verification, and role-based permissions for the relevant user types.",
          "Built product and measurement-related API workflows, with Cloudinary integration for product media.",
          "Connected cart and order workflows so custom measurement details are associated with the relevant order.",
          "Integrated Flutterwave and handled payment verification on the backend.",
        ],
      },
      decisions: [
        {
          title: "Keep Measurements with the Order",
          detail:
            "Preserved the measurements used for a purchase with the order, so a later change to a customer profile does not silently change the specifications for an existing order.",
        },

        {
          title: "Verify Payments on the Backend",
          detail:
            "Checked payment status server-side before treating an order as paid, rather than relying on a result reported by the browser.",
        },
      ],
      architecture: {
        title: "How the E-commerce Backend Fits Together",
        steps: [
          {
            label: "Buyer and Designer",
            detail: "Use the API for shopping and product management",
          },
          {
            label: "Authentication and Permissions",
            detail: "Checks identity and allowed actions",
          },
          {
            label: "Django REST API",
            detail: "Handles products, measurements, carts, and orders",
          },
          {
            label: "External Services and Database",
            detail: "PostgreSQL, Cloudinary, and Flutterwave",
          },
        ],
      },
      outcome:
        "The public backend repository demonstrates the API workflows for custom measurements, product management, orders, permissions, media, and payment verification.",
    },
  },
  // --- Supporting Projects ---
  {
    id: "clinical-trial-viewer",
    slug: "clinical-trial-viewer",
    title: "Clinical Trial Viewer",
    featured: false,
    links: {},
    images: [
      {
        url: "/images/clinagent-home.png",
        alt: "Clinical Trial Viewer dashboard showing trial search results from ClinicalTrials.gov",
        description:
          "Search and summary interface displaying structured clinical trial details.",
      },
    ],
    timeline: "Biomedical Chatbot | AI & ClinicalTrials.gov Integration",
    problem:
      "Clinical trial records are detailed, and searching them with conventional filters can be difficult when people describe what they need in everyday language.",
    solution:
      "Built a biomedical chatbot that uses OpenAI tool calls through MCP to translate natural-language questions into ClinicalTrials.gov searches, then summarizes retrieved studies in a readable form. The featured version processes result chunks asynchronously with Celery, Docker, and Redis; a separate Flask version uses Redis-backed retention.",
    tech: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "MCP",
      "ClinicalTrials.gov API",
      "Celery",
      "Docker",
      "Redis",
      "Flask",
    ],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "A biomedical chatbot that helps people explore public ClinicalTrials.gov studies using natural-language questions and AI-generated summaries.",
      problem:
        "People may know what they are looking for but not the registry terms or filters needed to find relevant studies. Long trial records can also take time to review and compare.",
      contribution:
        "Built the chatbot workflow connecting the user interface, OpenAI, MCP tool calls, and ClinicalTrials.gov study data, with background processing for the version featured here.",
      isCollaborative: false,
      implementation: {
        summary:
          "The chatbot turns a natural-language request into a study search, retrieves matching records from ClinicalTrials.gov through an MCP tool call, and uses OpenAI to summarize the results for the user.",
        points: [
          "Interpreted everyday-language questions and translated them into ClinicalTrials.gov search queries.",
          "Retrieved public study records through MCP tool calls and passed relevant results to OpenAI for summarization.",
          "Presented study matches and summaries in a human-readable interface.",
          "Used Celery workers with Docker and Redis to process large result sets in chunks without making users wait for one long request.",
          "Flask implementation with Redis-backed for retention of similar questions.",
        ],
      },
      decisions: [
        {
          title: "Process Large Result Sets in the Background",
          detail:
            "Chunked study data and handled the work asynchronously with Celery, Docker, and Redis so longer searches and summaries did not hold the user request open.",
        },
      ],
      outcome: "This biomedical chatbot is not publicly available.",
    },
  },
  {
    id: "load-calculator",
    slug: "load-calculator",
    title: "Load Calculator",
    featured: false,
    links: {
      live: "https://load-calc.onrender.com/",
    },
    images: [
      {
        url: "/images/load-calculations-screen.png",
        alt: "Load Calculator showing appliance table and real-time solar sizing results",
        description:
          "Real-time power load, daily energy, battery, and solar panel calculations.",
      },
      {
        url: "/images/load-calculations-input.png",
        alt: "Appliance input form for wattage and daily usage hours",
        description:
          "Appliance entry controls for wattage, quantity, and daily hours.",
      },
      {
        url: "/images/load-calc-backup-screen.png",
        alt: "Battery backup and inverter voltage sizing view",
        description: "Autonomy days and battery bank sizing output.",
      },
      {
        url: "/images/load-calc-mobile-screen.png",
        alt: "Mobile-responsive layout of Load Calculator",
        description:
          "Responsive layout usable on mobile during on-site audits.",
      },
    ],
    timeline: "Interactive Utility | Frontend Development",
    problem:
      "Working out appliance loads and backup requirements by hand takes time and makes it easy to miss a calculation.",
    solution:
      "Built a browser-based calculator that uses appliance ratings and usage hours to estimate power load, energy demand, battery capacity, and solar requirements.",
    tech: ["JavaScript", "HTML", "CSS", "Render"],
    cta: "View Case Study",
    caseStudy: {
      overview:
        "A lightweight browser-based tool for estimating household appliance loads and basic solar and inverter requirements.",
      problem:
        "Manually adding appliance loads and estimating daily energy use can be tedious, especially when comparing different combinations of appliances and usage hours.",
      contribution:
        "Built the calculation logic and responsive interface using vanilla JavaScript, HTML, and CSS.",
      isCollaborative: false,
      implementation: {
        summary:
          "A client-side calculator that updates load and energy estimates as users add appliances and change their usage details.",
        points: [
          "Added inputs for appliance wattage, quantity, and daily usage hours.",
          "Calculated the combined load and estimated daily energy demand.",
          "Presented battery and solar sizing estimates in a responsive interface with export as PDF.",
        ],
      },
      decisions: [
        {
          title: "Keep the Tool Lightweight",
          detail:
            "Used vanilla JavaScript, HTML, and CSS so the calculator could work without a frontend framework or a separate backend service.",
        },
      ],
      outcome:
        "Deployed at load-calc.onrender.com as a browser-based tool for exploring appliance load and backup estimates.",
    },
  },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "REST APIs",
      "JWT",
      "Celery",
      "Redis",
    ],
  },
  {
    category: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Database Design",
      "Query Optimization",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Postman", "Linux", "Cloudinary", "Flutterwave"],
  },
];

// Ordered hierarchy: Backend first, then Data, Frontend, Tools
export const SKILLS: string[] = SKILL_GROUPS.flatMap((group) => group.items);

export const NAV_ITEMS = [
  { name: "Home", href: "#home", icon: "Home" },
  { name: "Projects", href: "#projects", icon: "Briefcase" },
  { name: "Skills", href: "#skills", icon: "Cpu" },
  { name: "Mentorship", href: "#mentorship", icon: "Users" },
  { name: "Contact", href: "#contact", icon: "Mail" },
];
