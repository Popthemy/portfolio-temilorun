import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../constants/data';
import { Skeleton } from '../common/Skeleton';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  const currentImage = project.images[currentImageIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div 
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl shadow-dark/5 hover:shadow-primary/10 hover:border-primary/20 transition-all group flex flex-col h-full relative"
    >
      <div className="relative aspect-video md:aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-800 group/slideshow">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <div className="relative w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img 
                key={currentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                src={currentImage?.url} 
                alt={currentImage?.alt || project.title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {project.images.length > 1 && (
              <>
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover/slideshow:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={prevImage}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-dark dark:text-white hover:bg-primary hover:text-white transition-all shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-dark dark:text-white hover:bg-primary hover:text-white transition-all shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                  {project.images.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex ? 'bg-primary w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 z-20">
          <div className="flex space-x-4">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="View Source on GitHub">
                <Github size={24} />
              </a>
            )}
            {project.liveLink && project.liveLink !== '#' && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="View Live Project">
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-10 flex flex-col flex-grow">
        <div className="hidden md:flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-3">
          <span className="w-6 md:w-8 h-px bg-primary mr-3"></span> {project.timeline}
        </div>
        <h3 className="text-lg md:text-3xl font-display font-medium mb-2 md:mb-3 tracking-tight dark:text-white">{project.title}</h3>
        
        {project.hook && (
          <p className="hidden md:block text-sm md:text-base font-medium text-primary/80 italic mb-4 leading-relaxed">"{project.hook}"</p>
        )}

        <div className="space-y-3 md:space-y-6 text-sm md:text-base mb-4 md:mb-6">
          <div>
            <p className="font-bold text-dark dark:text-gray-400 mb-1 uppercase text-[10px] tracking-widest opacity-50">The Problem</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-none">{project.problem}</p>
          </div>
          {project.solution && (
            <div className="hidden md:block">
              <p className="font-bold text-dark dark:text-gray-400 mb-2 uppercase text-[11px] tracking-widest opacity-50">The Solution</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.solution}</p>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {project.tech.slice(0, window.innerWidth < 768 ? 3 : undefined).map(t => (
              <span key={t} className="px-3 py-1 bg-accent text-primary text-[10px] font-bold rounded-full uppercase tracking-wider border border-primary/10">{t}</span>
            ))}
            {window.innerWidth < 768 && project.tech.length > 3 && (
              <span className="px-3 py-1 bg-accent text-primary text-[10px] font-bold rounded-full uppercase tracking-wider border border-primary/10">+{project.tech.length - 3}</span>
            )}
          </div>

          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-base font-bold text-primary group/btn"
            >
              <span className="border-b-2 border-primary/20 group-hover:border-primary transition-all pb-1">{project.cta || 'View Project →'}</span>
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

