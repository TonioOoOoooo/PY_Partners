import { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Implementation of custom smooth scrolling
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element is an anchor tag with hash
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const href = target.getAttribute('href') as string;
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        // Only proceed if we found a target element
        if (targetElement) {
          e.preventDefault();
          
          // Get the offset position of the target element
          const headerOffset = 80; // Adjust this value based on your header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Smooth scroll to element
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash without triggering scroll
          window.history.pushState({}, '', href);
        }
      }
    };
    
    // Add a custom class to the document when scrolling for animations
    let scrollTimer: number;
    const handleScrollEvent = () => {
      document.body.classList.add('is-scrolling');
      
      // Remove the class after scrolling stops
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 100);
      
      // Update scroll progress indicator
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
      
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }
    };
    
    // Implementation of scroll reveal effect
    const revealElements = () => {
      const elements = document.querySelectorAll('.reveal-element');
      
      elements.forEach((element) => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    
    // Create scroll progress indicator
    const createScrollIndicator = () => {
      if (!document.querySelector('.scroll-progress')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';
        progressContainer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 0, 0, 0.05);
          z-index: 1000;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
          height: 100%;
          width: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: width 0.1s ease;
        `;
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
      }
    };
    
    // Add event listeners
    document.addEventListener('click', handleLinkClick);
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('scroll', revealElements);
    
    // Create scroll indicator
    createScrollIndicator();
    
    // Initial call to reveal elements that are already in viewport
    revealElements();
    
    // Add CSS styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      .reveal-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), 
                    transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Staggered animation for multiple elements */
      .reveal-group .reveal-element:nth-child(1) { transition-delay: 0s; }
      .reveal-group .reveal-element:nth-child(2) { transition-delay: 0.1s; }
      .reveal-group .reveal-element:nth-child(3) { transition-delay: 0.2s; }
      .reveal-group .reveal-element:nth-child(4) { transition-delay: 0.3s; }
      .reveal-group .reveal-element:nth-child(5) { transition-delay: 0.4s; }
      .reveal-group .reveal-element:nth-child(6) { transition-delay: 0.5s; }
      
      /* Enhanced scrollbar styling */
      body {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }
      
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      
      /* Smooth section transitions */
      section {
        transition: opacity 0.5s ease;
      }
      
      html {
        scroll-behavior: smooth;
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup on component unmount
    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('scroll', revealElements);
      const scrollIndicator = document.querySelector('.scroll-progress-container');
      if (scrollIndicator) {
        document.body.removeChild(scrollIndicator);
      }
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
}