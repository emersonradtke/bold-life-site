import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Pencil, Trash2, Settings, CheckCircle2, Clock, Loader2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPasswordModal from '@/components/roadmap/AdminPasswordModal';
import RoadmapItemForm from '@/components/roadmap/RoadmapItemForm';

const HEADER_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/1be673aa0_BOLDLIFE02-LOGO1.png';
const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

const statusConfig = {
  planejado: { label: 'Planejado', icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted/30', border: 'border-border' },
  em_andamento: { label: 'Em Andamento', icon: Loader2, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/40' },
  concluido: { label: 'Concluído', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/40' },
};

export default function Roadmap() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await base44.entities.RoadmapItem.list('order', 100);
    setItems(data);
    setLoading(false);
  };

  const handleSave = async (form) => {
    if (editingItem) {
      await base44.entities.RoadmapItem.update(editingItem.id, form);
    } else {
      await base44.entities.RoadmapItem.create(form);
    }
    setShowForm(false);
    setEditingItem(null);
    loadItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Remover este item do roadmap?')) return;
    await base44.entities.RoadmapItem.delete(id);
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Group items by quarter
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.quarter]) acc[item.quarter] = [];
    acc[item.quarter].push(item);
    return acc;
  }, {});

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pt-8 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-heading font-semibold">Voltar</span>
          </button>

          {/* Admin toggle */}
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => { setEditingItem(null); setShowForm(true); }}
                className="font-heading font-bold gap-2"
              >
                <Plus className="w-4 h-4" /> Novo Item
              </Button>
              <button
                onClick={() => setIsAdmin(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Sair do modo admin
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Lock className="w-4 h-4" />
              <span className="font-heading font-semibold hidden sm:inline">Admin</span>
            </button>
          )}
        </div>

        <div className="h-0.5 w-12 bg-primary mb-6" />
        <p className="text-primary font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
          Evolução da Plataforma
        </p>
        <img src={HEADER_LOGO} alt="Bold Life" className="h-10 mb-6" />
        <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-4">
          Roadmap Bold Life
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          Acompanhe os marcos e novidades que estamos construindo para transformar ainda mais a sua experiência na plataforma.
        </p>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 pb-32">
        
        {/* Admin form */}
        {showForm && isAdmin && (
          <RoadmapItemForm
            item={editingItem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-heading font-semibold text-lg mb-2">Nenhum item no roadmap ainda.</p>
            {isAdmin && (
              <p className="text-sm">Clique em "Novo Item" para adicionar o primeiro marco.</p>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([quarter, quarterItems], qIdx) => (
              <motion.div
                key={quarter}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: qIdx * 0.1, duration: 0.6 }}
              >
                {/* Quarter header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-heading font-black text-primary text-sm tracking-[0.2em] uppercase">
                    {quarter}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Items */}
                <div className="grid gap-4 md:grid-cols-2">
                  {quarterItems.map((item) => {
                    const config = statusConfig[item.status] || statusConfig.planejado;
                    const Icon = config.icon;
                    return (
                      <div
                        key={item.id}
                        className={`relative bg-card/60 backdrop-blur-sm border ${config.border} rounded-sm p-6 group`}
                      >
                        {/* Status badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} mb-4`}>
                          <Icon className={`w-3.5 h-3.5 ${config.color} ${item.status === 'em_andamento' ? 'animate-spin' : ''}`} />
                          <span className={`text-xs font-heading font-bold ${config.color}`}>{config.label}</span>
                        </div>

                        <h3 className="font-heading font-bold text-base mb-2">{item.title}</h3>
                        {item.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        )}

                        {/* Admin actions */}
                        {isAdmin && (
                          <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 rounded bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded bg-card hover:bg-destructive/20 border border-border text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <AdminPasswordModal
          onSuccess={() => { setIsAdmin(true); setShowPasswordModal(false); }}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
}