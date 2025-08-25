import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  };
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  isExpanded, 
  onToggle, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const cardId = `service-card-${index}`;
  const contentId = `service-content-${index}`;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 bg-black/90 dark:bg-white/90 text-white dark:text-black text-sm px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10 dark:border-black/10 max-w-xs pointer-events-none"
          >
            <div className="text-center leading-tight">
              {service.description.split('.')[0]}.
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white/90"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.button
        id={cardId}
        className="w-full bg-gray-50/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden hover:border-brand-mint/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:ring-offset-2 focus:ring-offset-brand-bg-light dark:focus:ring-offset-brand-bg-dark text-left"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        role="button"
        tabIndex={0}
      >
        {/* Collapsed Header */}
        <div className="p-4 lg:p-6 flex flex-col items-center text-center min-h-[120px] justify-center relative">
          <div className="mb-3 text-brand-mint">
            <service.icon className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="font-bold text-base sm:text-lg lg:text-xl text-brand-text-light dark:text-white mb-2">
            {service.title}
          </h3>
          
          {/* Chevron Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-2 right-2 text-brand-mint"
          >
            <ChevronDownIcon className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                opacity: { duration: 0.2 }
              }}
              className="overflow-hidden"
            >
              <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-black/10 dark:border-white/10">
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mt-4"
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};