/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { motion as framerMotion } from "framer-motion";
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
  ArrowRight,
} from "lucide-react";
import Hero from "./components/Hero";
// --- Types ---

interface Project {
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

const PROJECTS: Project[] = [
  {
    id: "bookhall",
    title: "Bookhall",
    links: { github: "https://github.com/Popthemy/Booking_Hall_24", live: "#" }, // add real links if deployed
    images: [
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771899939/list_of_halls_nqvj9r.png",
        alt: "Bookhall showing available halls for scheduled classes, and booking status",
        description:
          "Central view of all halls with real-time availability and class schedule",
      },
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771899937/showing_schedule_list_mnlr0l.png",
        alt: "central list of hall schedule showing booked slots, and class details",
        description:
          "Central view of all halls with real-time availability and class schedule",
      },
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771899938/form_for_scheduling_hall_jhkkk7.png",
        alt: "Booking creation form with hall selection automatically,, and course details",
        description: "Form used by lecturers or reps to reserve a hall",
      },
    ],
    timeline: "Full MVT system with real-time availability",
    problem:
      "During 200 level, classes were frequently cancelled due to hall unavailability. No single source of truth existed reps often gave conflicting information, leading to confusion and wasted time checking halls physically.",
    solution:
      "Built a Django MVT application that provides a central dashboard for each hall where anyone can view current hall bookings, see which halls are in use, and book slots with clear visibility of conflicts.",
    tech: [
      "Django MVT",
      "Jinja2 Templates",
      "PostgreSQL",
      "Bootstrap",
      "Cloudinary",
    ],
    impact:
      "Created a single source of truth that could prevent class cancellations and reduce physical checks. Demonstrated in university context with real scheduling pain point solved.",
    hook: "No more surprise class cancellations see hall availability instantly.",
    cta: "View Project →",
  },

  {
    id: "ecogather",
    title: "EcoGather",
    links: { github: "https://github.com/Popthemy/EcoGather", live: "#" },
    images: [
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771901900/portfolio/ecogather_homepage_mzwkwo.png",
        alt: "EcoGather event program dashboard showing schedule, timings, and sections",
        description: "Main program view with timeline and section details",
      },
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771901900/portfolio/ecogather_responsive_desgin_g6ut6d.png",
        alt: "Mobile view of EcoGather showing event schedule on phone",
        description: "Responsive mobile layout for on-the-go planning",
      },
      {
        url: "https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771901900/portfolio/ecogather_test_cases_nhsyap.png",
        alt: "Pytest test coverage report showing high coverage for EcoGather backend",
        description: "Comprehensive test coverage ensuring reliability",
      },
    ],
    timeline: "Static list → Interactive, sustainable event planner",
    problem:
      "Planning events like Sunday services or programs required printing large order-of-program sheets, increasing cost and paper waste. Attendees had no easy way to know exact timings or decide which sections to attend.",
    solution:
      "Created a platform where event organizers upload the program once, and attendees view the full schedule digitally—reducing printing costs and enabling better personal planning.",
    tech: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Pytest (test coverage)",
      "Bootstrap",
    ],
    impact:
      "Eliminated paper waste for events, lowered planning costs, and allowed attendees to know exact section timings. Used in real church/event contexts to improve sustainability and planning.",
    hook: "Plan your event day without printing—see the full program anytime.",
    cta: "View Project →",
  },

  {
    id: "ecommerce-api",
    title: "E-Commerce API",
    links: { github: "#", live: "#" },
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
    ],
    timeline: "Full secure e-commerce backend with payments",
    problem:
      "Building e-commerce features without proper authentication, access control, or payment integration led to security risks and poor user experience.",
    solution:
      "Collaboratively developed a complete REST API with product listing, cart, orders, Cloudinary image storage, Flutterwave payments, RBAC, JWT authentication, and OTP verification.",
    tech: [
      "Django Rest Framework",
      "Flutterwave",
      "Cloudinary",
      "JWT",
      "OTP Auth",
      "PostgreSQL",
    ],
    impact:
      "Enabled secure transactions, role-specific access, and reliable media handling. Reduced potential vulnerabilities and supported full checkout flow.",
    hook: "Secure, scalable e-commerce backend—ready for real payments and users.",
    cta: "View Project →",
  },

  {
    id: "load-calculator",
    title: "Load Calculator",
    links: { github: "#", live: "https://load-calc.onrender.com/" },
    images: [
      {
        url: "https://via.placeholder.com/800x600?text=Load+Calculator+Full+View",
        alt: "Full Load Calculator interface showing appliance inputs and solar/battery calculations",
        description:
          "Main view with added appliances and real-time system results",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Load+Calculator+Input+Form",
        alt: "Appliance addition form with power rating and usage hours",
        description: "Interactive input section for adding household devices",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Load+Calculator+Results",
        alt: "System calculations output: Total Power, Daily Energy, Battery Ah, Solar Panels W",
        description: "Dynamic results section after data entry",
      },
      {
        url: "https://via.placeholder.com/400x600?text=Load+Calculator+Mobile",
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
      "Automated estimates for multiple regional seminars and personal use cases; enables faster, more accurate planning for solar/inverter investments without spreadsheets or guesswork.",
    hook: "Stop guessing your power needs—calculate exactly what solar setup will keep the lights on.",
    cta: "Try it live →",
  },

  {
    id: "cert-gen",
    title: "Certificate Generator",
    links: { github: "#", live: "#" },
    images: [
      {
        url: "https://via.placeholder.com/800x600?text=Certificate+Generator+Dashboard",
        alt: "Certificate generator admin dashboard showing participant list and issuance status",
        description: "Admin interface for managing and issuing certificates",
      },
      {
        url: "https://via.placeholder.com/600x400?text=Generated+Certificate+Sample",
        alt: "Sample generated certificate with participant name, event, and QR code",
        description: "Final output certificate with branding and verification",
      },
    ],
    timeline: "Scripts → Secure, scalable issuance system for 1,000+ users",
    problem:
      "Manually issuing certificates for events (e.g., LinkedIn Local Lagos) was slow, error-prone, and difficult to scale for large groups.",
    solution:
      "Collaborated on an API-driven certificate generator that automates bulk issuance, includes branding, QR verification, and secure delivery—used to drive event publicity.",
    tech: ["Django Rest Framework", "Cloudinary", "Celery", "PostgreSQL"],
    impact:
      "Automated issuance for over 1,000 participants instantly; improved event branding and follow-up engagement through verifiable digital certificates.",
    hook: "Issue hundreds of certificates in seconds—not hours.",
    cta: "View Project →",
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
        url: "https://via.placeholder.com/800x600?text=Clinical+Trials+Dashboard",
        alt: "Clinical Trial Viewer dashboard showing fetched trial list from ClinicalTrials.gov",
        description:
          "Main interface displaying trial title, status, location, and summary",
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
];

const SKILLS = [
  "Python",
  "Django",
  "DRF",
  "React",
  "PostgreSQL",
  "Celery",
  "OpenAI API",
  "JWT Auth",
  "API Optimization",
  "Git",
  "Docker",
  "Linux",
  "Automation",
];

// --- Components ---

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className}`} />
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Mentorship", href: "#mentorship" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-display font-bold text-primary"
        >
          Popoola
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass shadow-xl md:hidden flex flex-col p-6 space-y-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-accent/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold mb-8">
            End-to-End Ownership
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              I create backend systems that automate tasks and secure data using{" "}
              <span className="font-bold text-primary">Python and Django</span>.
              I own features from idea to production, ensuring every line of
              code serves a purpose.
            </p>
            <p>
              React helps me deliver full experiences, bridging the gap between
              robust logic and intuitive interfaces. I don't just write code; I
              build tools that solve real problems.
            </p>
            <p>
              I collaborate across teams to ship full features backend to
              frontend. I mentor Nigerian developers through seminars because I
              believe that capacity shared grows faster. Knowledge is most
              valuable when it's used to lift others.
            </p>
            <p className="border-l-4 border-primary pl-6 py-2 italic text-gray-600">
              "I accelerate development with tools like GitHub Copilot, Claude,
              and OpenAI while maintaining full ownership of architecture,
              security, testing, and final quality."
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: <Code2 />,
              label: "Clean Code",
              desc: "Maintainable & Scalable",
            },
            {
              icon: <Database />,
              label: "Data Integrity",
              desc: "Secure & Optimized",
            },
            {
              icon: <Sparkles />,
              label: "AI-Powered",
              desc: "Accelerated Delivery",
            },
            { icon: <Layers />, label: "Full Stack", desc: "Django + React" },
            { icon: <Cpu />, label: "Automation", desc: "Efficiency First" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div className="text-primary mb-4">{item.icon}</div>
              <h3 className="font-bold mb-1">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SkillsMarquee = () => (
  <div id="skills" className="py-12 bg-dark overflow-hidden relative">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
    </div>
    <div className="flex whitespace-nowrap animate-marquee">
      {[...SKILLS, ...SKILLS].map((skill, i) => (
        <span
          key={i}
          className="text-white text-2xl md:text-4xl font-display font-bold mx-8 opacity-50 hover:opacity-100 transition-opacity cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

/** 
const ProjectCard = ({ project }: { project: Project }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
    >
      <div className="relative aspect-video overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <>
            <img
              loading="lazy"
              decoding="async"
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="flex space-x-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    className="p-2 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    className="p-2 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center text-xs font-bold text-primary uppercase tracking-widest mb-2">
          <ChevronRight size={14} className="mr-1" /> {project.timeline}
        </div>
        <h3 className="text-xl font-display font-bold mb-4">{project.title}</h3>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-bold text-dark">Problem:</p>
            <p className="text-gray-600">{project.problem}</p>
          </div>
          <div>
            <p className="font-bold text-dark">Impact:</p>
            <p className="text-gray-600">{project.impact}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};*/

const ProjectCard = ({ project }: { project: Project }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  const mainImage = project.images[currentImageIndex] || project.images[0];

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <>
            <img
              src={mainImage?.url}
              alt={mainImage?.alt || project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="p-1.5 bg-white/90 rounded-full shadow-lg text-dark hover:bg-primary hover:text-white transition-all"
                  aria-label="Previous image"
                >
                  <ChevronRight size={18} className="rotate-180" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-1.5 bg-white/90 rounded-full shadow-lg text-dark hover:bg-primary hover:text-white transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Image Indicators */}
            {project.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                {project.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-4 bg-primary" : "w-1.5 bg-white/60"}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="flex space-x-3">
                {project.links.github && project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.links.live && project.links.live !== "#" && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
          <ChevronRight size={12} className="mr-1" /> {project.timeline}
        </div>
        <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>

        {project.hook && (
          <p className="text-sm font-medium text-primary/80 italic mb-4">
            "{project.hook}"
          </p>
        )}

        <div className="space-y-4 text-sm mb-6">
          <div>
            <p className="font-bold text-dark mb-1">Problem:</p>
            <p className="text-gray-600 leading-relaxed">{project.problem}</p>
          </div>
          {project.solution && (
            <div>
              <p className="font-bold text-dark mb-1">Solution:</p>
              <p className="text-gray-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-accent text-primary text-[10px] font-bold rounded-md uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold text-primary hover:translate-x-1 transition-transform"
            >
              {project.cta || "View Project →"}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl font-display font-bold">Proof of Work</h2>
          <p className="text-gray-500 mt-2">
            Real solutions delivered with measurable impact.
          </p>
        </div>
        <a
          href="https://github.com/Popthemy/portfolio-temilorun"
          className="mt-4 md:mt-0 text-primary font-bold flex items-center hover:underline"
        >
          View all on GitHub <ExternalLink size={18} className="ml-2" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Mentorship = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="mentorship"
      className="py-24 bg-dark text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="100" cy="50" r="40" fill="white" />
          <circle cx="100" cy="50" r="30" fill="white" />
          <circle cx="100" cy="50" r="20" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">
              Collaborations & Mentorship
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              I build credibility by working with teams and mentoring others.
              Shared knowledge creates lasting impact.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl text-primary">
                  <Users />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Build with Oyo 2026</h4>
                  <p className="text-gray-400">
                    Facilitated frontend track teaching controlled components,
                    mocks, and validation to 50+ aspiring developers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl text-primary">
                  <Award />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Community Contributor</h4>
                  <p className="text-gray-400">
                    Active contributor to LinkedIn Local Nigeria and Oyo Talent
                    Tribe initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="aspect-video bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="group relative">
                <div className="absolute -inset-2 bg-primary/30 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src="https://picsum.photos/seed/mentorship/800/450"
                  alt="Build with Oyo facilitation"
                  className="rounded-2xl shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-dark p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
                    <ExternalLink size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="bg-primary p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 hover:rotate-90 transition-transform"
              >
                <X size={24} />
              </button>
              <h3 className="text-3xl font-display font-bold">Let's Connect</h3>
              <p className="mt-2 opacity-80">
                Turn your process into automated reality.
              </p>
            </div>

            <div className="p-8">
              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold">Message Sent!</h4>
                  <p className="text-gray-500 mt-2">
                    I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="temilorunpopoola2677@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="How can I help you?"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Mail className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">
        © 2026 Popoola. Built with React & Django Expertise.
      </p>
      <div className="flex space-x-6 mt-6 md:mt-0">
        <a
          href="https://github.com/Popthemy"
          aria-label="GitHub Profile"
          className="text-gray-400 hover:text-primary transition-colors"
          target="_blank"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/popoola-oluwatemilorun"
          aria-label="LinkedIn Profile"
          className="text-gray-400 hover:text-primary transition-colors"
          target="_blank"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:temilorunpopoola2677@gmail.com"
          aria-label="Email Contact"
          className="text-gray-400 hover:text-primary transition-colors"
          target="_blank"
        >
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="selection:bg-primary/20 selection:text-primary">
      <Nav />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Projects />
        <Mentorship />

        <section id="contact" className="py-24 bg-accent/30">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to stop wrestling with bugs, delays, or manual work?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              I'm the team member who delivers clean, secure code that makes
              stakeholders happy and moves the business forward end-to-end, on
              time. Tell me your single biggest bottleneck right now. I'll send
              one practical, no-fluff idea you can use immediately no strings.
              Limited time this month act now.
            </p>

            <framerMotion.button
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => setIsModalOpen(true)}
              className="group relative rounded-full bg-gradient-to-br from-blue-700 via-blue-600 to-primary-600 px-12 py-5 font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
            >
              {/* Gradient border glow */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-blue-300/20 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <span className="relative flex items-center justify-center gap-2">
                Start a Conversation
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  →
                </motion.span>
              </span>
            </framerMotion.button>
          </div>
        </section>
      </main>

      <Footer />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
