import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  children, 
  direction = 'left', 
  speed = 20, 
  className = "",
  pauseOnHover = false
}) => {
  return (
    <div className={`flex overflow-hidden select-none group ${className}`}>
      <div 
        className={`flex flex-nowrap min-w-full shrink-0 items-center justify-around gap-4 ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
      <div 
        aria-hidden="true"
        className={`flex flex-nowrap min-w-full shrink-0 items-center justify-around gap-4 ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
