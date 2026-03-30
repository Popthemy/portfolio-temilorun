import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../../constants/data";
import { ProjectCard } from "./ProjectCard";
import gsap from "gsap";

export const Projects: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = PROJECTS.length;

  useEffect(() => {
    if (!carouselRef.current) return;

    const isMobile = window.innerWidth < 768;
    const cards = carouselRef.current.querySelectorAll(".project-card-wrapper");
    const radius = isMobile ? 120 : 450;
    const angleStep = (Math.PI * 2) / totalProjects;

    cards.forEach((card, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      gsap.set(card, {
        x: x,
        z: z,
        rotationY: angle * (isMobile ? 30 : 1) * (180 / Math.PI),
        opacity: i === currentIndex ? 1 : isMobile ? 0 : 0.1,
        scale: i === currentIndex ? 1 : 0.6,
        display:
          isMobile &&
          Math.abs(i - currentIndex) > 1 &&
          Math.abs(i - currentIndex) < totalProjects - 1
            ? "none"
            : "block",
      });
    });
  }, [totalProjects, currentIndex]);

  const rotateCarousel = (newIndex: number) => {
    setCurrentIndex(newIndex);

    if (!carouselRef.current) return;
    const isMobile = window.innerWidth < 768;
    const cards = carouselRef.current.querySelectorAll(".project-card-wrapper");
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
        x: x,
        z: z,
        rotationY: angle * (isMobile ? 0.5 : 1) * (180 / Math.PI),
        opacity: i === newIndex ? 1 : isVisible ? 0.1 : 0,
        scale: i === newIndex ? 1 : 0.5,
        duration: 0.8,
        ease: "power4.out",
        zIndex: i === newIndex ? 10 : 1,
        display: isVisible ? "block" : "none",
      });
    });
  };

  const handleNext = () => rotateCarousel((currentIndex + 1) % totalProjects);
  const handlePrev = () =>
    rotateCarousel((currentIndex - 1 + totalProjects) % totalProjects);

  return (
    <section
      id="projects"
      className="py-8 md:py-4 overflow-hidden bg-gray-50/50 dark:bg-slate-950/50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15,
              mass: 1.2,
            },
          }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-20"
        >
          <div>
            <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tighter dark:text-white">
              Proof of <span className="text-primary italic">Work</span>
            </h2>
            <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mt-4 max-w-md">
              Real solutions delivered with measurable impact and technical
              precision.
            </p>
          </div>
          <a
            href="https://github.com/Popthemy/"
            className="mt-6 md:mt-0 text-primary font-bold flex items-center group"
          >
            View all on GitHub
            <ExternalLink
              size={20}
              className="ml-2 group-hover:rotate-45 transition-transform"
            />
          </a>
        </motion.div>

        <div className="relative py-12 md:py-20 flex items-center justify-center perspective-[2000px]">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between px-4 z-50 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-xl text-dark dark:text-white hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-95 border border-gray-100 dark:border-white/5"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={handleNext}
              className="p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-xl text-dark dark:text-white hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-95 border border-gray-100 dark:border-white/5"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="absolute -bottom-6 left-0 right-0 flex md:hidden justify-center space-x-8 z-50">
            <button
              onClick={handlePrev}
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl text-dark dark:text-white active:bg-primary active:text-white transition-all border border-gray-100 dark:border-white/5"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
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
            {PROJECTS.map((project, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={project.id}
                  className={`project-card-wrapper w-[280px] md:w-[500px] transition-opacity duration-300 ${
                    isActive ? "relative" : "absolute inset-0 m-auto"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              );
            })}
          </motion.div>

          {/* Progress Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2  flex space-x-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => rotateCarousel(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "w-12 bg-primary" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
