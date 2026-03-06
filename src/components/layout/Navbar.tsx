import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Monitor, Home, Briefcase, Cpu, Users, Mail } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/data';
import { useTheme, Theme } from '../../context/ThemeContext';

const LOGO_URL = "https://picsum.photos/seed/popoola-logo/400/120";

const IconMap: Record<string, React.ReactNode> = {
  Home: <Home size={16} />,
  Briefcase: <Briefcase size={16} />,
  Cpu: <Cpu size={16} />,
  Users: <Users size={16} />,
  Mail: <Mail size={16} />,
};

export const Navbar: React.FC = React.memo(() => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const ThemeIcon = () => {
    if (theme === 'system') return <Monitor size={18} />;
    if (theme === 'dark') return <Moon size={18} />;
    return <Sun size={18} />;
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 md:py-8 flex justify-center pointer-events-none">
        <motion.nav
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          initial={false}
          animate={{
            width: isMobile ? '100%' : (isHovered ? 'auto' : '240px'),
            backgroundColor:
              scrolled || isHovered || mobileMenuOpen
                ? (resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)')
                : (resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.1)'),
            backdropFilter:
              scrolled || isHovered || mobileMenuOpen
                ? 'blur(16px)'
                : 'blur(4px)',
            paddingLeft: isHovered || mobileMenuOpen ? '2rem' : '1.5rem',
            paddingRight: isHovered || mobileMenuOpen ? '2rem' : '1.5rem',
            borderRadius: mobileMenuOpen ? '1.5rem' : '9999px',
          }}
          transition={
            isMobile
              ? { duration: 0 }
              : { type: 'spring', stiffness: 300, damping: 30 }
          }
          className={`flex items-center justify-between h-14 md:h-16 border pointer-events-auto overflow-hidden ${
            resolvedTheme === 'dark' ? 'border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'border-white/20 shadow-2xl'
          }`}
        >
          <div className="flex items-center shrink-0">
            <a href="#home" className="flex items-center">
              <img
                src={LOGO_URL}
                alt="POPOOLA"
                className={`h-6 md:h-8 object-contain ${resolvedTheme === 'dark' ? 'invert' : 'brightness-0'}`}
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <AnimatePresence>
              {isHovered && (
                <motion.ul
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-8 ml-10"
                >
                  {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`text-[13px] font-medium flex items-center gap-2 transition-colors duration-300 whitespace-nowrap ${
                          resolvedTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <span className="opacity-70">{IconMap[item.icon || '']}</span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                  
                  {/* Theme Toggle Button */}
                  <li>
                    <button
                      onClick={cycleTheme}
                      className={`p-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        resolvedTheme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-dark/5 text-dark hover:bg-dark/10'
                      }`}
                      aria-label="Toggle theme"
                    >
                      <ThemeIcon />
                      <span className="text-[10px] uppercase font-bold tracking-wider">{theme}</span>
                    </button>
                  </li>

                  <li>
                    <a
                      href="#contact"
                      className={`px-6 py-2 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap ${
                        resolvedTheme === 'dark' ? 'bg-white text-dark hover:bg-gray-200' : 'bg-dark text-white hover:bg-primary'
                      }`}
                    >
                      Work with me
                    </a>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>

            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-4 flex items-center gap-4"
              >
                <button
                  onClick={cycleTheme}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    resolvedTheme === 'dark' ? 'text-yellow-400' : 'text-dark'
                  }`}
                >
                  <ThemeIcon />
                </button>
                <div className="w-8 h-8 rounded-full bg-dark/5 flex flex-col items-center justify-center space-y-1">
                  <div className={`w-4 h-0.5 rounded-full ${resolvedTheme === 'dark' ? 'bg-white' : 'bg-dark'}`} />
                  <div className={`w-4 h-0.5 rounded-full ${resolvedTheme === 'dark' ? 'bg-white' : 'bg-dark'}`} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={cycleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                resolvedTheme === 'dark' ? 'text-yellow-400' : 'text-dark'
              }`}
            >
              <ThemeIcon />
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 transition-colors ${resolvedTheme === 'dark' ? 'text-white' : 'text-dark'} hover:text-primary`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-24 px-6 md:hidden ${resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}
          >
            <ul className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-display font-medium flex items-center gap-4 transition-colors ${
                      resolvedTheme === 'dark' ? 'text-white hover:text-primary' : 'text-dark hover:text-primary'
                    }`}
                  >
                    <span className="opacity-50">{IconMap[item.icon || '']}</span>
                    {item.name}
                  </a>
                </li>
              ))}

              <li className="pt-6">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-center py-4 rounded-2xl text-lg font-bold transition-colors ${
                    resolvedTheme === 'dark' ? 'bg-white text-dark hover:bg-gray-200' : 'bg-dark text-white hover:bg-primary'
                  }`}
                >
                  Work with me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';
