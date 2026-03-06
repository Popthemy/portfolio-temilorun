import React from 'react';
import { motion } from 'motion/react';
import { Code2, Sparkles, Layers, Cpu } from 'lucide-react';

export const About: React.FC = React.memo(() => {
  return (
    <section id="about" className="py-32 bg-accent/20 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-20 items-center"
        >
          <div>
            <h2 className="text-4xl font-display font-medium mb-10 tracking-tight dark:text-white">End-to-End Ownership</h2>
            <div className="space-y-8 text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                I create backend systems that automate tasks and secure data using <span className="font-bold text-primary">Python and Django</span>. 
                I own features from idea to production, ensuring every line of code serves a purpose.
              </p>
              <p>
                React helps me deliver full experiences, bridging the gap between robust logic and intuitive interfaces. 
                I don't just write code; I build tools that solve real problems.
              </p>
              <p>
                I mentor Nigerian developers through seminars because I believe that capacity shared grows faster. 
                Knowledge is most valuable when it's used to lift others.
              </p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="border-l-4 border-primary pl-8 py-4 italic text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/5 rounded-r-2xl shadow-sm"
              >
                "I accelerate development with tools like GitHub Copilot, Claude, and OpenAI while maintaining full ownership of architecture, security, testing, and final quality."
              </motion.p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Code2 size={32} />, label: 'Clean Code', desc: 'Maintainable & Scalable' },
              { icon: <Sparkles size={32} />, label: 'AI-Powered', desc: 'Accelerated Delivery' },
              { icon: <Layers size={32} />, label: 'Full Stack', desc: 'Django + React' },
              { icon: <Cpu size={32} />, label: 'Automation', desc: 'Efficiency First' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-dark/5 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="text-primary mb-6">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">{item.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
