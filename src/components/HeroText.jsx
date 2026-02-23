import { motion, useAnimationControls, stagger } from "framer-motion";
import { useEffect } from "react";

const heroLines = [
  "Efficiency matters.",
  "I deliver solutions that work end-to-end.",
  "And I keep delivering until the job is done right.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // ~400ms stagger – natural read pace
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function HeroText() {
  const controls = useAnimationControls();

  useEffect(() => {
    const cycle = async () => {
      await controls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // pause ~3s after full reveal
      await controls.start("hidden"); // fade out
      await new Promise((resolve) => setTimeout(resolve, 800)); // brief pause
      controls.start("visible"); // loop back in
    };

    cycle(); // start cycle
    const interval = setInterval(cycle, 6000); // full cycle ~6s

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="space-y-0 text-center md:text-left"
    >
      {heroLines.map((line, i) => (
        <motion.p
          key={i}
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium text-gray-800"
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}

export default HeroText;
