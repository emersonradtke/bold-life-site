import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Users, Zap, Target, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';
const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';

const sections = [
  {
    title: 'EMPREENDA CONSUMINDO E INDICANDO',
    icon: Zap,
    points: [
      'Consumir produtos e serviços com valores diferenciados',
      'Comercializar esses produtos dentro da plataforma',
      'Construir uma rede de empreendedores',
      'Receber comissões sobre o volume total de consumo e vendas da sua equipe'
    ]
  },
  {
    title: 'COMO FUNCIONAM OS GANHOS',
    icon: TrendingUp,
    description: 'Os associados recebem comissões que variam de 0,5% a 5%, calculadas sobre o volume total de consumo e comercialização dos produtos e serviços da sua rede, até a 5ª geração. Isso significa que você ganha não apenas pelo que faz, mas também pelo resultado gerado pelas pessoas que você ajuda a desenvolver.'
  },
  {
    title: 'MODELO SIMPLES E DUPLICÁVEL',
    icon: Target,
    description: 'Cada empreendedor pode associar diretamente até 5 pessoas. O sistema é baseado em Educação, Capacitação e Duplicação. Você aprende o processo, aplica, ensina sua equipe a fazer o mesmo e todos seguem exatamente o que o sistema propõe.',
  },
  {
    title: 'O PODER DA DUPLICAÇÃO',
    icon: Users,
    generations: [
      { gen: '1ª geração', count: '5 pessoas' },
      { gen: '2ª geração', count: '25 pessoas' },
      { gen: '3ª geração', count: '125 pessoas' },
      { gen: '4ª geração', count: '625 pessoas' },
      { gen: '5ª geração', count: '3.125 pessoas' }
    ],
    total: 'Totalizando 3.905 empreendedores associados, com apenas 5 indicações diretas.'
  }
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setShowScrollButton(scrolled < scrollHeight - 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const scrollAmount = window.innerHeight * 0.8;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background decorative logos */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full flex items-center justify-center">
          <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" style={{ filter: 'invert(1)' }} />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-8 pb-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-heading font-semibold">Voltar</span>
        </button>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img src={HEADER_LOGO} alt="Bold Life" className="h-12 mb-8" />
            <div className="h-0.5 w-12 bg-primary mb-6" />
            <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
              Entenda o Sistema
            </p>
            <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">
              Como Funciona a Bold Life
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Bold Life é uma plataforma de Educação e Vendas que oferece às pessoas a oportunidade de empreender de forma simples, acessível e escalável.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Por meio do consumo inteligente e da comercialização de produtos e serviços, os associados têm acesso a descontos exclusivos e à possibilidade de gerar renda através de um modelo estruturado de criação de rede.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-32">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="mb-20 last:mb-0"
            >
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-sm p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                    {section.title}
                  </h2>
                </div>

                {section.points && (
                  <ul className="space-y-3 ml-16">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {section.description && (
                  <p className="text-muted-foreground leading-relaxed ml-16">
                    {section.description}
                  </p>
                )}

                {section.generations && (
                  <div className="ml-16 space-y-3">
                    {section.generations.map((g, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="font-heading font-semibold">{g.gen}</span>
                        <span className="text-primary font-heading font-bold text-lg">{g.count}</span>
                      </div>
                    ))}
                    <p className="text-muted-foreground text-sm pt-4 italic">
                      👉 {section.total}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div>
            <img src={HEADER_LOGO} alt="Bold Life" className="h-10 mb-8 mx-auto" />
            <h3 className="font-heading font-bold text-2xl mb-6">Educação, Consumo Inteligente e Empreendedorismo em Rede</h3>
            <a href="https://boldlife7.com.br/bold/register.php?id=01" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-base tracking-wide px-12 py-7 rounded-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_60px_rgba(244,180,0,0.3)]"
              >
                COMECE AGORA
              </Button>
            </a>
          </div>
          
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heading font-semibold">Voltar à página principal</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Button */}
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onClick={handleScrollDown}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors duration-300"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}