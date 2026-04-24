import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/923b7524e_generated_3b7c55ae.png';
const LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/aa85e3a3d_BOLDLIFE02-LOGO1.png';
const ICON = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/6b81ab293_BOLDLIFE-ICON.png';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Industrial forge" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-8 lg:left-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-36 pb-32">
        <div className="max-w-3xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <img src={LOGO} alt="Bold Life" className="h-14 md:h-16" />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-primary mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary font-heading font-bold text-sm tracking-[0.3em] uppercase mb-6"
          >
            Ecossistema de Transformação
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-8"
          >
            Não são as suas condições, e sim as suas{' '}
            <span className="text-primary">decisões</span> que determinam o seu destino.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-6"
          >
            Saia da inércia e conecte-se a um ecossistema de educação e consumo que transforma hábitos comuns em resultados extraordinários. A Bold Life é a ponte entre onde você está e o futuro que você decidiu construir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate('/como-funciona')}
              className="text-primary hover:text-primary/80 font-heading font-semibold underline underline-offset-4 transition-colors"
            >
              Como funciona a Bold Life →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-heading font-bold text-base tracking-wide px-10 py-7 rounded-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,0,0.3)]"
              onClick={() => document.getElementById('convite')?.scrollIntoView({ behavior: 'smooth' })}
            >
              QUERO TOMAR MINHA DECISÃO
            </Button>
          </motion.div>
        </div>


      </div>


    </section>
  );
}