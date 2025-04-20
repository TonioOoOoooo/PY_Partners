import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
  onLearnMore?: () => void;
}

export default function EnhancedExpertiseCard({ 
  title, 
  description, 
  icon, 
  index = 0,
  onLearnMore
}: ExpertiseCardProps) {
  // Gestion accessibilité et click sur toute la carte
  const clickable = typeof onLearnMore === 'function';
  const handleClick = () => {
    if (clickable) onLearnMore!();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onLearnMore!();
    }
  };
  return (
    <motion.div
      className={
        'bg-white overflow-hidden group relative premium-shadow premium-border' +
        (clickable ? ' cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary' : '')
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15, 
        ease: [0.19, 1, 0.22, 1]
      }}
      whileHover={clickable ? { y: -8, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } } : undefined}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? "button" : undefined}
      aria-label={clickable ? `En savoir plus sur l'expertise : ${title}` : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
    >
      {/* Background decoration that animates on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.6, opacity: 0 }}
        whileHover={clickable ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Left border that appears on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"
        initial={{ scaleY: 0 }}
        whileHover={clickable ? { scaleY: 1 } : undefined}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      />
      
      {/* Main content */}
      <div className="p-8 relative z-10 select-none">
        {icon && (
          <div className="text-secondary mb-5 transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}
        
        <h3 className="text-lg font-heading font-bold text-primary mb-4 group-hover:translate-x-1 transition-transform duration-500">{title}</h3>
        
        <p className="text-gray-600 text-sm leading-relaxed group-hover:translate-x-1 transition-transform duration-500 delay-75">{description}</p>
        
        {/* Lien visible seulement si cliquable */}
        {clickable && (
          <div className="mt-6 text-secondary flex items-center font-medium text-sm h-6">
            <span className="mr-2">En savoir plus</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}