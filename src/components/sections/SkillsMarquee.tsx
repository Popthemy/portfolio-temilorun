import React from 'react';
import { SKILLS } from '../../constants/data';
import { Marquee } from '../common/Marquee';

export const SkillsMarquee: React.FC = React.memo(() => {
  return (
    <div id="skills" className="py-32 bg-dark dark:bg-slate-950 overflow-hidden relative min-h-[500px] flex items-center justify-center transition-colors duration-300">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Row 1: Moving Left - Rotated Positive */}
        <div className="absolute w-[120%] rotate-6 scale-110 bg-white/5 dark:bg-white/10 backdrop-blur-md border-y border-white/10 py-6 z-10 shadow-2xl">
          <Marquee direction="left" speed={20}>
            {SKILLS.map((skill, i) => (
              <span key={i} className="text-white text-4xl md:text-7xl font-display font-black mx-16 opacity-40 hover:opacity-100 transition-opacity cursor-default tracking-tighter uppercase italic">
                {skill}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Row 2: Moving Right - Rotated Negative */}
        <div className="absolute w-[120%] -rotate-6 scale-110 bg-primary/20 backdrop-blur-md border-y border-primary/30 py-6 z-20 shadow-2xl">
          <Marquee direction="right" speed={30}>
            {SKILLS.map((skill, i) => (
              <span key={i} className="text-primary text-4xl md:text-7xl font-display font-black mx-16 opacity-90 hover:opacity-100 transition-opacity cursor-default tracking-tighter uppercase italic">
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
});

SkillsMarquee.displayName = 'SkillsMarquee';
