import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign, TrendingUp, Globe } from 'lucide-react';

const ICON = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/6b81ab293_BOLDLIFE-ICON.png';

const stats = [
  { icon: DollarSign, value: '$200B', label: 'Mercado Global' },
  { icon: TrendingUp, value: '∞', label: 'Consumo Contínuo' },
  { icon: Globe, value: 'BR', label: 'Nascida no Vale do Aço' },
];

export default function AuthoritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="autoridade" className="relative py-32 overflow-hidden">
      {/* Steel line divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Decorative icon bg */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden lg:block">
        <img src={ICON} alt="" className="w-[500px] h-[500px] object-contain" style={{ filter: 'invert(1)' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '3rem' } : {}}
              transition={{ duration: 0.6 }}
              className="h-0.5 bg-primary mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4"
            >
              A Ciência do Consumo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
            >
              O Mercado que Nunca Para: Do Ventre ao Fim da Vida.
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-secondary font-heading font-semibold text-lg mb-6"
            >
              Entenda por que o consumo básico é a atividade humana mais poderosa e resiliente da economia mundial.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground leading-relaxed"
            >
              Você consome desde antes de nascer e continuará consumindo até o seu último dia. O consumo não é uma opção, é uma obrigatoriedade. A Bold Life nasceu para quebrar o ciclo onde você apenas paga a conta. No nosso modelo, o consumo gera lucro. Movimentamos um mercado de 200 bilhões de dólares — o mesmo que sustenta potências como os EUA e Japão — trazendo essa ciência para a palma da sua mão através de uma oportunidade brasileira, nascida na solidez industrial do Vale do Aço.
            </motion.p>
          </div>

          {/* Right: Stats Cards */}
          <div className="space-y-6 lg:pt-24">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-sm p-6 hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500 rounded-l-sm" />
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-black text-3xl text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground text-sm font-heading">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}