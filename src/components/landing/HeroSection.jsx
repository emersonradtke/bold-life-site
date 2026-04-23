import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/923b7524e_generated_3b7c55ae.png';

export default function HeroSection() {
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-32">
        <div className="max-w-3xl">
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
            Bold Life — Ecossistema de Transformação
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
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
          >
            Saia da inércia e conecte-se ao ecossistema de educação e consumo que transforma o inevitável em liberdade real. A Bold Life é a ponte entre onde você está e onde você decidiu chegar.
          </motion.p>

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

        {/* Large decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <span className="font-heading font-black text-[16rem] leading-none select-none whitespace-nowrap">
            BOLD
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs font-heading tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}