import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { X, CheckCircle2, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- MAGNETIC BUTTON LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => { x.set(0); y.set(0); };
  // -----------------------------

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 1500);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Overlay: Deep Dark Blur to make the 3D form pop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Form Container: Glassmorphism Concept */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 flex flex-col max-h-[90vh] text-white"
          >
            {/* Header: Kinetic styling with your font patterns */}
            <div className="p-8 md:p-10 pb-6 relative shrink-0 border-b border-white/10">
              <button 
                onClick={onClose} 
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/20 transition-all hover:rotate-90"
              >
                <X size={20} />
              </button>
              <h3 className="text-4xl font-display font-medium tracking-tight">Let's Connect</h3>
              <p className="mt-3 text-white/60 font-light text-lg">Turn your process into automated reality.</p>
            </div>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-grow">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="py-16 text-center"
                >
                  <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-2xl font-medium">Transmission Received</h4>
                  <p className="text-white/50 mt-2">I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Floating Input Group */}
                  {['Name', 'Email'].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-[0.2em]">{label}</label>
                      <input 
                        type={label === 'Email' ? 'email' : 'text'}
                        required
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/20"
                        placeholder={`Your ${label}...`}
                      />
                    </div>
                  ))}
                  
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-[0.2em]">Message</label>
                    <textarea 
                      rows={3}
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-white/20"
                      placeholder="What's on your mind?"
                    ></textarea>
                  </div>

                  {/* Concept: Magnetic Primary Button */}
                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetMouse}
                    style={{ x: mouseX, y: mouseY }}
                    className="relative group"
                  >
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold tracking-wide hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] transition-all disabled:opacity-50 flex items-center justify-center overflow-hidden relative"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
