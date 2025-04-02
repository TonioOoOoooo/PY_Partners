import { useEffect, useState, useRef } from 'react';

export const useScrollReveal = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (observerRef.current) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elements]);

  const reveal = (element: HTMLElement) => {
    if (element && !elements.includes(element)) {
      setElements((prev) => [...prev, element]);
    }
  };

  return { reveal };
};
