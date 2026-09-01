import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function InstitutionalSection() {
  return (
    <section id="institucional" className="relative py-24 px-6 lg:px-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase">
              O que é a Boldlife
            </p>
          </div>

          <h1 className="font-heading font-black text-3xl md:text-5xl leading-tight mb-8">
            BOLDLIFE – Consumo Inteligente
          </h1>

          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              A <strong className="text-foreground">Boldlife</strong> é uma plataforma brasileira baseada no
              conceito de <strong className="text-foreground">consumo inteligente</strong>, criada para conectar
              consumidores, produtos, benefícios e oportunidades em um único ecossistema.
            </p>
            <p>
              Nosso propósito é transformar a relação tradicional de consumo, criando novas possibilidades
              para que consumidores e parceiros transformem o consumo cotidiano em renda real e
              recorrente, por meio de um modelo simples, transparente e duplicável.
            </p>
            <p>
              A Boldlife reúne em um só lugar produtos e serviços com valores diferenciados, benefícios
              exclusivos para associados e um sistema de empreendedorismo em rede que permite a cada pessoa
              construir sua própria rede de consumo e comissões — sempre com educação, capacitação e
              mérito como pilares.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Consumo Inteligente', text: 'Acesso a produtos e serviços com valores diferenciados.' },
              { title: 'Benefícios Reais', text: 'Vantagens exclusivas para quem participa do ecossistema.' },
              { title: 'Oportunidade de Renda', text: 'Transforme consumo em renda por um modelo duplicável.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card/60 border border-border rounded-sm p-5"
              >
                <h3 className="font-heading font-bold text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}