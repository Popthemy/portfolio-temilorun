import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import {Typewriter} from "../common/Typewriter"
import { MagneticButton } from '../common/MagneticButton';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer
      id="contact"
      className="py-20 bg-accent/30 dark:bg-slate-900/50 border-t border-gray-100 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6 tracking-tight dark:text-white">
              Ready to
              <br />
              <span className="text-primary">
                <Typewriter texts={["Automate?", "Scale?"]} />
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Let's discuss how we can build systems that save you time and
              scale your impact.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Popthemy"
                aria-label="GitHub"
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-gray-400 hover:text-primary hover:shadow-xl transition-all"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/popoola-oluwatemilorun"
                aria-label="LinkedIn"
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-gray-400 hover:text-primary hover:shadow-xl transition-all"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:temilorunpopoola2677@gmail.com"
                aria-label="Email"
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-gray-400 hover:text-primary hover:shadow-xl transition-all"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl border border-gray-50 dark:border-white/5 text-center">
            <h3 className="text-2xl font-medium mb-4 dark:text-white">
              Direct Inquiry
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Skip the forms and start a conversation today.
            </p>
            <MagneticButton
              onClick={onContactClick}
              className="w-full bg-dark dark:bg-white text-white dark:text-dark px-12 py-6 rounded-2xl font-display text-lg font-bold hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-2xl shadow-dark/20 uppercase tracking-widest"
            >
              Get in Touch
            </MagneticButton>
            <p className="mt-6 text-sm text-gray-400 font-medium">
              Response time: &lt; 24 hours
            </p>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
          <p>
            © {new Date().getFullYear()} Popoola.
          </p>

        </div>
      </div>
    </footer>
  );
};
