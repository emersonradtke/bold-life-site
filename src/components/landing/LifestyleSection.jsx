import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, GraduationCap } from 'lucide-react';

const TRAINING_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80';
const AWARD_IMG = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&q=80';

const rewards = [
  { icon: GraduationCap, title: 'Capacitação de Elite', desc: 'Treinamentos intensivos com os maiores líderes do mercado.', img: TRAINING_IMG },
  { icon: Award, title: 'Premiações Exclusivas', desc: 'Momentos que o dinheiro comum não pode comprar.', img: AWARD_IMG },
];

export default function LifestyleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="merito" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
            S4 — Reconhecimento e Mérito
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
          >
            Muito Além dos Ganhos: O Reconhecimento que Você Merece.
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-secondary font-heading font-semibold text-lg mb-6"
          >
            Celebramos sua evolução com experiências exclusivas, de mentorias de elite a viagens inesquecíveis.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground leading-relaxed"
          >
            O seu esforço na Bold Life não gera apenas rendimentos, gera um novo estilo de vida. Acreditamos que cada degrau conquistado deve ser celebrado com excelência. Por isso, criamos um plano de premiações que vai muito além do financeiro: treinamentos intensivos de capacitação, cruzeiros all-inclusive e viagens internacionais para os líderes que decidem fazer história. Aqui, bater metas significa colecionar momentos que o dinheiro comum não pode comprar.
          </motion.p>
        </div>

        {/* Reward Shards */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]">
          {rewards.map((reward, i) => {
            const isExpanded = hovered === i;
            return (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-sm overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-border ${
                  isExpanded ? 'md:flex-[3]' : 'md:flex-[1]'
                } min-h-[200px] md:min-h-0`}
              >
                {/* Background */}
                {reward.img ? (
                  <>
                    <img
                      src={reward.img}
                      alt={reward.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: isExpanded ? 'scale(1.05)' : 'scale(1)' }}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded ? 'bg-background/60' : 'bg-background/80'
                    }`} />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-card" />
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-colors duration-500 ${
                    isExpanded ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <reward.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-2">{reward.title}</h4>
                  <motion.p
                    initial={false}
                    animate={{ opacity: isExpanded ? 1 : 0.6 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {reward.desc}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}