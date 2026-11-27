import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SkillsMarquee } from './components/sections/SkillsMarquee';
import { Projects } from './components/sections/Projects';
import { ProjectDetails } from './components/sections/ProjectDetails';
import { Mentorship } from './components/sections/Mentorship';
import { Footer } from './components/sections/Footer';
import { ContactModal } from './components/sections/ContactModal';
import { PROJECTS } from './constants/data';

function extractProjectSlug(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activeProject = useMemo(() => {
    const slug = extractProjectSlug(pathname);
    if (!slug) return null;
    return PROJECTS.find((p) => p.slug === slug || p.id === slug) || null;
  }, [pathname]);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  const openCaseStudy = useCallback((slug: string) => {
    const nextPath = `/projects/${slug}`;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace(/^#/, '');
    if (!id || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigate = useCallback(
    (href: string) => {
      if (extractProjectSlug(window.location.pathname)) {
        const cleanHash = href.startsWith('#') ? href : `#${href}`;
        window.history.pushState({}, '', `/${cleanHash}`);
        setPathname('/');
        window.setTimeout(() => scrollToSection(cleanHash), 60);
        return;
      }
      scrollToSection(href);
    },
    [scrollToSection]
  );

  const handleBackToProjects = useCallback(() => {
    handleNavigate('#projects');
  }, [handleNavigate]);

  const handleBackHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white dark:bg-slate-950 text-dark dark:text-white font-sans selection:bg-primary selection:text-white antialiased transition-colors duration-300">
        <Navbar onNavigate={handleNavigate} />

        <main>
          {activeProject ? (
            <ProjectDetails
              project={activeProject}
              onBackToProjects={handleBackToProjects}
              onBackHome={handleBackHome}
              onSelectProject={openCaseStudy}
            />
          ) : (
            <>
              <Hero />
              <About />
              <SkillsMarquee />
              <Projects onOpenCaseStudy={openCaseStudy} />
              <Mentorship />
            </>
          )}
        </main>

        <Footer onContactClick={openContact} />

        <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      </div>
    </MotionConfig>
  );
};

export default App;
