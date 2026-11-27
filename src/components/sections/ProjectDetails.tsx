import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Users,
  UserCheck,
  Home,
} from 'lucide-react';
import { Project, PROJECTS } from '../../constants/data';

interface ProjectDetailsProps {
  project: Project;
  onBackToProjects: () => void;
  onBackHome: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onBackToProjects,
  onBackHome,
  onSelectProject,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.slug]);

  const { caseStudy } = project;
  const activeImage = project.images[selectedImageIndex];
  const siblingProjects = PROJECTS.filter((p) => p.slug !== project.slug && p.featured).slice(0, 3);

  return (
    <article className="pt-28 md:pt-36 pb-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Top Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <button
            type="button"
            onClick={onBackToProjects}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-900 text-dark dark:text-white hover:bg-primary hover:text-white transition-colors text-sm font-semibold border border-gray-200/70 dark:border-white/10"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>

          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Home size={15} />
            <span>Homepage</span>
          </button>
        </div>

        {/* Case Study Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              {project.timeline}
            </span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent dark:bg-primary/10 text-primary border border-primary/15">
              {caseStudy.isCollaborative ? (
                <>
                  <Users size={13} />
                  <span>Collaborative Project</span>
                </>
              ) : (
                <>
                  <UserCheck size={13} />
                  <span>Individual Ownership</span>
                </>
              )}
            </span>
          </div>

          <h1 className="text-3xl md:text-6xl font-display font-medium tracking-tight dark:text-white mb-6">
            {project.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
            {caseStudy.overview}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 bg-accent dark:bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider border border-primary/15"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Verified External Links */}
          {(project.links.live || project.links.github) && (
            <div className="flex flex-wrap gap-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark dark:bg-white text-white dark:text-dark font-semibold text-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors"
                >
                  <span>Visit Live Product</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-slate-900 text-dark dark:text-white font-semibold text-sm hover:bg-primary hover:text-white transition-colors border border-gray-200 dark:border-white/10"
                >
                  <Github size={16} />
                  <span>View Public Repository</span>
                </a>
              )}
            </div>
          )}
        </motion.header>

        {/* Project Screenshots Gallery (only when real screenshots exist) */}
        {project.images.length > 0 && activeImage && (
          <section className="mb-14">
            <div className="rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gray-100 dark:bg-slate-900 shadow-xl">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              {activeImage.description && (
                <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/5">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {activeImage.description}
                  </p>
                </div>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {project.images.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                    aria-label={`View screenshot ${idx + 1}: ${img.alt}`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Structured Case Study Sections */}
        <div className="space-y-12">
          {/* Problem & My Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-slate-900/80 border border-gray-100 dark:border-white/5">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Problem
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </section>

            <section className="p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-slate-900/80 border border-gray-100 dark:border-white/5">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                My Contribution
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {caseStudy.contribution}
              </p>
            </section>
          </div>

          {/* Unified Architecture / Implementation & Key Decisions Section */}
          <section className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-white/10 space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                  <Layers size={15} />
                  {caseStudy.architecture
                    ? 'Architecture & Key Decisions'
                    : 'Implementation & Key Decisions'}
                </span>
              </div>
              <h2 className="text-2xl font-display font-medium mb-2">
                {caseStudy.architecture
                  ? caseStudy.architecture.title
                  : 'Technical Implementation'}
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {caseStudy.implementation.summary}
              </p>
              {caseStudy.architecture?.note && (
                <p className="text-xs md:text-sm text-blue-200/80 mt-2">
                  {caseStudy.architecture.note}
                </p>
              )}
            </div>

            {caseStudy.architecture && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseStudy.architecture.steps.map((step, idx) => (
                    <div
                      key={step.label}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                        Step 0{idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-white mb-1">
                        {step.label}
                      </p>
                      {step.detail && (
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {step.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {caseStudy.architecture.image && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                    <img
                      src={caseStudy.architecture.image.url}
                      alt={caseStudy.architecture.image.alt}
                      className="w-full max-h-[420px] object-contain mx-auto"
                      referrerPolicy="no-referrer"
                    />
                    {caseStudy.architecture.image.description && (
                      <p className="px-4 py-3 text-xs text-gray-300 border-t border-white/10">
                        {caseStudy.architecture.image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {caseStudy.decisions.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">
                  Key Engineering Decisions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudy.decisions.map((decision) => (
                    <div
                      key={decision.title}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start gap-2.5 mb-2">
                        <CheckCircle2
                          size={16}
                          className="text-primary shrink-0 mt-1"
                        />
                        <h4 className="text-base font-display font-medium text-white">
                          {decision.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed pl-6">
                        {decision.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Outcome */}
          {caseStudy.outcome && (
            <section className="p-6 md:p-8 rounded-3xl bg-accent/60 dark:bg-primary/10 border border-primary/15">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                Outcome
              </h2>
              <p className="text-base md:text-lg text-dark dark:text-gray-100 leading-relaxed">
                {caseStudy.outcome}
              </p>
            </section>
          )}
        </div>

        {/* Bottom Navigation & Sibling Case Studies */}
        <footer className="mt-16 pt-10 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h3 className="text-lg font-display font-medium dark:text-white">
              More Case Studies
            </h3>
            <button
              type="button"
              onClick={onBackToProjects}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <ArrowLeft size={15} />
              <span>All Projects</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {siblingProjects.map((sibling) => (
              <a
                key={sibling.id}
                href={`/projects/${sibling.slug}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onSelectProject(sibling.slug);
                }}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all group"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  {sibling.timeline}
                </p>
                <p className="text-base font-display font-medium dark:text-white group-hover:text-primary transition-colors">
                  {sibling.title}
                </p>
              </a>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
};
