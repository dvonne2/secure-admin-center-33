
import { useEffect } from 'react';

export function FontLoader() {
  useEffect(() => {
    // Check if fonts are already loaded
    const existingLink = document.querySelector('link[href*="Playfair+Display"]');
    
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@400;500;600&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return null;
}
