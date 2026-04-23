import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, TrendingUp, MapPin, Users, Award, Rocket } from 'lucide-react';

const LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/c45c6b15b_BOLDLIFE01-LOGO1.png';

const navItems = [
  { icon: Flame, label: 'Início', href: '#hero' },
  { icon: TrendingUp, label: 'Ciência', href: '#autoridade' },
  { icon: MapPin, label: 'Presença', href: '#presenca' },
  { icon: Users, label: 'Método', href: '#metodo' },
  { icon: Award, label: 'Mérito', href: '#merito' },
  { icon: Rocket, label: 'Acesse', href: '#convite' },
];

export default function BottomNav() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);

      const sections = navItems.map(n => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border px-4 py-2 flex items-center justify-between"
        >
          {/* Logo */}
          <img src={LOGO} alt="Bold Life" className="h-8 opacity-90" />

          {/* Nav items */}
          <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className="w-4 h-4 relative z-10" />
                <span className={`text-xs font-heading font-semibold relative z-10 hidden sm:inline ${
                  isActive ? '' : 'sr-only sm:not-sr-only'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}