import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Github, Linkedin, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Typewriter } from '../common/Typewriter';
import { Skeleton } from '../common/Skeleton';
import { MagneticButton } from '../common/MagneticButton';

export const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    
    setMousePos({ x, y });
    
    rotateX.set(-y * 2);
    rotateY.set(x * 2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePos.x * 1.5,
            y: -mousePos.y * 1.5,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yText, opacity: opacityText }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="px-4 py-1.5 bg-accent rounded-full text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Full-Stack Engineer
            </div>
            <div className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                Available for work
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] tracking-tighter flex flex-col items-center md:items-start"
          >
            POPOOLA:
            <span className="text-primary">
              <Typewriter texts={["Developer", "Architect", "Automator"]} />
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Building secure automation from Ibadan, Nigeria. Reliable code that
            scales and saves time.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base md:text-lg font-medium text-dark dark:text-gray-200"
          >
            Efficiency matters. I deliver solutions that work end to end.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start"
          >
            <MagneticButton
              href="#projects"
              className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center group relative overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </MagneticButton>
            <div className="flex space-x-6 items-center">
              <a
                href="https://github.com/Popthemy"
                aria-label="GitHub Profile"
                className="text-gray-400 hover:text-primary transition-all hover:scale-110"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/popoola-oluwatemilorun"
                aria-label="LinkedIn Profile"
                className="text-gray-400 hover:text-primary transition-all hover:scale-110"
              >
                <Linkedin size={28} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ scale: scaleImage, rotateX, rotateY, perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
          className="order-1 md:order-2 relative"
        >
          {isLoading ? (
            <Skeleton className="aspect-square rounded-[2rem] w-full max-w-md mx-auto" />
          ) : (
            <div className="relative w-full max-w-sm lg:max-w-md mx-auto group">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 bg-accent rounded-[2.5rem] -rotate-6 -z-10 group-hover:rotate-0 transition-transform duration-700"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
                  src="../images/themy-profile.jpg"
                  alt="Popoola Professional Headshot"
                  className="rounded-[2rem] shadow-2xl w-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              {/* Status Circle - Modern floating badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-28 h-28 md:w-36 md:h-36 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full shadow-2xl flex flex-col items-center justify-center border border-white/20 dark:border-white/10 z-20 group/status"
              >
                <div className="relative flex h-3 w-3 md:h-4 md:w-4 mb-1 md:mb-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></span>
                </div>
                <p className="text-[8px] md:text-[9px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5 md:mb-1">
                  Status
                </p>
                <p className="text-[9px] md:text-[11px] font-bold text-dark dark:text-white uppercase tracking-widest text-center px-2 md:px-4 leading-tight">
                  Available for work
                </p>

                {/* Decorative rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-2 border border-dashed border-primary/10 rounded-full pointer-events-none"
                />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
