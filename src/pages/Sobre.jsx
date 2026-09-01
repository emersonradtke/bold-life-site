import { motion } from 'framer-motion';
import { ArrowLeft, Target, Eye, Heart, ShieldCheck, Users, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/landing/Footer';
import { useSeo, SITE_URL, DEFAULT_LOGO } from '@/hooks/useSeo';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre a Boldlife',
  url: `${SITE_URL}/sobre`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Boldlife',
    alternateName: ['Bold Life', 'Boldlife Consumo Inteligente'],
    url: SITE_URL,
    logo: DEFAULT_LOGO,
    slogan: 'Seja um Consumidor Inteligente e Transforme Consumo em Renda',
  },
};

const pillars = [
  { icon: Target, title: 'Missão', text: 'Democratizar o acesso a produtos, serviços e oportunidades por meio de um ecossistema de consumo inteligente que gera valor para consumidores e parceiros.' },
  { icon: Eye, title: 'Visão', text: 'Ser a principal plataforma brasileira de consumo inteligente, reconhecida pela transparência, educação e geração de oportunidades reais.' },
  { icon: Heart, title: 'Valores', text: 'Ética, transparência, mérito, educação e capacitação. Acreditamos que o consumo pode ser uma ferramenta de transformação quando feito com inteligência.' },
];

const differentials = [
  { icon: ShieldCheck, title: 'Transparência', text: 'Modelo claro e duplicável, sem promessas vazias — apenas um sistema estruturado de consumo e comissões.' },
  { icon: Users, title: 'Educação e Capacitação', text: 'Cada associado aprende o processo, aplica e ensina sua equipe a fazer o mesmo, seguindo exatamente o que o sistema propõe.' },
  { icon: MapPin, title: 'Presença no Brasil', text: 'Nascida na solidez industrial do Vale do Aço, Minas Gerais, com perspectiva de expansão nacional.' },
];

export default function Sobre() {
  const navigate = useNavigate();
  useSeo({
    title: 'Sobre a Boldlife | Quem Somos',
    description: 'Conheça a Boldlife: plataforma brasileira de consumo inteligente. Nosso propósito, missão, visão, valores e como o ecossistema funciona.',
    path: '/sobre',
    type: 'website',
    jsonLd,
  });

  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 pt-8 pb-20">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-heading font-semibold">Voltar</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <img src={HEADER_LOGO} alt="Boldlife" className="h-10 mb-6" />
          <div className="h-0.5 w-12 bg-primary mb-6" />
          <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">Quem Somos</p>
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">Sobre a Boldlife</h1>
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-5 text-muted-foreground text-lg leading-relaxed mb-16">
          <h2 className="font-heading font-bold text-2xl text-foreground">O que é a Boldlife</h2>
          <p>
            A <strong className="text-foreground">Boldlife</strong> é uma plataforma brasileira baseada no conceito de
            <strong className="text-foreground"> consumo inteligente</strong>, criada para conectar consumidores,
            produtos, benefícios e oportunidades em um único ecossistema.
          </p>
          <p>
            Nosso propósito é transformar a relação tradicional de consumo, criando novas possibilidades para
            consumidores e parceiros. Acreditamos que consumir de forma inteligente pode gerar valor real e
            recorrente para as pessoas, por meio de um modelo simples, transparente e duplicável.
          </p>
          <p className="bg-card/60 border border-border rounded-sm p-5 text-sm">
            <strong className="text-foreground">Nota institucional:</strong> informações empresariais específicas
            (razão social, CNJ, endereço, data de fundação e contatos oficiais) serão preenchidas pelo
            administrador no painel de Configurações de SEO.
          </p>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-card/60 border border-border rounded-sm p-6">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Como funciona o ecossistema Boldlife</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A Boldlife reúne em um só lugar produtos e serviços com valores diferenciados, benefícios
              exclusivos para associados e um sistema de empreendedorismo em rede baseado em
              <strong className="text-foreground"> Educação, Capacitação e Duplicação</strong>.
            </p>
            <p>
              Cada empreendedor pode associar diretamente até 5 pessoas e recebe comissões sobre o volume
              total de consumo e comercialização da sua rede, até a 5ª geração. O resultado é um modelo
              meritocrático, em que o esforço e a educação geram oportunidades reais.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Diferenciais da Boldlife</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentials.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-card/60 border border-border rounded-sm p-6">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <d.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-base mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <a href="/como-funciona" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-heading font-semibold">
            Entenda em detalhes como funciona a Boldlife →
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}