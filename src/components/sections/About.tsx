import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Layers, Cpu } from 'lucide-react';

const CAPABILITY_TILES = [
  {
    icon: <Database size={32} />,
    label: 'Backend Systems',
    desc: 'Python · Django · DRF',
  },
  {
    icon: <Cpu size={32} />,
    label: 'API & Integrations',
    desc: 'Auth · Payments · External services',
  },
  {
    icon: <Layers size={32} />,
    label: 'Frontend',
    desc: 'React · JavaScript · TypeScript',
  },
  {
    icon: <Code2 size={32} />,
    label: 'Engineering Practice',
    desc: 'Data modelling · Testing · Maintainability',
  },
];

export const About: React.FC = React.memo(() => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-accent/20 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-14 md:gap-20 items-center"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium mb-8 tracking-tight dark:text-white">
              Backend Engineering, End-to-End Thinking
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                I build backend systems that make products dependable: APIs, data
                models, authentication and authorization, integrations, and
                background workflows. My main tools are{' '}
                <span className="font-bold text-primary">
                  Python, Django, Django REST Framework
                </span>
                , and relational databases.
              </p>
              <p>
                I also work with React, JavaScript, and TypeScript to build
                interfaces, integrate APIs, manage frontend state, and connect
                user workflows to backend services. I am most experienced on the
                backend, but I understand how the full feature fits together.
              </p>
              <p>
                I care about clear boundaries, maintainable code, secure access,
                and practical engineering decisions that help a product work
                reliably.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAPABILITY_TILES.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-7 md:p-8 rounded-3xl shadow-xl shadow-dark/5 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="text-primary mb-5">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
