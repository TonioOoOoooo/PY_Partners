import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  source: string;
  index?: number;
}

export default function PremiumTestimonial({ 
  quote, 
  source, 
  index = 0 
}: TestimonialProps) {
  return (
    <motion.div 
      className="bg-white premium-shadow rounded-sm p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.4 }
      }}
    >
      {/* Decorative quote mark in background */}
      <div className="absolute top-6 left-6 text-8xl text-gray-100 font-serif leading-none pointer-events-none opacity-60">
        "
      </div>
      
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-secondary opacity-50" />
      
      <div className="relative z-10">
        {/* The quote text with animated reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-gray-700 mb-6 italic font-thin text-lg leading-relaxed">
            {quote}
          </p>
        </motion.div>
        
        {/* The source with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-primary font-medium flex items-center"
        >
          {/* Small decorative line */}
          <span className="inline-block w-5 h-px bg-secondary mr-3" />
          
          {/* Source text */}
          <span className="text-sm tracking-wider uppercase">{source}</span>
        </motion.div>
      </div>
      
      {/* Subtle hover effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}