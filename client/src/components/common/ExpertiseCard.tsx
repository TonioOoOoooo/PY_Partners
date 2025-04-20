import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
}

export default function EnhancedExpertiseCard({ 
  title, 
  description, 
  icon, 
  index = 0 
}: ExpertiseCardProps) {
  return (
    <motion.div
      className="bg-white overflow-hidden group relative premium-shadow premium-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15, 
        ease: [0.19, 1, 0.22, 1]
      }}
      whileHover={{ y: -8, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }}
    >
      {/* Background decoration that animates on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.6, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Left border that appears on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      />
      
      {/* Main content */}
      <div className="p-8 relative z-10">
        {icon && (
          <div className="text-secondary mb-5 transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}
        
        <h3 className="text-lg font-heading font-bold text-primary mb-4 group-hover:translate-x-1 transition-transform duration-500">{title}</h3>
        
        <p className="text-gray-600 text-sm leading-relaxed group-hover:translate-x-1 transition-transform duration-500 delay-75">{description}</p>
        
        {/* Optional learn more arrow that appears on hover */}
        <motion.div 
          className="mt-6 text-secondary flex items-center font-medium text-sm overflow-hidden h-6"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="mr-2">En savoir plus</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}