import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up' 
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getInitialAndAnimateProps = () => {
    switch (direction) {
      case 'up':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 }
        };
      default:
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
    }
  };

  const { initial, animate } = getInitialAndAnimateProps();

  return (
    <div ref={sectionRef} className={className}>
      <motion.div
        initial={initial}
        animate={isVisible ? animate : initial}
        transition={{ duration: 0.6, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}