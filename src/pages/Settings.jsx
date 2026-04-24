import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDept, setNewDept] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const data = await base44.entities.SupportEmailConfig.list();
      setConfigs(data || []);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newDept || !newEmail) {
      alert('Preencha todos os campos');
      return;
    }
    try {
      await base44.entities.SupportEmailConfig.create({
        department: newDept,
        email: newEmail,
      });
      setNewDept('');
      setNewEmail('');
      loadConfigs();
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      alert('Erro ao adicionar configuração');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja remover?')) return;
    try {
      await base44.entities.SupportEmailConfig.delete(id);
      loadConfigs();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar configuração');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

  return (
    <div className="relative min-h-screen bg-background text-foreground p-6 overflow-hidden">
      {/* Background decorative logo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-heading font-bold">Configurações de Suporte</h1>
        </div>

        {/* Add Form */}
        <div className="bg-card border border-border rounded-sm p-6 mb-8">
          <h2 className="font-heading font-bold text-lg mb-4">Adicionar Email do Departamento</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-heading font-semibold text-muted-foreground block mb-2">
                Departamento
              </label>
              <Input
                placeholder="Ex: Suporte TI"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="bg-muted border border-border"
              />
            </div>
            <div>
              <label className="text-sm font-heading font-semibold text-muted-foreground block mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Ex: ti@boldlifeoficial.com.br"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-muted border border-border"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-primary text-primary-foreground font-heading font-bold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-lg">Departamentos Configurados</h2>
          {configs.length === 0 ? (
            <p className="text-muted-foreground">Nenhum departamento configurado.</p>
          ) : (
            configs.map((config) => (
              <div
                key={config.id}
                className="bg-card border border-border rounded-sm p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-heading font-semibold">{config.department}</p>
                  <p className="text-sm text-muted-foreground">{config.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(config.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}