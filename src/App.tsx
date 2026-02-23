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
  image: string;
  timeline: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  lessons: string;
  links: { github?: string; demo?: string };
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: "bookhall",
    title: "Bookhall (Django MVT)",
    image: "https://picsum.photos/seed/bookhall/600/400",
    timeline: "Beginner basic form → Optimized auth",
    problem: "Manual booking processes were slow and error-prone.",
    solution:
      "Developed a comprehensive dashboard system for automated bookings.",
    tech: ["Django", "PostgreSQL", "Bootstrap"],
    impact: "Streamlined over 100+ bookings in the first month.",
    lessons:
      "Learned the importance of team schema iteration and database normalization.",
    links: { github: "#" },
  },
  {
    id: "ecogather",
    title: "EcoGather Map",
    image: "https://picsum.photos/seed/ecogather/600/400",
    timeline: "Beginner pins → Notes/API integration",
    problem: "Users often forgot specific environmental data locations.",
    solution: "Built an interactive map with persistent pins and data notes.",
    tech: ["React", "Leaflet", "json-server"],
    impact: "Created a usable memory tool for field researchers.",
    lessons:
      "Bridged the gap between frontend interactivity and backend data persistence.",
    links: { github: "#" },
  },
  {
    id: "ecommerce-api",
    title: "E-Commerce API",
    image: "https://picsum.photos/seed/ecommerce/600/400",
    timeline: "Beginner endpoints → RBAC/Payments",
    problem: "Insecure and slow transaction processing in legacy systems.",
    solution:
      "Engineered a secure REST API with Role-Based Access Control and payment gateway integration.",
    tech: ["Django Rest Framework", "Flutterwave", "JWT"],
    impact:
      "Reduced transaction processing time by 30% while enhancing security.",
    lessons: "Deep dived into security tradeoffs and financial data integrity.",
    links: { github: "#" },
  },
  {
    id: "load-calculator",
    title: "Load Calculator",
    image: "https://picsum.photos/seed/calculator/600/400",
    timeline: "Beginner static → Dynamic validation",
    problem: "Manual calculations for seminar logistics were tedious.",
    solution:
      "Created a lightweight, framework-free interactive tool for dynamic estimates.",
    tech: ["Vanilla JS", "HTML", "CSS"],
    impact: "Automated estimates for multiple regional seminars.",
    lessons:
      "Proved that framework-free code can be highly efficient for specific utilities.",
    links: { github: "#" },
  },
  {
    id: "cert-gen",
    title: "Certificate Generator",
    image: "https://picsum.photos/seed/cert/600/400",
    timeline: "Beginner scripts → Secure system",
    problem: "Manual issuance of 1,000+ certificates was a bottleneck.",
    solution:
      "Built an API-driven generator that automates the entire issuance pipeline.",
    tech: ["DRF", "Cloudinary", "Celery"],
    impact: "Automated issuance for over 1,000 participants instantly.",
    lessons:
      "Shortened team feedback loops through automated delivery systems.",
    links: { github: "#" },
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
          href="#"
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
                    Facilitated frontend track—teaching controlled components,
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
                      placeholder="your@email.com"
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
          href="#"
          aria-label="GitHub Profile"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="#"
          aria-label="LinkedIn Profile"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="#"
          aria-label="Email Contact"
          className="text-gray-400 hover:text-primary transition-colors"
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
              className="group relative rounded-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 px-12 py-5 font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
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
