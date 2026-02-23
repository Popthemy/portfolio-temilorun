import { useState, useEffect } from "react";
import { motion, useAnimationControls, stagger } from "framer-motion";
import HeroText from "./HeroText";
import { ArrowRight, CheckCircle2, Github, Linkedin } from "lucide-react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`skeleton ${className}`} />
);

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: "M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" }}
            animate={{ d: "M0 50 Q 25 60 50 50 T 100 50 V 100 H 0 Z" }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
            fill="var(--color-primary)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            Popoola: <span className="text-primary">Full-Stack Developer</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl text-gray-600 max-w-lg"
          >
            Building secure automation from Ibadan, Nigeria. Reliable code that
            scales and saves time.
          </motion.p>
          {/* <motion.p
            variants={itemVariants}
            className="mt-4 text-lg font-medium text-dark"
          >
            Efficiency matters. I deliver solutions that work end-to-end.
          </motion.p> */}
          <HeroText />
          <motion.div variants={itemVariants} className="mt-10 flex space-x-4">
            <a
              href="#projects"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center group"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex space-x-4 items-center px-4">
              <a
                href="https://github.com/Popthemy"
                aria-label="GitHub Profile"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/popoola-oluwatemilorun"
                aria-label="LinkedIn Profile"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 relative"
        >
          {isLoading ? (
            <Skeleton className="aspect-square rounded-2xl w-full max-w-md mx-auto" />
          ) : (
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-4 bg-accent rounded-2xl -rotate-6 -z-10" />
              <img
                src="https://res.cloudinary.com/dtbf1jnph/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1771807374/portfolio/temilorun_software_developer.jpg"
                alt="Popoola Professional Headshot"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      Status
                    </p>
                    <p className="text-sm font-bold">Available for Projects</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
