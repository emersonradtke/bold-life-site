import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const NETWORK_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/2d871558f_generated_551aebed.png';

const generations = [
  { level: '1ª', count: 5, label: 'Suas indicações diretas' },
  { level: '2ª', count: 25, label: 'Seus parceiros duplicando o método' },
  { level: '3ª', count: 125, label: 'A rede ganhando tração' },
  { level: '4ª', count: 625, label: 'Consumo em escala regional' },
  { level: '5ª', count: 3125, label: 'Sua organização em nível nacional' },
];

function AnimatedCounter({ target, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span>{count.toLocaleString('pt-BR')}</span>;
}

export default function FractalMath() {
  const ref = useRef(null);
  const counterRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const counterInView = useInView(counterRef, { once: true, margin: '-50px' });

  return (
    <section id="metodo" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Network background */}
      <div className="absolute inset-0 opacity-5">
        <img src={NETWORK_IMG} alt="" className="w-full h-full object-cover" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-20">
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
            O Poder da Duplicação
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
          >
            Duplicação Simples: O Poder da Matemática a Seu Favor.
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-secondary font-heading font-semibold text-lg mb-6"
          >
            Descubra como o sistema 5x5 transforma apenas 5 indicações diretas em uma rede de milhares de empreendedores conectados.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground leading-relaxed"
          >
            O grande segredo da Bold Life não está em vender para milhares de pessoas, mas em ensinar 5 pessoas decididas a fazerem o mesmo que você. Nosso modelo é baseado na Educação e Capacitação: você aprende o processo, aplica em sua rotina e ensina sua equipe a duplicar o sistema. Quando todos seguem o mesmo método comprovado, o crescimento deixa de ser esforço individual e se torna uma escala exponencial imparável.
          </motion.p>
        </div>

        {/* 5x5 Visualization */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Generations */}
          <div className="space-y-4">
            {generations.map((gen, i) => (
              <motion.div
                key={gen.level}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  {/* Node connector */}
                  <div className="flex flex-col items-center w-8">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(244,180,0,0.5)]" />
                    {i < generations.length - 1 && (
                      <div className="w-px h-8 bg-primary/30 mt-1" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-card/60 backdrop-blur-sm border border-border rounded-sm p-5 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-heading font-bold text-sm">{gen.level} Geração</span>
                        <p className="text-muted-foreground text-sm mt-1">{gen.label}</p>
                      </div>
                      <span className="font-heading font-black text-2xl md:text-3xl text-foreground">
                        {gen.count.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(gen.count / 3125) * 100}%` } : {}}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                      className="h-0.5 bg-primary/40 mt-3 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Counter Highlight */}
          <div ref={counterRef} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={counterInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-sm p-10 lg:p-14">
                <p className="text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4">
                  Resultado Total
                </p>
                <p className="font-heading font-black text-6xl md:text-7xl lg:text-8xl text-foreground mb-4">
                  <AnimatedCounter target={3905} isInView={counterInView} />
                </p>
                <p className="font-heading font-semibold text-xl text-secondary mb-6">
                  empreendedores associados
                </p>
                <p className="text-muted-foreground text-sm">
                  com apenas <span className="text-primary font-bold">5 indicações diretas</span>
                </p>

                {/* Decorative glow */}
                <div className="absolute -inset-1 bg-primary/5 rounded-sm blur-2xl -z-10" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={counterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground leading-relaxed mt-8 text-sm"
            >
              Essa estrutura garante que você receba comissões que variam de 0,5% a 5% sobre o volume total de consumo de toda a sua rede até a 5ª geração. Na Bold Life, a única forma de você crescer é ajudando outros a crescerem também. O resultado final é uma equipe sólida, gerando renda recorrente baseada em um sistema simples e sustentável.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}