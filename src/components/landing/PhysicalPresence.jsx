import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, ShoppingCart, Building, Hotel } from 'lucide-react';

const MARKET_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/c938d5a61_generated_caef08bd.png';
const HOTEL_IMG = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/ea67d4b30_generated_862da268.png';

const presencePoints = [
  { icon: ShoppingCart, title: 'Supermercados', desc: 'Retire produtos nas maiores redes de supermercados do Brasil.' },
  { icon: Building, title: 'Shoppings', desc: 'Parcerias com grandes redes de shoppings em todo o país.' },
  { icon: Hotel, title: 'Hotéis', desc: 'Presente em redes hoteleiras para máxima conveniência.' },
];

export default function PhysicalPresence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="presenca" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      {/* Background images */}
      <div className="absolute inset-0 opacity-10">
        <img src={MARKET_IMG} alt="" className="w-full h-1/2 object-cover" />
        <img src={HOTEL_IMG} alt="" className="w-full h-1/2 object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
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
            Presença Real
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
          >
            Onde Você Estiver, a Bold Life Estará Lá.
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-secondary font-heading font-semibold text-lg mb-6"
          >
            Uma rede híbrida conectada às maiores redes de supermercados, shoppings e hotéis em todo o Brasil.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground leading-relaxed"
          >
            Esqueça a dependência de fretes caros ou esperas infinitas. A Bold Life é real e física. Através de parcerias estratégicas, estamos presentes onde você já faz suas compras todos os dias. Seja no supermercado do seu bairro, em grandes redes de shoppings ou hotéis, nosso sistema permite que você retire produtos e gere benefícios na esquina da sua casa. É a conveniência do mundo físico com a inteligência do ganho digital. Consumo inteligente é comprar onde você já compra, mas agora, sendo remunerado por isso.
          </motion.p>
        </div>

        {/* Presence Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {presencePoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
              className="group relative bg-card/60 backdrop-blur-sm border border-border rounded-sm p-8 text-center hover:border-primary/40 transition-all duration-500 hover:bg-card/80"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-heading font-bold text-xl mb-3">{point.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.desc}</p>
              <MapPin className="w-4 h-4 text-primary/40 absolute top-4 right-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}