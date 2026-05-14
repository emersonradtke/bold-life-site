import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, X } from 'lucide-react';

const ADMIN_PASSWORD = 'boldlife2025';

export default function AdminPasswordModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-sm p-8 w-full max-w-sm mx-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg">Área Administrativa</h3>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Senha de acesso</label>
              <Input
                type="password"
                placeholder="Digite a senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className={`bg-background border-border ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-1">Senha incorreta. Tente novamente.</p>
              )}
            </div>
            <Button type="submit" className="w-full font-heading font-bold">
              ENTRAR
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}