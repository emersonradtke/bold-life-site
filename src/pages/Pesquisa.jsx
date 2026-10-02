import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Brain, User, Mail, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSeo, SITE_URL } from '@/hooks/useSeo';

const NAVY = '#051130';
const OFFWHITE = '#F9F9FB';
const ACCENT = '#3A7BD5';
const HEADING = '#1A1A1A';
const SUBHEADING = '#6385B5';

const categories = ['Consumo', 'Benefícios', 'Educação', 'Relacionamento', 'Empreendedorismo'];

export default function Pesquisa() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', age: '', city: '', state: '' });
  const [done, setDone] = useState(false);

  useSeo({
    title: 'Pesquisa Oficial | Boldlife — Consumidor Inteligente',
    description:
      'Pesquisa institucional para compreender hábitos de consumo, percepção de valor e interesse em novas formas de participação econômica.',
    path: '/pesquisa',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Survey',
      name: 'Pesquisa Oficial de Mercado — Consumidor Inteligente',
      url: `${SITE_URL}/pesquisa`,
      description:
        'Pesquisa institucional para compreender hábitos de consumo, percepção de valor e interesse em novas formas de participação econômica.',
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: NAVY, color: '#fff' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(5,17,48,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(58,123,213,0.12)', border: '1px solid rgba(58,123,213,0.3)' }}>
              <Brain className="w-5 h-5" style={{ color: ACCENT }} />
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight">
              <span style={{ color: '#fff' }}>.BOLD</span>
              <span style={{ color: ACCENT }}>LIFE</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="hidden sm:flex items-center gap-1.5 text-xs font-heading font-semibold opacity-60 hover:opacity-100 transition-opacity">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
            </button>
            <span className="px-4 py-2 rounded-full text-xs font-heading font-bold tracking-wide" style={{ background: 'rgba(58,123,213,0.12)', color: '#fff', border: '1px solid rgba(58,123,213,0.25)' }}>
              PESQUISA OFICIAL
            </span>
          </div>
        </div>
      </header>

      {done ? (
        <ThankYou onRestart={() => { setDone(false); setStep(0); setForm({ name: '', email: '', age: '', city: '', state: '' }); }} />
      ) : (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden">
            {/* grid + dots background */}
            <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'linear-gradient(rgba(58,123,213,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,123,213,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            {[
              { top: '18%', left: '12%' }, { top: '30%', left: '82%' }, { top: '62%', left: '8%' },
              { top: '74%', left: '70%' }, { top: '45%', left: '50%' }, { top: '85%', left: '40%' },
            ].map((p, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{ top: p.top, left: p.left, background: ACCENT, boxShadow: `0 0 16px 4px ${ACCENT}66` }} />
            ))}

            <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pt-20 pb-24 text-center">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p className="text-xs font-heading font-bold tracking-[0.25em] uppercase mb-6" style={{ color: ACCENT }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: ACCENT }} />
                  PESQUISA OFICIAL DE MERCADO
                </p>
                <h1 className="font-heading font-black text-4xl md:text-6xl leading-[1.05] mb-6">
                  Consumidor Inteligente
                </h1>
                <p className="text-sm md:text-base font-heading font-medium mb-8" style={{ color: ACCENT }}>
                  {categories.join(' • ')}
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  Pesquisa institucional para compreender hábitos de consumo, percepção de valor e interesse em novas formas de participação econômica.
                </p>
                <button
                  onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
                >
                  <Clock className="w-4 h-4" /> Leva cerca de 4 minutos
                </button>
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="relative" style={{ background: NAVY }}>
            <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="font-heading font-semibold text-xl md:text-2xl leading-relaxed mb-3" style={{ color: '#fff' }}>
                  A pergunta não é: "Você vai consumir?"
                </p>
                <p className="font-heading font-bold text-2xl md:text-3xl leading-relaxed" style={{ color: ACCENT }}>
                  A pergunta é: "O que o seu consumo está construindo para você?"
                </p>
              </motion.div>
            </div>
          </section>

          {/* Form section */}
          <section id="formulario" className="relative" style={{ background: OFFWHITE }}>
            <div className="max-w-2xl mx-auto px-6 lg:px-10 py-20">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="text-xs font-heading font-bold tracking-[0.25em] uppercase mb-3" style={{ color: ACCENT }}>
                  DADOS DO PARTICIPANTE
                </p>
                <h2 className="font-heading font-black text-3xl md:text-4xl mb-10" style={{ color: HEADING }}>
                  Antes de começar
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field icon={User} label="Nome completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Seu nome" required />
                  <Field icon={Mail} label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="seu@email.com" required />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Idade" value={form.age} onChange={(v) => setForm({ ...form, age: v })} placeholder="Ex: 32" required />
                    <Field label="Cidade" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Sua cidade" required />
                    <Field label="Estado" value={form.state} onChange={(v) => setForm({ ...form, state: v })} placeholder="UF" required />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full font-heading font-bold text-base rounded-full py-6" style={{ background: ACCENT, color: '#fff' }}>
                      Começar pesquisa
                    </Button>
                  </div>
                  <p className="text-xs text-center" style={{ color: SUBHEADING }}>
                    Seus dados são tratados de forma anônima e usados apenas para fins estatísticos.
                  </p>
                </form>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label className="text-sm font-heading font-semibold mb-2 block" style={{ color: HEADING }}>{label}{required && <span style={{ color: ACCENT }}> *</span>}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: SUBHEADING }} />}
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="rounded-full border bg-white"
          style={{ borderColor: 'rgba(99,133,181,0.25)', color: HEADING, paddingLeft: Icon ? '2.5rem' : '1rem' }}
        />
      </div>
    </div>
  );
}

function ThankYou({ onRestart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'linear-gradient(rgba(58,123,213,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,123,213,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="relative max-w-xl mx-auto px-6 py-32 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(58,123,213,0.15)', border: `1px solid ${ACCENT}` }}>
            <Check className="w-8 h-8" style={{ color: ACCENT }} />
          </div>
          <h2 className="font-heading font-black text-3xl mb-3">Participação confirmada!</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Obrigado por contribuir com a Pesquisa Oficial de Mercado da Boldlife.
          </p>
          <button onClick={onRestart} className="px-6 py-3 rounded-full text-sm font-heading font-semibold" style={{ background: ACCENT, color: '#fff' }}>
            Enviar outra resposta
          </button>
        </motion.div>
      </div>
    </section>
  );
}