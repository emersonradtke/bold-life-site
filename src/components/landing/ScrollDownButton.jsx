import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const sections = ['hero', 'autoridade', 'presenca', 'metodo', 'merito', 'convite'];

export default function ScrollDownButton() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when near bottom of page
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      setVisible(!nearBottom);

      // Track current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const currentIndex = sections.indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    if (nextSection) {
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLastSection = currentSection === sections[sections.length - 1];
  if (!visible || isLastSection) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 group cursor-pointer"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.button>
  );
}