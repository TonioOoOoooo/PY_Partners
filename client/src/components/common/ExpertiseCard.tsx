import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
}

export default function ExpertiseCard({ 
  title, 
  description, 
  icon, 
  index = 0 
}: ExpertiseCardProps) {
  return (
    <motion.div
      className="bg-white premium-shadow premium-border p-8 hover:bg-gray-50 transition-all duration-300 hover:translate-y-[-5px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
    >
      {icon && (
        <div className="text-secondary mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-heading font-bold text-primary mb-4">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}