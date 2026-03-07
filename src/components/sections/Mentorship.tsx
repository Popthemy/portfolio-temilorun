import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Award, ExternalLink } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

export const Mentorship: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="mentorship" className="py-32 bg-dark dark:bg-slate-950 text-white relative overflow-hidden transition-colors duration-300">
      {/* Logo Background Element */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.03, 0.06, 0.03],
          rotate: [0, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <img 
          src="https://picsum.photos/seed/popoola-logo/1200/400" 
          alt="" 
          className="w-[150%] max-w-none opacity-10 dark:opacity-5 invert" 
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-display font-medium mb-8 tracking-tight">Collaborations & Mentorship</h2>
            <p className="text-2xl text-gray-400 mb-12 leading-relaxed font-light">
              I build credibility by working with teams and mentoring others. Shared knowledge creates lasting impact.
            </p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="space-y-10"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-start space-x-6 group"
              >
                <div className="bg-primary/20 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"><Users size={32} /></div>
                <div>
                  <h4 className="font-medium text-xl mb-2">Build with Oyo 2026</h4>
                  <p className="text-gray-400 leading-relaxed">Facilitated frontend track teaching controlled components, mocks, and validation to 50+ aspiring developers.</p>
                </div>
              </motion.div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-start space-x-6 group"
              >
                <div className="bg-primary/20 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"><Award size={32} /></div>
                <div>
                  <h4 className="font-medium text-xl mb-2">Community Contributor</h4>
                  <p className="text-gray-400 leading-relaxed">Active contributor to LinkedIn Local Nigeria and Oyo Talent Tribe initiatives.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1.5
              }
            }}
            viewport={{ once: true }}
            className="relative"
          >
            {isLoading ? (
              <div className="aspect-video bg-white/5 animate-pulse rounded-[2.5rem] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="group relative">
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://picsum.photos/seed/mentorship/800/450" 
                    alt="Build with Oyo facilitation" 
                    className="rounded-[2.5rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <MagneticButton strength={60}>
                      <div className="bg-white text-dark p-6 rounded-full shadow-2xl hover:scale-110 transition-transform" aria-label="View Mentorship Details">
                        <ExternalLink size={32} />
                      </div>
                    </MagneticButton>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-32 h-32 border border-primary/20 rounded-full border-dashed pointer-events-none"
                />
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-3xl blur-xl pointer-events-none"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
