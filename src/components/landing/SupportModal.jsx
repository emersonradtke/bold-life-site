import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

let departments = [
  { label: 'Suporte TI', email: 'ti@boldlifeoficial.com.br' },
  { label: 'Financeiro', email: 'financeiro@boldlifeoficial.com.br' },
  { label: 'Administrativo', email: 'adm@boldlifeoficial.com.br' },
];

export default function SupportModal({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', department: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [depts, setDepts] = useState(departments);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const configs = await base44.entities.SupportEmailConfig.list();
      if (configs && configs.length > 0) {
        setDepts(configs.map(c => ({ label: c.department, email: c.email })));
      }
    } catch (error) {
      console.error('Erro ao carregar departamentos:', error);
    }
  };

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await base44.functions.invoke('sendSupportEmail', {
        name: form.name,
        email: form.email,
        department: form.department,
        message: form.message,
      });
      setSent(true);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', department: '', message: '' }); }, 400);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-sm px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(43,159,232,0.4)] transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Fale Conosco</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 sm:bottom-8 right-0 sm:right-6 z-50 w-full sm:w-[420px] bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80">
                <div>
                  <p className="font-heading font-bold text-foreground">Fale Conosco</p>
                  <p className="text-xs text-muted-foreground">Selecione o setor e envie sua mensagem</p>
                </div>
                <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-heading font-bold text-lg mb-2">Mensagem Enviada!</p>
                    <p className="text-muted-foreground text-sm">Nossa equipe entrará em contato em breve.</p>
                    <button
                      onClick={handleClose}
                      className="mt-6 text-primary text-sm font-heading font-semibold hover:underline"
                    >
                      Fechar
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Seu Nome
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nome completo"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-muted border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Seu E-mail
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-muted border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Setor
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={form.department}
                          onChange={e => setForm({ ...form, department: e.target.value })}
                          className="w-full appearance-none bg-muted border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors pr-10"
                        >
                          <option value="" disabled>Selecione o setor...</option>
                          {depts.map(d => (
                            <option key={d.label} value={d.label}>{d.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Mensagem
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Como podemos ajudar?"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-muted border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm py-3 rounded-sm hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {sending ? 'Enviando...' : (<><Send className="w-4 h-4" /> Enviar Mensagem</>)}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}