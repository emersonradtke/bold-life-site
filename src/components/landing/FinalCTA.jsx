import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Handshake, Briefcase } from 'lucide-react';

const highlights = [
  { icon: Package, text: '30 mil produtos' },
  { icon: Handshake, text: 'Parcerias em todo o país' },
  { icon: Briefcase, text: 'Plano de carreira sustentável' },
];

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="convite" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '3rem' } : {}}
          transition={{ duration: 0.6 }}
          className="h-0.5 bg-primary mb-6 mx-auto"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4"
        >
          O Convite Final
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
        >
          A Bold Life está Pronta para Você.{' '}
          <span className="text-primary">Você está Pronto para Ela?</span>
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-secondary font-heading font-semibold text-lg mb-6"
        >
          Tome a decisão que vai determinar o seu destino e acesse o nosso ecossistema oficial.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground leading-relaxed mb-10"
        >
          Não estamos aqui para fazer promessas, estamos aqui para oferecer um sistema comprovado de transformação. A oportunidade está na mesa: 30 mil produtos à disposição, parcerias físicas em todo o país e um plano de carreira sustentável. A única variável que falta para essa engrenagem girar é a sua atitude de dar o primeiro passo.
        </motion.p>

        {/* Highlight pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {highlights.map((h) => (
            <div key={h.text} className="flex items-center gap-2 bg-card/60 border border-border rounded-full px-5 py-2.5">
              <h.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading font-semibold text-foreground">{h.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <a href="https://boldlife7.com.br/bold/register.php?id=01" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-heading font-bold text-base tracking-wide px-12 py-7 rounded-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_60px_rgba(244,180,0,0.3)] group"
            >
              ACESSAR ECOSSISTEMA BOLD LIFE
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}