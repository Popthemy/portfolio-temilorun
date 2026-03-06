import React, { useState, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SkillsMarquee } from './components/sections/SkillsMarquee';
import { Projects } from './components/sections/Projects';
import { Mentorship } from './components/sections/Mentorship';
import { Footer } from './components/sections/Footer';
import { ContactModal } from './components/sections/ContactModal';

/**
 * Main Application Component
 * 
 * Follows SWE principles of modularity and separation of concerns.
 * Components are broken down into layout, sections, and common UI elements.
 * Performance is optimized using React.memo and useCallback where appropriate.
 */
const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders of children
  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-dark dark:text-white font-sans selection:bg-primary selection:text-white antialiased transition-colors duration-300">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Projects />
        <Mentorship />
      </main>

      {/* Footer & Contact */}
      <Footer onContactClick={openContact} />
      
      {/* Modals & Overlays */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={closeContact} 
      />
    </div>
  );
};

export default App;
