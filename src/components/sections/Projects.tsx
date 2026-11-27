import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Github,
} from 'lucide-react';
import { PROJECTS } from '../../constants/data';
import { ProjectCard } from './ProjectCard';
import gsap from 'gsap';

interface ProjectsProps {
  onOpenCaseStudy: (slug: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenCaseStudy }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProjects = useMemo(
    () => PROJECTS.filter((project) => project.featured),
    []
  );
  const supportingProjects = useMemo(
    () => PROJECTS.filter((project) => !project.featured),
    []
  );

  const totalProjects = featuredProjects.length;

  useEffect(() => {
    if (!carouselRef.current || totalProjects === 0) return;

    const isMobile = window.innerWidth < 768;
    const cards = carouselRef.current.querySelectorAll('.project-card-wrapper');
    const radius = isMobile ? 120 : 450;
    const angleStep = (Math.PI * 2) / totalProjects;

    cards.forEach((card, i) => {
      let relativeIndex = i - currentIndex;
      while (relativeIndex > totalProjects / 2) relativeIndex -= totalProjects;
      while (relativeIndex <= -totalProjects / 2)
        relativeIndex += totalProjects;

      const angle = relativeIndex * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const isVisible = !isMobile || Math.abs(relativeIndex) <= 1;

      gsap.set(card, {
        x,
        z,
        rotationY: angle * (isMobile ? 0.5 : 1) * (180 / Math.PI),
        opacity: i === currentIndex ? 1 : isVisible ? 0.12 : 0,
        scale: i === currentIndex ? 1 : 0.6,
        zIndex: i === currentIndex ? 10 : 1,
        display: isVisible ? 'block' : 'none',
      });
    });
  }, [totalProjects, currentIndex]);

  const rotateCarousel = (newIndex: number) => {
    setCurrentIndex(newIndex);

    if (!carouselRef.current || totalProjects === 0) return;
    const isMobile = window.innerWidth < 768;
    const cards = carouselRef.current.querySelectorAll('.project-card-wrapper');
    const angleStep = (Math.PI * 2) / totalProjects;
    const radius = isMobile ? 120 : 450;

    cards.forEach((card, i) => {
      let relativeIndex = i - newIndex;

      while (relativeIndex > totalProjects / 2) relativeIndex -= totalProjects;
      while (relativeIndex <= -totalProjects / 2)
        relativeIndex += totalProjects;

      const angle = relativeIndex * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const isVisible = !isMobile || Math.abs(relativeIndex) <= 1;

      gsap.to(card, {
        x,
        z,
        rotationY: angle * (isMobile ? 0.5 : 1) * (180 / Math.PI),
        opacity: i === newIndex ? 1 : isVisible ? 0.12 : 0,
        scale: i === newIndex ? 1 : 0.55,
        duration: 0.75,
        ease: 'power4.out',
        zIndex: i === newIndex ? 10 : 1,
        display: isVisible ? 'block' : 'none',
      });
    });
  };

  const handleNext = () => rotateCarousel((currentIndex + 1) % totalProjects);
  const handlePrev = () =>
    rotateCarousel((currentIndex - 1 + totalProjects) % totalProjects);

  return (
    <section
      id="projects"
      className="py-14 md:py-20 overflow-hidden bg-gray-50/50 dark:bg-slate-950/50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              mass: 1.1,
            },
          }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tighter dark:text-white">
              Proof of <span className="text-primary italic">Work</span>
            </h2>
            <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mt-4 max-w-xl">
              Backend systems, API integrations, and full-stack product delivery
              built for real workflows.
            </p>
          </div>
          <a
            href="https://github.com/Popthemy/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 text-primary font-bold flex items-center group self-start md:self-auto"
          >
            View all on GitHub
            <ExternalLink
              size={20}
              className="ml-2 group-hover:rotate-45 transition-transform"
            />
          </a>
        </motion.div>

        {/* Featured 3D Carousel */}
        <div className="relative pt-4 pb-20 md:py-16 flex items-center justify-center perspective-[2000px]">
          {/* Desktop Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between px-4 z-50 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-xl text-dark dark:text-white hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-95 border border-gray-100 dark:border-white/5"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-xl text-dark dark:text-white hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-95 border border-gray-100 dark:border-white/5"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex md:hidden justify-center space-x-8 z-50">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl text-dark dark:text-white active:bg-primary active:text-white transition-all border border-gray-100 dark:border-white/5"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl text-dark dark:text-white active:bg-primary active:text-white transition-all border border-gray-100 dark:border-white/5"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Container */}
          <motion.div
            ref={carouselRef}
            className="relative w-full flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const threshold = 30;
              if (info.offset.x > threshold) {
                handlePrev();
              } else if (info.offset.x < -threshold) {
                handleNext();
              }
            }}
          >
            {featuredProjects.map((project, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={project.id}
                  className={`project-card-wrapper w-[280px] sm:w-[330px] md:w-[500px] transition-opacity duration-300 ${
                    isActive ? 'relative' : 'absolute inset-0 m-auto'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onOpenCaseStudy={onOpenCaseStudy}
                  />
                </div>
              );
            })}
          </motion.div>

          {/* Progress Indicators */}
          <div className="absolute -bottom-2 md:bottom-0 left-1/2 -translate-x-1/2 flex space-x-3">
            {featuredProjects.map((proj, i) => (
              <button
                key={proj.id}
                type="button"
                aria-label={`Show ${proj.title}`}
                onClick={() => rotateCarousel(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? 'w-10 md:w-12 bg-primary'
                    : 'w-2 bg-gray-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Supporting Projects Subsection */}
        {supportingProjects.length > 0 && (
          <div className="mt-12 md:mt-16 pt-10 border-t border-gray-200/70 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-1">
                  Additional Work
                </p>
                <h3 className="text-xl md:text-2xl font-display font-medium dark:text-white">
                  Supporting Projects
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportingProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        {project.timeline}
                      </span>
                    </div>
                    <h4 className="text-lg md:text-xl font-display font-medium dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                      <span className="font-semibold text-dark dark:text-white">
                        Problem:{' '}
                      </span>
                      {project.problem}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      <span className="font-semibold text-dark dark:text-white">
                        Solution:{' '}
                      </span>
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 bg-accent dark:bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider border border-primary/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100 dark:border-white/5">
                      <a
                        href={`/projects/${project.slug}`}
                        onClick={(e) => {
                          if (
                            e.metaKey ||
                            e.ctrlKey ||
                            e.shiftKey ||
                            e.altKey
                          )
                            return;
                          e.preventDefault();
                          onOpenCaseStudy(project.slug);
                        }}
                        className="inline-flex items-center text-sm font-bold text-primary group"
                      >
                        <span className="border-b-2 border-primary/20 group-hover:border-primary transition-all pb-0.5">
                          {project.cta}
                        </span>
                        <ArrowRight
                          className="ml-1.5 group-hover:translate-x-1 transition-transform"
                          size={16}
                        />
                      </a>

                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors ml-auto"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {!project.links.live && project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors ml-auto"
                        >
                          <Github size={14} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
