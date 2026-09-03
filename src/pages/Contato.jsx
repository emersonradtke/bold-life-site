import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Footer from '@/components/landing/Footer';
import { useSeo, SITE_URL } from '@/hooks/useSeo';
import { SITE_CONFIG } from '@/config/site';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';

export default function Contato() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useSeo({
    title: 'Contato | Boldlife',
    description: 'Fale com a Boldlife. Encontre os canais oficiais de atendimento e tire suas dúvidas sobre o ecossistema de consumo inteligente.',
    path: '/contato',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contato Boldlife',
      url: `${SITE_URL}/contato`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Preencha todos os campos.');
      return;
    }
    setSending(true);
    setError('');
    try {
      await base44.functions.invoke('sendSupportEmail', { ...form, department: 'Contato Geral' });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { icon: Phone, label: 'Telefone', value: SITE_CONFIG.phone, href: SITE_CONFIG.phone ? `tel:${SITE_CONFIG.phone}` : null },
    { icon: MessageCircle, label: 'WhatsApp', value: SITE_CONFIG.whatsapp, href: SITE_CONFIG.whatsapp ? `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}` : null },
    { icon: Mail, label: 'E-mail', value: SITE_CONFIG.email, href: SITE_CONFIG.email ? `mailto:${SITE_CONFIG.email}` : null },
    { icon: MapPin, label: 'Endereço', value: SITE_CONFIG.address },
  ];

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
          <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">Fale Conosco</p>
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">Contato</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl">
            Tem dúvidas sobre a Boldlife ou quer saber mais sobre o ecossistema de consumo inteligente?
            Encontre abaixo os canais oficiais de atendimento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="font-heading font-bold text-xl mb-6">Canais oficiais</h2>
            <div className="space-y-4">
              {channels.map((c) => (
                <div key={c.label} className="flex items-start gap-4 bg-card/60 border border-border rounded-sm p-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-muted-foreground">{c.label}</p>
                    {c.value ? (
                      c.href ? (
                        <a href={c.href} className="text-foreground hover:text-primary transition-colors break-all">{c.value}</a>
                      ) : (
                        <p className="text-foreground">{c.value}</p>
                      )
                    ) : (
                      <p className="text-muted-foreground/50 text-sm italic">A ser divulgado pelo administrador</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={SITE_CONFIG.webmail_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-sm font-heading font-semibold rounded-sm bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                Acessar Webmail
              </a>
            </div>

            {(SITE_CONFIG.instagram || SITE_CONFIG.facebook || SITE_CONFIG.youtube || SITE_CONFIG.linkedin || SITE_CONFIG.tiktok || SITE_CONFIG.twitter) && (
              <div className="mt-6">
                <h3 className="font-heading font-bold text-sm mb-3 text-muted-foreground">Redes sociais oficiais</h3>
                <div className="flex flex-wrap gap-3">
                  {['instagram', 'facebook', 'youtube', 'linkedin', 'tiktok', 'twitter'].map((k) =>
                    SITE_CONFIG[k] ? (
                      <a key={k} href={SITE_CONFIG[k]} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-heading font-semibold rounded-sm bg-card border border-border hover:border-primary hover:text-primary transition-colors capitalize">
                        {k === 'twitter' ? 'X / Twitter' : k}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl mb-6">Envie uma mensagem</h2>
            {sent ? (
              <div className="bg-card/60 border border-primary/40 rounded-sm p-6 text-center">
                <p className="font-heading font-bold text-primary mb-2">Mensagem enviada!</p>
                <p className="text-muted-foreground text-sm">Obrigado pelo contato. Retornaremos em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-card/60 border border-border rounded-sm p-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border-border" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">E-mail</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background border-border" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-background border-border min-h-[120px]" placeholder="Como podemos ajudar?" />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <Button type="submit" disabled={sending} className="w-full font-heading font-bold gap-2">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sending ? 'Enviando...' : 'Enviar mensagem'}
                </Button>
              </form>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}